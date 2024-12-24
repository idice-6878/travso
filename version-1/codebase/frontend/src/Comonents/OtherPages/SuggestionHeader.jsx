/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import logo from "../../assets/headerIcon/logo.png";
import girl from "../../assets/headerIcon/girl.jpg";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/slices/authSlice";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";

const SuggestionHeader = () => {
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { user: userDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!userDetails) {
      dispatch(getUserDetails());
    }
  }, [dispatch]);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 ">
        <div
          className={`w-full max-w-[99%] container mx-auto px-3 ${
            isSearchActive ? "" : "py-4"
          } flex items-center justify-between`}
        >
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <img src={logo} alt="TravSo Logo" className="h-8" />
          </div>

          {/* Mobile Menu Toggle (Visible on Mobile) */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Right Section (Hidden on Mobile, Visible on Desktop) */}
          <div className="hidden md:flex flex-1 justify-end items-center">
            {/* Icons and Profile Section */}
            <div className="block max-w-[369px] relative w-full">
              <input
                type="text"
                placeholder="Search for travel buddies or influencers...."
                className="w-full font-inter font-medium h-[48px] pl-12 pr-4 py-2 rounded-full bg-gray-100 border-gray-300 focus:ring-2 focus:ring-[#FFFFFF] outline-none placeholder:text-[16px] placeholder:text-[#667877]"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-[19.74px] h-[20px] text-[#667877]" />
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-px h-6 bg-gray-300 mx-4"></div>
              <div className="relative">
                <ProfileMenu userDetails={userDetails}/>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

// Profile Menu Component
const ProfileMenu = ({userDetails}) => {

  return (
    <div className="flex items-center">
      <div>
        <img
          src={userDetails?.profile_image || dummyUserImage}
          alt="Profile"
          className="w-[40px] h-[40px] rounded-full mr-2"
        />
      </div>
      <div>
        <span className="block font-inter font-medium text-[#212626] text-left text-[16px]">
          {userDetails ? userDetails.user_name : ""}
        </span>
        <p className="font-inter font-medium text-[12px] text-[#667877] text-left">
        {userDetails?.email?.length > 12 ? `${userDetails?.email.slice(0, 12)}...` : userDetails?.email}
        </p>
      </div>
    </div>
  );
};

export default SuggestionHeader;
