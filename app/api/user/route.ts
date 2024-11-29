import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  const userData = {
    id: '1',
    name: 'Eddy Cusuma',
    email: 'eddy@example.com',
    cardNumber: '3778 **** **** 1234',
    validThru: '12/22',
    balance: 5756,
  }

  return NextResponse.json(userData)
}

export async function POST(request: NextRequest) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    await require('fs').promises.mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, 'profile.jpg')
    await writeFile(filePath, buffer)

    return NextResponse.json(
      { message: 'File uploaded successfully', filename: 'profile.jpg' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'

