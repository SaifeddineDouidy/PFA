import React from 'react'
import { FaEnvelopeOpenText } from "react-icons/fa6"
const Newsletter = () => {
  return (
    <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
            <FaEnvelopeOpenText/>
            Email 
        </h3>
        <p className='text-primary/75 text-base mb-4'>email</p>
        <div className='w-full space-y-4'>
            <input type="email" name="email" id="email" placeholder='name@mail.com' className='w-full block py-2 pl-3 border focus:outline-none'/>
            <input type="submit" value={"Subscribe"} className='w-full block py-2 pl-3 border bg-blue rounded-sm text-white cursor-pointer font-semibold ' />
        </div>
    </div>
  )
}

export default Newsletter