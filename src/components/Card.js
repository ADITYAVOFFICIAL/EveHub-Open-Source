import React from 'react'
import { Link } from 'react-router-dom'

function Card({ icon, title, description, link, backgroundImage }) {
  // Conditionally set className based on the title
  const className = title === "Future Updates" ? "text-white" : "";

  return (
    <Link
      to={link}
      className={`flex flex-col w-full rounded-lg bg-white backdrop-blur-xl shadow-lg shadow-accent/20 gap-4 items-start justify-center p-6 group text-secondary  outline outline-1 outline-neutral-100/40 hover:scale-105  transition-all ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='text-5xl'>
        {icon}
      </div>
      <h3 className={`font-bold text-xl ${className}`}>{title}</h3>
      <p className={`text-slate-600 text-sm ${className}`}>{description}</p>
    </Link>
  )
}

export default Card
