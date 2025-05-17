"use client";

import * as React from "react"

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon
}) => {

  return (
   <button
       onClick={onClick}
       disabled={disabled}
       className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          transition
          w-full
          rounded-lg
          ${outline ? 'bg-white' : 'bg-green-700'}
          ${outline ? 'border-green-700' : 'text-white'}
          ${outline ? 'text-black' : 'text-white'}
          ${small ? 'py-1' : 'py-3'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'font-light' : 'text-md'}
          ${small ? 'border-[1px]' : 'border-2'}
      `}
   >
       {Icon && (
           <Icon className="absolute left-4 top-3" />

       )}
       {label}
   </button>
  );
}

export default Button;
