class PerformanceMetrics {
  constructor() {
    this.isLoggingEnabled = process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_LOGS === 'true';

    this.metrics = {
      timeToFirstByte: null,
      loadStart: Date.now(),
      loadComplete: null,
      totalLoadTime: null,
      cacheHits: 0,
      cacheMisses: 0,
      assetLoadTimes: {},
      errors: [],
      networkInfo: this.getNetworkInfo(),
    };
  }

  enableLogging(enable = true) {
    this.isLoggingEnabled = enable;
  }

  getNetworkInfo() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }

  recordCacheHit(url) {
    if (!this.isLoggingEnabled) return;
    this.metrics.cacheHits++;
    this.metrics.assetLoadTimes[url] = {
      status: 'cache_hit',
      timestamp: Date.now()
    };
  }

  recordCacheMiss(url) {
    if (!this.isLoggingEnabled) return;
    this.metrics.cacheMisses++;
    this.metrics.assetLoadTimes[url] = {
      status: 'cache_miss',
      timestamp: Date.now()
    };
  }

  recordError(error, context) {
    if (!this.isLoggingEnabled) return;
    this.metrics.errors.push({
      error: error.message,
      context,
      timestamp: Date.now()
    });
  }

  startLoading() {
    if (!this.isLoggingEnabled) return;
    this.metrics.loadStart = Date.now();
    if (window.performance && window.performance.timing) {
      this.metrics.timeToFirstByte =
        window.performance.timing.responseStart -
        window.performance.timing.navigationStart;
    }
  }

  completeLoading() {
    if (!this.isLoggingEnabled) return;
    this.metrics.loadComplete = Date.now();
    this.metrics.totalLoadTime = this.metrics.loadComplete - this.metrics.loadStart;
    this.logMetrics();
  }

  logMetrics() {
    if (!this.isLoggingEnabled) return;

    console.group('🎯 Performance Metrics');
    console.log('Total Load Time:', `${this.metrics.totalLoadTime}ms`);
    console.log('Time to First Byte:', `${this.metrics.timeToFirstByte}ms`);
    console.log('Cache Performance:', {
      hits: this.metrics.cacheHits,
      misses: this.metrics.cacheMisses,
      ratio: `${((this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses)) * 100).toFixed(2)}%`
    });
    if (this.metrics.networkInfo) {
      console.log('Network Conditions:', this.metrics.networkInfo);
    }
    if (this.metrics.errors.length > 0) {
      console.warn('Errors:', this.metrics.errors);
    }
    console.groupEnd();

    // this.sendToAnalytics();
  }

  sendToAnalytics() {
    if (!this.isLoggingEnabled) return;
    // analyticsService.send('performance', this.metrics);
  }
}

const performanceMetrics = new PerformanceMetrics();
export default performanceMetrics;
