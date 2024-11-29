import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Get the current pathname
  const path = request.nextUrl.pathname
  
  // Set the title based on the current path
  let title = path.split('/').pop() || 'Dashboard'
  // Capitalize first letter and remove hyphens
  title = title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ')
  
  // Clone the URL and add the title as a search param
  const url = request.nextUrl.clone()
  url.searchParams.set('title', title)
  
  // Rewrite the request with the title
  return NextResponse.rewrite(url)
}
 
export const config = {
  matcher: [
    '/settings',
    '/dashboard',
    '/transactions',
    '/accounts',
    '/investments',
    '/credit-cards',
    '/loans',
    '/services',
    '/privileges'
  ],
}

