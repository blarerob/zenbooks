"use client";

import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/app/types";
import {useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";
import useCountries from "@/app/hooks/useCountries";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "@/app/_components/HeartButton";
import Button from "@/components/ui/Button";
import {SafeListing} from "@/app/types";
import { User } from "@prisma/client";

interface ListingCardProps {
    data: SafeListing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
 }) => {
    const router= useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel= useCallback(
        (e: React.MouseEvent<HTMLButtonElement>)=> {
            e.stopPropagation();

            if(disabled){
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation]);

    return (
        <div
            onClick={() => router.push(`/listings/${data?.id}`)}
            className='col-span-1 cursor-pointer group flex flex-col gap-4 w-full max-w-md mx-auto'
            >
            <div className='flex flex-col gap-2 w-full ml-10 '>
                <div
                    className='
                        aspect-square w-full relative
                       overflow-hidden rounded-xl'
                >
                    <Image
                        alt='Listing'
                        src={data?.imageSrc}
                        width='510'
                        height='525'
                        className='
                            object-cover
                            group-hover:scale-110
                            transition
                            h-full
                            w-full
                        '
                        />
                    <div className='absolute top-3 right-3'>
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                            />
                    </div>
                </div>
               <div className='font-semibold text-lg text-blue-600 flex items-center gap-2'>
                    {location?.region} {location?.label}
                </div>
                <div className='font-semibold text-lg text-green-800'>
                  🏠 {data.category}
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                    <div className='font-bold text-black text-xl'>
                        💲{price}
                    </div>
                    {!reservation && (
                        <div className='font-light text-gray-500'>
                            / night
                        </div>
                    )}
                    {onAction && actionLabel && (
                        <Button
                            disabled={disabled}
                            label={actionLabel}
                            onClick={handleCancel}
                            className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition'
                            variant={undefined}
                            size={undefined}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListingCard;