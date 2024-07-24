import { NextResponse } from 'next/server';
import getToken from './app/lib/getToken';

export function middleware( request) {
    const PATH = request.nextUrl.pathname;
    const privatePath = PATH === '/movies' || PATH === '/logout' || PATH === '/add-movie';
    const token  = request.cookies.get("AuthUser");
    if(privatePath && !token){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if(!privatePath && token){
        return NextResponse.redirect(new URL('/movies', request.url));
    }
    return NextResponse.next(request.url);

}


export const config = {
    matcher: [
        '/movies',
        '/logout',
        '/login',
        '/'
    ],
};