import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    // 1. Extract the data from the request body
    const customerID = await request.json();
   
  const theList = await prisma.customer.findUnique({
    select:{
        movie_list:true,
    },
    where: { customer_id: parseInt(customerID) },
  })
  return NextResponse.json(theList)
}
