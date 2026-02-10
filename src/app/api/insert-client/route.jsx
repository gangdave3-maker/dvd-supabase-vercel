import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    const customer = await request.json()
    
    try{
      const currentDateTime = new Date()
      const createCustomer = await prisma.customer.create({
        data: {
          email:customer.Email,
          create_date:currentDateTime,
          last_update:currentDateTime,
          full_name:customer.FullName,
          username:customer.UserName,
          password:customer.Password,
          address_full:customer.Address,
          phone:customer.Phone,
          postal_code:customer.PostalCode,
          movie_list:[],
        },
      })
      return NextResponse.json(createCustomer)
    }catch(err){
      return NextResponse.json(
        { message: `Internal Server Error: \n` + err.message },
        { status: 500 }
      )
    }
}
