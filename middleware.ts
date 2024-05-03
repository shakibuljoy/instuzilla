import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest){
    const response = NextResponse.next();
    const authUrl = ['/authentication/login']
    if(authUrl.includes(request.nextUrl.pathname)){
        const token = request.cookies.has('token');
    if(token){
        return NextResponse.redirect(new URL('/', request.url))
    }
    }
    
    return response
}
