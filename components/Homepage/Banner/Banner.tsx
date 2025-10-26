"use client"

import { Carousel } from 'antd';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
export const Banner = () => {

 const banners = [
  {
    id: 1,
    title: "Find Your Dream Hotel",
    image: "/the-greenhouse-cafe-six-mile-guwahati-coffee-shops-ky4hafbgte.avif",
    mobileImage: "/the-greenhouse-cafe-six-mile-guwahati-coffee-shops-ky4hafbgte.avif",
    href: "/hotels",
  },
  {
    id: 2,
    title: "Relax at the Best Salons",
    image: "/c.jpg",
    mobileImage: "/mocha-guwahati.jpg",
    href: "/salons",
  },
  {
    id: 1,
    title: "Find Your Dream Hotel",
    image: "/the-greenhouse-cafe-six-mile-guwahati-coffee-shops-ky4hafbgte.avif",
    mobileImage: "/the-greenhouse-cafe-six-mile-guwahati-coffee-shops-ky4hafbgte.avif",
    href: "/hotels",
  },
  {
    id: 2,
    title: "Relax at the Best Salons",
    image: "/c.jpg",
    mobileImage: "/mocha-guwahati.jpg",
    href: "/salons",
  },
];

const [isMobile,setIsMobile] = useState(false);
const [loading, setLoading] = useState(true);

 //detect device type 
 
useEffect(()=>{

  const handleResize = ()=>setIsMobile(window.innerWidth<768);
  handleResize();
  window.addEventListener("resize",handleResize);
  return ()=>window.removeEventListener("resize",handleResize);

},[]);

  return (

  <div className='relative w-full h-[30vh] md:h-[45vh]'>
  {loading && (
    <div className='absolute inset-0 flex justify-center items-center bg-gray-300 animate-pulse rounded-md'></div>
  )}
        <Carousel autoplay autoplaySpeed={5000} effect="fade"   className={`md:w-[100%] md:rounded-md ${loading ? 'hidden' : ''}`}>
            {banners.map((banner) => (
              <Link
                key={banner.id}
                href={banner.href}
                className="block relative w-full h-[30vh] md:h-[45vh] overflow-hidden rounded-md"
              >
                <Image
                  src={isMobile ? banner.mobileImage : banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                  onLoad={()=>setLoading(false)}

                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
                  <h2 className="text-[24px] md:text-5xl font-semibold mb-3 drop-shadow-lg">{banner.title}</h2>
                  <p className="text-sm md:text-base opacity-90">Discover top-rated places near you</p>
                </div>
              </Link>
            ))}
          </Carousel>

        


</div>


  );
  
}
