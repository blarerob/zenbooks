"use client";

import Select from 'react-select';
import useCountries from "@/app/hooks/useCountries";

export type CountrySelcetValue = {
    flag: string;
    label: string;
    latlng: number[];
    value: string;
}

interface CountrySelectProps {
    value?: CountrySelcetValue;
    onChange: (value: CountrySelcetValue) => void;
    disabled?: boolean;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange,
 }) => {
    const { getAll } = useCountries();

    return (
        <div>
            <Select
                placeholder='Anywhere'
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelcetValue)}
                formatOptionLabel={(option: any) => (
            <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
                <div>{option.label}
                    <span className='text-neutral-500 ml-1'>
                        {option.region}
                    </span>
                    </div>
                 </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () =>   'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffe4e6',
                }
                    })}
            />
        </div>
    );
}

export default CountrySelect;