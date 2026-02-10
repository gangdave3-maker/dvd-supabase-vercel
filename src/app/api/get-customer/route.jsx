import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const user = await prisma.customer.findMany({
    select: {
      customer_id:true,
      full_name:true,
      address_full:true,
      postal_code:true,
      phone:true,
      email:true,
      movie_list:true,
    },
    where: {
        NOT: {
            movie_list: {equals: []}
             }
           },
    orderBy: {
    customer_id: 'asc',
    },
  })

  return NextResponse.json(user)
}
