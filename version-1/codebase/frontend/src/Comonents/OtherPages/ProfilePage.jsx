import React, { useState } from "react";
import Profile from "../../assets/profilePage.jpg";
import ProfilePhoto from "../../assets/profilePhoto.png";
import Photo from "../../assets/1.png";
import Group from "../../assets/headerIcon/Group.png";
import Sidebar from "./Sidebar";
import PostCard from "./PostCard";
import { Edit } from "@mui/icons-material";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Rightbar from "./Rightbar";
import ProfilePageHeaderData from "./ProfilePageHeaderData";

const ProfilePage = () => {
  const naviagte = useNavigate();
  const [activeTab, setActiveTab] = useState("Post");

  function handleEditPage() {
    naviagte("/editprofile");
  }

  return (
    <>
      <Header />
      <ProfilePageHeaderData/>

      <div className="min-h-screen bg-[#F0F7F7] p-4">
        <div className="container mx-auto flex gap-3">
          {/*######################### Post Tab #########################*/}
          {/* Sidebar */}
          
            <div className="w-[340px] flex flex-col">
              <Sidebar />
            </div>
         
          {/* Main Content */}
          
            <div className="w-[696px] flex-grow flex flex-col">
              <PostCard />
            </div>
         
          {/* Rightbar */}
         
            <div className="w-[340px] flex flex-col">
              <Rightbar />
            </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
