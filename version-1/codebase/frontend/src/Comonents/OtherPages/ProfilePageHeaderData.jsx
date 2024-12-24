import React, { useEffect, useState } from "react";
import Profile from "../../assets/profilePage.jpg";
import ProfilePhoto from "../../assets/profilePhoto.png";
import travel_badges from "../../assets/travel_badges.png";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import { getUserBuddies, getUserFollowers } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import StoryPage from "./AllStoriesPages/StoryPage";
import { getActiveStories } from "../../redux/slices/postSlice";
import StoryViewPage from "./AllStoriesPages/StoryViewPage";

const ProfilePageHeaderData = () => {
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const maxWordLimit = 100;

  /* for story section */
  const [isCreateSocialPopup, setIsCreateSocialPopup] = useState(false);
  const [dropdownOpenStoryViewSetting, setDropdownOpenStoryViewSetting] =
    useState(false);
  const [isCreateSocialPopupUserItself, setIsCreateSocialPopupUserItself] =
    useState(false);
  const [isShowvisibleStoryViewID, setIsShowvisibleStoryViewID] =
    useState(false);
  const [openDropdownIdUser, setOpenDropdownIdUser] = useState(null);

  // console.log("====isCreateSocialPopup===>", isCreateSocialPopup);
  
  const hadleShowViewStory = (storyId) => {
    setIsShowvisibleStoryViewID(!isShowvisibleStoryViewID);
  };

  const closeStoryPopup = () => {
    setIsCreateSocialPopupUserItself(false);
  };

  const toggleSettingStoryView = (storyId) => {
    setOpenDropdownIdUser(storyId);
  };
  
  const {
    user: userDetails,
    userFollowers,
    userBuddies,
  } = useSelector((state) => state.auth);
  const { allPosts, activeStories } = useSelector((state) => state.postSlice);


  useEffect(() => {
    if (!userFollowers) {
      dispatch(getUserFollowers());
    }

    if (!userBuddies) {
      dispatch(getUserBuddies());
    }

    if (!activeStories) {
      dispatch(getActiveStories());
    }
  }, [dispatch]);

  /* to close story upload popup */
  const handleStoryPageClose = () => {
    setIsCreateSocialPopup(false);
  }


  return (
    <div className="mt-5 bg-[#F0F7F7] flex justify-center items-center">
      <div className="w-full max-w-[98%] h-full bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col items-center">
        {/* Cover Photo Section */}
        <div className="flex flex-col justify-center w-full max-w-98% p-4 px-4">
          <div>
            {userDetails?.cover_image ? (
              <div>
                <img
                  // src={userDetails?.cover_image}
                  src={userDetails?.cover_image}
                  alt="Cover"
                  className="w-full h-[340px] object-cover rounded-[12px]"
                />
              </div>
            ) : (
              <div className="w-full h-[340px] object-cover rounded-[12px] bg-[#F0F7F7]"></div>
            )}

            {
              // Badge mapping and rendering
              (() => {
                const badges = {
                  Adventurer: travel_badges,
                  Explorer: travel_badges,
                  Foodie: travel_badges,
                  "Solo Traveler": travel_badges,
                  "Luxury Traveler": travel_badges,
                };

                const badgeParts = userDetails?.badge?.split("-");
                const badgeName = badgeParts?.[0]?.trim();
                const badgeDescription = badgeParts?.[1]?.trim();
                const badgeImage = badges[badgeName];

                return badgeImage ? (
                  <div className="relative group">
                    <img
                      src={badgeImage}
                      alt={`${badgeName} Badge`}
                      className="absolute -top-[325px] left-[15px] w-[192px] h-[60px]"
                    />
                    <div className="absolute left-[20px] -top-[260px]  mt-1 hidden group-hover:block bg-[#2DC6BE] text-white text-sm p-2 rounded shadow-lg w-[250px] text-left">
                      {badgeDescription}
                    </div>
                  </div>
                ) : null;
              })()
            }
          </div>
          {/* Profile Photo */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative -top-20 border-4 border-white bg-white rounded-full p-[2px]">
              <div className="border-4 border-[#2DC6BE] rounded-full bg-[#F0F7F7] p-[2px]">
                {activeStories && activeStories[0].stories.length > 0 ? (
                  <div>
                    <img
                      src={activeStories[0]?.profile_image || dummyUserImage}
                      alt="My Story"
                      className="w-[150px] h-[150px] rounded-full border-4 border-white object-cover"
                      // className="w-[64px] h-[64px] object-cover rounded-full border-2 border-[#2DC6BE] p-[2px]"
                      onClick={() => setIsCreateSocialPopupUserItself(true)}
                    />
                    {/* <p
                      className="font-inter font-medium text-[14px] mt-2 text-[#212626]"
                      onClick={() => setIsCreateSocialPopupUserItself(true)}
                    >
                      My Story
                    </p> */}
                    {isCreateSocialPopupUserItself && (
                      <StoryViewPage
                        closeStoryPopup={closeStoryPopup}
                        toggleSettingStoryView={toggleSettingStoryView}
                        dropdownOpenStoryViewSetting={
                          dropdownOpenStoryViewSetting
                        }
                        setDropdownOpenStoryViewSetting={
                          setDropdownOpenStoryViewSetting
                        }
                        hadleShowViewStory={hadleShowViewStory}
                        isShowvisibleStoryViewID={isShowvisibleStoryViewID}
                        storyData={activeStories[0].stories}
                        openDropdownIdUser={openDropdownIdUser}
                        setOpenDropdownIdUser={setOpenDropdownIdUser}
                        setIsShowvisibleStoryViewID={
                          setIsShowvisibleStoryViewID
                        }
                        isCreateSocialPopup={isCreateSocialPopup}
                        setIsCreateSocialPopup={setIsCreateSocialPopup}
                        isOpen={isCreateSocialPopupUserItself}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <img
                      src={userDetails?.profile_image || dummyUserImage}
                      alt="Profile"
                      className="w-[150px] h-[150px] rounded-full border-4 border-white object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-[720px] -mt-[70px] flex flex-col items-center justify-center">
              <h2 className="font-poppins font-medium text-[32px] text-[#212626] tems-center">
                {userDetails?.full_name}
              </h2>
              <p className="-mt-2 font-inter font-medium text-[20px] items-center text-[#667877]">
                {userDetails?.user_name}
              </p>
              {/* <p className="font-inter font-medium text-[16px] items-center text-[#667877] mt-2">
                {userDetails?.description}
              </p> */}
              <p className="font-inter font-medium text-[16px] items-center text-[#667877] mt-2">
                {isExpanded
                  ? userDetails?.description
                  : `${userDetails?.description?.slice(0, maxWordLimit)}${
                      userDetails?.description?.length > maxWordLimit ? "..." : ""
                    }`}
                {userDetails?.description?.length > maxWordLimit && (
                  <span
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#2dc6be] hover:underline cursor-pointer ml-1"
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </span>
                )}
              </p>
              <div className="md:w-[470px] md:h-[40px] flex items-center justify-center rounded-full bg-[#E5FFFE] mt-3">
                <p className="font-poppins font-semibold items-center text-center text-[16px] text-[#212626]">
                  {userDetails && userDetails?.badge?.split("-")[0]} &nbsp;•&nbsp; 0 Trip
                  &nbsp;•&nbsp; {userFollowers && userFollowers.length}{" "}
                  followers &nbsp;•&nbsp; {userBuddies && userBuddies.length}{" "}
                  Buddies
                </p>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <button
                  aria-label="Liked Info"
                  className="flex items-center justify-center w-[131px] h-[40px] bg-[#F0F7F7] text-[#667877]  py-1 px-3 rounded-[4px] hover:bg-[#2DC6BE] hover:text-white"
                >
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 group-hover:stroke-white"
                  >
                    <path
                      d="M7.00008 11.9167H5.75009C4.58711 11.9167 4.00563 11.9167 3.53246 12.0602C2.46713 12.3834 1.63345 13.217 1.31028 14.2824C1.16675 14.7555 1.16675 15.337 1.16675 16.5M11.5834 5.25C11.5834 7.32107 9.90448 9 7.83342 9C5.76235 9 4.08341 7.32107 4.08341 5.25C4.08341 3.17893 5.76235 1.5 7.83342 1.5C9.90448 1.5 11.5834 3.17893 11.5834 5.25ZM8.66675 16.5L11.2512 15.7616C11.375 15.7262 11.4369 15.7085 11.4946 15.682C11.5458 15.6585 11.5945 15.6298 11.64 15.5965C11.6912 15.5589 11.7367 15.5134 11.8277 15.4224L17.2085 10.0417C17.7838 9.46639 17.7838 8.53362 17.2084 7.95831C16.6331 7.38302 15.7004 7.38303 15.1251 7.95833L9.74439 13.339C9.65337 13.43 9.60787 13.4756 9.57028 13.5267C9.53691 13.5722 9.50824 13.6209 9.48471 13.6722C9.45821 13.7299 9.44053 13.7918 9.40516 13.9155L8.66675 16.5Z"
                      stroke="#667877"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <Link to={"/editprofile"}>
                    <span className="text-md font-normal">Edit Profile</span>
                  </Link>
                </button>
                <div onClick={() => setIsCreateSocialPopup(true)}>
                  <button
                    aria-label="Liked Info"
                    className="flex items-center justify-center w-[136px] h-[40px] bg-[#2DC6BE] text-white text-[#434C50] hover:text-gray-800 py-1 px-3 rounded-[4px] hover:bg-[#2DC6BE] hover:text-white"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M10.4998 4.16699V15.8337M4.6665 10.0003H16.3332"
                        stroke="white"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="text-md font-normal">Add a story</span>
                  </button>

                </div>
                {
                  isCreateSocialPopup && (
                  <StoryPage
                    isOpen={isCreateSocialPopup}
                    onClose={() => handleStoryPageClose()}
                  />
                  )
                }
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageHeaderData;
