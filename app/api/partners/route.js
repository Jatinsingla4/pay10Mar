import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API;
const API_KEY = process.env.NEXT_PUBLIC_AUTH_KEY;

export async function POST(request) {
  const body = await request.json();

  const res = await fetch(`${API_BASE}/partners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Api-Key': API_KEY,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
