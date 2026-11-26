/**
 * Load Test Runner - Executes load tests and collects metrics
 * Simulates user behavior and measures performance under various load conditions (< 350 lines, AEG-042).
 */

import http from 'http';
import https from 'https';
import { URL } from 'url';
import { LoadTestScenario, LoadTestResults, LOAD_TEST_SCENARIOS } from './load-test.config';
import {
  calculatePercentile,
  reportScenarioResults,
  generateSummaryReport,
} from './load-test.reporter';

interface TestMetrics {
  requests: number;
  successful: number;
  failed: number;
  errors: Record<string, number>;
  responseTimes: number[];
  startTime: number;
  endTime: number;
}

export class LoadTestRunner {
  private baseUrl: string;
  private timeout: number = 30000;
  private results: LoadTestResults[] = [];

  constructor(baseUrl: string = 'http://localhost:5000') {
    this.baseUrl = baseUrl;
  }

  private async makeRequest(
    method: string,
    path: string,
    body?: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<{ statusCode: number; responseTime: number; error?: Error }> {
    return new Promise(resolve => {
      const startTime = Date.now();
      const url = new URL(path, this.baseUrl);
      const isHttps = url.protocol === 'https:';
      const client = isHttps ? https : http;

      const requestOptions = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        timeout: this.timeout,
      };

      const request = client.request(requestOptions, response => {
        response.on('data', () => {
          // Consume stream so 'end' fires cleanly
        });
        response.on('end', () => {
          resolve({
            statusCode: response.statusCode || 500,
            responseTime: Date.now() - startTime,
          });
        });
      });

      request.on('error', error => {
        resolve({
          statusCode: 500,
          responseTime: Date.now() - startTime,
          error: error as Error,
        });
      });

      request.on('timeout', () => {
        request.destroy();
        resolve({
          statusCode: 408,
          responseTime: Date.now() - startTime,
          error: new Error('Request timeout'),
        });
      });

      if (body) {
        request.write(JSON.stringify(body));
      }
      request.end();
    });
  }

  private async simulateVirtualUser(
    scenario: LoadTestScenario,
    metrics: TestMetrics
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < scenario.duration * 1000) {
      const random = Math.random() * 100;
      let weight = 0;
      const endpoint = scenario.endpoints.find(e => {
        weight += e.weight;
        return random <= weight;
      });

      if (!endpoint) continue;

      const result = await this.makeRequest(
        endpoint.method,
        endpoint.path,
        endpoint.body,
        endpoint.headers
      );

      metrics.requests++;
      metrics.responseTimes.push(result.responseTime);

      if (result.error) {
        metrics.failed++;
        const errorKey = result.error.message;
        metrics.errors[errorKey] = (metrics.errors[errorKey] || 0) + 1;
      } else if (result.statusCode === endpoint.expectedStatus) {
        metrics.successful++;
      } else {
        metrics.failed++;
        const errorKey = `HTTP ${result.statusCode}`;
        metrics.errors[errorKey] = (metrics.errors[errorKey] || 0) + 1;
      }

      await new Promise(resolve => setTimeout(resolve, scenario.thinkTime));
    }
  }

  async runScenario(scenario: LoadTestScenario): Promise<LoadTestResults> {
    console.log(`\nStarting load test: ${scenario.name}`);
    console.log(`   Description: ${scenario.description}`);
    console.log(`   Virtual Users: ${scenario.virtualUsers} | Duration: ${scenario.duration}s`);

    const metrics: TestMetrics = {
      requests: 0,
      successful: 0,
      failed: 0,
      errors: {},
      responseTimes: [],
      startTime: Date.now(),
      endTime: 0,
    };

    const userPromises: Promise<void>[] = [];
    const usersPerSecond = Math.ceil(scenario.virtualUsers / scenario.rampUp);

    for (let i = 0; i < scenario.virtualUsers; i++) {
      if (i > 0 && i % usersPerSecond === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      userPromises.push(this.simulateVirtualUser(scenario, metrics));
    }

    await Promise.all(userPromises);
    metrics.endTime = Date.now();

    const successRate = metrics.requests > 0 ? (metrics.successful / metrics.requests) * 100 : 0;
    const actualDuration = (metrics.endTime - metrics.startTime) / 1000;
    const throughput = actualDuration > 0 ? Math.round(metrics.requests / actualDuration) : 0;

    const result: LoadTestResults = {
      scenario: scenario.name,
      timestamp: new Date().toISOString(),
      duration: actualDuration,
      totalRequests: metrics.requests,
      successfulRequests: metrics.successful,
      failedRequests: metrics.failed,
      successRate: Math.round(successRate * 100) / 100,
      throughput,
      avgResponseTime:
        metrics.responseTimes.length > 0
          ? Math.round(
              metrics.responseTimes.reduce((a, b) => a + b, 0) / metrics.responseTimes.length
            )
          : 0,
      minResponseTime: metrics.responseTimes.length > 0 ? Math.min(...metrics.responseTimes) : 0,
      maxResponseTime: metrics.responseTimes.length > 0 ? Math.max(...metrics.responseTimes) : 0,
      p50ResponseTime: Math.round(calculatePercentile(metrics.responseTimes, 50)),
      p95ResponseTime: Math.round(calculatePercentile(metrics.responseTimes, 95)),
      p99ResponseTime: Math.round(calculatePercentile(metrics.responseTimes, 99)),
      errors: metrics.errors,
    };

    this.results.push(result);
    reportScenarioResults(result, scenario);

    return result;
  }

  async runAll(): Promise<LoadTestResults[]> {
    console.log('Starting Load Test Suite');
    console.log(`   Base URL: ${this.baseUrl}`);
    console.log(`   Total Scenarios: ${LOAD_TEST_SCENARIOS.length}\n`);

    for (const scenario of LOAD_TEST_SCENARIOS) {
      try {
        await this.runScenario(scenario);
      } catch (error) {
        console.error(`Error running scenario ${scenario.name}:`, error);
      }
    }

    generateSummaryReport(this.results);
    return this.results;
  }

  getResults(): LoadTestResults[] {
    return this.results;
  }
}

async function main() {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:5000';
  const runner = new LoadTestRunner(baseUrl);

  try {
    const results = await runner.runAll();
    process.exit(results.some(r => r.failedRequests > 0) ? 1 : 0);
  } catch (error) {
    console.error('Load test failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
