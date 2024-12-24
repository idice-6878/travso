import React,{useState} from "react";
import Profile from "../../assets/profilePage.jpg";
import ProfilePhoto from "../../assets/profilePhoto.png";
import Photo from "../../assets/1.png";
import Group from "../../assets/headerIcon/Group.png";
import Sidebar from "./Sidebar";
import PostCard from "./PostCard";
import { Edit } from '@mui/icons-material';
import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, removeCoverImage, uploadCoverImage } from "../../redux/slices/authSlice";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";


const ProfilePage = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Post");

  const { user: userDetails } = useSelector((state) => state.auth);

  function handleEditPage() {
    naviagte("/editprofile");
  }

  // removing cover image
  const removeCoverPic = async() => {
  //  console.log("yes")
  try {
      const removeCoverImgResult = await dispatch(removeCoverImage()).unwrap();
      if(removeCoverImgResult) {
        await dispatch(getUserDetails());
      }
      // console.log("====removeCoverImgResult====>", removeCoverImgResult);
  } catch (error) {
    console.log("error in cover image profilepage", error);
  }
  }


  // uploading cover image
  // upload cover image
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    // console.log("===file====>", file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        try {
          const uploadImageResult = await dispatch(
            uploadCoverImage({ image: reader.result })
          ).unwrap();
          if(uploadImageResult) {
            await dispatch(getUserDetails());
          }
          console.log("Image upload successful:", uploadImageResult);
        } catch (error) {
          console.error("Image upload failed:", error);
        }
         finally {
          e.target.value = null;
         }
      };
    }
  };


  return (
    <>
    <Header/>
      <div className="mt-5 flex justify-center items-center">
        <div className="w-full max-w-[97%] bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cover Photo Section */}
          <div className="relative">
            <img
              src={userDetails?.cover_image} // Replace with your cover photo URL
              alt="Cover"
              className="w-full h-[500px] object-cover"
            />
            <button className="absolute top-4 right-4 bg-white flex items-center px-3 py-1 text-sm font-medium shadow rounded-lg hover:bg-gray-100">
              <span className="material-icons">photo_camera</span>
              <span className="ml-2">Change cover photo</span>
            </button>
            {/* <div>
              <button type="button" onClick={removeCoverPic}>Remove</button>
              <button type="button" onClick={() =>
                            document.getElementById("cover-upload").click()
                        }>Upload Cover Pic</button>
                <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverUpload}
                    />
            </div> */}
            
          </div>

          {/* Profile and Info Section */}
          <div className="relative bg-white p-4">
            {/* Profile Picture */}
            <div className="absolute -top-14 left-12 rounded-full border-4 border-[#2DC6BE] shadow-lg ">
              <img
                src={userDetails?.profile_image || dummyUserImage} // Replace with your profile photo URL
                alt="Profile"
                className={`w-28 h-28 rounded-full border-4 border-white shadow-lg ${userDetails?.profile_image ? '' : 'bg-gray-50'}`}
              />
            </div>
            {/* User Info */}
            <div className="ml-40 -mt-2 flex-col items-center">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                {userDetails?.full_name}
                <img
                  src={Group}
                  alt="group"
                  className="w-8 h-8 ml-4 rounded-full"
                />
              </h1>
              <p className="text-gray-500 text-left">{userDetails?.user_name}</p>
            </div>

            {/* Buttons */}
            <div className="absolute top-4 right-8 flex space-x-4">
              <button className="bg-teal-500 text-white px-10 py-2 rounded-lg shadow hover:bg-teal-600 font-bold">
                Add Story
              </button>
              <button className="border border-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow hover:bg-gray-300 " onClick={handleEditPage}>
              <FontAwesomeIcon icon={faEdit} className="mr-2 text-sm" /> Edit
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4">
            <nav className="flex gap-[1px] border-t border-[#1DB2AA17] bg-[#1DB2AA17]">
              {["Post", "About", "Buddies", "Gallery", "Bucket List"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? "text-white bg-[#1DB2AAC2]"
                        : "text-gray-500"
                    } font-medium px-8 hover:px-8 hover:text-white hover:bg-[#1DB2AAC2] hover:p-2 p-2`}
                  >
                    {tab}
                  </button>
                )
              )}
            </nav>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto flex gap-6">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div className="w-3/4">
            <PostCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
