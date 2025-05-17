"use client";

import React from 'react';
import {SafeUser} from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import ListingCategory from "@/app/listings/ListingCategory";

interface ListingInfoProps {
    user: SafeUser
    description: string;
    category: {
        label: string;
        icon: string;
        description: string;
    } | undefined;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    category,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
}) => {
    const {getByValue} = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className='col-span-4 flex flex-col gap-4'>
            <div className='flex flex-row text-xl font-semibold items-center gap-2'>
                <div>Hosted by</div> <div><span className='text-green-700'>ZEN</span>
                <span className='text-black'>books</span></div>            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                <div>{guestCount} guests</div>
                <div>{roomCount} rooms</div>
                <div>{bathroomCount} bathrooms</div>
            </div>
            <hr/>
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <div className='text-lg font-light text-neutral-500'>
                {description}
            </div>
        </div>
    )
}

export default ListingInfo;