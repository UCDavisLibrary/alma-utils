import fetchReport from './fetchReport';

const DEFAULT_CONFIG = {
  host: '',
  apiKey: '',
  maxRequestsPerSecond: 25
};

export const initAlmaUtils = ( config = DEFAULT_CONFIG ) => {
  const AlmaUtils = {
    /**
     * Config
     */
    config: {
      host: config.host || DEFAULT_CONFIG.host,
      apiKey: config.apiKey || DEFAULT_CONFIG.apiKey,
      maxRequestsPerSecond: config.maxRequestsPerSecond || DEFAULT_CONFIG.maxRequestsPerSecond
    },
    /**
     * Utils
     * -----
     * Defined with function() syntax instead of arrow functions so that
     * the AlmaUtils object can reference itself in functions using "this".
     */
    fetchReport: function( endpoint, path, format ) {
      return fetchReport( this.config, endpoint, path, format )
    }
  }

  return AlmaUtils;
}
