
"use client"
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { Banner } from '../Homepage/Banner/Banner';
import { usePathname } from 'next/navigation';

export const Header = ()=>{

    const placeholders = [
    "Search Hotels...",
    "Search Salons...",
    "Search Restaurants...",
  ];

   const [index, setIndex] = useState(0);
   const [fade, setFade] = useState(true);
   const pathname = usePathname();

   useEffect(() => {

        const interval = setInterval(() => {
            setFade(false); 
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % placeholders.length);
                setFade(true); 
            }, 300);
        }, 2500);

    return () => clearInterval(interval);
  }, []);


    return(

        <header className='w-full h-auto flex flex-col pb-4
'>

            <div className='w-full flex justify-between items-center p-2 md:hidden'>
                <div className='text-slate-600'><i className="ri-map-pin-fill"></i> Location</div>
                <Button type='text' className='!bg-white !text-blue-400'>Enter your Location</Button>
            </div>
            <div className='w-full flex justify-between items-center p-4'>

             <div className="relative w-[74%] md:hidden">
                    
                    <Input
                        prefix={<SearchOutlined className="text-gray-400 text-lg" />}
                        className="rounded-full border-none !w-full bg-slate-50 focus:bg-white focus:outline-none focus:shadow-md placeholder-transparent transition-all duration-300 h-11"
                        size="large"
                    />
                    <span
                        className={`absolute left-11 top-1/2 -translate-y-[52%] text-gray-500 text-sm pointer-events-none transition-all duration-300 ${
                        fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                        }`}
                    >
                        {placeholders[index]}
                    </span>
             </div>

                <div className='flex gap-2 md:hidden'>
                    <i className="ri-notification-4-line text-xl"></i>
                    <i className="ri-account-circle-2-line text-xl"></i>
                </div>


            </div>
             {pathname === "/" && (
                <div className="relative px-4 md:px-40 md:mt-14 w-full">
                <Banner />
                </div>
            )}
           


        </header>

    );

}