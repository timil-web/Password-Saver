import React from 'react'
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  return (
    <div className='bg-slate-800 flex flex-col justify-center items-center text-white'>
        <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
                Pass
            <span className='text-green-500'>OP/&gt;</span>
        </div>

        <div className='flex justify-center items-center'>
            created with <img className='w-6 mx-2' src="icons/love.png" alt="love" /> by timil vaishnav
        </div>
        <div>
    </div>
    </div>
  )
}

export default Footer
