import { useMemo, useCallback } from 'react';

const useApiAuth = () => {
  const authHeaders = useMemo(() => ({
    'Content-Type': 'application/json'
    // X-API-Key removed for security. Added via proxy.
  }), []);

  const apiBaseUrl = '/api/proxy';

  const makeApiCall = useCallback(async (endpoint, options = {}) => {
    // The endpoint often comes with a leading slash. e.g. '/page/contact-us'
    // Ensure the resulting URL evaluates properly (e.g. '/api/proxy/page/contact-us')
    const finalEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${apiBaseUrl}${finalEndpoint}`;
    // console.log("API URL:", url);
    const defaultOptions = {
      headers: authHeaders,
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }, [authHeaders, apiBaseUrl]);

  return {
    authHeaders,
    apiBaseUrl,
    makeApiCall
  };
};

export default useApiAuth;
