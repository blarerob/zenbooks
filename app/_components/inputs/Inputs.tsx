"use client";

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import {BiDollar} from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    formatPrice?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const Inputs: React.Fc<InputProps> = ({
    id,
    label,
    type,
    disabled,
    required,
    formatPrice,
    register,
    errors
}) => {
  return (
    <div className='w-full relative'>
        {formatPrice && (
         <BiDollar
            size={24}
            className='text-neutral-700 absolute top-5 left-2'
            />
        )}
            <input
                id={id}
                disabled={disabled}
                { ... register(id, { required })}
                placeholder=''
                type={type}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-neutral-300'}
                `}
                />
                    <label
                    className={`
                    absolute
                    text-md 
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    ${formatPrice ? 'left-9' : 'left-4'}
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                    `}
                    >
                        {label}
                    </label>
    </div>
  );
};

export default Inputs;