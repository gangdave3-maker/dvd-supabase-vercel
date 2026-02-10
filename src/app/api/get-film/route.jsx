import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const films = await prisma.film.findMany({
    take:100,
    orderBy: {
    film_id: 'asc',
    },
  })

  return NextResponse.json(films)
}
