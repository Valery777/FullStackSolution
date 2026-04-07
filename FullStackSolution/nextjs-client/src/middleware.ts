import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    console.log('hey');

    if (!token && request.nextUrl.pathname.startsWith('profile-fake')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/profile-fake/:path*'],
};