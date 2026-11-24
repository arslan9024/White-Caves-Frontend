import {
  type CacheEntry, type PaginationParams, type PaginatedResponse,
  CacheManager, PaginationHelper, RequestDeduplicator,
} from './apiOptimizerHelpers';
export type { CacheEntry, PaginationParams, PaginatedResponse };

export class APIOptimizer {
  private cacheManager: CacheManager;
  private deduplicator: RequestDeduplicator;
  private config: {
    cacheTTL: number;
    enableCache: boolean;
    enableDedup: boolean;
    enablePagination: boolean;
  };

  constructor(config?: Partial<typeof APIOptimizer.prototype.config>) {
    this.cacheManager = new CacheManager();
    this.deduplicator = new RequestDeduplicator();
    this.config = {
      cacheTTL: 5 * 60 * 1000, // 5 minutes default
      enableCache: true,
      enableDedup: true,
      enablePagination: true,
      ...config,
    };
  }

  /**
   * Get cached data or execute request
   */
  async getWithCache<T>(
    key: string,
    executor: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    if (!this.config.enableCache) {
      return executor();
    }

    // Check cache first
    const cached = this.cacheManager.get<T>(key);
    if (cached !== null) {
      console.log(`[Cache] Hit for ${key}`);
      return cached;
    }

    // Check if request is already in progress
    const inProgress = this.cacheManager.getRequestInProgress<T>(key);
    if (inProgress) {
      console.log(`[Cache] Waiting for in-progress request: ${key}`);
      return inProgress;
    }

    // Execute new request with deduplication
    console.log(`[Cache] Miss for ${key}, fetching...`);
    const promise = executor();
    this.cacheManager.setRequestInProgress(key, promise);

    try {
      const data = await promise;
      this.cacheManager.set(key, data, ttl || this.config.cacheTTL);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Execute with deduplication
   */
  async executeWithDedup<T>(
    method: string,
    url: string,
    data: unknown,
    executor: () => Promise<T>
  ): Promise<T> {
    if (!this.config.enableDedup) {
      return executor();
    }

    return this.deduplicator.execute(method, url, data, executor);
  }

  /**
   * Build paginated request
   */
  buildPaginatedRequest(
    baseUrl: string,
    params: PaginationParams
  ): { url: string; params: Record<string, any> } {
    if (!this.config.enablePagination) {
      return { url: baseUrl, params: {} };
    }

    const queryParams = PaginationHelper.buildParams(params);
    const queryString = new URLSearchParams(
      Object.entries(queryParams).map(([k, v]) => [
        k,
        typeof v === 'string' ? v : JSON.stringify(v),
      ])
    ).toString();

    return {
      url: `${baseUrl}?${queryString}`,
      params: queryParams,
    };
  }

  /**
   * Create paginated response
   */
  createPaginatedResponse<T>(
    data: T[],
    page: number,
    pageSize: number,
    totalRecords: number,
    metadata?: Record<string, any>
  ): PaginatedResponse<T> {
    return {
      data,
      pagination: PaginationHelper.createPaginationMeta(
        page,
        pageSize,
        totalRecords
      ),
      metadata,
    };
  }

  /**
   * Invalidate cache for specific pattern
   */
  invalidateCache(pattern?: string): void {
    if (!pattern) {
      this.cacheManager.clear();
      console.log('[Cache] Cleared all cache');
      return;
    }

    const info = this.cacheManager.getInfo();
    info.keys.forEach((key) => {
      if (key.includes(pattern)) {
        this.cacheManager.delete(key);
      }
    });

    console.log(`[Cache] Invalidated cache matching pattern: ${pattern}`);
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    keys: string[];
    activeRequests: number;
  } {
    return {
      size: this.cacheManager.getSize(),
      keys: this.cacheManager.getInfo().keys,
      activeRequests: this.deduplicator.getActiveCount(),
    };
  }

  /**
   * Clear all caches and requests
   */
  clear(): void {
    this.cacheManager.clear();
    this.deduplicator.clear();
    console.log('[Optimizer] Cleared all caches and in-progress requests');
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<typeof this.config>): void {
    this.config = { ...this.config, ...config };
    console.log('[Optimizer] Configuration updated:', this.config);
  }

  /**
   * Enable/disable cache
   */
  setCache(enabled: boolean): void {
    this.config.enableCache = enabled;
    console.log(`[Optimizer] Cache ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Enable/disable deduplication
   */
  setDedup(enabled: boolean): void {
    this.config.enableDedup = enabled;
    console.log(`[Optimizer] Deduplication ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Enable/disable pagination
   */
  setPagination(enabled: boolean): void {
    this.config.enablePagination = enabled;
    console.log(`[Optimizer] Pagination ${enabled ? 'enabled' : 'disabled'}`);
  }
}

// Create singleton instance
export const apiOptimizer = new APIOptimizer({
  cacheTTL: 5 * 60 * 1000, // 5 minutes
  enableCache: true,
  enableDedup: true,
  enablePagination: true,
});

export { CacheManager, PaginationHelper, RequestDeduplicator };

