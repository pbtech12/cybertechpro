"use client";

import React, { useState } from "react";
import { Tabs } from "antd";
import Image from "next/image";
import type { TabsProps } from "antd";

const restaurantTypes = [
  {
    name: "Assamese & Ethnic Cuisine",
    image: "/assamese.webp",
  },
  {
    name: "Indian Cuisine",
    image: "/indians.jpg",
  },
  {
    name: "Asian & International Cuisine",
    image: "/international.jpg",
  },
  {
    name: "Fast Food & Café Style",
    image: "/fast.jpg",
  },
];


const salonTypes = [
  {
    name: "Hair Care & Styling",
    image: "/s1.jpeg",
  },
  {
    name: "Beauty & Skin Care",
    image: "/s2.webp",
  },
  {
    name: "Grooming & Personal Care",
    image: "/c.avif",
  },
  {
    name: "Manicure & Pedicure",
    image: "/s4.png",
  },
];

const hotelTypes = [
  {
    name: "Luxury",
    image: "/r1.jpeg",
  },
  {
    name: "Budget",
    image: "/s2.jpeg",
  },
  {
    name: "Resort",
    image: "/s3r.jpeg",
  },
  {
    name: "Business Stay",
    image: "/s4.png",
  },
];

const categories = [
  { key: "1", label: "Restaurants", content: restaurantTypes },
  { key: "2", label: "Salons", content: salonTypes },
  { key: "3", label: "Hotels", content: hotelTypes },
];

export const CategoryTabs = ()=>{

  const [activeTab, setActiveTab] = useState("1");

  const handleChange = (key: string) => {
    setActiveTab(key);
  };

  
  const items: TabsProps["items"] = categories.map((cat) => (
  {
    key: cat.key,
    label: (
      <span className="font-medium text-base md:text-lg">{cat.label}</span>
    ),
    children: (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {cat.content.map((item) => (
          <div
            key={item.name}
            className="relative rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={200}
              className="object-cover w-full h-32 md:h-44"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
            <div className="absolute bottom-2 left-3 text-white font-medium text-sm drop-shadow">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <div className="mt-2 px-2 h-[380px]  md:h-[300px]   md:mb-30 md:px-24">
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={handleChange}
        centered
        size="large"
        className="custom-tabs"
        items={items}
      />
    </div>
  );
}
