import { PhoneCall } from 'lucide-react';
import React from 'react';

const Classic = () => {
    return (
        <div className='w-full p-12 '>
            <h1 className='text-center text-5xl font-bold'>Your Name</h1>
            <h3 className='text-2xl text-black text-center'>Your Role</h3>

            <div className='flex items-center justify-between mt-5'>
                <div className='flex justify-center items-center'>
                    <PhoneCall />
                    <p>Number here</p>
                </div>
                <div className='flex justify-center items-center'>
                    <PhoneCall />
                    <p>Number here</p>
                </div>
                <div className='flex justify-center items-center'>
                    <PhoneCall />
                    <p>Number here</p>
                </div>
            </div>
        </div>
    );
};

export default Classic;