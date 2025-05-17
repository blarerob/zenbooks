"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HousePlus } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Menu from "./Menu";
import { SafeUser } from "@/app/types";


interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const Header: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log({currentUser})
  return (
      <div className='fixed top-0 left-0 w-full bg-[#766a55] shadow-md z-50'>
          <div className='flex items-center justify-between h-22 px-6'>
              <Link href='/public'>
                  <Image src={"/logo.jpeg"} width={60} height={60} alt='logo' className='rounded-2xl' />
              </Link>
              <div className='hidden md:flex flex-1 justify-center'>
                  <ul className='flex items-center gap-5'>
                      <Link href='/public'>
                          <li className={`hover:font-extrabold  hover:underline  hover:text-green-700 hover:underline-offset-4 font-medium 'text-green-700' : ''}`}>
                              Homes
                          </li>
                      </Link>
                      <Link href="/public">
                         <button
                           style={{ backgroundColor: '#6b961c', color: '#FFFFFF' }}
                           className="rounded-lg w-35 px-1 py-2 text-white font-medium shadow-md hover:bg-green-800 transition duration-300 ease-in-out cursor-pointer text-nowrap flex items-center justify-center gap-2"
                         >
                           <HousePlus />
                           Book Now
                         </button>
                      </Link>
                  </ul>
              </div>
              <div>
                 <>
                   <Menu currentUser={currentUser} />
                 </>
              </div>
          </div>
      </div>
  );
};

export default Header;
