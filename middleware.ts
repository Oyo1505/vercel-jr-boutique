import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import withSession from 'next-session';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*'
};

export default withSession({
  name: 'app-session',
  secret: process.env.SESSION_SECRET || 'default-session-secret',
  cookie: {
    secure: true,
    maxAge: 86400, // Durée de validité du cookie en secondes (1 jour)
    sameSite: 'none',
    path: '/'
  }
});
