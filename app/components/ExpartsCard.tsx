"use client";
import Image from 'next/image';
import React from 'react';

// ✅ Define the shape of the people object
interface Person {
    image: string;
    name: string;
    position: string;
}

// ✅ Type the component props
interface ExpartsCardProps {
    people: Person;
}

const ExpartsCard: React.FC<ExpartsCardProps> = ({ people }) => {
    return (
        <div className="w-full lg:max-h-96 shadow-xl p-2 rounded-xl hover:-translate-y-0.5 transition duration-300">
            <Image
                className="rounded-xl w-full object-cover"
                src={people.image}
                width={100}
                height={100}
                alt="Person_Image"
            />
            <h3 className="text-[#FC9667] text-xl font-medium mt-3">{people.name}</h3>
            <p className="text-sm text-indigo-600 font-medium mt-1">{people.position}</p>
        </div>
    );
};

export default ExpartsCard;
