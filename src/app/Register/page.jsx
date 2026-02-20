'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient, isEmailValid, isPasswordValid } from '../Components/Functiondvd'
import Swal from 'sweetalert2'
import { Eye,EyeClosed } from 'lucide-react'

function Register() {
  const client = {
    FullName:"",
    Phone:"",
    Email:"",
    Address:"",
    PostalCode:"",
    UserName:"",
    Password:"",
  }

  const [customer,setCustomer] = useState(client)
  const [validateEmailMessage,setValidateEmailMessage] = useState("")
  const [BeEmailValid,setBeEmailValid] = useState(null)
  const [BePasswordValid,setBePasswordValid] = useState(null)
  const [allValidateMessage,setAllValidateMessage]=useState("")

  const [togglePassword,setTogglePassword] = useState(false)
  const swapPassword=()=>{
    setTogglePassword(!togglePassword)
  }

  const createCustomer=async()=>{
    const emailStatus = isEmailValid(customer.Email)
    const passwordStatus = isPasswordValid(customer.Password)

    let errMessage =[]

    if(customer.FullName&&customer.Phone&&customer.Email&&customer.Address&&customer.UserName&&customer.Password){ 
      if(!emailStatus){
        errMessage.push(validateEmailMessage?validateEmailMessage:"Please re-check the email field.")
      }

      if(!passwordStatus){
        errMessage.push('Password must contain with uppercase, lowercase, special character and numbers and at least 8  characters.')
      }

      if(errMessage.length>0){
        Swal.fire({
          title:"Error",
          html:errMessage.join('<br/><br/>'),
          icon:"error",
          customClass: {
                         htmlContainer: 'left-align-swal'
                       },
        })
      }else{
        try{
          await createClient(customer)
          Swal.fire({
          title:"Congratulations",
          text:"Successful Registration",
          icon:"success"
        })
        }catch(err){
          Swal.fire({
            title:"Error",
            text:err.message,
            icon:"error",
            customClass: {
                         htmlContainer: 'left-align-swal'
                       },
          })
        }
      }
    }else{
      Swal.fire({
        title:"Requirement",
        text:`Please fill in all neccessary fields.`,
        icon:"error"
      })
    }
    
  }

  return (
    <div className='container bg-white/85 min-h-screen'>
      <h1 className='underline text-center py-4!'>Register</h1>
      
        <div className="card bg-transparent border-white">
          <div className="card-body">
            <div className='FormTable mt-2'>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label htmlFor="FullName" className="md:w-40">Full Name: </label>
                <input 
                  id='FullName' type="text" className='form-control w-full' value={customer.FullName}
                  onChange={(e)=>{
                    setCustomer(prev=>({
                      ...prev,FullName:e.target.value
                    }))
                  }}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label htmlFor="Phone" className="md:w-40">Phone: </label>
                <input 
                  id='Phone' type="text" className='form-control w-full' value={customer.Phone}
                  onChange={(e)=>{
                    setCustomer(prev=>({
                      ...prev,Phone:e.target.value
                    }))
                  }}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label htmlFor="Email" className="md:w-40">Email: </label>
                <input 
                  id='Email' type="email" className='form-control w-full' value={customer.Email}
                  onChange={(e)=>{
                    setCustomer(prev=>({
                      ...prev,Email:e.target.value
                    }))
                    setValidateEmailMessage(e.target.validationMessage)
                  }}
                />
              </div>
            </div>

            <div className='my-3'>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label htmlFor="Address" className="md:w-40">Address: </label>
                <input 
                  id='Address' type="text" className='form-control w-full' value={customer.Address}
                  onChange={(e)=>{
                    setCustomer(prev=>({
                      ...prev,Address:e.target.value
                    }))
                  }}
                />
              </div>
            </div>

            <div className='FormTable mb-2'>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label htmlFor="PostalCode" className="md:w-40">Postal Code: </label>
                <input 
                  id='PostalCode' type="text" className='form-control w-full' value={customer.PostalCode}
                  onChange={(e)=>{
                    setCustomer(prev=>({
                      ...prev,PostalCode:e.target.value
                    }))
                  }}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label htmlFor="UserName" className="md:w-40">User Name: </label>
                <input 
                  id='UserName' type="text" className='form-control w-full' value={customer.UserName}
                  onChange={(e)=>{
                    setCustomer(prev=>({
                      ...prev,UserName:e.target.value
                    }))
                  }}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <label htmlFor="Password" className="md:w-40">Password: </label>
                <div className="relative w-full">
                  <input 
                    id='Password' 
                    type={togglePassword?"text":"password"} 
                    className='form-control w-full pr-10' 
                    value={customer.Password}
                    onChange={(e)=>{
                      setCustomer(prev=>({
                        ...prev,Password:e.target.value
                      }))
                    }}
                  />
                  <span onClick={()=>swapPassword()} className="absolute right-3 top-1/2 -translate-y-1/2">{togglePassword?<EyeClosed/>:<Eye/>}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className='flex justify-center mt-10!'>
          <button className='glow btn btn-outline-warning text-2xl! font-bold! mr-4!'>
            <Link href={'/'} className='text-red-500!'>Back</Link>
          </button>
          <button className='btn btn-outline-primary text-2xl! font-bold! glow ml-4!' 
                  onClick={()=>{
                    
                      createCustomer()
                    
                  }}>
            Register
          </button>
        </div>

      
      <div className='h-10'></div>
    </div>
  )
}

export default Register
