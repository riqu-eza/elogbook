/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface MotorcycleDetails {
  id: string
  plateNumber: string
  brand: string
  model: string
  year: number
  color: string
  engineNumber: string
  chassisNumber: string
  ownerName: string
  ownerPhone: string
  ownerEmail: string | null
  type: string | null
  registrationDate: string
  lastService: string | null
  notes: string | null
}

export default function MotorcyclePublicView() {
  const params = useParams()
  const [motorcycle, setMotorcycle] = useState<MotorcycleDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        const response = await fetch(`/api/motorcycles/${params.id}`)
        if (!response.ok) {
          throw new Error('Motorcycle not found')
        }
        const data = await response.json()
        setMotorcycle(data)
      } catch (err: any) {
        setError(err.message)
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading motorcycle details...</div>
        </div>
      </div>
    )
  }

  if (error || !motorcycle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Motorcycle Not Found</h2>
          <p className="text-gray-500">The QR code may be invalid or the motorcycle has been removed.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const hasValue = (value: any): boolean => {
    return value !== null && value !== undefined && value !== ''
  }

  // ✅ Helper function to safely format dates
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-700 px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {motorcycle.brand} {motorcycle.model}
                </h1>
                <p className="text-blue-100 text-base sm:text-lg mt-1">
                  {motorcycle.year} • {motorcycle.color}
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2">
                <div className="bg-white/20 px-4 py-2 rounded-lg text-white font-semibold text-sm sm:text-base">
                  {motorcycle.plateNumber}
                </div>
                {hasValue(motorcycle.type) && (
                  <span className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wide ${
                    motorcycle.type === 'PSV' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {motorcycle.type}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-8 sm:px-8">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Owner Information */}
              {(hasValue(motorcycle.ownerName) || 
                hasValue(motorcycle.ownerPhone) || 
                hasValue(motorcycle.ownerEmail)) && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    👤 Owner Details
                  </h3>
                  <div className="space-y-3">
                    {hasValue(motorcycle.ownerName) && (
                      <div>
                        <p className="text-xs text-gray-400">Full Name</p>
                        <p className="text-gray-800 font-medium">{motorcycle.ownerName}</p>
                      </div>
                    )}
                    {hasValue(motorcycle.ownerPhone) && (
                      <div>
                        <p className="text-xs text-gray-400">Phone Number</p>
                        <p className="text-gray-800 font-medium">{motorcycle.ownerPhone}</p>
                      </div>
                    )}
                    {hasValue(motorcycle.ownerEmail) && (
                      <div>
                        <p className="text-xs text-gray-400">Email Address</p>
                        <p className="text-gray-800 font-medium break-all">{motorcycle.ownerEmail}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Vehicle Information */}
              {(hasValue(motorcycle.engineNumber) || 
                hasValue(motorcycle.chassisNumber) || 
                hasValue(motorcycle.registrationDate) ||
                hasValue(motorcycle.type)) && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    🏍️ Vehicle Details
                  </h3>
                  <div className="space-y-3">
                    {hasValue(motorcycle.type) && (
                      <div>
                        <p className="text-xs text-gray-400">Vehicle Type</p>
                        <p className={`font-semibold ${
                          motorcycle.type === 'PSV' 
                            ? 'text-red-600' 
                            : 'text-green-600'
                        }`}>
                          {motorcycle.type}
                        </p>
                      </div>
                    )}
                    {hasValue(motorcycle.engineNumber) && (
                      <div>
                        <p className="text-xs text-gray-400">Engine Number</p>
                        <p className="text-gray-800 font-mono text-sm break-all">{motorcycle.engineNumber}</p>
                      </div>
                    )}
                    {hasValue(motorcycle.chassisNumber) && (
                      <div>
                        <p className="text-xs text-gray-400">Chassis Number</p>
                        <p className="text-gray-800 font-mono text-sm break-all">{motorcycle.chassisNumber}</p>
                      </div>
                    )}
                    {hasValue(motorcycle.registrationDate) && (
                      <div>
                        <p className="text-xs text-gray-400">Registration Date</p>
                        <p className="text-gray-800 font-medium">
                          {formatDate(motorcycle.registrationDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Service Information - Full Width */}
            {(hasValue(motorcycle.lastService) || hasValue(motorcycle.notes)) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {hasValue(motorcycle.lastService) && (
                    <div>
                      <p className="text-xs text-gray-400">Last Service Date</p>
                      <p className="text-gray-800 font-medium">
                        {formatDate(motorcycle.lastService)}
                      </p>
                    </div>
                  )}
                  {hasValue(motorcycle.notes) && (
                    <div className={hasValue(motorcycle.lastService) ? '' : 'sm:col-span-2'}>
                      <p className="text-xs text-gray-400">Additional Notes</p>
                      <p className="text-gray-700 mt-1 leading-relaxed">{motorcycle.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!hasValue(motorcycle.ownerName) && 
             !hasValue(motorcycle.engineNumber) && 
             !hasValue(motorcycle.lastService) && 
             !hasValue(motorcycle.notes) && (
              <div className="text-center py-8 text-gray-400">
                <p>No additional details available for this motorcycle.</p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-gray-400">
                <span>✓ Verified Motorcycle E-Logbook</span>
                <span className="hidden sm:inline">•</span>
                <span>Document ID: {motorcycle.id.slice(0, 8).toUpperCase()}</span>
                <span className="hidden sm:inline">•</span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  )
}