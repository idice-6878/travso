import React, { useState } from "react";
import Girl from "../../assets/headerIcon/girl.jpg";
import Boy1 from "../../assets/headerIcon/boy1.png";
import Boy2 from "../../assets/headerIcon/boy2.jpg";
import { useNavigate } from "react-router-dom";

const FollowersSidebar = () => {
  const navigate = useNavigate();
  const [buddies, setbuddies] = useState([
    {
      id: 1,
      name: "Madhulika",
      handle: "@Madhu.lika",
      image: Girl,
      follow: "Followed",
    },
    {
      id: 2,
      name: "Pankaj",
      handle: "@Reet.Pankaj",
      image: Boy1,
      follow: "Followed",
    },
    {
      id: 3,
      name: "Rishab",
      handle: "@frontend",
      image: Boy2,
      follow: "Followed",
    },
    {
      id: 4,
      name: "Madhulika",
      handle: "@Madhu.lika",
      image: Boy1,
      follow: "Followed",
    },
    {
      id: 5,
      name: "Pankaj",
      handle: "@Reet.Pankaj",
      image: Girl,
      follow: "Followed",
    },
    {
      id: 6,
      name: "Rishab",
      handle: "@frontend",
      image: Boy2,
      follow: "Followed",
    },
  ]);

  const [following, setfollowing] = useState([
    {
      id: 1,
      name: "Madhulika",
      handle: "@Madhu.lika",
      image: Girl,
      follow: "Follow",
    },
    {
      id: 2,
      name: "Pankaj",
      handle: "@Reet.Pankaj",
      image: Boy1,
      follow: "Following",
    },
    {
      id: 3,
      name: "Rishab",
      handle: "@frontend",
      image: Boy2,
      follow: "Follow",
    },
    {
      id: 4,
      name: "Madhulika",
      handle: "@Madhu.lika",
      image: Boy1,
      follow: "Following",
    },
    {
      id: 5,
      name: "Pankaj",
      handle: "@Reet.Pankaj",
      image: Girl,
      follow: "Following",
    },
    {
      id: 6,
      name: "Rishab",
      handle: "@frontend",
      image: Boy2,
      follow: "Following",
    },
  ]);

  // State to toggle visibility of more posts
  const [showAllbuddies, setShowAllbuddies] = useState(false);
  const [showAllfollowing, setShowAllfollowing] = useState(false);

  // Show only first 9 posts or all posts based on state
  const visiblePostsbuddies = showAllbuddies ? buddies : buddies.slice(0, 3);

  const visiblePostsfollowing = showAllfollowing
    ? following
    : following.slice(0, 3);


  const handleAllBuddiesList = () =>{
    navigate("/buddiesPage")
  }

  const handleAllFollowing = () =>{
    navigate("/following")
  } 

  return (
    <>
      <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
            Buddies ({buddies.length})
          </h2>
          <p
            onClick={handleAllBuddiesList}
            className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline"
          >
            See All
          </p>
        </div>
        {/* User List */}
        <div className="mt-4 space-y-4">
          {visiblePostsbuddies.map((buddy) => (
            <div key={buddy.id} className="flex items-center justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={buddy.image}
                  alt={buddy.name}
                  className="w-[44px] h-[44px] rounded-full object-cover"
                />
                <div>
                  <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                    {buddy.name}
                  </p>
                  <p className="font-inter font-medium text-[14px] text-[#667877] text-left">
                    {buddy.handle.length > 9
                      ? `${buddy.handle.slice(0, 9)}...`
                      : buddy.handle}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2">
                <button className="w-[76px] h-[36px] text-[14px] text-[#2DC6BE] border border-[#2DC6BE] rounded-[4px] font-medium ">
                  {buddy.follow}
                </button>
                <button className="w-[36px] h-[36px] text-[20px] text-[#2DC6BE] border border-[#2DC6BE] rounded-[4px] font-medium flex items-center justify-center">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.875278 0.875211L9.12486 9.12479M0.875278 9.12479L9.12486 0.875211"
                      stroke="#2DC6BE"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
            Following ({following.length})
          </h2>
          <p
            onClick={handleAllFollowing}
            className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline"
          >
            See All
          </p>
        </div>
        {/* User List */}
        <div className="mt-4 space-y-4">
          {visiblePostsfollowing.map((buddy) => (
            <div key={buddy.id} className="flex items-center justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={buddy.image}
                  alt={buddy.name}
                  className="w-[44px] h-[44px] rounded-full object-cover"
                />
                <div>
                  <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                    {buddy.name}
                  </p>
                  <p className="font-inter font-medium text-[14px] text-[#667877] text-left">
                    {buddy.handle.length > 9
                      ? `${buddy.handle.slice(0, 9)}...`
                      : buddy.handle}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  className={`w-[76px] h-[36px] text-[14px] border rounded-[4px] font-medium ${
                    buddy.follow === "Follow"
                      ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                      : "text-[#2DC6BE] border-[#2DC6BE]"
                  }`}
                >
                  {buddy.follow}
                </button>
                <button
                  className={`w-[36px] h-[36px] text-[16px] border rounded-[4px] font-medium bg-[#2DC6BE] text-white border-[#2DC6BE] flex items-center justify-center ${
                    buddy.follow === "Follow"
                      ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                      : "text-[#2DC6BE] border-[#2DC6BE]"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99984 1.16699V12.8337M1.1665 7.00033H12.8332"
                      stroke="white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FollowersSidebar;