import React, { useState } from 'react';

export default function CollapsableCard({ title, children }: { title: string | React.ReactNode , children: React.ReactNode }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => { 
        setIsOpen((prev) => !prev); 
    }; 
    return (
        <>
            <div className="border rounded-md mb-1 w-5/6"> 
                <button 
                    className="w-full p-4 text-left bg-gray-200  
                               hover:bg-gray-300 transition duration-300"
                    onClick={toggle} 
                > 
                    {title} 
                    <span className={`float-right transform ${isOpen ?  
                                     'rotate-180' : 'rotate-0'}  
                                     transition-transform duration-300`}> 
                        &#9660; 
                    </span> 
                </button> 
                {isOpen && ( 
                    <div className="p-4 bg-white"> 
                        {children} 
                    </div> 
                )} 
            </div> 
            <br/>
        </>
    ); 
}; 