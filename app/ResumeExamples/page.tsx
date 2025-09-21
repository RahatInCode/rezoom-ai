import React from 'react';
import TopResume from '../ResumeExamplesSection/TopResume';
import TemplateExample from '../ResumeExamplesSection/TemplateExample';

const ResumeExamples = () => {
    return (
        <div className='w-full flex flex-col md:flex-row items-center  justify-center gap-10'>
      <TopResume></TopResume>
      <TemplateExample></TemplateExample>
        </div>
    );
};

export default ResumeExamples;