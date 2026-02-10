'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { staffCred } from '../Components/Functiondvd'
import Cookies from 'js-cookie'
import { Eye,EyeClosed } from 'lucide-react'
import Swal from 'sweetalert2'

export default function AdminLogin() {
  const [allCred,setAllCred] = useState([])
  const [cred,setCred] = useState({
    username:'',
    password:'',
  })
  const [togglePassword,setTogglePassword] = useState(false)

  const swapPassword=()=>{
    setTogglePassword(!togglePassword)
  }

  useEffect(() => {
    const fetchStaff = async () => {
      const staff = await staffCred()
      if (Array.isArray(staff)){
        setAllCred(staff)
      }
    }
    fetchStaff()
  }, [])

  const theStaff = allCred.find(item=>
    item.username === cred.username && item.password === cred.password
  )
  const isValid = allCred.some(item=>
    item.username === cred.username && item.password === cred.password
  )

  useEffect(()=>{
    if(theStaff){
      //เราสร้างแบบ Session Cookies ดีที่สุด ไม่ต้องระบุ expire ทั้งสิ้น จะทำให้เวลาปิดทุกแท็บใน browser จะส่งผลให้ Cookies ถูกลบทิ้งอัตโนมัติ
      Cookies.set("staffID",theStaff.staff_id.toString())
    }
  },[theStaff])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='underline text-white mb-7!'>Admin Login</h1>
      <div className="card bg-transparent">
            <div className="card-body text-white">
              <table>
                <tbody>
                  <tr>
                    <th className="mt-1 mb-1">
                      <div className="mt-3">Username:&nbsp;&nbsp;</div>
                    </th>
                    <td>
                      <div className="mt-3">
                        <input 
                        className="form-control mt-1 mb-1" 
                        type="text"
                        value={cred.username}
                        onChange={(e)=>{
                          setCred(prev=>({...prev,username:e.target.value}))
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
                        <Link className="text-nowrap" href={'#'}
                            onClick={()=>{
                                Swal.fire({
                                    title:"Info",
                                    text:"Please contact system administrator.",
                                    icon:"info"
                                })
                            }}
                        >
                            Forget Password
                        </Link>
                      </div>
                      
                    </th>
                    <td className="mt-1 mb-1">
                      <div className="mt-3 mb-3 text-end">
                        <button 
                        className="btn btn-primary"
                        disabled={!isValid}
                        ><Link href={'/Admin'} className="text-white">Log In</Link></button>
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
