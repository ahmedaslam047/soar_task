import { NextResponse } from 'next/server'

function getUniqueRandomNumbers(min: number, max: number): number[] {
  const uniqueNumbers = new Set<number>()
  while (uniqueNumbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    uniqueNumbers.add(randomNumber)
  }
  return Array.from(uniqueNumbers)
}

export async function GET() {
  const users = [
    { name: 'Livia Bator', role: 'CEO', image: '/images/profile-4.jpg' },
    { name: 'Randy Press', role: 'Director', image: '/images/profile-2.jpg' },
    { name: 'Emily Stone', role: 'Designer', image: '/images/profile-3.jpg' },
    { name: 'James Bond', role: 'Developer', image: '/images/profile-2.jpg' },
    { name: 'Oliver Quick', role: 'Manager', image: '/images/profile-4.jpg' },
    { name: 'Sophia Turner', role: 'HR', image: '/images/profile-3.jpg' },
    { name: 'Ethan Hunt', role: 'Accountant', image: '/images/profile-4.jpg' },
    { name: 'Amelia Rose', role: 'Marketing Lead', image: '/images/profile-2.jpg' },
    { name: 'Noah Finch', role: 'Product Manager', image: '/images/profile-3.jpg' },
    { name: 'Ella Parker', role: 'Sales Lead', image: '/images/profile-4.jpg' },
    { name: 'Aiden Wolf', role: 'Designer', image: '/images/profile-2.jpg' },
    { name: 'Grace Lee', role: 'Engineer', image: '/images/profile-3.jpg' },
    { name: 'Lucas King', role: 'CEO', image: '/images/profile-2.jpg' },
    { name: 'Mia Bell', role: 'CTO', image: '/images/profile-4.jpg' },
    { name: 'Jack Miller', role: 'Director', image: '/images/profile-3.jpg' },
    { name: 'Olivia Scott', role: 'Designer', image: '/images/profile-4.jpg' },
    { name: 'Samuel Davis', role: 'Support Lead', image: '/images/profile-3.jpg' },
    { name: 'Zoe Adams', role: 'Marketing', image: '/images/profile-2.jpg' },
    { name: 'Benjamin Clark', role: 'Developer', image: '/images/profile-4.jpg' },
    { name: 'Chloe Walker', role: 'HR', image: '/images/profile-3.jpg' },
    { name: 'Daniel Johnson', role: 'Sales', image: '/images/profile-2.jpg' },
    { name: 'Isabella Wright', role: 'Designer', image: '/images/profile-4.jpg' },
    { name: 'Michael Carter', role: 'Manager', image: '/images/profile-3.jpg' },
    { name: 'Samuel Evans', role: 'Product Lead', image: '/images/profile-2.jpg' },
    { name: 'Harper Green', role: 'Project Manager', image: '/images/profile-3.jpg' },
    { name: 'Liam Harris', role: 'Software Engineer', image: '/images/profile-4.jpg' },
    { name: 'Charlotte Lewis', role: 'Designer', image: '/images/profile-2.jpg' },
    { name: 'Evan White', role: 'Marketing', image: '/images/profile-4.jpg' },
    { name: 'Ella Brown', role: 'Developer', image: '/images/profile-3.jpg' },
  ]

  const indexes = getUniqueRandomNumbers(1, users.length - 1)

  const response = indexes.map((idx) => users[idx])

  return NextResponse.json(response)
}
