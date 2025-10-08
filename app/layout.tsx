import type { Metadata } from 'next'
import './globals.css'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Salat Sindh',
  description: '',
  generator: 'Next JS',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()
  const isAuthPage = false // We'll handle open auth pages in route-level layouts if needed
  // Allow login/register routes without session
  // We can't inspect route here easily; instead we guard within pages/layouts. For global, leave as is.
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
