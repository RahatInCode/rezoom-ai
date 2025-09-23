"use client"
import Image from 'next/image';
import React from 'react';

const ExpartsCard = ({people}) => {
    return (
        <div className="w-full h-full p-3 shadow-xl hover:-translate-y-0.5 transition duration-300">
            <Image className=" object-contain h-96 w-full " src={people.image} fill  alt="Person_Image" />
            <h3 className="text-[#FC9667] text-xl  font-medium mt-3">{people.name}</h3>
            <p className="text-sm text-indigo-600 font-medium mt-1">{people.position}</p>
        </div>
    );
};

export default ExpartsCard;