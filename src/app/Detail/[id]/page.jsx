'use client'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useEffect, useState,use } from 'react'
import { eachCustomer, updateList, getFilm, calculateStock, clientRefresh } from '@/app/Components/Functiondvd'
import Swal from 'sweetalert2'

function Detail({params}) {
    const staffID = Cookies.get('staffID')
    const [client,setClient] = useState()
    const [movieList,setMovieList] = useState([])
    const [allFilms,setAllFilms] = useState([])

    const customerID = use(params).id
    
    useEffect(()=>{
        const grabCustomer=async()=>{
            const theCustomer = await eachCustomer(customerID)
            if(theCustomer){
                setClient(theCustomer)
            }
        }
        grabCustomer()
    },[customerID])

    useEffect(()=>{
        const grabMovieList=()=>{
            if(client){
                setMovieList(client.movie_list)
            }
        }
        grabMovieList()
    },[client,movieList])

    useEffect(() => {
            const fetchFilms = async () => {
              const films = await getFilm()
              if (Array.isArray(films)){
                setAllFilms(films)
              }
            }
            fetchFilms()
          }, [])

    const filterMovie=async(title)=>{
        if(movieList){
            const newMovieList = movieList.filter(item=>item.dvd !== title)
            if(newMovieList){
                await updateList({customerID:customerID, movieList:newMovieList})
            }else{
                Swal.fire({
                    title:"Error",
                    text:"Cannot find your DVD title.",
                    icon:"error"
                })
            }
        }
    }
//กำลังแก้ไขฟังก์ชั่น
    const updatingStock=async(dvdTitle)=>{
        const result = await filterMovie(dvdTitle)

        const theDVD =await allFilms.find(item=>item.title===dvdTitle)
        const theStock = theDVD.stock

        const updatedStock = theStock+1
        const filmID = theDVD.film_id

        const outcome = await calculateStock(updatedStock,filmID)

        Swal.fire({
            title:"Info",
            text:"Return the DVD successfully.",
            icon:"success"
        }).then(()=>clientRefresh())
        
    }

  return (
    <div>
        {
            staffID&&client&&(
                <div className='container bg-white/85 px-4 min-h-screen'>
                    <div className='py-4'>
                        <div className="card bg-transparent border-white">
                            <div className="card-body items-center">
                                <div className='flex flex-col md:flex-row'>
                                    <div className='flex mr-8!'>
                                        <label htmlFor="customerID" className='font-bold'>ID: </label>&nbsp;
                                        <div id='customerID'>{client.customer_id}</div>
                                    </div>

                                    <div className='flex mr-8!'>
                                        <label htmlFor="fullName" className='font-bold md:text-nowrap'>Full Name: </label>&nbsp;
                                        <div id='fullName' className='md:text-nowrap'>{client.full_name}</div>
                                    </div>

                                    <div className='flex mr-8!'>
                                        <label htmlFor="address" className='font-bold'>Address: </label>&nbsp;
                                        <div id='address' className='text-wrap'>{client.address_full}, {client.postal_code}</div>
                                    </div>

                                    <div className='flex mr-8!'>
                                        <label htmlFor="phone" className='font-bold'>Phone: </label>&nbsp;
                                        <div id='phone'>{client.phone}</div>
                                    </div>

                                    <div className='flex mr-8!'>
                                        <label htmlFor="phone" className='font-bold'>Email: </label>&nbsp;
                                        <div id='phone' className='min-w-0'>{client.email}</div>
                                    </div>
                                </div>
                                <div className='flex flex-row text-nowrap'>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table className="table table-primary table-hover mb-3">
                            <thead>
                                <tr className='align-middle'>
                                    <th scope="col" className='bgcAdmin h-13! text-white text-lg text-center'>#</th>
                                    <th scope="col" className='bgcAdmin h-13! text-white text-lg underline text-center'>DVD Title</th>
                                    <th scope="col" className='bgcAdmin h-13! text-white text-lg underline text-center'></th>                            
                                </tr>
                            </thead>
                            {movieList.map((item,index)=>(
                            <tbody key={index}>
                                <tr className='align-middle'>
                                    <th scope="row" className='text-center items-center!'>{index+1}</th>
                                    <td>{item.dvd}</td>
                                    <td className='w-30'>
                                        <button className='btn btn-primary ml-6!'
                                            onClick={()=>updatingStock(item.dvd)}
                                        >
                                            Return
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            ))}
                        </table>
                    </div>

                    <div className='flex justify-center my-10! items-center'>
                        <button className='btn btn-primary mr-10!'>
                            <Link className='text-white text-xl!' href={'/Admin'}>Back</Link>
                        </button>
                        <button className='btn btn-success'>
                            <Link className='text-white text-xl!' href={'/'}>Home</Link>
                        </button>
                    </div>
                </div>
                
            )
        }
    </div>
  )
}

export default Detail
