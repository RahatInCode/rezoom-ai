'use client'
import { usePathname } from 'next/navigation';
import React from 'react';

const page = () => {
    const path = usePathname().split('/')[4]
    return (
        <div>
           <p>{path}</p>
        </div>
    );
};

export default page;