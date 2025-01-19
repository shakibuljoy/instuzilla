
import { NextRequest, NextResponse } from "next/server";
import { verifyingUser } from "./utils/fetchUser";

function isProtectedRoute(pathname: string, protectedPatterns: string[]): boolean {
  return protectedPatterns.some(pattern => {
    // Convert the pattern to a regular expression
    const regex = new RegExp(`^${pattern.replace(/\[.*?\]/g, '.*')}$`);
    return regex.test(pathname);
  });
}

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const authUrl = ['/authentication/login'];
  const publicUrl = ['/students/register-student'];
  const protectedPatterns = ['/authentication/registration', '/finance/']; // Add dynamic route pattern

  const pathname = request.nextUrl.pathname;
  if(publicUrl.includes(pathname)){
    return response;
  }else if (authUrl.includes(pathname)) {
    const user = await verifyingUser();

    if (user && user.user_type !== 'student') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }else if (isProtectedRoute(pathname, protectedPatterns)) {
    const user = await verifyingUser();

    if (!user) {
      return NextResponse.redirect(new URL('/authentication/update-user', request.url));
    }
  }
    return response;
}
