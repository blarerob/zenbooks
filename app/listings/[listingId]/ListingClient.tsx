"use client";

import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {categories} from "@/app/_components/Categories";
import {Listing, Reservation, User} from "@prisma/client";
import ListingHead from "@/app/listings/ListingHead";
import Container from "@/app/_components/Container";
import { SafeListing } from "@/app/types";
import {SafeUser} from "@/app/types";
import ListingInfo from "@/app/listings/ListingInfo";
import {useRouter} from "next/navigation";
import {differenceInCalendarDays, eachDayOfInterval} from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/listings/ListingReservation";
import { Range } from 'react-date-range';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
 }) => {
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {

        setIsLoading(true)

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange)
                // redirect to trips
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went wrong.')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [totalPrice, dateRange, listing?.id, router]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            }else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price]);

   const category = useMemo(() => {
        return categories.find((item) =>
            item.label === listing.category);
    }, [listing]);

  return (
    <Container>
        <div className='max-w-screen-md mx-auto'>
             <div className='flex flex-col gap-6'>
                 <ListingHead
                     title={listing.title}
                     imageSrc={listing.imageSrc}
                     locationValue={listing.locationValue}
                     id={listing.id}
                     />
                 <div className='
                 grid
                 grid-cols-1
                 md:grid-cols-7
                 md:gap-10
                 mt-6
                 '>
                     <ListingInfo
                         user={listing.user}
                         category={category}
                         description={listing.description}
                         roomCount={listing.roomCount}
                         guestCount={listing.guestCount}
                         bathroomCount={listing.bathroomCount}
                         locationValue={listing.locationValue}
                         />
                     <div
                        className='order-first mb-10 md:order-last md:col-span-3'
                         >
                         <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disbaledDates={disabledDates}
                         />
                     </div>
                 </div>
             </div>
         </div>
    </Container>
  );
};

export default ListingClient;