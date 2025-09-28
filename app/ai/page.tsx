'use client'
import React from 'react';
import CoverLetterGenerator from './ai-cover-letter/page';
import LinkedInSummaryGenerator from './linkedIn-generator/page';
import Lottie from 'lottie-react';
import coverLetter from '../../public/lotties/coverLetter.json'

const page = () => {
    return (
        <div>

           <div className='max-w-7xl mx-auto px-4 md:px-10 py-10 grid md:grid-cols-2 gap-10 items-center text-center '>
            <CoverLetterGenerator></CoverLetterGenerator>
                <Lottie animationData={coverLetter}  loop={true} />
           </div>
           <LinkedInSummaryGenerator></LinkedInSummaryGenerator>

        </div>
    );
};

export default page;