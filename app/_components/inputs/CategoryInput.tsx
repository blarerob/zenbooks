"use client";

interface CategoryInputProps {
    icon: IconType,
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

import React from 'react';

const ComponentName: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick,
}) => {
  return (
    <div
    onClick={() => onClick(label)}
    className={`
        rounded-xl
        flex
        flex-col
        gap-3
        justify-center
        p-4
        border-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-neutral-200'}
        `}
    >
        <Icon size='30' />
        <div className='font-semibold'>
            {label}
        </div>
    </div>
  );
};

export default ComponentName;