import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Salat Sindh',
  description: '',
  generator: 'Next JS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
