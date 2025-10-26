"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeOutlined,
  AppstoreOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  UserOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { Button, Input } from "antd";

const navItems = [
  {
    label: "Home",
    icon: <HomeOutlined />,
    href: "/",
    iconcolour:'text-pink-600',
    bcolor : 'from-pink-400/60 via-pink-300/20',
    bordercolor: 'border-t-2 border-pink-500'
  },
  {
    label: "Explore",
    icon: <AppstoreOutlined />,
    href: "/explore",  // will include both Hotels & Salons
   iconcolour:'text-cyan-600',
    bcolor : 'from-cyan-400/60 via-cyan-300/20',
    bordercolor: 'border-t-2 border-cyan-500'
  },
  {
    label: "Nearby",
    icon: <EnvironmentOutlined />,
    href: "/nearby",   // map view using Leaflet + OSM
    iconcolour:'text-green-600',
    bcolor : 'from-green-400/60 via-pink-300/20',
    bordercolor: 'border-t-2 border-green-500',

  },
  {
    label: "Saved",
    icon: <HeartOutlined />,
    href: "/saved",    // user wishlist or liked places
    iconcolour:'text-pink-600',
    bcolor : 'from-pink-400/60 via-rose-300/20',
    bordercolor: 'border-t-2 border-rose-500'
  },
  
];
const { Search } = Input;



export default function Navbar() {

  const pathname = usePathname();

  const handleSearch = (value: string) => {
    console.log("Search:", value);
  };


  
  return (
    <>
     

            {/* Laptop Search Bar */}    
      <nav className="hidden bg-white md:flex justify-between items-center px-10 py-3  shadow-sm fixed top-0 left-0 w-full z-40 h-[80px]">
    
        <div className="text-2xl font-bold flex justify-center items-center "><Image alt="brand" src="/pb.png" width={60} height={20}   style={{ width: 'auto', height: '20px' }} />Kingly</div>
        
        <div className="w-1/3">
          <Input
            prefix={<SearchOutlined className="text-gray-400 text-lg" />}
            placeholder="Enter your location, Restaurant, Salon..."
            onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
            className="rounded-full border-none !bg-slate-50  transition-all duration-300 focus:outline-none focus:shadow-md placeholder:text-gray-500"
            size="large"
          />
        </div>

        {/* RIGHT: Nav items */}
          <div className="flex gap-6 font-inter">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-pink-600 font-medium tracking-wide transition-all duration-200"
              >
                {item.icon}
                <span className="text-[15px] font-semibold">{item.label}</span>
              </Link>
            ))}

            <Button
            type="primary"
            className="!bg-gradient-to-r !from-pink-500 !to-orange-400 !border-none !text-white !font-medium hover:!opacity-90 !rounded-md transition-all duration-300"
            >
              <i className="ri-user-line text-white "></i>
            Login Now
           </Button>
             
           </div>
      </nav>


      {/* Mobile Bottom Navbar */}
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 z-40">
        {navItems.map((item) =>{ 

          const isActive = pathname ===item.href
          
          return(
          <div key={item.label} className={`relative flex h-full flex-col items-center justify-center p-2 transition-all duration-300 ${isActive ? item.bordercolor : "border-t-2 border-transparent"}`}>
            
            {isActive && (
              <span className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${isActive?item.bcolor:''} to-transparent blur-md pointer-events-none `}/>
            )}

            
            <Link
              href={item.href}
              className="flex flex-col items-center text-gray-500 hover:text-pink-600 transition-colors"
            >
              <span className={`text-xl leading-none   ${isActive?item.iconcolour :'text-current'} `}>{item.icon}</span>
              <span className={`text-[10px] mt-1 ${isActive?item.iconcolour :'text-current'}`}>{item.label}</span>
            </Link>
          </div>
        )

        })}
    </nav>

    </>
  );
}
