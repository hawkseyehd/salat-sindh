import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isAdminRoute = pathname.startsWith('/admin')
  const isPublicRoute = pathname === '/' || pathname.startsWith('/blogs') || pathname.startsWith('/articles')
  const isCreateRoute = pathname.includes('/create')
  const sessionCookie = request.cookies.get('session')?.value

  // Allow public routes (home, blogs, articles) for everyone
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check if user is logged in for protected routes
  if (!sessionCookie && !isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (sessionCookie && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Check admin access for admin routes
  if (isAdminRoute && sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie)
      if (session.role !== 'admin' && session.role !== 'team') {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      }
    } catch {
      // Invalid session, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Check if user can create content (must be verified)
  if (isCreateRoute && sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie)
      if (!session.verified || session.status !== 'active') {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      }
    } catch {
      // Invalid session, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}


