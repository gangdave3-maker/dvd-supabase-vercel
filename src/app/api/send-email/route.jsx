import { NextResponse } from 'next/server'
import crypto from 'crypto'
const nodeMailer = require("nodemailer");
import prisma from '@/lib/prisma'

export async function POST(request) {
  // 1. Extract the data from the request body
  const theCustomer = await request.json();
  const customerID=theCustomer.customer_id
  const theEmail=theCustomer.email

  const token = await crypto.randomBytes(32).toString('hex')
  
  const currentDateTime = new Date()
  const expiresAt = new Date(currentDateTime.getTime() + (60 * 60 * 1000))

  const updateToken = await prisma.customer.update({
        where: { customer_id: parseInt(customerID) },
        data: {
          token:token,
        },
      })

  // const createPasswordResetRow = await prisma.password_reset.create({
  //       data: {
  //         customer_id:customerID,
  //         token:token,
  //         expires_at:expiresAt,
  //         used:false
  //       },
  //     })

  try {
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "gangdave3@gmail.com",
        pass: "hocw azrd xaxl kupm",
      },
    });

    let mailOption = {
      from: "gangdave3@gmail.com",
      to: theEmail,
      subject: "Reset Password",
      // text: `Please click the following link to reset your password -- http://localhost:3000/ResetPassword/${token}`,
      text: `Please click the following link to reset your password -- https://dave-dvd.vercel.app/ResetPassword/${token}`,
    };

    let info = await transporter.sendMail(mailOption);
    if (info) {
      return NextResponse.json(
      { 
        notification: "Mail Sent: ", 
        info 
      }, 
      { 
        status: 200 
      }
    );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        notification: "Warning: ", 
        error 
      }, 
      { 
        status: 500 
      }
    );
  }
}
