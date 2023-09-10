import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Exchange',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
