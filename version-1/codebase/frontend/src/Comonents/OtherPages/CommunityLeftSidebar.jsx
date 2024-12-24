import React, { useState } from "react";
import dotThree from "../../assets/dotthree.png";
import Girl from "../../assets/headerIcon/girl.jpg";
import Boy1 from "../../assets/headerIcon/boy1.png";
import Boy2 from "../../assets/headerIcon/boy2.jpg";
import ArchiveMinus from "../../assets/archive-minus.png";
import communityafter from "../../assets/communityafter.png";
import communitybefore from "../../assets/communitybefore.png";
import RightArrow from "../../assets/rightarrow.png";
// import energy from "../../assets/energy.png";
import plus from "../../assets/plus.png";
import earth from "../../assets/earth.png";

const CommunityLeftSidebar = () => {
  const [joinCommunity, setJoinCommunity] = useState([
    {
      id: 1,
      name: "Adventurer",
      handle: "12K member",
      image: Girl,
    },
    {
      id: 2,
      name: "Explorer",
      handle: "12K member",
      image: Boy1,
    },
    {
      id: 3,
      name: "Foodie",
      handle: "12K member",
      image: Boy2,
    },
    {
      id: 4,
      name: "Traveler",
      handle: "12K member",
      image: Boy1,
    },
    {
      id: 5,
      name: "TravSo",
      handle: "12K member",
      image: Girl,
    },
  ]);

  const [imageStates, setImageStates] = useState({});

  const handleImageClick = (id) => {
    setImageStates((prevStates) => {
      const newState = { ...prevStates };
      newState[id] =
        newState[id] === communitybefore ? communityafter : communitybefore;
      return newState;
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5">
        
        <h2 className="mb-4 font-poppins text-[20px] font-semibold text-[#212626] text-left">
            Important Links 
          </h2>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={ArchiveMinus}
              alt="ArchiveMinus"
              className="w-[22px] h-[22px] rounded-full"
            />
            <h2 className="font-poppins font-medium text-[14px] text-[#212626] text-left">
              Bucket list
            </h2>
          </div>
          <div>
            <img
              src={RightArrow}
              alt="ArchiveMinus"
              className="w-2 h-3 rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={earth}
              alt="ArchiveMinus"
              className="w-[20px] h-[20px] rounded-full"
            />
            <h2 className="font-poppins font-medium text-[14px] text-[#212626] text-left">
              Explore
            </h2>
          </div>
          <div>
            <img
              src={RightArrow}
              alt="ArchiveMinus"
              className="w-2 h-3 rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={plus}
              alt="ArchiveMinus"
              className="w-[20px] h-[20px] rounded-full"
            />
            <h2 className="font-poppins font-medium text-[14px] text-[#212626] text-left">
               Buddies Request
            </h2>
          </div>
          <div>
            <img
              src={RightArrow}
              alt="ArchiveMinus"
              className="w-2 h-3 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5">
        <div className="flex items-center justify-between">
        <h2 className="font-poppins text-[20px] font-semibold text-[#212626] text-left">
          Join Community
        </h2>
        <img 
         src={dotThree}
         className="w-[24px ]h-[24px] object-cover"
         alt="dotThree"
        />
        </div>
        
        <div className="mt-2 mb-4 space-y-4 border-b py-3">
          {joinCommunity.map((buddy) => (
            <div key={buddy.id} className="flex items-center justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={buddy.image}
                  alt={buddy.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                    {buddy.name}
                  </p>
                  <p className="font-inter font-medium text-[12px] text-[#667877] text-left">
                    {buddy.handle}
                  </p>
                </div>
              </div>

              {/* Show Image Data Section */}
              <img
                src={imageStates[buddy.id] || communityafter}
                alt="Toggleable"
                onClick={() => handleImageClick(buddy.id)}
                className="w-[24px] h-[24px] cursor-pointer"
              />
            </div>
          ))}
        </div>
        <button className="font-inter font-medium text-[#2DC6BE] text-[14px] px-4 py-2 hover:px-4 hover:py-2 rounded-md hover:bg-teal-600 hover:text-white">
          See All
        </button>
      </div>

      <div className="mt-2 flex-col text-center justify-center">
        <div className="flex text-center justify-center gap-5">
          <p className="text-[#667877] text-[12px] cursor-pointer hover:text-teal-600 font-semibold font-inter">
            About
          </p>
          <p className="text-[#667877] text-[12px] cursor-pointer hover:text-teal-600 font-semibold font-inter">
            Help
          </p>
          <p className="text-[#667877] text-[12px] cursor-pointer hover:text-teal-600 font-semibold font-inter">
            Privacy
          </p>
          <p className="text-[#667877] text-[12px] cursor-pointer hover:text-teal-600 font-semibold font-inter">
            Jobs
          </p>
          <p className="text-[#667877] text-[12px] cursor-pointer hover:text-teal-600 font-semibold font-inter">
            Language
          </p>
        </div>
        <div className="mt-1">
          <p className="text-[#667877] text-[12px] cursor-pointer hover:text-teal-600 font-semibold font-inter">
            Copyright @2024 TravSo
          </p>
        </div>
      </div>
    </>
  );
};

export default CommunityLeftSidebar;