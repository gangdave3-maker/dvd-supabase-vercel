'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Nav from '../Components/Nav'
import { getFilm, GetList, updateList, calculateStock } from '../Components/Functiondvd'
import Image from 'next/image'
import MySlick from '../Components/MySlick'
import { ArrowBigUp } from 'lucide-react'; // Or any icon library
import Swal from 'sweetalert2'

function Hall() {
  const [mounted, setMounted] = useState(false)
  const [customerID, setCustomerID] = useState(null)
  const [allFilms,setAllFilms] = useState([])
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const [isVisible, setIsVisible] = useState(false);
  // Track WHICH film is selected for the popup
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [selectedFilmId, setSelectedFilmId] = useState(null) // Track which film is open
  const BUCKET_URL = "https://jhcposnstqhynbmubhyn.supabase.co/storage/v1/object/public/images";

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 1200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

    useEffect(() => {
    const recheck=()=>{
      setMounted(true)
    setCustomerID(Cookies.get("customerID") || null)
    }
    recheck()
  }, [])

    useEffect(() => {
        const fetchFilms = async () => {
          const films = await getFilm()
          if (Array.isArray(films)){
            setAllFilms(films)
          }
        }
        fetchFilms()
      }, [])

// --- Pagination Calculations ---
  const indexOfLastFilm = currentPage * itemsPerPage
  const indexOfFirstFilm = indexOfLastFilm - itemsPerPage
  const currentFilms = allFilms.slice(indexOfFirstFilm, indexOfLastFilm)
  const totalPages = Math.ceil(allFilms.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goTop=()=>{
    if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    }
  }

  useEffect(()=>{goTop()},[currentPage])

    // Toggle Popup with specific ID
  const openPopup = (film_id) => setSelectedFilmId(film_id)
  const closePopup = () => setSelectedFilmId(null)

  const getPrevList=async()=>{
    const prevList = await GetList(customerID)
    return prevList
  }

  const Rented=async(dvdTitle,dvdID)=>{
    const theList = await getPrevList()
    const theDVD =await allFilms.find(item=>item.film_id===dvdID)
    const theStock = theDVD.stock

    if(theStock>0){
      const allList = theList.movie_list
      
      if(Array.isArray(allList)){
        if(allList.length<=4){
          const searched = allList.find(item=>item.dvd===dvdTitle)
          if(searched){
            Swal.fire({
              title:"Info",
              text:"You have rented this movie. Please leave the remainder for other people.",
              icon:"info",
            })
          }else{
            allList.push({"dvd":dvdTitle})
            const outcome = await updateList({customerID:customerID, movieList:allList})

            const updatedStock = theStock-1
            await calculateStock(updatedStock,theDVD.film_id)

            if(outcome){
              Swal.fire({
                title:"Congratulations",
                text:"Your rental list is updated.",
                icon:"success"
              })
            }
          }
        }else{
          Swal.fire({
            title:"Info",
            text:"You reach maximum DVD rent. Please return some of them before you rent the another DVD.",
            icon:'info',
            customClass: {htmlContainer: 'left-align-swal'},
          })
        }
      }
    }else{
      Swal.fire({
        title:"Info",
        text:"None of the DVD left in the shelf. Please wait until other people return them back.",
        icon:"info",
        customClass: {
                      htmlContainer: 'left-align-swal'
                     },
      })
    }
  }

  if (!mounted) return null // ⬅️ hydration-safe

  return (
    <div>
      <Nav/>
      <div className='h-13'></div>
      
      <div className='container bg-transparent min-h-screen'>

        {customerID&&<MySlick/>}
        
        {
          customerID && <><div className="product-con pt-18!">

            <div className="fixed bottom-6 right-6 z-50">
              {isVisible && (
                <button
                  onClick={goTop}
                  className="btn btn-outline-primary glow text-white font-bold"
                  aria-label="Scroll to top"
                >
                  <ArrowBigUp size={40} />
                </button>
              )}
            </div>

          {
            currentFilms.map(item=>(
              <div className="product-item bg-white flex flex-col h-full" 
                key={item.film_id}
                onClick={() => {
                  openPopup(item.film_id)
                  setSelectedFilm(item)
                }}
              >
              
                <div className="relative w-full flex items-center justify-center aspect-2/3 overflow-hidden">
                  <Image src={`${BUCKET_URL}/${item.title}.png`} 
                    alt='Live Cover' 
                    fill
                    className='object-cover'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                  />
                </div>
                <div className="product-title text-center my-2 underline">
                  {item.title}
                </div>
                <div className="product-detail px-2 text-sm text-blue-900">
                  {item.description}
                </div>
                <div className="product-price mt-auto mb-2 px-2 pt-2 flex justify-between items-center font-bold">
                  <div className="price-left text-[12px] text-amber-600">
                    2$/Disk/Night
                  </div>
                  <div className="price-right text-[12px] text-end">
                    <span className='font-medium'>On Shelf :</span> <span className='text-red-600'>{item.stock}</span>
                  </div>
                </div>
              </div>
            ))
          }
          </div>

          <div className='h-20'></div>

            {/* --- Pagination Controls --- */}
            <div className="pagination-controls flex justify-center items-center gap-2 mt-10 pb-10">
              <button 
                onClick={() => handlePageChange(1)} // Use helper function here
                disabled={currentPage === 1}
                className="px-3 py-1 glow btn btn-outline-warning text-white font-bold rounded disabled:opacity-5"
              >
                First
              </button>
              
              {/* Generate Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i+1)} // Use helper function here
                  className={`px-4 py-1 rounded glow text-white font-bold ${currentPage === i + 1 ? 
                    'btn btn-outline-success' : 
                    'btn btn-outline-primary'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(totalPages)} // Use helper function here
                disabled={currentPage === totalPages}
                className="px-3 py-1 glow btn btn-outline-danger text-white font-bold rounded disabled:opacity-5"
              >
                Last
              </button>
            </div>
          </>
        }

        {/* Popup Section */}
        {selectedFilmId && (
              <div
                className="popup_overlay"
                onClick={() => closePopup()}
              >
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="close_btn glow"
                    onClick={() => closePopup()}
                  >
                    X
                  </button>
                  <div className='h-4'></div>
                  <div className="product-img relative h-180">
                    <Image src={`${BUCKET_URL}/${selectedFilm.title}.png`} 
                      alt='DVD Cover' 
                      fill
                      className='object-contain'
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="eager"
                    />
                  </div>
                  <div className="product-title text-white underline text-3xl pt-4">
                    {selectedFilm.title}
                  </div>
                  <div className="product-description text-white text-left px-5 pt-2.5!">
                    {selectedFilm.description}
                  </div>
                  
                  <div className="product-price flex justify-between items-center custom-card">
                    <div className="price-left text-white">
                      2$/Disk/Night
                    </div>
                    <div className="btn-rent">
                      <button className='btn btn-outline-danger text-2xl! text-white italic font-bold! glow'
                        onClick={()=>Rented(selectedFilm.title,selectedFilmId)}
                      >
                        Rent
                      </button>
                    </div>
                    <div className="price-right text-white">
                      <span>On Shelf :</span> <span>{selectedFilm.stock}</span>
                    </div>
                  </div>
                    
                  <div className="h-10"></div>
                </div>
              </div>
            )}
      </div>
      <div className='h-20'></div>
    </div>
    
  )
}

export default Hall
