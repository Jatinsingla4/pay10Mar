import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function POST(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function PUT(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function DELETE(request, { params }) {
  return handleProxyRequest(request, params);
}

export async function PATCH(request, { params }) {
  return handleProxyRequest(request, params);
}

async function handleProxyRequest(request, params) {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API;
    const apiKey = process.env.NEXT_PUBLIC_AUTH_KEY;

    if (!apiBaseUrl || !apiKey) {
      console.error('API configuration missing inside proxy');
      return NextResponse.json(
        { status: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Await params per Next.js App Router constraints
    const resolvedParams = await params;
    const endpointPath = resolvedParams.path ? resolvedParams.path.join('/') : '';
    
    // Construct the target URL correctly depending on if query params exist
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = queryString 
      ? `${apiBaseUrl}/${endpointPath}?${queryString}`
      : `${apiBaseUrl}/${endpointPath}`;

    // Extract headers from the incoming request
    const requestHeaders = new Headers(request.headers);
    
    // Remove headers that might cause issues with the proxy
    requestHeaders.delete('host');
    requestHeaders.delete('referer');
    requestHeaders.delete('origin');
    
    // Inject our secure API key
    requestHeaders.set('X-Api-Key', apiKey);

    // Prepare fetch options
    const fetchOptions = {
      method: request.method,
      headers: requestHeaders,
      // For Next.js caching rules
      cache: 'no-store',
    };

    // If it's a mutation request, we need to pass the body along
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      // Forward the raw body stream and preserve the original content-type (including the multipart boundary)
      fetchOptions.body = request.body;
      
      // Node.js fetch needs duplex: 'half' when the body is a stream
      fetchOptions.duplex = 'half';
    }

    // Forward the request to the target API
    const response = await fetch(targetUrl, fetchOptions);
    
    // Get the response data
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      });
    } else {
      // For non-JSON responses (like files), we stream it back
      const blob = await response.blob();
      return new NextResponse(blob, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      });
    }

  } catch (error) {
    console.error('API Proxy error:', error);
    return NextResponse.json(
      { status: false, message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
