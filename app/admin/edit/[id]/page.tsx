'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MotorcycleForm } from '@/components/MotorcycleForm'

export default function EditMotorcyclePage() {
  const params = useParams()
  const [motorcycle, setMotorcycle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        // ✅ Use params.id correctly
        const id = params.id
        if (!id) return
        
        const response = await fetch(`/api/motorcycles/${id}`)
        if (!response.ok) {
          throw new Error('Motorcycle not found')
        }
        const data = await response.json()
        setMotorcycle(data)
      } catch (error) {
        console.error('Error fetching motorcycle:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchMotorcycle()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center py-12">Loading...</div>
      </div>
    )
  }

  if (!motorcycle) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center py-12 text-red-500">
          Motorcycle not found
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <MotorcycleForm initialData={motorcycle} isEditing={true} />
    </div>
  )
}