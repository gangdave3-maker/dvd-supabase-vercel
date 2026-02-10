import React from 'react'
import Link from 'next/link'
import { delCookies } from '../api/del-cookies/route'

function Nav() {
  return (
    <div className='bgc flex justify-center items-center gap-x-40'>
      <Link href={'/Hall'} className='navfont glow'>DVD</Link>
      <Link href={'/Contact'} className='navfont glow'>About Us</Link>
      <Link href={'/'} className='navfont glow' onClick={()=>delCookies()}>Logout</Link>
    </div>
  )
}

export default Nav
