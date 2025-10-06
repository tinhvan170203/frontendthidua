import React from 'react'
import CountUp from 'react-countup';
const RectangleChart = ({ text, color, number }) => {
    return (
        <div className='md:basis-1/4 px-2'>
            <div className={`${color} h-40 rounded-md shadow-md shadow-neutral-400 relative`}>
                <p className='bottom-2 w-full text-center text-sm absolute font-semibold text-white'>{text}</p>
                <p className='text-[60px] absolute h-full w-full flex items-center justify-center text-center flex-1 font-bold text-white'>
                    <CountUp end={number} duration={2} />
                </p>
            </div>
        </div>
    )
}

export default RectangleChart