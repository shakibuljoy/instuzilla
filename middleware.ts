import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyingUser } from './utils/fetchUser';

// Import your verifyingUser function


// Middleware function
export async function middleware(request: NextRequest) {
  // Define protected routes
  const protectedRoutes = ['/dashboard', '/authentication/logout'];

  // Check if the current request path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If the route is protected, verify the user
  if (isProtectedRoute) {
    // Call the verifyingUser function to check if the user is authenticated
    const user = await verifyingUser();

    // If the user is not authenticated, redirect to the homepage
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/authentication/login';
      return NextResponse.redirect(url);
    }
  }

  // If the user is authenticated or the route is not protected, continue
  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
  matcher: ['/dashboard/:path*', '/'], // Apply middleware to /dashboard and homepage
};