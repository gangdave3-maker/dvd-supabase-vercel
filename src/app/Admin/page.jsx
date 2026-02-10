'use client'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { getCustomer } from '../Components/Functiondvd'
import { useEffect, useState } from 'react'

function Admin() {
    const staffID = Cookies.get('staffID')
    const [customer,setCustomer] = useState([])
    
    useEffect(()=>{
        const grabCustomer=async()=>{
            const allClient =await getCustomer()
            if(allClient){
                setCustomer(allClient)
            }
        }
        grabCustomer()
    },[])

  return (
    <div>
        <div className='flex justify-end p-5!'>
            <button className='btn btn-outline-warning'>
                <Link className='glow text-white font-bold! text-2xl!' href={'/'}>Home Page</Link>
            </button>
        </div>

        {
            staffID && customer && 
            <div className='px-4 min-h-screen'>
                <table className="table table-primary table-hover my-3">
                    <thead>
                        <tr className='align-middle'>
                            <th scope="col" className='bgcAdmin h-13! text-white text-lg text-center'>#</th>
                            <th scope="col" className='bgcAdmin h-13! text-white text-lg underline text-center'>Full Name</th>
                            <th scope="col" className='bgcAdmin h-13! text-white text-lg underline text-center'>Address</th>
                            <th scope="col" className='bgcAdmin h-13! text-white text-lg underline text-center'>Phone</th>
                            <th scope="col" className='bgcAdmin h-13! text-white text-lg underline text-center'>Email</th>
                            <th scope="col" className='bgcAdmin h-13! text-white text-lg underline text-center w-80'>DVD</th>
                            <th scope="col" className='bgcAdmin h-13! text-white text-lg underline text-center'></th>
                        </tr>
                    </thead>
                    {customer.map(item=>(
                    <tbody key={item.customer_id}>
                        <tr className='align-middle'>
                            <th scope="row" className='text-center items-center!'>{item.customer_id}</th>
                            <td>{item.full_name}</td>
                            <td>{item.address_full}, {item.postal_code}</td>
                            <td className='text-center'>{item.phone}</td>
                            <td className='text-center'>{item.email}</td>
                            <td className='text-wrap w-80'>
                                {Array.isArray(item.movie_list) 
                                            ? item.movie_list.map(m =>m.dvd).join(", ") 
                                            : (item.movie_list?.dvd || "No DVD")}
                            </td>
                            <td>
                                <button 
                                    className='btn btn-primary ml-6!'
                                >
                                    <Link href={`/Detail/${item.customer_id}`} className='text-white text-lg glow'>Detail</Link>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                </table>
            </div>
        }
    </div>
  )
}

export default Admin
