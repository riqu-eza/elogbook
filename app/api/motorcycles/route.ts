import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import QRCode from 'qrcode'

// GET all motorcycles
export async function GET() {
  try {
    const motorcycles = await prisma.motorcycle.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(motorcycles)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch motorcycles' },
      { status: 500 }
    )
  }
}

// POST - Create new motorcycle (all fields optional)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received data:', body)

    // Build data object with defaults for all fields
    const data = {
      plateNumber: body.plateNumber || `TEMP-${Date.now()}`,
      brand: body.brand || 'Unknown',
      model: body.model || 'Unknown',
      year: body.year ? parseInt(body.year) : new Date().getFullYear(),
      color: body.color || 'Not specified',
      engineNumber: body.engineNumber || `ENG-${Date.now()}`,
      chassisNumber: body.chassisNumber || `CHS-${Date.now()}`,
      ownerName: body.ownerName || 'Unknown Owner',
      ownerPhone: body.ownerPhone || 'Not provided',
      type: body.type || 'Private',
      ...(body.ownerEmail && { ownerEmail: body.ownerEmail }),
      ...(body.lastService && { lastService: new Date(body.lastService) }),
      ...(body.notes && { notes: body.notes }),
    }

    console.log('Saving data:', data)

    // Create motorcycle
    const motorcycle = await prisma.motorcycle.create({
      data,
    })

    // Generate QR Code
    const baseUrl = process.env.NEXTAUTH_URL || 'https://elogbook-m.vercel.app'
    const qrData = `${baseUrl}/motorcycle/${motorcycle.id}`
    const qrCode = await QRCode.toDataURL(qrData)
    
    // Update motorcycle with QR code
    const updatedMotorcycle = await prisma.motorcycle.update({
      where: { id: motorcycle.id },
      data: { qrCode }
    })

    return NextResponse.json(updatedMotorcycle, { status: 201 })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating motorcycle:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A motorcycle with this plate number or engine/chassis number already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create motorcycle', details: error.message },
      { status: 500 }
    )
  }
}