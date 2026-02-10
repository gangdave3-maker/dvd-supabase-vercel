'use client'
import { useState } from 'react'
import Link from 'next/link'
import { delCookies } from '../api/del-cookies/route'
import { Menu, X } from 'lucide-react'

function Nav() {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    delCookies()
    setOpen(false)
  }

  return (
    <nav className="bgc">
      <div className="container flex items-center! align-middle! justify-center px-4">
        <div className="hidden md:flex items-center! align-middle! gap-x-40 mt-2!">
          <Link href={'/Hall'} className='navfont glow'>DVD</Link>
          <Link href={'/Contact'} className='navfont glow'>About Us</Link>
          <Link href={'/'} className='navfont glow' onClick={()=>handleLogout()}>Logout</Link>
        </div>
      </div>

      <div className="container flex items-start! mt-3! justify-end">
        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bgc border-t border-white/10">
            <div className="flex flex-col items-center gap-6 py-6">

              <Link
                href="/Hall"
                className="navfont glow"
                onClick={() => setOpen(false)}
              >
                DVD
              </Link>

              <Link
                href="/Contact"
                className="navfont glow"
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>

              <Link
                href="/"
                className="navfont glow"
                onClick={handleLogout}
              >
                Logout
              </Link>

            </div>
          </div>
        )}
        {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
      </div>
        
    </nav>
    
  )
}

export default Nav
