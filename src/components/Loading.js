import React from 'react'
import { FiLoader} from 'react-icons/fi'

function Loading({text}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[80vh]">
      <FiLoader className="text-4xl animate-spin text-primary"/>
      <p className="text-xl">{text}</p>
    </div>
  )
}

export default Loading