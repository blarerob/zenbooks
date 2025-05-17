"use client";

import React, {useCallback} from 'react';
import { IconType } from 'react-icons';
import {useSearchParams, useRouter} from "next/navigation";
import qs from 'query-string';

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,
 }) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [label, params, router]);

  return (
    <div
        onClick={handleClick}
        className={`
            flex
            flex-col
            items-center
            justify-center
            
            gap-0
            hover:text-green-700
            transition
            cursor-pointer
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}
    >
        <Icon size='28' className={`${selected ? 'text-green-700' : ''}`} />
        <div className={`font-gray text-gray-500 text-sm ${selected ? 'text-green-700' : ''}`}>
            {label}
        </div>
    </div>
  );
};

export default CategoryBox;