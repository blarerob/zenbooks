"use client";

import React from 'react';
import { TbHome } from 'react-icons/tb';
import { MdApartment } from 'react-icons/md';
import { TbCategory } from "react-icons/tb";
import CategoryBox from "./CategoryBox";
import Container from './Container';
import {usePathname, useSearchParams} from "next/navigation";

export const categories = [
    {
        id: 1,
        name: 'All',
        icon: TbCategory,
        label: 'All properties',
    },
    {
        id: 2,
        name: 'House',
        icon: TbHome,
        label: 'Homes',
    },
    {
        id: 3,
        name: 'Apartment',
        icon: MdApartment,
        label: 'Apartments',
    },
    ];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }
  return (
    <Container>
      <div className='
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
      '>
        {categories.map((item) => (
            <CategoryBox
                key={item.label}
                label={item.label}
                selected={category === item.label}
                icon={item.icon}
            />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
