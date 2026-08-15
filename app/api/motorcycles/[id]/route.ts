import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single motorcycle - FIXED with await params
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Note: params is now a Promise
) {
  try {
    // Unwrap the params Promise with await
    const { id } = await params
    
    const motorcycle = await prisma.motorcycle.findUnique({
      where: { id: id }
    })
    
    if (!motorcycle) {
      return NextResponse.json(
        { error: 'Motorcycle not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(motorcycle)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch motorcycle' },
      { status: 500 }
    )
  }
}

// PUT - Update motorcycle - FIXED
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const motorcycle = await prisma.motorcycle.update({
      where: { id: id },
      data: {
        plateNumber: body.plateNumber,
        brand: body.brand,
        model: body.model,
        year: parseInt(body.year),
        color: body.color,
        engineNumber: body.engineNumber,
        chassisNumber: body.chassisNumber,
        ownerName: body.ownerName,
        ownerPhone: body.ownerPhone,
        ownerEmail: body.ownerEmail,
        lastService: body.lastService ? new Date(body.lastService) : undefined,
        notes: body.notes,
        type: body.type || 'Private',
      }
    })

    return NextResponse.json(motorcycle)
  } catch (error: any) {
    console.error('Error updating motorcycle:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Duplicate plate number or engine/chassis number' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update motorcycle' },
      { status: 500 }
    )
  }
}

// DELETE motorcycle - FIXED
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.motorcycle.delete({
      where: { id: id }
    })
    
    return NextResponse.json(
      { message: 'Motorcycle deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete motorcycle' },
      { status: 500 }
    )
  }
}