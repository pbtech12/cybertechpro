import { CategoryTabs } from "@/components/Homepage/Category/Category";
import PostCard from "@/components/Homepage/Section/Section";

const posts = [
  {
    id: 1,
    restaurantName: "Spice Hub",
    location: "Guwahati, Assam",
    timing: "10:00 AM - 10:00 PM",
    foodType: "Indian, Chinese",
    contact: "+91 9876543210",
    media :[
              { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            { type: "video", thumb: "/hotel.jpg",  src: "/one.mp4" },
            { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
          ]
  },
  {
    id: 2,
    restaurantName: "Tasty Bites",
    location: "Dibrugarh, Assam",
    timing: "11:00 AM - 11:00 PM",
    foodType: "Continental, Thai",
    contact: "+91 9988776655",
   media :[
              { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            { type: "video", thumb: "/hotel.jpg",  src: "/one.mp4" },
            { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
          ]

  },
  {
    id: 3,
    restaurantName: "Assam Delight",
    location: "Christian Basti, Guwahati, Assam 781005",
    timing: "9:00 AM - 9:00 PM",
    foodType: "Assamese Thali, Snacks",
    contact: "+91 9123456789",
    media :[
              { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            { type: "video", thumb: "/hotel.jpg",  src: "/one.mp4" },
            { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
          ]

  },
  {
    id: 4,
    restaurantName: "Assam Delight",
    location: "Jorhat, Assam",
    timing: "9:00 AM - 9:00 PM",
    foodType: "Assamese Thali, Snacks",
    contact: "+91 9123456789",
    media :[
              { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            { type: "video", thumb: "/hotel.jpg", src: "/one.mp4" },
            { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            { type: "image", thumb: "/s1.jpeg", src: "/s1.jpeg" },
            
          ]

  }
];



export default function Home() {
  return (
    <div>
        <CategoryTabs />
        <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-center md:px-20">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              restaurantName={post.restaurantName}
              location={post.location}
              timing={post.timing}
              foodType={post.foodType}
              contact={post.contact}
              media={post.media}
              
            />
          ))}
        </div>

    
        



    </div>
  );
}
