import { NextResponse } from 'next/server'
import { cardData } from '@/lib/mockData'

function getUniqueRandomNumbers(min: number, max: number, count: number): number[] {
  const uniqueNumbers = new Set<number>()
  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    uniqueNumbers.add(randomNumber)
  }
  return Array.from(uniqueNumbers)
}

export async function GET() {
  const indexes = getUniqueRandomNumbers(0, cardData.length - 1, 5)
  const response = indexes.map((idx) => cardData[idx])
  return NextResponse.json(response)
}

