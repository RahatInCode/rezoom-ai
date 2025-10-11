"use client"
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
const page = () => {
    const [selected, setSelected] = useState(
        {
            NoExp: false,
            ThreeYearExp:false,
            FiveYearExp: false,
            SevenYearExp: false,
            MoreSevenExp: false
        }
    )
    const handleExperienSelection = (index) =>{
        switch(index){
            case 0:
                setSelected({
                    NoExp:true,
                    ThreeYearExp:false ,
                    FiveYearExp: false,
                    SevenYearExp: false,
                    MoreSevenExp: false
                })
                break
            case 1:
                setSelected({
                    NoExp:false,
                    ThreeYearExp:true ,
                    FiveYearExp: false,
                    SevenYearExp: false,
                    MoreSevenExp: false
                })
                break
            case 2:
                setSelected({
                    NoExp:false,
                    ThreeYearExp:false ,
                    FiveYearExp: true,
                    SevenYearExp: false,
                    MoreSevenExp: false
                })
                break
            case 3:
                setSelected({
                    NoExp:false,
                    ThreeYearExp:false ,
                    FiveYearExp: false,
                    SevenYearExp: true,
                    MoreSevenExp: false
                })
                break
            case 4:
                setSelected({
                    NoExp:false,
                    ThreeYearExp:false ,
                    FiveYearExp: false,
                    SevenYearExp: false,
                    MoreSevenExp: true
                })
                break
        }
    }
    const bestDescribeYourself:string[] = [
        "Post Secondary Certificate or High School Diploma",
        "Technical or Vocational",
        "Related Course",
        "Certificates or Diplomas",
        "Associates",
        "Bachelors",
        "Masters or Specialized",
        "Doctoral or J.D"
    ]
    const [eduselect , setEduSelect] = useState<number | null>(null)
    return (
        <div className='w-full flex flex-col justify-center items-center min-h-[calc(100vh-60px)]'>
            <Toaster />
            <div className='container max-h-fit min-h-96 w-full lg:w-3/4 flex flex-col space-y-8 p-5'>
                
                {/* Experience div */}
                <div className='w-full text-center  p-4'>
                    <h1 className='text-center text-5xl '>How long you've been working on?</h1>
                    <p className='mb-8 mt-3 text-lg '>We'll find the best templates for your experience level.</p>
                    <div className='flex flex-wrap  gap-5 '>
                        <button onClick={()=>handleExperienSelection(0)} className={`btn btn-lg  btn-outline px-8 p-2 font-normal ${selected.NoExp ? 'border-2 border-primary' : ''}`}>No Experience</button>
                        <button onClick={()=>handleExperienSelection(1)} className={`btn btn-lg  btn-outline px-8 p-2 font-normal ${selected.ThreeYearExp ? 'border-2 border-primary' : ''}`}>0 to 3 Years</button>
                        <button onClick={()=>handleExperienSelection(2)} className={`btn btn-lg  btn-outline px-8 p-2 font-normal ${selected.FiveYearExp ? 'border-2 border-primary' : ''}`}>3 to 5 Years</button>
                        <button onClick={()=>handleExperienSelection(3)} className={`btn btn-lg  btn-outline px-8 p-2 font-normal ${selected.SevenYearExp ? 'border-2 border-primary' : ''}`}>5 to 7 Years</button>
                        <button onClick={()=>handleExperienSelection(4)} className={`btn btn-lg  btn-outline px-8 p-2 font-normal ${selected.MoreSevenExp ? 'border-2 border-primary' : ''}`}>More than 7 Years</button>
                    </div>
                </div>

                {
                    selected.NoExp == true || selected.ThreeYearExp==true || selected.FiveYearExp == true || selected.SevenYearExp == true || selected.MoreSevenExp == true ? 
                    <div className='w-full text-center  p-4'>
                        <h1 className='text-center text-5xl '>Select the option that best describes your education level.</h1>
                        <p className='mb-8 mt-3 text-lg '>Your education background can help us guide you through relevant sections for your resume.</p>
                        <div className='flex flex-wrap  gap-5 '>
                            {
                            bestDescribeYourself.map( (best , idx)=>  <button onClick={()=>setEduSelect(idx)} className={`btn btn-lg ${eduselect === idx ? "border-2 border-primary" : ""}  btn-outline px-8 p-2 font-normal `} >{best}</button> )
                             }
                        </div>
                            <div className='w-full py-5 flex justify-end items-center'>
                                {
                                    eduselect ? 
                                <Link href={"/create-resume/experience-level/template-selection"} className='btn px-8 btn-primary'>Next <ArrowRight /></Link>
                                    :
                                <button onClick={()=>toast.error("Select an option first!")}  className='btn px-8 btn-primary'>Next <ArrowRight /></button>

                                }
                            </div>
                    </div>
                    :
                    ''
                }
            
            </div>

            
        </div>
    );
};

export default page;