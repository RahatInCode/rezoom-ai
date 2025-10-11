import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';

const page = () => {
    const [resumes, setResume] = useState([])
    return (
        <div className='w-full p-7 lg:p-12 3xl:p-18 min-h-[calc(100vh-60px)]'>
            <h1 className='text-center text-5xl '>Here Is The Best Templates For You</h1>
            <p className='mb-8 mt-3 text-lg text-center'>We'll find the best templates for your experience level.</p>
            <div className='flex flex-col gap-2 md:flex-row justify-center w-full'>

                {/* Filter bar for small devices */}
                <div className='w-full h-fit p-2 flex md:hidden justify-end bg-base-200 '>
                    <Menu />
                    <X />
                </div>


                <div className='w-1/4 space-y-5 hidden  md:flex flex-col min-h-96 p-1 bg-blue-100'>
                        <div className='flex justify-between'>
                            <p className='text-xl font-bold'>Filters</p>
                            <p className='link'>clear filter</p>
                        </div>
                    
                    <div className='flex flex-col space-y-2 '>
                            <h1 className='text-lg font-semibold'>Headshot</h1>
                            <div className='flex text-sm items-center justify-start gap-3'>
                                <input type="checkbox" className='checkbox checkbox-sm' />
                                <p>With Photo</p>
                            </div>
                            <div className='flex text-sm items-center justify-start gap-3'>
                                <input type="checkbox" className='checkbox checkbox-sm' />
                                <p>With Photo</p>
                            </div>
                    </div>
                    <div className='flex flex-col space-y-2 '>
                        <h1 className='text-lg font-semibold'>Coloums</h1>
                        <div className='flex text-sm items-center justify-start gap-3'>
                            <input type="checkbox" className='checkbox checkbox-sm' />
                            <p>One Coloum</p>
                        </div>
                        <div className='flex text-sm items-center justify-start gap-3'>
                            <input type="checkbox" className='checkbox checkbox-sm' />
                            <p>Two Coloum</p>
                        </div>
                    </div>
                </div>

                 <div className='w-3/4 min-h-96 hidden md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 bg-blue-100'>
                        
                </div>


            </div>
        </div>
    );
};

export default page;