import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
  '/github/start': true,
  '/github/complete': true,
};

// middleware will execute by every single request
export async function middleware(request: NextRequest) {
  //   console.log('hello');
  //   console.log(request.url);
  //   console.log(request.nextUrl.pathname);
  //   console.log(request.cookies.getAll());
  //   const session = await getSession();
  //   console.log(session);
  //   if (request.nextUrl.pathname === '/profile') {
  //     return Response.redirect(new URL('/', request.url));
  //   }
  //   const pathname = request.nextUrl.pathname;
  //   if (pathname === '/') {
  // set cookies by getting response to give it to the user
  //     const response = NextResponse.next();
  //     response.cookies.set('middleware-cookie', 'hello!');
  //     return response;
  //   }
  //   if (pathname === '/profile') {
  //     return Response.redirect(new URL('/', request.url));
  //   }

  // to protect pages for allowed user
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }
}

export const config = {
  //   matcher: ['/', '/profile', '/create-account', '/user/:path*'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
