import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req){
  //password มีการ hash อยู่ ถ้าจะนำpassword ที่ user ใส่ตอน login แล้วเอามาตรวจกับ password ที่โดน hash ใน database ต้องใช้ crypt() function ของ postgresql ใช้ไหม หรือว่าต้องทำอย่างไร
  const body = await req.json();
//รอแก้โค้ด
  const customer = await prisma.customer.findUnique({
  where: { 
    email: body.email,
  }
})

// 2. ตรวจสอบว่าพบผู้ใช้หรือไม่
  if (!customer) {
    return NextResponse.json(
      { error: 'Invalid Email' },
      { status: 401 }
    )
  }

const isPasswordValid = await bcrypt.compare(
  body.password,
  customer.password
)

if (isPasswordValid) {
  return Response.json(customer, { status: 200 });
} else {
  return Response.json({ error: 'Invalid credentials' }, { status: 401 });
}

  // const user = await prisma.$queryRaw`
  //   SELECT customer_id, username, email
  //   FROM public.customer
  //   WHERE email = ${body.username}
  //   AND password = crypt(${body.password}, password)
  // `;
  
}