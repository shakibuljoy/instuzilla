// import { NextRequest, NextResponse } from "next/server";
// import { verifyingUser } from "./utils/fetchUser";

// export default async function middleware(request: NextRequest){
    
//     const response = NextResponse.next();
//     const authUrl = ['/authentication/login']
//     const protectedUrl = ['/authentication/registration', '/students/.*']
//     if(authUrl.includes(request.nextUrl.pathname)){
//            const user = await verifyingUser();
        
//     if(user){
//         return NextResponse.redirect(new URL('/', request.url))
//     }
//     }else if(protectedUrl.includes(request.nextUrl.pathname)){
//         const user = await verifyingUser();
//         if(!user){
//             return NextResponse.redirect(new URL('/authentication/logout', request.url))
//         }
        
//     }
    
//     return response
// }
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
  const protectedPatterns = ['/authentication/registration', '/students/[id]']; // Add dynamic route pattern

  const pathname = request.nextUrl.pathname;

  if (authUrl.includes(pathname)) {
    const user = await verifyingUser();

    if (user) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (isProtectedRoute(pathname, protectedPatterns)) {
    const user = await verifyingUser();

    if (!user) {
      return NextResponse.redirect(new URL('/authentication/logout', request.url));
    }
  }

  return response;
}
