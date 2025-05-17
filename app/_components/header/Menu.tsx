'use client';

import React, {useCallback, useState} from 'react';
import {AiOutlineMenu} from "react-icons/ai";
import MenuItem from "./MenuItem";
import Image from "next/image";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import {SafeUser} from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface MenuProps {
    currentUser?: SafeUser | null
}

const Menu: React.FC<MenuProps> = ({
    currentUser,
})=> {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(()=> {
        setIsOpen((value)=> !value);
    }, []);

    const onRent = useCallback(() => {
        // Always open the RentModal
        rentModal.onOpen();
    }, [rentModal]);
    return (
        <div className="relative">
            <div className='flex flex-row items-center gap-3'>
                <div
                    onClick={onRent}
                    className='
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        text-black
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    '
                    >
                   <div className='text-green-800'>ZENbooks</div>
                </div>
                <div
                    onClick={toggleOpen}
                    className='
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        hover:shadow-md
                        transition
                        cursor-pointer
                        '
                    >
                        <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Image src="/logo.jpeg" width={30} height={30} alt="logo" className='rounded-2xl' />
                </div>
            </div>
          </div>
            {isOpen && (
                <div
                    className='
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    '
                    >
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => {}}
                                    label='My Trips'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My Favorites'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My Reservations'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My Properties'
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label='ZENBooks my home'
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label='Logout'
                                />
                            </>
                        ) : (
                        <>
                        <MenuItem
                            onClick={loginModal.onOpen}
                            label='Login'
                        />
                            <MenuItem
                                onClick={registerModal.onOpen}
                                label='Sign Up'
                            />
                        </>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;