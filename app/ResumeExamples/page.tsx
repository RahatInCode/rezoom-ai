import React from 'react';
import TopResume from '../ResumeExamplesSection/TopResume';
import TemplateExample from '../ResumeExamplesSection/TemplateExample';

const ResumeExamples = () => {
    return (
        <div className='h-fit w-11/12 mx-auto flex flex-col md:flex-row items-center  justify-center gap-10'>
      <TopResume></TopResume>
      <TemplateExample></TemplateExample>
        </div>
    );
};

export default ResumeExamples;