"use client";
import dynamic from "next/dynamic";

const MapModalDynamic = dynamic(() => import("./MapModal"), { ssr: false });

export default MapModalDynamic;