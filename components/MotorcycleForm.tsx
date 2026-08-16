/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface MotorcycleFormProps {
  initialData?: any
  isEditing?: boolean
}

export function MotorcycleForm({ initialData, isEditing = false }: MotorcycleFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    plateNumber: initialData?.plateNumber || '',
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    year: initialData?.year || '',
    color: initialData?.color || '',
    engineNumber: initialData?.engineNumber || '',
    chassisNumber: initialData?.chassisNumber || '',
    ownerName: initialData?.ownerName || '',
    ownerPhone: initialData?.ownerPhone || '',
    ownerEmail: initialData?.ownerEmail || '',
    type: initialData?.type || 'Private', // Add this
    lastService: initialData?.lastService?.split('T')[0] || '',
    notes: initialData?.notes || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEditing 
        ? `/api/motorcycles/${initialData.id}` 
        : '/api/motorcycles'
      
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save')
      
      router.push('/admin')
      router.refresh()
    } catch (error) {
      alert('Error saving motorcycle')
    } finally {
      setLoading(false)
    }
  }

  // ✅ UPDATED: Now handles input, textarea, AND select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white text-gray-700 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Motorcycle' : 'Add New Motorcycle'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Plate Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Plate Number *</label>
          <input
            type="text"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-1">Brand *</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium mb-1">Model </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium mb-1">Year </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium mb-1">Color *</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Engine Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Engine Number</label>
          <input
            type="text"
            name="engineNumber"
            value={formData.engineNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Chassis Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Chassis Number</label>
          <input
            type="text"
            name="chassisNumber"
            value={formData.chassisNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Owner Name *</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Owner Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Owner Phone *</label>
          <input
            type="tel"
            name="ownerPhone"
            value={formData.ownerPhone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Owner Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Owner Email</label>
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Vehicle Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange} // ✅ Now works with select
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Private">Private</option>
            <option value="PSV">PSV (Public Service Vehicle)</option>
          </select>
        </div>

        {/* Last Service */}
        <div>
          <label className="block text-sm font-medium mb-1">Last Service Date</label>
          <input
            type="date"
            name="lastService"
            value={formData.lastService}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}