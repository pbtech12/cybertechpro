import React, { FC, ReactNode } from 'react'
import Navbar from './Navbar/Navbar';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Header } from './Header/Header';

interface MainLayoutInterface  {

    children: ReactNode

}


export const MainLayout : FC <MainLayoutInterface >= ({children}) => {
  return (
  
    <AntdRegistry>

        <Header />
        {children}
         <Navbar />
    </AntdRegistry>
  )
}
