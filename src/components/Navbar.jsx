import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center p-4 h-14 py-5">
            <div className="logo font-bold text-2xl">
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            {/* <ul> */}
                {/* <li className='flex gap-4'>
                    <a className='hover:font-bold' href="/">Home</a>
                    <a className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold' href="$">Contact</a>
                </li> */}
            {/* </ul> */}
            <button className='text-white flex  rounded-full justify-center items-center ring-white ring-1 '>
                <img className='p-1' width={50} src="icons/github.png" alt="github logo" />
                <span className='font-bold p-1'>GitHub</span>
            </button>
        </div>
    </nav>
  )
}

export default Navbar
