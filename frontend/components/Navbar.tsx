import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assets/videre-logo.png';


const Navbar = () => {
    return(
        <div className="w-full flex justify-between items-center border b-2 border-gray-200 py-2 px-4">
            <Link href="/">
            <div className='w-[50px] md:w-[65px]'>
            <Image className='cursor-pointer' src={Logo} alt="Videre"/>
            </div>
            </Link>
        </div>
    )
}

export default Navbar