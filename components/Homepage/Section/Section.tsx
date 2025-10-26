"use client";

import React, { useEffect, useState } from "react";
import PostMediaGrid from "../PostMediaCard/PostMediaGrid";
import { Button, Modal, Input, Drawer } from "antd";
import MapModalDynamic from "@/components/Map/MapModalDynamic";

interface PostProps {
  restaurantName: string;
  location: string;
  timing: string;
  foodType: string;
  contact: string;
  media: {
    type: string;
    thumb: string;
    src: string;
  }[];
}

interface  Comment{
  id : number,
  user:string,
  text:string

}


export default function PostCard({
  restaurantName,
  location,
  timing,
  foodType,
  contact,
  media,
}: PostProps) {

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  //detect user screen 
  useEffect(()=>{

    const checkScreen = ()=> setIsDesktop(window.innerWidth >=768);
    checkScreen();
    window.addEventListener("resize",checkScreen);
    return ()=>window.removeEventListener("resize",checkScreen);

  },[]);


   const handleOpenComments = () => setShowComments(true);
   const handleCloseComments = ()=>setShowComments(false);


   const handleAddComment = () => {

        if (!newComment.trim()) return;

        const comment: Comment = {
          id: comments.length + 1,
          user: "You",
          text: newComment,
        };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleMapClick = (restaurantlocation:any) => {

    setSelectedRestaurant(restaurantlocation);
    setShowMap(true);
  };

  return (
    <div className="bg-white border-t-2 dark:bg-gray-900 md:w-[96%] rounded-2xl shadow-md p-4 md:p-6 mb-6 ">
      {/* --- Header --- */}
      <div className="flex flex-col  mb-4 w-full  ">
          
         <div className="flex w-full  items-center justify-between">
            <h2 className="md:text-2xl font-semibold text-gray-900 dark:text-white">
                {restaurantName}
            </h2>
            <Button variant="outlined" color="danger" className="flex items-center gap-2 shadow-lg" onClick={() => handleMapClick('dibrugarh')}>
                <i className="ri-road-map-line"></i> Map
            </Button>
        </div>

          <div className=" w-full text-gray-600 dark:text-gray-400 grid grid-cols-1 md:grid-cols-2 gap-1 mt-1">

              
                       
                     
                          <button className=" text-left "> Location : {location}</button>
                          <button className=" text-left md:text-right "> Timing : {timing}</button> 
            
                            <button className=" hidden md:flex text-left  ">  <i className="ri-phone-fill text-blue-500"></i> {contact}</button>
                            <button className=" text-left md:text-right "> <i className="ri-bowl-fill text-yellow-500"></i> {foodType}</button>
                             
           
                <div className="md:hidden flex gap-4 mt-4">
                        
                        <Button variant="text" color="primary" className="flex items-center gap-2 border-white shadow-lg">
                         <i className="ri-phone-fill"></i> {contact}
                        </Button>
                        <Button variant="filled" color="green" className="flex items-center gap-2 shadow-lg" >
                         <i className="ri-share-forward-line"></i> Share
                        </Button>
                </div>

                </div>
      </div>

      {/* --- Media Grid --- */}
      <div className="mb-4">
        <PostMediaGrid restaurantName={restaurantName} media={media} />
      </div>

      {/* --- Actions --- */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-around text-gray-600 dark:text-gray-300">
        <button className="flex items-center gap-2 hover:text-pink-500 transition">
          <i className="ri-thumb-up-line"></i> Like
        </button>
        <button className="flex items-center gap-2 hover:text-blue-500 transition"   onClick={handleOpenComments}>
          <i className="ri-chat-1-line"></i>Comment
        </button>
        <button className="hidden md:flex items-center gap-2 hover:text-green-500 transition ">
          <i className="ri-share-forward-line"></i> Share
        </button>
        <button className="flex items-center gap-2 hover:text-red-500 transition">
          <i className="ri-thumb-down-line"></i> Dislike
        </button>
      </div>



      {isDesktop && (
        <Modal
          title="Comments"
          open={showComments}
          onCancel={handleCloseComments}
          footer={null}
          centered
          width={600}
        >
          <div className="max-h-[50vh] overflow-y-auto space-y-2 mb-9">
            {comments.length === 0 && (
              <p className="text-gray-400 text-sm">No comments yet.</p>
            )}
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
                  <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                    <span className="font-semibold mr-1">{c.user}:</span>
                    {c.text}
                  </div>
              </div>
            ))}
          </div>

          <Input.Search
            placeholder="Write a comment..."
            enterButton={<i className="ri-send-plane-fill text-white text-lg" />}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onSearch={handleAddComment}
            rootClassName="custom-search"
            className="!bg-gray-200 !rounded-lg !border-none !shadow-none focus:!ring-0 focus:!outline-none"
          />
        </Modal>
      )}

      {/* drawer for mobile */}
       {!isDesktop && (
        <Drawer
          title="Comments"
          placement="bottom"
          closable
          onClose={handleCloseComments}
          open={showComments}
          height="65%"
          className="rounded-t-2xl"
          styles={{
            body: { padding: "12px 16px", background: "#fff" },
            header: {
              borderBottom: "1px solid #f0f0f0",
              textAlign: "center",
              fontWeight: "600",
            },
          }}
        >
          {/* --- Comments --- */}
          <div className="overflow-y-auto max-h-[45vh] space-y-3 mb-3">
            {comments.length === 0 && (
              <p className="text-gray-400 text-center text-sm mt-2">
                No comments yet.
              </p>
            )}
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
                <div className="bg-gray-100 rounded-md px-3 py-1 text-sm">
                  <span className="font-semibold mr-1">{c.user}:</span>
                  {c.text}
                </div>
              </div>
            ))}
          </div>

          {/* --- Comment Input --- */}
          <div className="flex gap-2 absolute bottom-[10px] w-[90%]">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onPressEnter={handleAddComment}
              
            />
            <Button type="primary" onClick={handleAddComment}>
              Send
            </Button>
          </div>
        </Drawer>
      )}


      {showMap && selectedRestaurant && (
        <MapModalDynamic
          destination={selectedRestaurant}
          onClose={() => setShowMap(false)}
        />
      )}

    </div>
  );
}
