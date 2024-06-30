import { NextRequest, NextResponse } from "next/server";
import { getBaseUrl } from '@/utils/index';
import { getRedirectUrl } from '@/lib/middleware/utils';

/**
 * Determines if the user is an admin
 * 
 * @param req The incoming request
 */
export default async function AdminMiddleware(
  hostname: string
){
  // try to get the siteId by using the subdomain
  const response = await fetch(`${getBaseUrl()}/api/website/${hostname}`, {
    method: 'GET'
  });
  const websiteId = await response.json();

  // if we cannot find the site id, redirect the user to the login page with a query parameter
  // so we can serve a message to the users
  if(!websiteId){
    return NextResponse.redirect(getRedirectUrl('r=site-not-found'));
  }

  // if we can find the site id, redirect the user to the login page with a query parameter
  // so we can redirect them back to the admin page after login
  return NextResponse.redirect(getRedirectUrl(`r=admin&siteId=${websiteId}`));
}