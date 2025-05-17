import React from 'react';
import Header from "@/app/_components/header/Header";
import Categories from "@/app/_components/Categories";
import ListingCard from "@/app/listings/ListingCard";
import getListings from "@/app/actions/getListings";

export default async function Home() {
const listings = await getListings();

return (
  <>
    <div>
      <Header />
    </div>
    <div>
      <Categories />
    </div>
    <div
      className='
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      '
    >
        {listings.map((listing) => {
            return (
                <ListingCard
                    key={listing.id}
                    data={listing}
               />
            );
        })}
    </div>
  </>
);
}