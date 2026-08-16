import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Motorcycle E-Logbook',
  description: 'Digital logbook for motorcycle management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              🏍️ E-Logbook
            </Link>
            <div className="space-x-4">
              <Link href="/admin" className="hover:text-blue-600">Admin</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}