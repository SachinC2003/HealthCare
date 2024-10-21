import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware for admin routes
function loginMiddleware(req: NextRequest) {
  //console.log('login middleware triggered');
  // Custom logic for admin
  return NextResponse.next(); // Continue the request
}

// Middleware for dashboard routes
function registerMiddleware(req: NextRequest) {
  //console.log('Register middleware triggered');
  // Custom logic for register
  return NextResponse.next();
}

// Apply middlewares to specific routes with matchers
export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
    //console.log(url)
  // Check if the request matches the /admin route
  if (url.startsWith('/api/register')) {
    return registerMiddleware(req);
  }

  // Check if the request matches the /dashboard route
  if (url.startsWith('/api/login')) {
    return loginMiddleware(req);
  }

  // If no match, continue the request lifecycle
  return NextResponse.next();
}

// Define matchers for middleware
export const config = {
  matcher: [
    '/api/register',      // Apply middleware for /admin and sub-routes
    '/api/login',  // Apply middleware for /dashboard and sub-routes
  ],
};
