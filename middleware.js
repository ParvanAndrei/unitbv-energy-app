import { _NextRequest, NextResponse } from 'next/server';

export function middleware(request) {
  // If X-Forwarded-Host is not set, then don't bother with middleware.
  const forwardedHost = request.headers.get('X-Forwarded-Host');
  if (forwardedHost === null) return NextResponse.next();

  // Middleware starts here
  const requestedUrl = request.nextUrl.clone();
  const basePath = '/energy';

  // const requestedHost = request.headers.get('X-Forwarded-Host');
  // const forwardedPath = request.headers.get('X-Forwarded-Path');

  console.log('basePath set: ' + basePath);
  console.log('requestedUrl: ' + requestedUrl.toString());
  console.log('basePath index: ' + requestedUrl.toString().indexOf(basePath));

  if (requestedUrl.toString().indexOf(basePath) == -1) {
    console.log('basePath not detected in request.');

    const pathForward = basePath + requestedUrl.toString().split('localhost:3000').pop();
    console.log('Will offer (proxy): ' + pathForward);
    return NextResponse.rewrite(new URL(pathForward, request.url));
  }

  return NextResponse.next();
}