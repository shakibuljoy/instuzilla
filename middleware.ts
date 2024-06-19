import { NextRequest, NextResponse } from "next/server";
import { verifyingUser } from "./utils/fetchUser";

export default async function middleware(request: NextRequest){
    
    const response = NextResponse.next();
    const authUrl = ['/authentication/login']
    const protectedUrl = ['/authentication/registration']
    if(authUrl.includes(request.nextUrl.pathname)){
           const user = await verifyingUser();
        
    if(user){
        return NextResponse.redirect(new URL('/', request.url))
    }
    }else if(protectedUrl.includes(request.nextUrl.pathname)){
        const user = await verifyingUser();
        if(!user){
            return NextResponse.redirect(new URL('/authentication/logout', request.url))
        }
        
    }
    
    return response
}
