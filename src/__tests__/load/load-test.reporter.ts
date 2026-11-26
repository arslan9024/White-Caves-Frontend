/**
 * Load Test Reporter — Percentile & console summary reporting helpers
 * Extracted from load-test.runner.ts for AEGIS AEG-042 (< 350 lines compliance).
 */
import type { LoadTestResults, LoadTestScenario } from './load-test.config';

export function calculatePercentile(times: number[], percentile: number): number {
  const sorted = [...times].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)] || 0;
}

export function reportScenarioResults(result: LoadTestResults, scenario: LoadTestScenario): void {
  console.log(`\nTest Results: ${result.scenario}`);
  console.log(`   Total Requests: ${result.totalRequests}`);
  console.log(`   Successful: ${result.successfulRequests} (${result.successRate}%)`);
  console.log(`   Failed: ${result.failedRequests}`);
  console.log(`   Throughput: ${result.throughput} req/s`);
  console.log('   Response Times:');
  console.log(`     - Avg: ${result.avgResponseTime}ms`);
  console.log(`     - Min: ${result.minResponseTime}ms`);
  console.log(`     - Max: ${result.maxResponseTime}ms`);
  console.log(`     - p50: ${result.p50ResponseTime}ms`);
  console.log(`     - p95: ${result.p95ResponseTime}ms`);
  console.log(`     - p99: ${result.p99ResponseTime}ms`);

  const criteria = scenario.successCriteria;
  const passed =
    result.maxResponseTime <= criteria.maxResponseTime &&
    result.p95ResponseTime <= criteria.p95ResponseTime &&
    result.p99ResponseTime <= criteria.p99ResponseTime &&
    result.successRate >= 100 - criteria.errorRate;

  console.log(`   ${passed ? 'PASSED' : 'FAILED'} success criteria`);

  if (!passed) {
    console.log('   Failures:');
    if (result.maxResponseTime > criteria.maxResponseTime) {
      console.log(
        `     - Max response time: ${result.maxResponseTime}ms > ${criteria.maxResponseTime}ms`
      );
    }
    if (result.p95ResponseTime > criteria.p95ResponseTime) {
      console.log(
        `     - p95 response time: ${result.p95ResponseTime}ms > ${criteria.p95ResponseTime}ms`
      );
    }
    if (result.p99ResponseTime > criteria.p99ResponseTime) {
      console.log(
        `     - p99 response time: ${result.p99ResponseTime}ms > ${criteria.p99ResponseTime}ms`
      );
    }
    if (result.successRate < 100 - criteria.errorRate) {
      console.log(`     - Success rate: ${result.successRate}% < ${100 - criteria.errorRate}%`);
    }
  }
}

export function generateSummaryReport(allResults: LoadTestResults[]): void {
  console.log('\n' + '='.repeat(60));
  console.log('LOAD TEST SUMMARY REPORT');
  console.log('='.repeat(60));

  const passedTests = allResults.filter(r => r.failedRequests === 0).length;
  const totalRequests = allResults.reduce((sum, r) => sum + r.totalRequests, 0);
  const totalErrors = allResults.reduce((sum, r) => sum + r.failedRequests, 0);
  const successRate =
    totalRequests > 0 ? (((totalRequests - totalErrors) / totalRequests) * 100).toFixed(2) : '0.00';

  console.log('\nOverall Metrics:');
  console.log(`   Tests Passed: ${passedTests}/${allResults.length}`);
  console.log(`   Total Requests: ${totalRequests}`);
  console.log(`   Total Errors: ${totalErrors}`);
  console.log(`   Overall Success Rate: ${successRate}%`);

  console.log('\nPerformance Summary:');
  const avgResp =
    allResults.length > 0
      ? (allResults.reduce((sum, r) => sum + r.avgResponseTime, 0) / allResults.length).toFixed(0)
      : '0';
  const maxResp = allResults.length > 0 ? Math.max(...allResults.map(r => r.maxResponseTime)) : 0;
  const p95Resp =
    allResults.length > 0
      ? (allResults.reduce((sum, r) => sum + r.p95ResponseTime, 0) / allResults.length).toFixed(0)
      : '0';

  console.log(`   Average Response Time: ${avgResp}ms`);
  console.log(`   Max Response Time: ${maxResp}ms`);
  console.log(`   p95 Response Time: ${p95Resp}ms`);

  console.log('\nScenario Results:');
  allResults.forEach(r => {
    console.log(`   ${r.scenario}: ${r.successRate}% success | ${r.throughput} req/s`);
  });

  console.log('\n' + '='.repeat(60));
}
