import React, { useState } from "react";
import BucketImageFirst from "../../assets/bucketimageFirst.png";
import BucketImageSecond from "../../assets/bucketimageSecond.png";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ProfilePageHeaderData from "./ProfilePageHeaderData";

const bucketListData = [
  {
    title: "Generic Bucket List",
    images: [BucketImageFirst, BucketImageSecond, BucketImageSecond],
  },
  {
    title: "Connection Bucket List",
    images: [BucketImageFirst, BucketImageSecond, BucketImageSecond],
  },
  {
    title: "Day Travel Buddies",
    images: [BucketImageFirst, BucketImageSecond, BucketImageSecond],
  },
  {
    title: "Royal Travel Buddies",
    images: [BucketImageFirst, BucketImageSecond, BucketImageSecond],
  },
];

const BucketList = () => {
  const navigate = useNavigate();

  const handleBucketClick = (bucket) => {
    navigate(`/profile/${bucket}`);
  };

  return (
    <>
      <Header />
      <ProfilePageHeaderData />
      <div className="min-h-screen bg-[#F0F7F7] p-4">
        <div className="container mx-auto flex flex-col gap-3">
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
            Your Bucket list
          </p>
          <div className="grid grid-cols-2 gap-8">
            {bucketListData.map((bucket, index) => (
              <div
                key={index}
                className="bg-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 grid grid-cols-2 gap-2 cursor-pointer"
                // onClick={() => handleBucketClick(bucket.title)}
              >
                {/* Large Image */}
                <div className="">
                  <img
                    src={bucket.images[0]}
                    alt={bucket.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                 
                </div>

                {/* Small Images */}
                <div className="grid grid-rows-2 gap-2">
                  <img
                    src={bucket.images[1]}
                    alt={`${bucket.title} - small 1`}
                    className="w-full h-[250px] object-cover rounded-md"
                  />
                  <img
                    src={bucket.images[2]}
                    alt={`${bucket.title} - small 2`}
                    className="w-full h-[250px] object-cover rounded-md"
                  />
                </div>
                <p className="font-poppins font-semibold text-[16px] text-[#212626] text-left">
                    {bucket.title}
                  </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BucketList;
