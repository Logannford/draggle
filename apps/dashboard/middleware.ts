import { type NextRequest, NextResponse } from 'next/server';
import AuthMiddleware from '@/lib/middleware/auth';
import AdminMiddleware from './lib/middleware/admin';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

// runs on every request
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  let publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if(!publicRootDomain) {
    publicRootDomain = 'app.layowt.com'
  }

  let hostname = req.headers.get('host')
   
  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''
  }`

  // separate the path and query string
  const rootPath = path.split('?')[0]
  const queryString = path.split('?')[1]

  // get the first part of the hostname
  const existingSubDomain = hostname.split('.')[0]
  // if we are developing locally or on the root domain, do not redirect
  if(
    hostname === 'localhost:4343' || 
    hostname === publicRootDomain || 
    hostname === 'app.layowt.com' || 
    existingSubDomain === 'app'
  ) {
    console.log('redirect')
    // if we are on the root domain, we need to do user auth checks
    return await AuthMiddleware(req, rootPath)
  }
  
  // at this point, we are on a subdomain - so if the user tries to access
  // '/admin', we need to redirect them to to login screen with an identifable
  // query parameter so after login, we can redirect them back to the admin page
  // for that site
  if(path === '/admin'){
    return AdminMiddleware(hostname);
  }
  
  // rewrite everything else to 'subdomain.app.layout.com'
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
