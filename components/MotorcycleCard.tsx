'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

interface MotorcycleCardProps {
  motorcycle: {
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
    ownerEmail?: string
    type?: string
    registrationDate: string
    lastService?: string
    notes?: string
    qrCode?: string
    createdAt: string
    updatedAt: string
  }
  showQR?: boolean
}

export function MotorcycleCard({ motorcycle, showQR = false }: MotorcycleCardProps) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this motorcycle?')) return
    
    try {
      const response = await fetch(`/api/motorcycles/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Delete failed')
      router.refresh()
    } catch (error) {
      alert('Error deleting motorcycle')
    }
  }

  // ✅ Generate PDF and return as Blob
  const generatePDFBlob = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        const pageWidth = 283.5 // 10cm
        const pageHeight = 283.5 // 10cm
        const margin = 56.7 // 2cm
        const usableWidth = pageWidth - (margin * 2)
        
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [pageWidth, pageHeight]
        })
        
        let yPos = margin + 10
        
        if (motorcycle.qrCode) {
          try {
            const qrData = motorcycle.qrCode
            if (qrData && qrData.startsWith('data:image')) {
              const qrSize = usableWidth * 0.85
              const qrX = (pageWidth - qrSize) / 2
              
              doc.addImage(qrData, 'PNG', qrX, yPos, qrSize, qrSize)
              yPos += qrSize + 15
            }
          } catch (error) {
            console.error('Error adding QR code:', error)
          }
        }
        
        const vehicleType = motorcycle.type || 'Private'
        const isPSV = vehicleType === 'PSV'
        
        const typeSize = 32
        doc.setFontSize(typeSize)
        doc.setFont('helvetica', 'bold')
        
        const textWidth = doc.getTextWidth(vehicleType)
        const paddingX = 25
        const paddingY = 15
        const boxWidth = textWidth + (paddingX * 2)
        const boxHeight = typeSize + (paddingY * 2)
        const boxX = (pageWidth - boxWidth) / 2
        const boxY = yPos - paddingY
        
        doc.setFillColor(isPSV ? 220 : 34, isPSV ? 38 : 197, isPSV ? 38 : 94)
        doc.roundedRect(boxX, boxY, boxWidth, boxHeight, 8, 8, 'F')
        
        doc.setTextColor(255, 255, 255)
        const textX = pageWidth / 2
        const textY = boxY + (boxHeight / 2) + (typeSize * 0.35)
        
        doc.text(vehicleType, textX, textY, { align: 'center' })
        
        // Get PDF as blob
        const pdfBlob = doc.output('blob')
        resolve(pdfBlob)
        
      } catch (error) {
        reject(error)
      }
    })
  }

  // ✅ Download PDF
  const downloadPDF = async () => {
    try {
      const pdfBlob = await generatePDFBlob()
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `motorcycle-${motorcycle.plateNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  // ✅ Share PDF via WhatsApp
  const shareToWhatsApp = async () => {
    try {
      // Generate PDF blob
      const pdfBlob = await generatePDFBlob()
      
      // Create a file from the blob
      const file = new File([pdfBlob], `motorcycle-${motorcycle.plateNumber}.pdf`, { type: 'application/pdf' })
      
      // Check if Web Share API is available (mobile)
      if (navigator.share && navigator.canShare()) {
        // For mobile devices with Web Share API
        try {
          await navigator.share({
            title: `Motorcycle ${motorcycle.plateNumber}`,
            files: [file],
          })
          return
        } catch (shareError) {
          // User cancelled or share failed
          if ((shareError as Error).name !== 'AbortError') {
            console.error('Share error:', shareError)
          }
          return
        }
      }
      
      // Fallback: Create a temporary URL and open WhatsApp
      const url = URL.createObjectURL(pdfBlob)
      
      // Create a message with vehicle info
      const message = `🏍️ *Motorcycle Details*\n` +
                     `Plate: ${motorcycle.plateNumber}\n` +
                     `Type: ${motorcycle.type || 'Private'}\n` +
                     `Brand: ${motorcycle.brand} ${motorcycle.model}\n` +
                     `Year: ${motorcycle.year}\n` +
                     `Owner: ${motorcycle.ownerName}\n` +
                     `Phone: ${motorcycle.ownerPhone}`
      
      // WhatsApp URL with message
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank')
      
      // Also download the PDF so user can attach it
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = url
        link.download = `motorcycle-${motorcycle.plateNumber}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setTimeout(() => URL.revokeObjectURL(url), 5000)
      }, 1000)
      
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error)
      alert('Failed to share. Please try downloading and sharing manually.')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-gray-900">
                {motorcycle.brand} {motorcycle.model}
              </h3>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                motorcycle.type === 'PSV' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {motorcycle.type || 'Private'}
              </span>
            </div>
            <p className="text-sm text-gray-600">{motorcycle.plateNumber}</p>
          </div>
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            {motorcycle.year}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Color:</span>
            <span className="ml-2 font-medium">{motorcycle.color}</span>
          </div>
          <div>
            <span className="text-gray-500">Owner:</span>
            <span className="ml-2 font-medium">{motorcycle.ownerName}</span>
          </div>
          <div>
            <span className="text-gray-500">Engine:</span>
            <span className="ml-2 font-medium">{motorcycle.engineNumber}</span>
          </div>
          <div>
            <span className="text-gray-500">Chassis:</span>
            <span className="ml-2 font-medium">{motorcycle.chassisNumber}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Phone:</span>
            <span className="ml-2 font-medium">{motorcycle.ownerPhone}</span>
          </div>
        </div>

        {showQR && motorcycle.qrCode && (
          <div className="mt-4 flex justify-center">
            <Image
              src={motorcycle.qrCode}
              alt="QR Code"
              width={150}
              height={150}
              className="border rounded"
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => router.push(`/admin/edit/${motorcycle.id}`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => handleDelete(motorcycle.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            🗑️ Delete
          </button>
          <button
            onClick={() => router.push(`/motorcycle/${motorcycle.id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            👁️ View
          </button>
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            📄 PDF
          </button>
          {/* ✅ WhatsApp Share Button */}
          <button
            onClick={shareToWhatsApp}
            className="px-4 py-2 bg-[#25D366] text-white rounded hover:bg-[#1da851] transition flex items-center gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  )
}