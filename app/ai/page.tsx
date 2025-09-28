'use client'
import React from 'react';
import CoverLetterGenerator from './ai-cover-letter/page';
import LinkedINpage from './linkedIn-generator/page';

const page = () => {
    return (
        <div>

           <CoverLetterGenerator></CoverLetterGenerator>
           <LinkedINpage></LinkedINpage>

        </div>
    );
};

export default page;