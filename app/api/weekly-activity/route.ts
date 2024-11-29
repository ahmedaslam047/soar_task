import { NextResponse } from 'next/server'

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function GET() {
  const minDeposit = 100
  const maxDeposit = 500
  const minWithdraw = 200
  const maxWithdraw = 600

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const weeklyActivity = weekDays.map(name => ({
    name,
    deposit: getRandomValue(minDeposit, maxDeposit),
    withdraw: getRandomValue(minWithdraw, maxWithdraw),
  }))

  const response = NextResponse.json(weeklyActivity)
  response.headers.set('Cache-Control', 'no-store')

  return response
}

