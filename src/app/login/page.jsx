'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCred } from '../Components/Functiondvd'
import Cookies from 'js-cookie'
import { Eye,EyeClosed } from 'lucide-react'
import Swal from 'sweetalert2'

export default function Page() {
  const [allCred,setAllCred] = useState([])
  const [cred,setCred] = useState({
    email:'',
    password:'',
  })
  
  const [togglePassword,setTogglePassword] = useState(false)
  const swapPassword=()=>{
    setTogglePassword(!togglePassword)
  }

  
    const fetchUser = async () => {
      try{
        const user = await getCred(cred.email,cred.password)

        if(user){
          //เราสร้างแบบ Session Cookies ดีที่สุด ไม่ต้องระบุ expire ทั้งสิ้น จะทำให้เวลาปิดทุกแท็บใน browser จะส่งผลให้ Cookies ถูกลบทิ้งอัตโนมัติ
          Cookies.set("customerID",user[0]?.customer_id.toString())
          setAllCred(user)
          return(true)
        }
      }catch(error){
        Swal.fire({
          title: "Login Failed",
          text: "Incorrect email or password. error: "+error.message,
          icon: "error",
        }).then(() => {return(false)});
      }
    }
  
  useEffect(()=>{
      Swal.fire({
          title: "Credentials",
          text: `Demo emails are jessica.hall@sakilacustomer.org or anna.hill@sakilacustomer.org or jean.bell@sakilacustomer.org. \n \n All user passwords are Ken@1234`,
          icon: "success",
          customClass: {
                        htmlContainer: 'left-align-swal'
                       },
        })
  },[])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className="card bg-transparent">
            <div className="card-body text-white">
              <table>
                <tbody>
                  <tr>
                    <th className="mt-1 mb-1">
                      <div className="mt-3">Email:&nbsp;&nbsp;</div>
                    </th>
                    <td>
                      <div className="mt-3">
                        <input 
                        className="form-control mt-1 mb-1" 
                        type="text"
                        value={cred.email}
                        onChange={(e)=>{
                          setCred(prev=>({...prev,email:e.target.value}))
                        }}
                        />
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <th className="mt-1 mb-1">
                      Password:&nbsp;&nbsp;
                    </th>
                    <td className='flex items-center'>
                      <input 
                      className="form-control mt-1 mb-1" 
                      type={togglePassword?"text":"password"}
                      value={cred.password}
                      onChange={(e)=>{
                        setCred(prev=>({
                          ...prev,password:e.target.value
                        }))
                      }}
                      />
                    </td>
                    <td className='pl-5!'>
                      <span onClick={()=>swapPassword()}>{togglePassword?<EyeClosed/>:<Eye/>}</span>
                    </td>
                  </tr>
                  <tr>
                    <th className="mt-2 mb-2"></th>
                    <td className="mt-2 mb-2 ">
                      
                    </td>
                  </tr>
                  <tr className="align-items-center">
                    <th className="mt-1 mb-1">
                      <div className="mt-3 mb-3 text-start">
                        <Link className="text-nowrap" href={`/ForgetPassword`}>Forget Password</Link>
                      </div>
                      
                    </th>
                    <td className="mt-1 mb-1">
                      <div className="mt-3 mb-3 text-end">
                        <button 
                        className="btn btn-primary text-white"
                        onClick={async()=>{
                          const result = await fetchUser();
                          
                          if (result) {
                            Swal.fire({
                              title: "Login Successful",
                              text: `Welcome, ${cred.email}!`,
                              icon: "success",
                            }).then(() => {
                              window.location.href = '/Hall';
                            }) 
                          }
                        }}
                        >
                          Log In
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      
    </div>
  )
}
