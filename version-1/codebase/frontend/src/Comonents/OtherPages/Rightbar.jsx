import React, { useEffect, useState } from "react";
import Girl from "../../assets/headerIcon/girl.jpg";
import Boy1 from "../../assets/headerIcon/boy1.png";
import Boy2 from "../../assets/headerIcon/boy2.jpg";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import { useLocation, useNavigate } from "react-router-dom";
import { addBuddy, getSuggestionList, getUserBuddies, getUserFollowers, removeBuddy, toWhomUserIsFollowing } from "../../redux/slices/authSlice";
import { followUnfollow, followUnfollowOnFollowing } from "../../redux/slices/postSlice";

const Rightbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

 const { userBuddies, user: userDetails, userPosts, userFollowers, toWhomUserFollows } = useSelector((state) => state.auth);

 useEffect(()=> {
  if(!toWhomUserFollows) {
    dispatch(toWhomUserIsFollowing())
  }
  if(!userBuddies) {
    dispatch(getUserBuddies());
  }
 },[dispatch]);

 useEffect(() => {
  // Update the state based on the current route
  if (location.pathname === "/buddiespage") {
    setHideBuddiesList(true);
  } else {
    setHideBuddiesList(false);
  }

  if (location.pathname === "/followers") {
    setHideFollowerList(true);
  } else {
    setHideFollowerList(false);
  }

  if (location.pathname === "/following") {
    setHideFollowingList(true);
  } else {
    setHideFollowingList(false);
  }

}, [location.pathname]);

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
  const [showAllbuddies, setShowAllbuddies] = useState(false);
  const [showAllfollowers, setShowAllfollowers] = useState(false);
  const [showAllfollowing, setShowAllfollowing] = useState(false);

  // states to show buddies, followers, following list when they are opened on left side
  const [hideBuddiesList, setHideBuddiesList] = useState(false);
  const [hideFollowerList, setHideFollowerList] = useState(false);
  const [hideFollowingList, setHideFollowingList] = useState(false);

  // Show only first 9 posts or all posts based on state
  // const visiblePostsbuddies = showAllbuddies ? buddies : buddies.slice(0, 3);
  const visiblePostsbuddies = showAllbuddies ? (userBuddies ? userBuddies : []) : userBuddies ? userBuddies.slice(0, 3) : [];
  // console.log("====userBuddies===", userBuddies);
  // const visiblePostsfollowes = showAllfollowers
  //   ? followers
  //   : followers.slice(0, 3);

  const visiblePostsfollowes = showAllfollowers
    ? (userFollowers ? userFollowers : [])
    : ( userFollowers ? userFollowers.slice(0, 3) : []);

  // const visiblePostsfollowing = showAllfollowing
  //   ? following
  //   : following.slice(0, 3);

  const visiblePostsfollowing = showAllfollowing
    ? (toWhomUserFollows ? toWhomUserFollows : [])
    : ( toWhomUserFollows ? toWhomUserFollows.slice(0, 3) : []);



    const handleAllBuddiesList = () =>{
      setHideBuddiesList(true);
      navigate("/buddiespage")
    }
  
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
        await dispatch(getUserBuddies());
        await dispatch(toWhomUserIsFollowing());
        await dispatch(getSuggestionList());
      }
    } catch (error) {
      console.log("==error in handleFollowUnfollow==", error);
    }
  }

  // to follow unfollow user in following section
  const handleFollowUnfollowForFollowing = async(followeeID) => {
    console.log("===followeeID===>", followeeID);
    try {
      const followUnfollowResponse = await dispatch(followUnfollowOnFollowing(followeeID)).unwrap();
      if(followUnfollowResponse) {
        await dispatch(getUserFollowers());
        await dispatch(toWhomUserIsFollowing());
        await dispatch(getUserBuddies());
        await dispatch(getSuggestionList());
      }
    } catch (error) {
      console.log("==error in handleFollowUnfollowForFollowing==", error);
    }
  } 

  // handle add buddy
const handleAddBuddy = async(buddyId) => {
  try {
    const response = await dispatch(addBuddy(buddyId)).unwrap();
    if(response) {
      await dispatch(getUserFollowers());
      await dispatch(getUserBuddies());
      await dispatch(toWhomUserIsFollowing());
    }
  } catch (error) {
    console.log("==error in handleAddBuddy==", error);
  }
}

// handle remove buddy
const handleBuddyRemove = async(buddyId) => {
  
  try {
    const response = await dispatch(removeBuddy(buddyId));
    if(response) {
      await dispatch(getUserFollowers());
      await dispatch(getUserBuddies());
      await dispatch(toWhomUserIsFollowing());
    }
  } catch (error) {
    console.log("==error in handleBuddyRemove ===>", error);
  }
}

  return (
    <>
      {
        !hideBuddiesList && (
        <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
              Buddies ({userBuddies ? userBuddies.length : "0"})
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
                    src={buddy.profile_image || dummyUserImage}
                    alt={"Profile"}
                    className="w-[44px] h-[44px] rounded-full object-cover"
                  />
                  <div>
                    <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                      {buddy.full_name}
                    </p>
                    <p className="font-inter font-medium text-[14px] text-[#667877] text-left">
                      {buddy.user_name ? buddy.user_name.length > 9
                        ? `@${buddy.user_name.slice(0, 9)}...`
                        : `@${buddy.user_name}` : ""}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-2">
                  <button 
                    className={`w-[76px] h-[36px] text-[14px] border rounded-[4px] font-medium ${
                      buddy.is_followers == 0
                        ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                        : "text-[#2DC6BE] border-[#2DC6BE]"
                    }`}
                    // onClick={() => handleFollowUnfollowForFollowing(buddy?.id)}  
                    // onClick={() => handleFollowUnfollow(buddy?.id)} 
                    onClick={buddy.is_followers === 1 ? () => handleFollowUnfollowForFollowing(buddy?.id) : () =>handleFollowUnfollow(buddy?.id) } 
                  >
                  {buddy.is_followers === 0 ? "Follow" : "Following"}
                  </button>
                  <button 
                    className="w-[36px] h-[36px] text-[20px] text-[#2DC6BE] border border-[#2DC6BE] rounded-[4px] font-medium flex items-center justify-center"
                    onClick={() => handleBuddyRemove(buddy?.id)}
                  >
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
        )
      }
      
      {
        !hideFollowerList && (
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
            <div key={`${follower.id}_follower`} className="flex items-center justify-between">
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
                // onClick={() => handleFollowUnfollow(follower?.id)}
                onClick={follower.is_mutual === 1 ? () => handleFollowUnfollow(follower?.id) : () =>handleFollowUnfollowForFollowing(follower?.id) }
                >
                  {follower.is_mutual !== 0 ? "Remove" : "Follow"}
                </button>
                {
                  follower?.is_buddies === 0 ? (<>
                  <button
                  className={`w-[36px] h-[36px] text-[20px] text-sm border rounded-[4px] font-medium bg-[#2DC6BE] text-white border-[#2DC6BE] flex items-center justify-center ${
                    follower.is_buddies === 0
                      ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                      : "text-[#2DC6BE] border-[#2DC6BE]"
                  }`}
                onClick={() => handleAddBuddy(follower?.id)}
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
                  </>) : (<>
                    <button 
                    className="w-[36px] h-[36px] text-[20px] text-[#2DC6BE] border border-[#2DC6BE] rounded-[4px] font-medium flex items-center justify-center"
                    onClick={() => handleBuddyRemove(follower?.id)}
                  >
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
                  </>)
                }
                
              </div>
            </div>
          ))}
        </div>
      </div>

        )
      }

      {
        !hideFollowingList && (
        <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
            Following ({toWhomUserFollows ? toWhomUserFollows.length : "0"})
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
          {visiblePostsfollowing.map((userFollowing) => (
            <div key={`${userFollowing.id}_following`} className="flex items-center justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <img
                  src={userFollowing.profile_image || dummyUserImage}
                  alt={'Profile'}
                  className="w-[44px] h-[44px] rounded-full object-cover"
                />
                <div>
                  <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                    {userFollowing.full_name}
                  </p>
                  <p className="font-inter font-medium text-[14px] text-[#667877] text-left">
                  {userFollowing.user_name ? userFollowing.user_name.length > 9
                      ? `@${userFollowing.user_name.slice(0, 9)}...`
                      : `@${userFollowing.user_name}` : ""}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  className={`w-[76px] h-[36px] text-[14px] border rounded-[4px] font-medium ${
                    userFollowing.is_mutual === 0
                      ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                      : "text-[#2DC6BE] border-[#2DC6BE]"
                  }`}
                  onClick={() => handleFollowUnfollowForFollowing(userFollowing.id)}
                >
                  {userFollowing.is_mutual === 0 ? "Follow" : "Following"}
                </button>
                {
                  userFollowing?.is_buddies === 0 ? (<>
                  <button
                  className={`w-[36px] h-[36px] text-[16px] border rounded-[4px] font-medium bg-[#2DC6BE] text-white border-[#2DC6BE] flex items-center justify-center ${
                    userFollowing.is_buddies === 0
                      ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                      : "text-[#2DC6BE] border-[#2DC6BE]"
                  }`}
                  onClick={() => handleAddBuddy(userFollowing.id)}
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
                  </>) : (<>
                    <button 
                    className="w-[36px] h-[36px] text-[20px] text-[#2DC6BE] border border-[#2DC6BE] rounded-[4px] font-medium flex items-center justify-center"
                    onClick={() => handleBuddyRemove(userFollowing?.id)}
                  >
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
                  </>)
                }
                
              </div>
            </div>
          ))}
        </div>
      </div>
        )
      }
      
    </>
  );
};

export default Rightbar;
