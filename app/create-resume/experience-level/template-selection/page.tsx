'use client'
import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [resumes, setResume] = useState([])
    const [loading , setLoading] = useState(false)
    const [templateSelect , setTemplateSelect] =useState(null)
    const [isCheck , setChecked] = useState({
        "WithPhoto": false,
        "NoPhoto": false,
        "OneCol": false,
        "TwoCol": false
    })
    const getallresum = ()=>{
 fetch('/resume-templates.json').then(data=>data.json())
        .then(result => setResume(result || []))
    }
    useEffect( ()=>{
        setLoading(true)
       getallresum()
        setLoading(false)
    }, [] )

const handleCheckBoxOnChange = (e) => {
  const { name, checked } = e.target;
  // Update the checkbox states first
  setChecked((prev) => {
    const updatedValue = {
      ...prev,
      [name]: checked
    };

    // After updating, handle the filtering logic here
    if (updatedValue.WithPhoto) {
      const photoResum = resumes.filter((resum) => resum.isWithPhoto === true);
      setResume(photoResum);
    }else if(updatedValue.NoPhoto){
        const photoResum = resumes.filter(resum => resum.isWithPhoto === false)
        setResume(photoResum)
    }else if(updatedValue.OneCol){
        const photoResum = resumes.filter(resum => resum.isTwoColoumn === false)
        setResume(photoResum)
    }else if(updatedValue.TwoCol){
        const photoResum = resumes.filter(resum => resum.isTwoColoumn === true)
        setResume(photoResum)
    }else {
      getallresum();
    }
    return updatedValue;
  });
};
    const handleClearFilter = ()=>{
        setChecked({
            WithPhoto: false,
            NoPhoto:false,
            OneCol:false,
            TwoCol:false
        })
        getallresum()
    }
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


                <div className='w-1/4 space-y-5 hidden  md:flex flex-col min-h-96 p-1'>
                        <div className='flex justify-between'>
                            <p className='text-xl font-bold'>Filters</p>
                            <p className='link' onClick={handleClearFilter}>clear filter</p>
                        </div>
                    
                    <div className='flex flex-col space-y-2 '>
                            <h1 className='text-lg font-semibold'>Headshot</h1>
                            <div className='flex text-sm items-center justify-start gap-3'>
                                <input name='WithPhoto' type="checkbox" onChange={(e)=>handleCheckBoxOnChange(e)} checked={isCheck.WithPhoto}  className='checkbox checkbox-sm' />
                                <p>With Photo</p>
                            </div>
                            <div className='flex text-sm items-center justify-start gap-3'>
                                <input name='NoPhoto' type="checkbox" onChange={(e)=>handleCheckBoxOnChange(e)} checked={isCheck.NoPhoto} className='checkbox checkbox-sm' />
                                <p>Without Photo</p>
                            </div>
                    </div>
                    <div className='flex flex-col space-y-2 '>
                        <h1 className='text-lg font-semibold'>Coloums</h1>
                        <div className='flex text-sm items-center justify-start gap-3'>
                            <input name='OneCol' type="checkbox" onChange={(e)=>handleCheckBoxOnChange(e)} checked={isCheck.OneCol} className='checkbox checkbox-sm' />
                            <p>One Coloum</p>
                        </div>
                        <div className='flex text-sm items-center justify-start gap-3'>
                            <input type="checkbox" name='TwoCol'
                            checked={isCheck.TwoCol}
                            onChange={(e)=>handleCheckBoxOnChange(e)}
                             className='checkbox checkbox-sm' />
                            <p>Two Coloum</p>
                        </div>
                    </div>
                </div>

                {
                    loading ? <div className='w-full h-full flex justify-center items-center'><span className='loading loading-spinner'></span></div>
                    :
                    <div className='w-full md:w-3/4 min-h-96 justify-items-center space-y-5 md:space-y-0  gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 '>
                        {
                            resumes.map((resum, idx )=> <TemplateCard
                            templateSelect={templateSelect}
                            setTemplateSelect={setTemplateSelect}
                            key={idx} resum={resum} idx={idx} ></TemplateCard> )
                        }
                    </div>
                }
            </div>
            {
                templateSelect && <div className='w-full mt-12  flex justify-center md:justify-end items-center'>
                        <Link href={`/create-resume/experience-level/template-selection/${templateSelect}`} className='btn btn-primary btn-outline px-12 '>Next <ArrowRight /></Link>
                </div>
            }
        </div>
    );
};

export default page;



const TemplateCard = ({resum, idx, setTemplateSelect , templateSelect}) =>{
    return(
        <div onClick={()=>setTemplateSelect(resum.id)} className={`w-3/4 md:w-full  min-h-96    ${templateSelect === resum.id ? "border-2 border-blue-500" : "border-2 border-gray-600"} `}>
            <Image alt='Resume Template' width={100} height={100} quality={100}  className='w-full hover:cursor-pointer h-full' src={resum.image} />
        </div>
    )
}