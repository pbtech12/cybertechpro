"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Modal, Skeleton } from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { VideoPlayer } from "@/components/video-player/VideoPlayer";

type MediaItem = {
  type: string;
  thumb: string;
  src: string;
  alt?: string;
};

type Props = {
  restaurantName: string;
  media: MediaItem[];
};

export default function PostMediaGrid({ restaurantName, media }: Props) {
  const [loadingThumbs, setLoadingThumbs] = useState<boolean[]>(
    media.map(() => true)
  );
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  
  const playerRef = useRef<any>(null);


  const onThumbLoad = (i: number) =>
    setLoadingThumbs((arr) => {
      const copy = [...arr];
      copy[i] = false;
      return copy;
    });


  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const prev = () => setIndex((p) => (p - 1 + media.length) % media.length);
  const next = () => setIndex((p) => (p + 1) % media.length);


  const handleClose = () => {
    playerRef.current?.disposePlayer(); 
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index]);

  // --- Swipe Support for Mobile ---
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const MIN_SWIPE_DISTANCE = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const dist = touchStartX.current - touchEndX.current;
    if (Math.abs(dist) > MIN_SWIPE_DISTANCE) {
      if (dist > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const visible = 4;
  const display = media.slice(0, visible);
  const extraCount = media.length - visible;

  return (
    <>
      {/* --- Thumbnail Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-2">
        {display.map((m, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="relative block w-full h-40 border border-white md:h-56 overflow-hidden rounded-md focus:outline-none"
          >
              {loadingThumbs[i] && (
              <div className="absolute inset-0 z-20 rounded-md overflow-hidden">
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              </div>
              )}
            <Image
              src={m.thumb}
              alt={m.alt || `${restaurantName} media ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className={`object-cover w-full h-full transition-opacity duration-500 ${ loadingThumbs[i] ? "opacity-0" : "opacity-100"}`}
              onLoad={() => onThumbLoad(i)}
            />

            {/* +N Overlay */}
            {i === visible - 1 && extraCount > 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-semibold">
                +{extraCount}
              </div>
            )}

            {m.type === "video" && (
              <div className="absolute left-3 top-3 bg-black/40 rounded-full p-2 flex items-center justify-center">
                <i className="ri-play-fill text-white text-lg"></i>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* --- Fullscreen Modal --- */}
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        centered
        width="100%"
        styles={{
          mask: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
          body: { padding: 0, backgroundColor: "transparent" },
          content: { background: "transparent", boxShadow: "none" },
        }}
        closeIcon={null}
        maskClosable
        keyboard
        destroyOnHidden={true} 
      >
        <div
          ref={wrapperRef}
          tabIndex={-1}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative w-full flex items-center justify-center"
        >
          {/* --- Close Button --- */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-40 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
          >
            <CloseOutlined className="text-lg" />
          </button>

          {/* --- Prev Button --- */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 items-center justify-center bg-black/30 hover:bg-black/50 rounded-full p-2"
          >
            <LeftOutlined className="text-white text-xl" />
          </button>

          {/* --- Main Media --- */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative w-full h-[80vh] md:h-[85vh] flex items-center justify-center bg-black">
              {media[index].type === "image" ? (
                <Image
                  src={media[index].src}
                  alt={media[index].alt || `${restaurantName} full ${index + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
             
                <VideoPlayer
                  ref={playerRef}
                  src={media[index].src}
                  thumbnail={media[index].thumb}
                  active={open}
                />
              )}
            </div>

            {/* --- Modal Footer (Counter + Thumbs) --- */}
            <div className="flex items-center justify-between px-4 py-3 text-white text-sm">
              <div>
                {index + 1} / {media.length}
              </div>
              <div className="flex gap-2 overflow-x-auto max-w-[50vw]">
                {media.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-12 h-8 rounded-md overflow-hidden border ${
                      i === index ? "border-pink-400" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={m.thumb}
                      alt={m.alt || `thumb ${i + 1}`}
                      width={120}
                      height={80}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- Next Button --- */}
          <button
            onClick={next}
            aria-label="Next"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-30 items-center justify-center bg-black/30 hover:bg-black/50 rounded-full p-2"
          >
            <RightOutlined className="text-white text-xl" />
          </button>
        </div>
      </Modal>
    </>
  );
}
