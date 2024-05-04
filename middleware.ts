import { NextRequest, NextResponse } from "next/server";
import {gettingUser } from "./utils/fetchUser";

export default async function middleware(request: NextRequest){
    
    const response = NextResponse.next();
    const authUrl = ['/authentication/login']
    if(authUrl.includes(request.nextUrl.pathname)){
           const user = await gettingUser();
        
    if(user){
        return NextResponse.redirect(new URL('/', request.url))
    }
    }
    
    return response
}
