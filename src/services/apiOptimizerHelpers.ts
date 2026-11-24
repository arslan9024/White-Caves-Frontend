/**
 * API Optimizer
 * Provides caching, pagination, request deduplication, and performance optimizations
 */

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sort?: string;
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  metadata?: Record<string, any>;
}

/**
 * Cache Manager
 * Handles in-memory caching with TTL support
 */
export class CacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private requestInProgress: Map<string, Promise<any>> = new Map();

  /**
   * Get value from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if cache has expired
    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set value in cache
   */
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Delete from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  getSize(): number {
    return this.cache.size;
  }

  /**
   * Get cache info
   */
  getInfo(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Track request in progress for deduplication
   */
  getRequestInProgress<T>(key: string): Promise<T> | null {
    return this.requestInProgress.get(key) as Promise<T> | null;
  }

  /**
   * Set request in progress
   */
  setRequestInProgress<T>(key: string, promise: Promise<T>): void {
    this.requestInProgress.set(key, promise);
    promise.finally(() => {
      this.requestInProgress.delete(key);
    });
  }
}

/**
 * Pagination Helper
 * Handles pagination logic
 */
export class PaginationHelper {
  /**
   * Build pagination query parameters
   */
  static buildParams(params: PaginationParams): Record<string, any> {
    return {
      page: params.page || 1,
      pageSize: params.pageSize || 20,
      ...(params.sort && { sort: params.sort }),
      ...(params.filters && { ...params.filters }),
    };
  }

  /**
   * Calculate total pages
   */
  static calculateTotalPages(totalRecords: number, pageSize: number): number {
    return Math.ceil(totalRecords / pageSize);
  }

  /**
   * Create pagination metadata
   */
  static createPaginationMeta(
    page: number,
    pageSize: number,
    totalRecords: number
  ) {
    const totalPages = this.calculateTotalPages(totalRecords, pageSize);
    return {
      page,
      pageSize,
      totalPages,
      totalRecords,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  }
}

/**
 * Request Deduplicator
 * Prevents duplicate requests in flight
 */
export class RequestDeduplicator {
  private activeRequests: Map<string, Promise<any>> = new Map();

  /**
   * Get hash of request
   */
  private getRequestHash(method: string, url: string, data?: unknown): string {
    const dataStr = data ? JSON.stringify(data) : '';
    return `${method.toUpperCase()}-${url}-${dataStr}`;
  }

  /**
   * Execute with deduplication
   */
  async execute<T>(
    method: string,
    url: string,
    data: unknown,
    executor: () => Promise<T>
  ): Promise<T> {
    const hash = this.getRequestHash(method, url, data);

    // Return in-progress request if exists
    if (this.activeRequests.has(hash)) {
      console.log(`[Dedup] Returning cached promise for ${hash}`);
      return this.activeRequests.get(hash) as Promise<T>;
    }

    // Execute new request
    console.log(`[Dedup] Executing new request for ${hash}`);
    const promise = executor()
      .then((result) => {
        this.activeRequests.delete(hash);
        return result;
      })
      .catch((error) => {
        this.activeRequests.delete(hash);
        throw error;
      });

    this.activeRequests.set(hash, promise);
    return promise;
  }

  /**
   * Clear all deduplication cache
   */
  clear(): void {
    this.activeRequests.clear();
  }

  /**
   * Get active requests count
   */
  getActiveCount(): number {
    return this.activeRequests.size;
  }
}

/**
 * API Optimizer Class
 * Main optimizer handling all performance improvements
 */