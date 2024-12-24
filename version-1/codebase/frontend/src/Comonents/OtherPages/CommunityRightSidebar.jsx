import React, { useEffect, useState } from "react";
import Boy1 from "../../assets/headerIcon/boy1.png";
import Girl from "../../assets/headerIcon/girl.jpg";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import { followUnfollow, followUnfollowOnFollowing } from "../../redux/slices/postSlice";
import { addBuddy, getAllUsers, getOnlineFriends, getSuggestionList, getUserBuddies, getUserFollowers, removeBuddy, toWhomUserIsFollowing } from "../../redux/slices/authSlice";

const CommunityRightSidebar = () => {
  const dispatch = useDispatch();
  const [showAllActives, setShowAllActives] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const data = [
    { id: 1, src: Boy1, label: "Arjun Kumar" },
    { id: 2, src: Girl, label: "Priya Sharma" },
    { id: 3, src: Boy1, label: "Rohit Singh" },
    { id: 4, src: Girl, label: "Sneha Patel" },
    { id: 5, src: Boy1, label: "Vikram Das" },
    { id: 6, src: Boy1, label: "Amit Verma" },
    { id: 7, src: Girl, label: "Anjali Mehta" },
    { id: 8, src: Boy1, label: "Karan Thakur" },
  ];

  const users = [
    {
      id: 1,
      name: "Madhulika",
      username: "@Madhu.lika",
      image: Girl,
      isFollowing: false,
    },
    {
      id: 2,
      name: "Reet Sharma",
      username: "@Reet.sharma",
      image: Boy1,
      isFollowing: true,
    },
    {
      id: 3,
      name: "Anjali Roy",
      username: "@Anjali.roy",
      image: Girl,
      isFollowing: false,
    },
  ];

  /* redux state data starts */

  const { onlineFriends, allUsers, suggestionList } = useSelector((state) => state.auth);
  const [suggestions, setSuggestions] = useState(suggestionList || null);

  /* redux state data ends */

  useEffect(() => {

    if(!suggestionList) {
      dispatch(getSuggestionList());
    }

    if(suggestionList) {
      setSuggestions(suggestionList)
    }
  },[suggestionList, dispatch]);

  const handleFollow = async(followeeID) => {
    // setSuggestions((prevSuggestions) =>
    //   prevSuggestions.map((user) =>
    //     user.id === followeeID
    //       ? { ...user, isFollowing: !user.isFollowing }
    //       : user
    //   )
    // );

    try {
       const followResponse = await dispatch(followUnfollow(followeeID)).unwrap();
      //  console.log("====followResponse===>", followResponse);
       if(followResponse) {
        dispatch(getSuggestionList());
       }
    } catch (error) {
      console.log("===error===in handleFollow===>", error);
    }
    await dispatch(getAllUsers())
  };

  // Toggle friends to show only 8 or all
  const displayedFriends = onlineFriends
    ? showAllActives
      ? onlineFriends
      : onlineFriends.slice(0, 8)
    : null;


  const displayedSuggestion = suggestions ? showAllSuggestions ? suggestions : suggestions.slice(0, 4) : null;

  // handle add buddy
  const handleAddBuddy = async(buddyId) => {
    try {
      const response = await dispatch(addBuddy(buddyId));
      if(response) {
        await dispatch(getSuggestionList());
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
        await dispatch(getSuggestionList());
      }
    } catch (error) {
      console.log("==error in handleBuddyRemove ===>", error);
    }
  }

  // to follow unfollow user in following section
  const handleFollowUnfollowForFollowing = async(followeeID) => {
    console.log("=====followeeID====>", followeeID);
    
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5">
        <h2 className="mb-4 font-poppins text-[20px] font-semibold text-[#212626] text-left">
          Active Friends {`(${(onlineFriends && onlineFriends.length) || "0"})`}
        </h2>
        <div className="grid grid-cols-4 gap-1">
          {displayedFriends &&
            displayedFriends.map((userData) => (
              <div
                key={userData.id}
                className="flex flex-col userDatas-center mb-2"
              >
                <img
                  src={userData.profile_image || dummyUserImage}
                  className="w-[64px] h-[64px] object-cover rounded-full border-2 border-[#2DC6BE] p-[2px]"
                />
                <p className="font-inter font-medium text-[14px] mt-2 text-[#212626]">
                  {userData.full_name.length > 7 ? `${userData.full_name.slice(0, 7)}...` : userData.full_name}
                </p>
              </div>
            ))}
        </div>
        {onlineFriends && onlineFriends.length > 8 && (
          <button
            onClick={() => setShowAllActives(!showAllActives)}
            className="font-inter font-medium text-[#2DC6BE] text-[14px] px-4 py-2 hover:px-4 hover:py-2 rounded-md hover:bg-teal-600 hover:text-white"
          >
            {showAllActives ? "Show Less" : "See All"}
          </button>
        )}
      </div>
      <div className="mt-4 bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins text-[20px] font-semibold text-[#212626] text-left">
            Suggestion For You
          </h2>
          <button
           className="font-inter font-medium text-[#2DC6BE] text-[14px] px-4 py-2 hover:px-4 hover:py-2 rounded-md hover:bg-teal-600 hover:text-white"
           onClick={() => setShowAllSuggestions(!showAllSuggestions)} 
          >
            {showAllSuggestions ? "See Less" : "See All"}
            
          </button>
        </div>

        <div className="mt-2 mb-4 space-y-4 border-b py-3">
        {displayedSuggestion && displayedSuggestion.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={user.profile_image || dummyUserImage}
                alt={user.full_name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                  {/* {user.full_name} */}
                  {user.full_name.length > 7 ? user.full_name.slice(0, 7) + '...' : user.full_name}
                </p>
                <p className="font-inter font-medium text-[12px] text-[#667877] text-left">
                  {/* {user.user_name} */}
                  {user.user_name && user.user_name.length > 7 ? user.user_name.slice(0, 7) + '...' : user.user_name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleFollowUnfollowForFollowing(user.id)}
                // onClick={() => handleFollow(user.id)}
                className={`w-[76px] h-[36px] text-sm font-semibold border-2 rounded-lg font-semibold ${
                  user.is_mutual == 0
                    ? "text-white border-[#2DC6BE] bg-[#2DC6BE] hover:bg-[#2DC6BE] hover:text-white"
                    : "text-[#2DC6BE] border-[#2DC6BE] hover:bg-[#2DC6BE] hover:text-white"
                }`}
              >
                {user.is_mutual == 1 ? "Following" : "Follow"}
              </button>
              {/* <button
                className={`w-[36px] h-[36px] text-sm font-semibold border-2 rounded-lg font-semibold ${
                  user.isFollowing
                    ? "text-white border-[#2DC6BE] bg-[#2DC6BE] hover:bg-[#2DC6BE] hover:text-white"
                    : "text-[#2DC6BE] border-[#2DC6BE] hover:bg-[#2DC6BE] hover:text-white"
                }`}
              >
                +
              </button> */}
              {
                  user?.is_buddies === 0 ? (<>
                  <button
                  className={`w-[36px] h-[36px] text-[20px] text-sm border rounded-[4px] font-medium bg-[#2DC6BE] text-white border-[#2DC6BE] flex items-center justify-center ${
                    user.is_buddies === 0
                      ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                      : "text-[#2DC6BE] border-[#2DC6BE]"
                  }`}
                onClick={() => handleAddBuddy(user?.id)}
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
                    onClick={() => handleBuddyRemove(user?.id)}
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
    </>
  );
};

export default CommunityRightSidebar;
