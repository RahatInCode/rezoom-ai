import { Save, ShieldCheck } from 'lucide-react';
import React from 'react';
import { FaHandshake } from 'react-icons/fa';
import { FaArrowTrendUp } from "react-icons/fa6";
const OurFeature = () => {
    const Features = [
        {
            "id": 1,
            "title": "High Quality Results",
            "description": "Every template and tool on our website ensures a clean, modern, and eye-catching design that helps you stand out.",
            "icon": <FaArrowTrendUp size={25}/>
        },
        {
            "id":2,
            "title": "ATS Friendly",
            "description": "Your resume or document is fully optimized to pass Applicant Tracking Systems (ATS), giving you a better chance to get noticed by employers.",
            "icon" : <FaHandshake size={25}/>
        },
        {
            "id": 3,
            "title": "Professional Appearance",
            "description": "All our designs are carefully structured to maintain a perfect balance between style and readability, making your document look professional and polished.",
            "icon": <ShieldCheck size={25}/>
        },
        {
            "id": 4,
            "title": "Save as PDF or DOC",
            "description": "Once you’re done, you can instantly download your file in either PDF or Word (DOC) format, making it easy to use anywhere.",
            "icon": <Save size={25}/>
        }
    ]

    return (
                <div className="flex flex-col items-center text-center p-8 border-b-2 border-gray-200 ">
            <h1 className="text-4xl font-bold max-w-[740px] mb-[72px]">Trusted by <span className="text-blue-600">30+</span> world class companies & design teams</h1>
            <div className="w-full p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                {
                    Features.map((ftrs , index)=> <FeatureCard key={index} ftrs={ftrs}/> )
                }
            </div>
        </div>
    );
};

export default OurFeature;
const FeatureCard = ({ftrs})=>{
    return(
                        <div className="flex flex-col items-center bg-white px-3 py-8 rounded-lg border border-gray-300/80 max-w-[272px] text-sm text-center text-gray-500">
                    <div className="mb-4 p-5 rounded-full bg-primary text-white">
                        {ftrs.icon}
                    </div>
                       <p className="text-lg text-gray-800 font-medium mt-5">{ftrs.title}</p>
                    <p>{ftrs.description}</p>
                 
                  
                </div>
    )
}