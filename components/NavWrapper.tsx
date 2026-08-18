// app/components/NavWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavWrapper() {
  const pathname = usePathname()
  
  // Hide nav on motorcycle details pages
  if (pathname?.startsWith('/motorcycles/')) {
    return null
  }
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🏍️ E-Logbook
        </Link>
        <div className="space-x-4">
          <Link href="/admin" className="hover:text-gray-800">Admin</Link>
        </div>
      </div>
    </nav>
  )
}