import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    const data = await request.json()

    try{
      const currentDateTime = new Date()

      const updateStock = await prisma.film.update({
        where: { film_id: parseInt(data.filmID) },
        data: {
          stock: data.stock,
          last_update:currentDateTime,
        },
      })
      
      if(updateStock){
        return NextResponse.json(
            { 
                notification: "Your rented DVD list is updated.", 
                updateStock 
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
