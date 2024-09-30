import React from 'react'
import { Link, useLocation} from 'react-router-dom'
import { footerLinks } from '../static/footerLinks'

function Footer() {
    const location = useLocation(); 
  return (
    <div className='flex flex-col gap-4 md:gap-8 py-12 bg-secondary text-neutral-200 font-poppins border-t border-neutral-400' style={
        location.pathname !== "/"
          ? { borderRadius: "25px 25px 0 0" }
          : {}
      }>
    <ul className='md:w-full flex flex-row flex-wrap items-center justify-center gap-4'>
        {footerLinks.map((link, index) => 
        <li className='border flex items-center justify-center rounded-2xl p-3 pr-8 pl-8 bg-gray-950 border-gray-700 text-2xl hover:scale-125 transition-all'>
            <Link className='' target={'_blank'} to={link.link} title={link.title}>{link.icon}</Link>
        </li>
        )}
        
    </ul>
    <div>
        <p className='text-neutral-300 text-xs md:text-sm text-center font-medium'>&copy; EveHub {new Date().getFullYear()} | All rights reserved | <Link className='hover:text-accent hover:underline' target='_blank' to='https://adityaver.netlify.app/'>ADITYA VERMA</Link> | <Link className='hover:text-accent hover:underline' to='/dashboard'>For Organisers</Link></p>
    </div>
    </div>
  )
}

export default Footer