'use client';

import { Range} from 'react-date-range';
import Calendar from '@/app/_components/inputs/Calendar';
import Button from "@/components/ui/Button";

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disbaledDates?: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
           price,
           totalPrice,
            dateRange,
            onChangeDate,
            onSubmit,
            disabled,
            disbaledDates
}) => {
    return (
        <div
        className='
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
        '
        >
            <div className='
            flex
            flex-row
            items-center
            gap-1
            p-4'
                 >
                <div className='text-2xl font-semibold'>
                    $ {price}
                </div>
                <div className='font-light text-neutral-600'>
                    night
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disbaledDates}
                onChange={(value) => onChangeDate(value.selection)}
                />
            <hr />
            <div className='p-4'>
                <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
            <div className='
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            '>
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
        </div>
    );
}

export default ListingReservation;