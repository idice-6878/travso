import React, { useState } from "react";
import Girl from "../../assets/headerIcon/girl.jpg";
import Boy1 from "../../assets/headerIcon/boy1.png";
import Boy2 from "../../assets/headerIcon/boy2.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import { followUnfollow, followUnfollowOnFollowing } from "../../redux/slices/postSlice";
import { getUserFollowers, toWhomUserIsFollowing } from "../../redux/slices/authSlice";


const BuddiesSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
 const { userBuddies, user: userDetails, userPosts, userFollowers, toWhomUserFollows } = useSelector((state) => state.auth);


  const [followers, setfollowers] = useState([
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
  const [showAllfollowers, setShowAllfollowers] = useState(false);
  const [showAllfollowing, setShowAllfollowing] = useState(false);

  const visiblePostsfollowes = showAllfollowers
  ? (userFollowers ? userFollowers : [])
  : ( userFollowers ? userFollowers.slice(0, 3) : []);

  const visiblePostsfollowing = showAllfollowing
  ? (toWhomUserFollows ? toWhomUserFollows : [])
  : ( toWhomUserFollows ? toWhomUserFollows.slice(0, 3) : []);


  const handleAllFollowers = () =>{
    navigate("/followers")
  }

  const handleAllFollowing = () =>{
    navigate("/following")
  } 

  // to follow and unfollow a user in follower section
  const handleFollowUnfollow = async(followeeID) => {
    try {
      const followUnfollowResponse = await dispatch(followUnfollow(followeeID)).unwrap();
      if(followUnfollowResponse) {
        await dispatch(getUserFollowers());
        await dispatch(toWhomUserIsFollowing());
      }
    } catch (error) {
      console.log("==error in handleFollowUnfollow==", error);
    }
  }

  // to follow unfollow user in following section
  const handleFollowUnfollowForFollowing = async(followeeID) => {
    try {
      const followUnfollowResponse = await dispatch(followUnfollowOnFollowing(followeeID)).unwrap();
      if(followUnfollowResponse) {
        await dispatch(getUserFollowers());
        await dispatch(toWhomUserIsFollowing());
      }
    } catch (error) {
      console.log("==error in handleFollowUnfollowForFollowing==", error);
    }
  } 


  return (
    <>
      <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
            Followers ({userFollowers ? userFollowers.length : "0"})
          </h2>
          <p
            onClick={handleAllFollowers}
            className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline"
          >
           See All
          </p>
        </div>
        {/* User List */}
        <div className="mt-4 space-y-4">
          {visiblePostsfollowes.map((follower) => (
            <div key={follower.id} className="flex items-center justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={follower.profile_image || dummyUserImage}
                  alt={'Profile'}
                  className="w-[44px] h-[44px] rounded-full object-cover"
                />
                <div>
                  <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                    {follower.full_name}
                  </p>
                  <p className="font-inter font-medium text-[14px] text-[#667877] text-left">
                  {follower.user_name ? follower.user_name.length > 9
                      ? `@${follower.user_name.slice(0, 9)}...`
                      : `@${follower.user_name}` : ""}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  className={`w-[76px] h-[36px] text-[14px] border rounded-[4px] font-medium ${
                    follower.is_mutual == 0
                      ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                      : "text-[#2DC6BE] border-[#2DC6BE]"
                  }`}
                  onClick={follower.is_mutual === 1 ? () => handleFollowUnfollow(follower?.id) : () =>handleFollowUnfollowForFollowing(follower?.id) }
                >
                  {follower.follow}
                </button>
                <button
                  className={`w-[36px] h-[36px] text-[20px] text-sm border rounded-[4px] font-medium bg-[#2DC6BE] text-white border-[#2DC6BE] flex items-center justify-center ${
                    follower.follow === "Follow"
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

export default BuddiesSidebar;