/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MotorcycleCard } from '@/components/MotorcycleCard'

export default function AdminPage() {
  const [motorcycles, setMotorcycles] = useState([])
  const [loading, setLoading] = useState(true)
  
  const fetchMotorcycles = async () => {
    try {
      const response = await fetch('/api/motorcycles')
      const data = await response.json()
      setMotorcycles(data)
    } catch (error) {
      console.error('Error fetching motorcycles:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMotorcycles()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Motorcycles</h1>
        <Link
          href="/admin/add"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Motorcycle
        </Link>
      </div>

      {motorcycles.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No motorcycles added yet</p>
          <Link
            href="/admin/add"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Your First Motorcycle
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motorcycles.map((motorcycle: any) => (
            <MotorcycleCard
              key={motorcycle.id}
              motorcycle={motorcycle}
              showQR={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}