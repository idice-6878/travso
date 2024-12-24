import React, { useState } from "react";
import Header from "../Header";
import profilePhoto from "../../../assets/profilePhoto.png";
import Sidebarimage from "../../../assets/headerIcon/boy1.png";
import SearchIcon from "@mui/icons-material/Search";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import p1 from "../../../assets/headerIcon/p1.png";
import p3 from "../../../assets/headerIcon/p3.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SentimentSatisfiedSharpIcon from "@mui/icons-material/SentimentSatisfiedSharp";
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

const ChatPage = () => {
  
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };
  
  return (
    <>
      <Header />

      <div className="flex flex-col md:flex-row bg-[#F0F7F7] px-6 pt-6 gap-6  ">
        {/* Left Sidebar */}
        <div className="w-full md:w-2/5 lg:w-1/4 bg-white shadow-md flex flex-col md:h-[calc(100vh_-_120px)] md:overflow-y-auto xl:h-[calc(100vh_-_96px)] overflow-y-auto  rounded-t-2xl">
          {/* Left Sidebar Header */}
          <div className="p-6 pb-0 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h2 className="xl:text-2xl md:font-poppins xl:font-poppins xl:font-bold font-semibold md:text-xl">
                Messages
              </h2>
            </div>
            <span className="text-gray-400 text-medium font-medium   flex items-center justify-center">
              <button>Requests</button>
            </span>
          </div>

          {/* Left Sidebar Search Box */}
          <div className="p-6 pt-3 pb-2">
            <div className="flex items-center bg-[#F0F7F7] rounded-3xl px-4 py-3 ">
              <SearchIcon className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search...."
                className="w-full font-poppins bg-transparent text-gray-500 text-md focus:outline-none"
              />
            </div>
          </div>

          {/* Tabs (Chats and Request) */}

          {/* Chats Section */}
          <div className="flex-1 overflow-y-auto p-4 pl-6 space-y-2">
            {/* Example Chat Items */}
            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Ajay
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>
            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Vijay
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>
            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Rahul Tiwari
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">my name is rahul sharma what is</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>
            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Krishna Kant Malviya
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>
            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>
            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>
            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>

            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>
            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>

            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>

            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>

            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>

            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>


            <div className="flex items-center bg-teal-50 hover:bg-teal-100 p-3 rounded-lg">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 mr-3 md:w-8 md:h-8"
              />
              <div className="flex-1">
                <p className="xl:text-base xl:font-semibold md:text-sm md:font-semibold flex items-center md:text-nowrap">
                  Pankaj Reet Tech
                  <img src={p1} alt="Icon" className="ml-2 w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500 float-left">wooooo🥰</p>
              </div>
              <span className="text-sm text-gray-400">24m</span>
            </div>

            {/* Repeat other chat items */}
          </div>
        </div>

        {/* Main Chat Box */}
        <div className="flex-1 flex flex-col bg-white mb-6 rounded-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="px-6">
            <div className="flex items-center justify-between border-b-2 py-4 ">
              <div className="flex items-center">
                <img
                  src={profilePhoto}
                  alt="User"
                  className="rounded-full xl:w-10 xl:h-10 md:h-8 md:w-8 mr-2"
                />
                <div>
                  <p className="font-semibold  xl:text-lg flex md:text-sm items-center md:text-nowrap ">
                    Pankaj Reet Tech
                    <img src={p1} alt="Icon 1" className="w-4 h-4 ml-2" />
                    <img src={p3} alt="Icon 2" className="w-4 h-4 ml-1" />
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <FiberManualRecordIcon
                      className="text-green-500"
                      style={{ fontSize: "16px" }}
                    />
                    <span className="ml-1">Online</span>
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className=" bg-gray-100 text-white xl:px-4 xl:py-2 xl:rounded-xl xl:flex xl:items-center xl:space-x-2 xl:bg-[#2DC6BE] md:px-0.5 md:mb-4   md:py:2 px-4 py-2  flex items-center space-x-2 md:bg-[#2DC6BE] md:rounded-full md:h-6 md:w-6 xl:w-auto xl:h-auto">
                  <LocalPhoneIcon
                    style={{ fontSize: "20px", color: "white" }}
                  />
                  <span className="xl:text-white hidden xl:flex  md:flex-shrink-0">
                    Call
                  </span>
                </button>
                <button className=" bg-gray-100 text-white xl:px-6 xl:py-2 xl:rounded-xl xl:flex xl:items-center xl:space-x-2 xl:bg-[#2DC6BE] md:px-0.5 md:mb-4 md:bg-[#2DC6BE]  md:py:2 px-4 py-2  flex items-center space-x-2 md:rounded-full md:h-6 md:w-6 xl:w-auto xl:h-auto">
                  <VideocamOutlinedIcon
                    style={{ fontSize: "20px", color: "white" }}
                  />
                  <span className="xl:text-white hidden xl:flex md:flex-shrink-0">
                    Video call
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1  p-4 space-y-4 xl:max-h-[calc(100vh_-_300px)] md:max-h-[calc(100vh_-_308px)] overflow-y-auto ">
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
                vel officiis tenetur hic ullam aliquam obcaecati consectetur!
                Sunt tempore expedita esse necessitatibus tenetur sapiente
                impedit a. Nemo nam quibusdam rem.
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            <div className="flex items-start space-x-2 text-left">
              <img
                src={profilePhoto}
                alt="User"
                className="rounded-full xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2"
              />
              <div className="bg-gray-200 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm ">
                omg, this is amazing
              </div>
            </div>
            {/* Repeat chat bubbles */}
            <div className="flex items-center justify-end space-x-2">
              <div className="bg-teal-500 text-white px-6  md:px-2 md:py-1  xl:px-2 xl:py-2 rounded-lg max-w-sm text-left">
                How are you?
              </div>
              <img
                src={Sidebarimage}
                alt="User"
                className="xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <div className="bg-teal-500 text-white px-6 py-2 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloremque sequi obcaecati qui totam earum veritatis quidem,
                tenetur quas ducimus quibusdam. Corrupti aperiam saepe possimus?
                Rerum natus recusandae officia similique! Non?
              </div>
              <img
                src={Sidebarimage}
                alt="User"
                className="xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <div className="bg-teal-500 text-white px-6 py-2 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm text-left">
                How are you?
              </div>
              <img
                src={Sidebarimage}
                alt="User"
                className="xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <div className="bg-teal-500 text-white px-6 py-2 md:px-2 md:py-1  xl:px-4 xl:py-2 rounded-lg max-w-sm text-left">
                How are you?
              </div>
              <img
                src={Sidebarimage}
                alt="User"
                className="xl:w-10 xl:h-10 md:w-8 md:h-8 md:ml-2 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 flex items-center bg-white space-x-2">
            {/* Profile Image */}
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />

            {/* Input Box */}
            <div className="flex flex-1 items-center bg-gray-100 rounded-full px-4 py-0 pr-0  space-x-2">
              <button className="text-gray-400 mr-2">
                <SentimentSatisfiedSharpIcon style={{ fontSize: "24px" }} />
              </button>
              <input
                type="text"
                placeholder="Type a message"
                className="flex-1 bg-transparent focus:outline-none text-gray-600 md:w-full"
              />
              {/* Action Icons */}
              <div className="flex items-center space-x-4">
                <button className="xl:flex md:hidden">
                  <InsertPhotoOutlinedIcon
                    style={{ fontSize: "24px", color: "gray" }}
                  />
                </button>
                <button className="xl:flex md:hidden">
                  <SmartDisplayOutlinedIcon style={{ fontSize: "24px", color: "gray" }} />
                </button>
                <button className="xl:flex md:hidden">
                  <InsertDriveFileIcon
                    style={{ fontSize: "24px", color: "gray" }}
                  />
                </button>
                <button className="xl:flex md:hidden">
                  <AccountBoxOutlinedIcon
                    style={{ fontSize: "24px", color: "gray" }}
                  />
                </button>
                

                {/* file open popup section  */}
                
                <button className="xl:hidden" onClick={togglePopup}> 
                  <AttachFileOutlinedIcon
                    style={{ fontSize: "24px", color: "gray" }}
                  />
                </button>
                <button className="bg-teal-500 p-3 rounded-full flex items-center justify-center">
              <SendOutlinedIcon style={{ fontSize: "24px", color: "white" }} />
            </button>
                
                {/* file open popup section  */}

                {isPopupOpen && (
                  <div className="absolute bg-white shadow-md rounded-lg p-4 mt-2 flex flex-col space-y-4">
                    <button className=" items-center space-x-2">
                      <InsertPhotoOutlinedIcon
                        style={{ fontSize: "24px", color: "gray" }}
                      />
                      <span></span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <VideocamOutlinedIcon
                        style={{ fontSize: "24px", color: "gray" }}
                      />
                      <span></span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <InsertDriveFileIcon
                        style={{ fontSize: "24px", color: "gray" }}
                      />
                      <span></span>
                    </button>
                    <button className="flex items-center space-x-2">
                      <SentimentSatisfiedSharpIcon
                        style={{ fontSize: "24px", color: "gray" }}
                      />
                      <span></span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
          </div>
          {/* Send Button */}
        </div>
      </div>
    </>
  );
};

export default ChatPage;