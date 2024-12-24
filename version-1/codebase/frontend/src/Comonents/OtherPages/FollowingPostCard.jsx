import React, { useState } from "react";
import starBadges from "../../assets/starBadges.png";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import { followUnfollowOnFollowing } from "../../redux/slices/postSlice";
import { addBuddy, getUserBuddies, getUserFollowers, removeBuddy, toWhomUserIsFollowing } from "../../redux/slices/authSlice";


const FollowingPostCard = () => {
  const dispatch = useDispatch();
  const [buddyStates, setBuddyStates] = useState({});
  const [buddyFollow, setBuddyFollow] = useState({});
  const [isInfluencerbuddyStates, setIsInfluencerBuddyStates] = useState({});
  const [isInfluencerbuddyFollow, setIsInfluencerBuddyFollow] = useState({});

  const { toWhomUserFollows } = useSelector((state) => state.auth);


  const handleAddBuddyClick = (index) => {
    setBuddyStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index], // Toggle the state for the specific button
    }));
  };

  const handleFollowBuddyClick = (index) => {
    setBuddyFollow((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index], // Toggle the state for the specific button
    }));
  };

  const handleIsInfluencerAddBuddyClick = (index) => {
    setIsInfluencerBuddyStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index], // Toggle the state for the specific button
    }));
  };

  const handleIsInfluencerFollowBuddyClick = (index) => {
    setIsInfluencerBuddyFollow((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index], // Toggle the state for the specific button
    }));
  };

  const BuddiesData = [
    {
      name: "Madhulika Sharma",
      username: "@Madhu.lika",
      trips: 252,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Solo Traveler",
      isInfluencer: 0,
    },
    // Add 8 more objects like the above
    {
      name: "Rohit Verma",
      username: "@rohit.verma",
      trips: 180,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Adventure Seeker",
      isInfluencer: 0,
    },
    {
      name: "Anjali Singh",
      username: "@anjali.singh",
      trips: 320,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Globetrotter",
      isInfluencer: 1,
    },
    {
      name: "Rajesh Kapoor",
      username: "@rajesh.kapoor",
      trips: 150,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Cultural Enthusiast",
      isInfluencer: 0,
    },
    {
      name: "Sana Malik",
      username: "@sana.malik",
      trips: 240,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Photographer",
      isInfluencer: 1,
    },
    {
      name: "Neha Gupta",
      username: "@neha.gupta",
      trips: 200,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Foodie Traveler",
      isInfluencer: 0,
    },
    {
      name: "Kabir Khanna",
      username: "@kabir.khanna",
      trips: 180,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Explorer",
      isInfluencer: 0,
    },
    {
      name: "Priya Desai",
      username: "@priya.desai",
      trips: 270,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Nature Lover",
      isInfluencer: 0,
    },
    {
      name: "Amitabh Reddy",
      username: "@amitabh.reddy",
      trips: 290,
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas.",
      role: "Wildlife Traveler",
      isInfluencer: 0,
    },
  ];

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

    // handle add buddy
const handleAddBuddy = async(buddyId) => {
  try {
    const response = await dispatch(addBuddy(buddyId));
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
  console.log("===buddyId===>", buddyId)
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {toWhomUserFollows && toWhomUserFollows.map((profile, index) => (
          <div
            key={profile?.id}
            className="bg-white relative rounded-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 mb-4"
          >
            {
              profile?.cover_image ? (<>
              <img
              src={profile?.cover_image}
              alt="Background"
              className="w-full h-[80px] object-cover rounded-[12px]"
            />
              </>) : (
                <div className="w-full h-[80px] object-cover rounded-[12px] bg-[#F0F7F7]" >
              </div>
              )
            }
            {profile.is_influencer === 1 && (
              <img
                src={starBadges}
                alt={starBadges}
                className="absolute top-[16px] left-[16px] w-[64px] h-[64px] rounded-t-[12px]"
              ></img>
            )}

            <div className="relative w-16 h-16 -mt-8 left-4 border-4 border-white rounded-full overflow-hidden">
              <img
                src={profile?.profile_image || dummyUserImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h5 className="font-poppins text-left text-[20px] font-semibold mt-1 text-[#212626]">
              {profile.full_name}
            </h5>
            <p className="font-inter text-left text-[16px] text-[#667877] font-medium -mt-1">
              {`@${profile.user_name}`}
            </p>

            {profile.is_influencer === 0 && (
              <p className="bg-[#E5FFFE] w-[174px] h-[32px] font-inter font-medium text-left text-[12px] text-[#212626] my-2 rounded-full flex items-center justify-center">
                {/* {profile.role} • {profile.trips} Trips */}
                {`${profile.role || 'Solo Travler'} • ${profile.trips || 0} Trips`}
              </p>
            )}
            {profile.is_influencer === 1 && (
              <p className="bg-gradient-to-r from-[#1DB2AA] to-[#bae53da1] w-[174px] h-[32px] font-inter font-medium text-left text-[12px] text-[#212626] my-2 rounded-full flex items-center justify-center">
                {/* {profile.role} • {profile.trips} Trips */}
                {`${profile.role || 'Solo Traveler'} • ${profile.trips || 0} Trips`}
              </p>
            )}

            <p className="font-inter font-medium text-left text-[#212626] text-[14px] mt-3 text-justify">
              {profile.description}
            </p>
            {profile.is_influencer === 0 && (
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  // onClick={() => handleAddBuddyClick(index)}
                  className={`w-full font-inter font-medium text-[14px] h-[36px] rounded-[4px] ${
                    profile?.is_buddies === 0
                      ? "bg-[#1DB2AA] text-white"
                      : "bg-[#F0F7F7] text-[#667877]"
                  }`}
                  onClick={profile?.is_buddies === 1 ? () => handleBuddyRemove(profile?.id) : () => handleAddBuddy(profile?.id)}
                >
                  {profile?.is_buddies === 1 ? "Added" : "Add as Buddy"}
                </button>
                <button
                  // onClick={() => handleFollowBuddyClick(index)}
                  className={`w-full font-inter font-medium text-[14px] h-[36px] rounded-[4px] ${
                    profile?.is_mutual === 0
                      ? "bg-[#1DB2AA] text-white"
                      : "bg-[#F0F7F7] text-[#667877]"
                  }`}
                  onClick={() => handleFollowUnfollowForFollowing(profile.id)}
                >
                  {profile?.is_mutual === 1 ? "Following" : "Follow"}
                </button>
              </div>
            )}

            {profile.is_influencer === 1 && (
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  // onClick={() => handleIsInfluencerAddBuddyClick(index)}
                  className={`w-full font-inter font-medium text-[14px] h-[36px] rounded-[4px] ${
                    profile?.is_buddies === 0
                      ? "bg-gradient-to-r from-[#1DB2AA] to-[#bae53dcc] text-white"
                      : "bg-gradient-to-r from-[#1db2aae0] to-[#bae53d6b] text-[#667877]"
                  }`}
                  onClick={profile?.is_buddies === 1 ? () => handleBuddyRemove(profile?.id) : () => handleAddBuddy(profile?.id)}
                >
                  {profile?.is_buddies === 1 ? "Added" : "Add as Buddy"}
                </button>
                <button
                  onClick={() => handleIsInfluencerFollowBuddyClick(index)}
                  className={`w-full font-inter font-medium text-[14px] h-[36px] rounded-[4px] ${
                    profile?.is_mutual === 0
                      ? "bg-gradient-to-r from-[#1DB2AA] to-[#bae53dcc] text-white"
                      : "bg-gradient-to-r from-[#1db2aae0] to-[#bae53d6b] text-[#667877]"
                  }`}
                >
                  {profile?.is_mutual === 1 ? "Following" : "Follow"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FollowingPostCard;