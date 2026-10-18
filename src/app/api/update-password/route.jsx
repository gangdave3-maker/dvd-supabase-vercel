import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request) {
    const data = await request.json()
    const hashedPassword = await bcrypt.hash(data.password,10)

    try{
      const currentDateTime = new Date()

      const updatePassword = await prisma.customer.update({
        where: { token: data.token },
        data: {
          last_update:currentDateTime,
          password:hashedPassword,
        },
      })
      
      if(updatePassword){
        return NextResponse.json(
            { 
                notification: "Password Reset: ", 
                updatePassword 
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
