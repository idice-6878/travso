/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Girl from "../../../assets/headerIcon/girl.jpg";
import Boy1 from "../../../assets/headerIcon/boy1.png";
import Boy2 from "../../../assets/headerIcon/boy2.jpg";
import communityafter from "../../../assets/communityafter.png";
import communitybefore from "../../../assets/communitybefore.png";

const SavedPopup = ({ isOpen, onClose }) => {
  const [joinBucket, setJoinBucket] = useState([
    {
      id: 1,
      name: "Have to Explore List",
      handle: "12+",
      image: Girl,
    },
    {
      id: 2,
      name: "Explorer",
      handle: "12K member",
      image: Boy1,
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

  const [selectedMonth, setSelectedMonth] = useState("December");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Disable body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
    <style>
        {`
          .no-scroll {
            overflow: hidden;
          }
        `}
    </style>
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-[rgba(0,0,0,0.15)]">
      <div className="w-[480px] max-h-[90vh] bg-white border border-gray-200 shadow-lg rounded-3xl p-3 px-7 overflow-hidden">
        {/* Popup Header */}
        <div className="flex justify-between items-center mb-2 border-b border-[#869E9D] py-2 sticky top-0 bg-white z-10">
          <h3 className="font-poppins text-[24px] font-semibold text-[#212626]">
            Bucket List
          </h3>
          <button
            onClick={onClose}
            className="text-black hover:text-[#2DC6BE] font-bold text-lg"
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Popup Content */}
        <div
          className="overflow-y-auto scrollbar-hidden"
          style={{ maxHeight: "calc(90vh - 70px)" }}
        >
          <div className="mt-4">
            <h2 className="font-poppins text-[20px] font-semibold text-[#212626] text-left">
              When are you planning to visit this place?
            </h2>
            {/* Year and Arrows */}
            <div className="mt-5 mb-4 flex items-center justify-center space-x-10">
              <button className="text-gray-500 text-lg font-bold">&#60;</button>
              <span className="text-[16px] font-inter font-medium text-[#212626]">
                2024
              </span>
              <button className="text-gray-500 text-lg font-bold">&#62;</button>
            </div>

            {/* Month Grid */}
            <div className="grid grid-cols-3 gap-4">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`py-2 px-4 rounded-[4px] text-[16px] font-inter font-medium ${
                    selectedMonth === month
                      ? "bg-teal-500 text-white"
                      : "bg-[#F0F7F7] text-gray-700"
                  } transition-all duration-200`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="font-poppins text-[20px] font-semibold text-[#212626] text-left">
              Choose bucket
            </h2>

            <div className="mb-4 space-y-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button className="text-white bg-[#1DB2AA] w-[48px] h-[48px] mr-2 rounded-[4px] font-bold text-lg">
                    <span style={{ fontSize: "35px" }}>&#43;</span>
                  </button>
                  <div>
                    <h2 className="font-inter font-medium text-[16px] text-[#212626] text-left">
                      Create New Bucket List
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button className="text-white bg-[#1DB2AA] w-[48px] h-[48px] mr-2 rounded-[4px] font-bold text-lg">
                    <span style={{ fontSize: "35px" }}>&#43;</span>
                  </button>
                  <div>
                    <h2 className="font-inter font-medium text-[16px] text-[#212626] text-left">
                      Add with a Buddy
                    </h2>
                  </div>
                </div>
              </div>
              {joinBucket.map((buddy) => (
                <div
                  key={buddy.id}
                  className="flex items-center justify-between"
                >
                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={buddy.image}
                      alt={buddy.name}
                      className="w-[48px] h-[48px] rounded-[4px] object-cover"
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
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SavedPopup;
