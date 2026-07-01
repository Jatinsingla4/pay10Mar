import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API;
const API_KEY = process.env.BACKEND_AUTH_KEY;

export async function GET(request, { params }) {
  return handleProxy(request, params);
}

export async function POST(request, { params }) {
  return handleProxy(request, params);
}

async function handleProxy(request, params) {
  try {
    if (!API_BASE || !API_KEY) {
      return NextResponse.json({ status: false, message: 'Server configuration error' }, { status: 500 });
    }

    const resolvedParams = await params;
    const endpointPath = resolvedParams.path ? resolvedParams.path.join('/') : '';
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = queryString ? `${API_BASE}/${endpointPath}?${queryString}` : `${API_BASE}/${endpointPath}`;

    const fetchOptions = {
      method: request.method,
      headers: {
        'X-Api-Key': API_KEY,
        'Origin': API_BASE.replace('/api', ''),
        'Referer': API_BASE.replace('/api', ''),
      },
      cache: 'no-store',
    };

    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
        // Read and re-create FormData so it works reliably in Next.js
        const incoming = await request.formData();
        const outgoing = new FormData();
        for (const [key, value] of incoming.entries()) {
          outgoing.append(key, value);
        }
        fetchOptions.body = outgoing;
      } else {
        // JSON or other body
        const text = await request.text();
        fetchOptions.body = text;
        fetchOptions.headers['content-type'] = contentType;
      }
    }

    const response = await fetch(targetUrl, fetchOptions);
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error('Proxy non-JSON response:', response.status, text.slice(0, 300));
      data = { status: false, message: `Backend returned ${response.status}: ${text.slice(0, 100)}` };
    }
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ status: false, message: 'An error occurred. Please try again later.' }, { status: 500 });
  }
}
