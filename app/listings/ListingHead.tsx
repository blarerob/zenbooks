"use client";

import React from 'react';
import Heading from "@/app/_components/Heading";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "@/app/_components/HeartButton";
import Listing from "@/app/listings/ListingCategory";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
}) => {
    const {getByValue} = useCountries();

    const location = getByValue(locationValue);

  return (
      <>  <div className='mt-15'>
        <Heading
            title={title}
            subtitle={
                <div className='flex items-center gap-1'>
                    📍  {locationValue}
                </div>
            }
        />
      </div>
        <div className='
         w-full
         h-[60vh]
         overflow-hidden
         rounded-xl
         relative
        '
             >
            <Image
                alt='Image'
                src={imageSrc}
                fill
                className='object-cover w-full'
                />
            <div className='absolute top-5 right-5'>
                <HeartButton
                    listingId={id}
                    />
            </div>
        </div>
    </>
  );
};

export default ListingHead;