import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    const data = await request.json()
    
    try{
      const currentDateTime = new Date()

      const updateRental = await prisma.customer.update({
        where: { customer_id: parseInt(data.customerID) },
        data: {
          movie_list:data.movieList,
          last_update:currentDateTime,
        },
      })
      
      if(updateRental){
        return NextResponse.json(
            { 
                notification: "Your rented DVD list is updated.", 
                updateRental 
            }, 
            { 
                status: 200 
            }
        )
      }
    }catch(err){
      return NextResponse.json(
        { message: `Internal Server Error: \n` + err.message },
        { status: 500 }
      )
    }
}
