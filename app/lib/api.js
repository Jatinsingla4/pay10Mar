// Server-side API utility for making API calls in generateMetadata and other server components

export async function fetchApiData(endpoint) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API;
  const apiKey = process.env.NEXT_PUBLIC_AUTH_KEY;

  if (!apiBaseUrl || !apiKey) {
    console.warn('API configuration missing');
    return null;
  }

  try {
    const url = `${apiBaseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      // Add cache revalidation for metadata
      next: { revalidate: 0 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(`API call failed: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    return null;
  }
}
