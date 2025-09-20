import React from 'react';
import ResumeOptions from './ResumeOptions';
import ResumeExamplesButton from '../Elements/ResumeExamplesButton';

const TopResume = () => {
    return (
          <div className='max-w-full flex flex-col gap-5'>
            <h1 className='font-bold text-2xl'>Top Resume Examples</h1>
            <p className='text-gray-700'>Choose from tailored resume examples for every profession and experience level. Click on any category to explore resumes designed to showcase your skills and land your dream job.</p>

          <div className='mt-5'>
             <ResumeOptions></ResumeOptions>
<ResumeExamplesButton></ResumeExamplesButton>
             <></>
          </div>
        </div>
    );
};

export default TopResume;