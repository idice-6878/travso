import React from "react";
import Header from "./Header";
import ProfilePageHeaderData from "./ProfilePageHeaderData";
import BuddiesSidebar from "./BuddiesSidebar";
import BuddiesPostCard from "./BuddiesPostCard";
import { useSelector } from "react-redux";
import Rightbar from "./Rightbar";
import { useNavigate } from "react-router-dom";

const BuddiesPage = () => {
  const navigate = useNavigate();
  const { userBuddies} = useSelector((state) => state.auth);
  // console.log("===userBuddies===>", userBuddies);
  return (
    <>
      <Header />
      <ProfilePageHeaderData />
      <div className="min-h-screen bg-gray-50 p-4">
        <p className="font-poppins text-[#212626] font-semibold text-[28px] mb-5 text-left flex items-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate("/profile")}
          >
            <path
              d="M22.5 27L13.5 18L22.5 9"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Buddies ({userBuddies ? userBuddies.length : "0"})
        </p>
        <div className="container mx-auto flex gap-5">
          {/* Main Content */}
          <div className="w-full">
            <BuddiesPostCard />
          </div>
          <div className="flex flex-col">
            {/* Sidebar */}
            {/* <BuddiesSidebar /> */}
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuddiesPage;