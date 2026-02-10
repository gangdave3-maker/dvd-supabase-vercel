import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  const customerID = await request.json()

  const customer = await prisma.customer.findUnique({
    select: {
      customer_id:true,
      full_name:true,
      address_full:true,
      postal_code:true,
      phone:true,
      email:true,
      movie_list:true,
    },
    where: {customer_id:parseInt(customerID)},
  })

  return NextResponse.json(customer)
}
