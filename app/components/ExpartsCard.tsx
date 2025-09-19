import React from 'react';

const ExpartsCard = ({people}) => {
    return (
        <div className="w-full hover:-translate-y-0.5 transition duration-300">
            <img className="rounded-4xl" src={people.image} alt="Person_Image" />
            <h3 className="text-[#FC9667] text-xl  font-medium mt-3">{people.name}</h3>
            <p className="text-sm text-indigo-600 font-medium mt-1">{people.position}</p>
        </div>
    );
};

export default ExpartsCard;