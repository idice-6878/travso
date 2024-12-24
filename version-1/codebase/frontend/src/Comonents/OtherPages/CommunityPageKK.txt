import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import CommunityLeftSidebar from "./CommunityLeftSidebar";
import CommunityRightSidebar from "./CommunityRightSidebar";
import Boy1 from "../../assets/headerIcon/boy1.png";
import Girl from "../../assets/headerIcon/girl.jpg";
import story from "../../assets/story.png";
import Travel from "../../assets/travel.png";
import First from "../../assets/1.png";
import BucketImageSecond from "../../assets/bucketimageSecond.png";
import dotThree from "../../assets/dotThree.png";
import leftIcon from "../../assets/lefticon.png";
import like from "../../assets/like.png";
import Dialog from "../../assets/Dialog.png";
import entypo_bucket from "../../assets/entypo_bucket.png";
import send from "../../assets/headerIcon/send.png";
import p1 from "../../assets/headerIcon/p1.png";
import p2 from "../../assets/headerIcon/p2.png";
import p3 from "../../assets/headerIcon/p3.png";
import floxy from "../../assets/floxy.png";
import noto_fire from "../../assets/noto_fire.png";
import { useDispatch, useSelector } from "react-redux";
// import BadgesIconFirst from "../../../assets/BadgesIconFirst.png";
import BadgesIconFirst from "../../assets/BadgesIconFirst.png";
import {
  blockAccount,
  getAllUsers,
  getOnlineFriends,
  getUserDetails,
  getUserPosts,
} from "../../redux/slices/authSlice";
import CreateaPostPopup from "./AllPopupComponent/CreateaPostPopup";
import PostDetailPopup from "./AllPopupComponent/PostDetailPopup";
import {
  addCountOnStoryView,
  commentOnStory,
  commitPost,
  getActiveStories,
  getAllPosts,
  LikeUnlikePost,
  likeUnlikeStory,
} from "../../redux/slices/postSlice";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import SavedPopup from "./AllPopupComponent/SavedPopup";
import SharePopup from "./AllPopupComponent/SharePopup";
import CommentPopup from "./AllPopupComponent/CommentPopup";
import { formatePostDate } from "../../utils/formatPostDate";
import logo from "../../assets/headerIcon/logo.png";
import Background from "../../assets/Background.png";
import EmojiPicker from "emoji-picker-react";
import ShareStoryPopup from "./AllPopupComponent/ShareStoryPopup";
import StoryPage from "./AllStoriesPages/StoryPage";
import StoryViewPage from "./AllStoriesPages/StoryViewPage";

const CommunityPage = () => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndices, setCurrentIndices] = useState({}); // to track slider effect on post images
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const [isCreatePostPopup, setIsCreatePostPopup] = useState(false);
  const [isPostDetailPopup, setIsPostDetailPopup] = useState(false);

  /* for comment popup and saved popup */
  const [isCommentPopup, setIsCommentPopup] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [isCommentWithSavedPopup, setIsCommentWithSavedPopup] = useState(false);
  const [isSharePopup, setIsSharePopup] = useState(false);

  /* for showing tagged buddies */
  const [isotherDataVisible, setIsotherDataVisible] = useState(false);
  const [showTaggedBuddiesPostId, setShowTaggedBuddiesPostId] = useState(false);

  /* for story section */
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isShareStoryPopup, setIsShareStoryPopup] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [isCreateSocialPopup, setIsCreateSocialPopup] = useState(false);
  const [dropdownOpenStoryViewSetting, setDropdownOpenStoryViewSetting] =
    useState(false);
  const [isCreateSocialPopupUserItself, setIsCreateSocialPopupUserItself] =
    useState(false);
  const [isShowvisibleStoryViewID, setIsShowvisibleStoryViewID] =
    useState(false);
  const [openDropdownIdUser, setOpenDropdownIdUser] = useState(null);

  const hadleShowViewStory = (storyId) => {
    setIsShowvisibleStoryViewID(!isShowvisibleStoryViewID);
  };

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging = false;
  };

  const [popupBuddiesReelVisible, setPopupBuddiesReelVisible] = useState(false);
  const [currentBuddiesReelIndex, setCurrentBuddiesReelIndex] = useState(0);
  const [dropdownOpenSetting, setDropdownOpenSetting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // working on reply on comment
  const [showEmojiPickerStory, setShowEmojiPickerStory] = useState(false); // working on reply on comment
  const [activeEmojiStoryId, setActiveEmojiStoryId] = useState(null); // To track the active story
  const [storyReply, setStoryReply] = useState({});

  const toggleSetting = () => {
    setDropdownOpenSetting(!dropdownOpenSetting);
  };

  /* to see next story */
  const handleBuddiesStoryNext = () => {
    if (currentBuddiesReelIndex < activeStories.length - 1) {
      setCurrentBuddiesReelIndex(currentBuddiesReelIndex + 1);
    }
  };

  /* to see previous story */
  const handleBuddiesStoryPrevious = () => {
    if (currentBuddiesReelIndex > 1) {
      setCurrentBuddiesReelIndex(currentBuddiesReelIndex - 1);
    }
  };

  //   const handleBuddiesStoryNext = () => {
  //   setCurrentBuddiesReelIndex((prevIndex) =>
  //     prevIndex < activeStories.length - 1 ? prevIndex + 1 : prevIndex
  //   );
  // };

  // const handleBuddiesStoryPrevious = () => {
  //   setCurrentBuddiesReelIndex((prevIndex) =>
  //     prevIndex > 0 ? prevIndex - 1 : prevIndex
  //   );
  // };

  /* This function is running when clicked on any active story */
  const handleItemBuddiesStoryClick = async (itemId, index) => {
    // console.log("===itemId====>", itemId);
    // console.log("===index====>", index);
    // setCurrentBuddiesReelIndex(itemId-1);
    setCurrentBuddiesReelIndex(index);
    setPopupBuddiesReelVisible(true); // Show the popup
  };

  /* to close story popup */
  const closeBuddiesStoryPopup = () => {
    setCurrentBuddiesReelIndex(0);
    setPopupBuddiesReelVisible(false); // Hide the popup
  };

  // Sample data for the popup
  const postDetails = {
    title: "Pankaj Reet Tech",
    subtitle: "Solo Traveler",
    subtitleData: "Rameswaram",
    description:
      "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
    image: [Travel, BucketImageSecond, First],
    avtar: Boy1,
    hastag: "#arsitek #art #creative",
  };

  const images = postDetails.image;

  const [postData, setPostData] = useState({
    description: "",
    location: "",
    buddies: [],
    tags: [],
    media_url: [],
    is_public: true,
    buddies_id: [],
  });
  /* redux state data starts */

  const {
    onlineFriends,
    allUsers,
    user: userDetails,
  } = useSelector((state) => state.auth);
  const { allPosts, activeStories } = useSelector((state) => state.postSlice);

  // console.log("=====allPosts===>", allPosts);

  useEffect(() => {
    if (!onlineFriends) {
      dispatch(getOnlineFriends());
    }

    if (!allUsers) {
      dispatch(getAllUsers());
    }

    if (!userDetails) {
      dispatch(getUserDetails());
    }

    if (!activeStories) {
      dispatch(getActiveStories());
    }
  }, [dispatch]);

  /* redux state data ends */

  // Function to toggle the full text
  const toggleFullText = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  // const goToPrevious = (mediaLength) => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? mediaLength - 1 : prevIndex - 1
  //   );
  // };

  // const goToNext = (mediaLength) => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === mediaLength - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const goToSlide = (index) => {
  //   setCurrentIndex(index);
  // };

  /* for changing the image through slider starts */

  // Go to Previous Slide
  const goToPrevious = (postId, imgArrLength) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [postId]:
        prevIndices[postId] !== undefined
          ? prevIndices[postId] === 0
            ? imgArrLength - 1
            : prevIndices[postId] - 1
          : imgArrLength - 1,
    }));
  };

  // Go to Next Slide
  const goToNext = (postId, imgArrLength) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [postId]:
        prevIndices[postId] !== undefined
          ? prevIndices[postId] === imgArrLength - 1
            ? 0
            : prevIndices[postId] + 1
          : 1,
    }));
  };

  // Go to Specific Slide
  const goToSlide = (postId, index) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [postId]: index,
    }));
  };

  /* for changing the image through slider ends */

  // Sixth Section of Sample data for the popup
  const postDetails1 = {
    title: "Floxy",
    subtitle: "Sponsored",
    subtitleData: "🌍",
    description:
      "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
    image: [BucketImageSecond, Travel, First],
    avtar: floxy,
    hastag: "#arsitek #art #creative",
  };

  const images1 = postDetails1.image;

  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [isFullTextVisible1, setIsFullTextVisible1] = useState(false);

  // Function to toggle the full text
  const toggleFullText1 = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  const goToPrevious1 = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext1 = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide1 = (index) => {
    setCurrentIndex(index);
  };

  const ReelData = [
    {
      title: "Pankaj Reet Tech",
      subtitle: "Solo Traveler",
      subtitleData: "Rameswaram",
      image: BucketImageSecond, // Single image per object
      avtar: Boy1,
    },
    {
      title: "Another Traveler",
      subtitle: "Adventurous Spirit",
      subtitleData: "New York",
      image: Travel, // Single image per object
      avtar: Girl,
    },
    {
      title: "Tech Explorer",
      subtitle: "Gadget Geek",
      subtitleData: "San Francisco",
      image: BucketImageSecond, // Single image per object
      avtar: Boy1,
    },
    {
      title: "Food Lover",
      subtitle: "Chef in the Making",
      subtitleData: "Paris",
      image: Travel, // Single image per object
      avtar: Boy1,
    },
    {
      title: "Nature Enthusiast",
      subtitle: "Wilderness Seeker",
      subtitleData: "Amazon Rainforest",
      image: BucketImageSecond,
      avtar: Boy1,
    },
  ];

  const [ReelIndex, setReelIndex] = useState(0);

  const goToPreviousReel = () => {
    setReelIndex((prevIndex) =>
      prevIndex === 0 ? ReelData.length - 1 : prevIndex - 1
    );
  };

  const goToNextReel = () => {
    setReelIndex((prevIndex) =>
      prevIndex === ReelData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlideReel = (index) => {
    setReelIndex(index);
  };

  const handlePostDetailPopup = () => {
    setIsPostDetailPopup(false);
    setIsCreatePostPopup(true);
    // isOpen();
  };

  const handlePostUpload = async () => {
    try {
      // console.log("postData", postData)
      const commentResult = await dispatch(commitPost(postData)).unwrap();
      if (commentResult) {
        // console.log("=====commentResult===>", commentResult.message);
        await dispatch(getAllPosts());
        // await dispatch(getUserPosts());
        setPostData({
          description: "",
          location: "",
          buddies: [],
          tags: [],
          media_url: [],
          is_public: true,
          buddies_id: [],
        });
        setIsPostDetailPopup(false);
        // handleFlashMessage(commentResult.message, 'success');
      }
    } catch (error) {
      console.log("error in handlePostUpload", error);
    }
  };

  // to like and unlike post
  const handleLikeUnlike = async (postId) => {
    // console.log("====postId===>", postId);
    try {
      const likeUnlikeResult = await dispatch(
        LikeUnlikePost({ post_id: postId })
      ).unwrap();
      if (likeUnlikeResult) {
        await dispatch(getAllPosts());
        // await dispatch(getUserPosts());
        // handleFlashMessage(likeUnlikeResult.message, 'success');
      }
    } catch (error) {
      console.log("error in likeunlike api", error);
      const errorMessage = error.error || "Unexpected Error Occured";
      // handleFlashMessage(errorMessage, 'error')
    }
  };

  // to open comment popup
  const handleOpenCommentPopup = (postId) => {
    // console.log("===postId===>", postId);
    setActivePostId(postId);
    setIsCommentPopup(true);
  };

  // to close comment popup
  const handleCloseCommentPopup = () => {
    setIsCommentPopup(false);
    setActivePostId(null);
  };

  // to open share popup
  const handleOpenBucketSavedPopup = (postId) => {
    setActivePostId(postId);
    setIsCommentWithSavedPopup(true);
  };

  // to open share popup
  const handleOpenSharePopup = (postId) => {
    setActivePostId(postId);
    setIsSharePopup(true);
  };

  // to close bucket saved popup
  const handleBucketSavedPopupClose = () => {
    setIsCommentWithSavedPopup(false);
    setActivePostId(null);
  };

  // to close share popup
  const handleSharePopupClose = () => {
    setIsSharePopup(false);
    setActivePostId(null);
    dispatch(getUserPosts());
  };

  // Simplified badge image logic
  const badges = {
    Adventurer: BadgesIconFirst,
    Explorer: BadgesIconFirst,
    Foodie: BadgesIconFirst,
    "Solo Traveler": BadgesIconFirst,
    "Luxury Traveler": BadgesIconFirst,
  };

  const togglePopup = (postId) => {
    // setActivePostId((prevId) => (prevId === postId ? null : postId));
    setIsotherDataVisible(!isotherDataVisible);
    setShowTaggedBuddiesPostId(postId);
  };

  /* handle input change on story reply input */
  const handleStoryReplyInputChange = (e, storyId) => {
    const { value } = e.target;
    setStoryReply((prev) => ({
      ...prev,
      [storyId]: value,
    }));
  };

  /* Runs when user selects a emoji, then updates emoji in value */
  // const handleEmojiClickStory = (emojiObject, storyId) => {
  //   //  console.log("===storyId===>", storyId);
  //   setStoryReply((prevReplies) => ({
  //     ...prevReplies,
  //     [storyId]: (prevReplies[storyId] || "") + emojiObject.emoji,
  //   }));
  //   // setShowEmojiPicker(false); // Close the emoji picker after selection
  //   setShowEmojiPickerStory(false); // Close the emoji picker after selection
  // };

  const handleEmojiClickStory = (emojiObject, storyId) => {
    setStoryReply((prevReplies) => ({
      ...prevReplies,
      [storyId]: (prevReplies[storyId] || "") + emojiObject.emoji, // Append the selected emoji to the story's reply
    }));

    setShowEmojiPickerStory(false); // Close the emoji picker after selection
    setActiveEmojiStoryId(null); // Reset the active story ID
  };

  /* when user press enters on comment section after writing comment in story */
  const handleStoryCommentEnter = async (e, storyId, userId) => {
    // console.log("=====storyId====>", storyId, "====userId===>", userId);
    if (e.key === "Enter" && !e.shiftKey) {
      try {
        const commentPayload = {
          story_id: storyId,
          reply_text: storyReply[storyId], // Full comment text
        };
        // console.log("==commentPayload==>", commentPayload);
        const replyResponse = await dispatch(
          commentOnStory(commentPayload)
        ).unwrap();
        // console.log("==replyResponse===>", replyResponse);
        if (replyResponse) {
          setStoryReply({});
        }
      } catch (error) {
        console.log("error in handleStoryCommentEnter ", error);
        const errorMessage = error.error || "Unexpected Error Occured";
        // handleFlashMessage(errorMessage, 'error')
      }
    }
  };

  /* to send any reply on story */
  const sendReplyToStory = async (storyId, userId) => {
    try {
      const commentPayload = {
        story_id: storyId,
        content: storyReply[storyId], // Full comment text
      };
      // console.log("==commentPayload==>", commentPayload);
      const replyResponse = await dispatch(
        commentOnStory(commentPayload)
      ).unwrap();
      if (replyResponse) {
        setStoryReply({});
      }
    } catch (error) {
      console.log("error in sendReplyToStory", error);
    }
  };

  /* handle like and unlike on a story */
  const handleLikeUnlikeStory = async (storyId) => {
    try {
      console.log("=====storyId====>", storyId);
      const likeUnlikeResult = await dispatch(
        likeUnlikeStory({ story_id: storyId })
      ).unwrap();
      console.log("===likeUnlikeResult===>", likeUnlikeResult);
    } catch (error) {
      console.log("error in handleLikeUnlikeStory", error);
    }
  };

  /* to block an account */
  const blockTheUser = async (blockId) => {
    try {
      const response = await dispatch(blockAccount(blockId)).unwrap();
      console.log("===response===>", response);
      if (response) {
        setOpenDropdownId(null);
      }
    } catch (error) {
      console.log("===error in blocktheuser===>", error);
    }
  };

  // to open share popup
  const handleOpenShareStoryPopup = (storyId) => {
    // console.log("===storyId==>", storyId);
    setActiveStoryId(storyId);
    setIsShareStoryPopup(true);
  };

  // to close share popup
  const handleShareStoryPopupClose = () => {
    setIsShareStoryPopup(false);
    setActiveStoryId(null);
    // dispatch(getUserPosts());
  };

  // console.log("=====activeStories===>", activeStories);

  /* showing story of user itself only starts */
  const closeStoryPopup = () => {
    setIsCreateSocialPopupUserItself(false);
  };

  const toggleSettingStoryView = (storyId) => {
    setOpenDropdownIdUser(storyId);
    // setDropdownOpenStoryViewSetting(!dropdownOpenStoryViewSetting);
  };
  /* showing story of user itself only ends */

  const increaseViewersCount = async (storyId) => {
    try {
      const response = await dispatch(addCountOnStoryView(storyId)).unwrap();
      // console.log("===response=increaseViewersCount=", response);
    } catch (error) {
      console.log("==error in add story count==increaseViewersCount==>", error);
    }
  };

  // const handleEmojiSelectUserID = (id) => {
  //   setActiveEmojiStoryId((prevId) => (prevId === id ? null : id)); // Toggle the picker for the selected story
  // };

  const handleEmojiSelectUserID = (id) => {
    setActiveEmojiStoryId((prevId) => (prevId === id ? null : id)); // Toggle the picker for the selected story
    setShowEmojiPickerStory((prevId) => (prevId === id ? false : true)); // Ensure the picker state is consistent
  };

  // console.log("===activestories", activeStories)

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-3 px-3 flex justify-center items-center">
        <div className="container mx-auto flex gap-3">
          {/*-------- Left Section -------*/}
          <div className="w-[340px] flex flex-col">
            <CommunityLeftSidebar />
          </div>
          {/*-------- Left Section -------*/}
          {/*-------- Middle Section -------*/}
          <div className="w-[696px] flex-grow flex flex-col">
            {/*-------- First Section --------*/}
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5">
              <h2 className="mb-4 font-poppins text-[20px] font-semibold text-[#212626] text-left">
                TravSo Moments
              </h2>
              <div
                ref={sliderRef}
                className="flex overflow-x-auto scroll-smooth no-scrollbar scrollbar-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={(e) => handleMouseDown(e.touches[0])}
                onTouchMove={(e) => handleMouseMove(e.touches[0])}
                onTouchEnd={handleMouseUpOrLeave}
              >
                <div
                  className="flex flex-col items-center mb-2 mr-2 cursor-pointer"
                  style={{ flex: "0 0 auto" }}
                >
                  {activeStories && activeStories[0].stories.length > 0 ? (
                    <div>
                      <img
                        src={activeStories[0]?.profile_image || dummyUserImage}
                        alt="My Story"
                        className="w-[64px] h-[64px] object-cover rounded-full border-2 border-[#2DC6BE] p-[2px]"
                        onClick={() => setIsCreateSocialPopupUserItself(true)}
                      />
                      <p
                        className="font-inter font-medium text-[14px] mt-2 text-[#212626]"
                        onClick={() => setIsCreateSocialPopupUserItself(true)}
                      >
                        My Story
                      </p>
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
                        src={story}
                        alt="My Story"
                        className="w-[64px] h-[64px] object-cover rounded-full border-2 border-[#2DC6BE] p-[2px]"
                        onClick={() => setIsCreateSocialPopup(true)}
                      />
                      <p
                        className="font-inter font-medium text-[14px] mt-2 text-[#212626]"
                        onClick={() => setIsCreateSocialPopup(true)}
                      >
                        My Story
                      </p>

                      <StoryPage
                        isOpen={isCreateSocialPopup}
                        // onClose={() => setIsCreateSocialPopup(false)}
                        onClose={() => setIsCreateSocialPopup(false)}
                      />
                    </div>
                  )}
                </div>
                {activeStories &&
                  activeStories.slice(1).map((user, index) => {
                    return (
                      // index > 0 && (
                      <div
                        key={user.id}
                        className="flex flex-col items-center mb-2 mr-2"
                        style={{ flex: "0 0 auto" }}
                        onClick={() =>
                          handleItemBuddiesStoryClick(user.id, index)
                        }
                      >
                        <img
                          src={user.profile_image || dummyUserImage}
                          alt={"Profile"}
                          className="w-[64px] h-[64px] object-cover rounded-full border-2 border-[#2DC6BE] p-[2px]"
                        />
                        <p className="font-inter font-medium text-[14px] mt-2 text-[#212626]">
                          {/* {user.full_name} */}
                          {user.full_name.length > 7
                            ? user.full_name.slice(0, 7) + "..."
                            : user.full_name}
                        </p>
                      </div>
                      // )
                    );
                  })}
                {popupBuddiesReelVisible && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50"
                    style={{
                      backgroundImage: `url(${Background})`,
                    }}
                  >
                    <div className="relative w-full max-w-[396px] flex items-center">
                      {/* Logo */}
                      <div className="absolute -top-[10px] -left-[540px] z-10">
                        <img
                          src={logo}
                          alt="Travso Logo"
                          className="h-12 bg-white w-[248px] h-[80px] rounded-[16px] p-[16px]"
                        />
                      </div>

                      {/* Close Tab */}
                      <div
                        className="absolute -top-[10px] -right-[540px] z-10 cursor-pointer"
                        onClick={closeBuddiesStoryPopup}
                      >
                        <svg
                          width="44"
                          height="44"
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_b_40000261_31302)">
                            <rect
                              width="44"
                              height="44"
                              rx="22"
                              fill="white"
                              fillOpacity="0.75"
                            />
                            <path
                              d="M15.5188 28.4817L28.4824 15.5181"
                              stroke="#212626"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            <path
                              d="M15.5188 15.5183L28.4824 28.4819"
                              stroke="#212626"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_b_40000261_31302"
                              x="-15"
                              y="-15"
                              width="74"
                              height="74"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feGaussianBlur
                                in="BackgroundImageFix"
                                stdDeviation="7.5"
                              />
                              <feComposite
                                in2="SourceAlpha"
                                operator="in"
                                result="effect1_backgroundBlur_40000261_31302"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_backgroundBlur_40000261_31302"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </div>

                      {/* Left Navigation Button */}
                      <button
                        className="absolute top-1/2 -left-[50px] w-9 h-9 transform -translate-y-1/2 bg-white text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                        onClick={handleBuddiesStoryPrevious}
                      >
                        <svg
                          width="8"
                          height="14"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 13L7 7L1 1"
                            stroke="#212626"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* Image Slider */}
                      <div className="relative w-[396px] overflow-hidden">
                        <div
                          className="flex transition-transform duration-500 gap-4"
                          style={{
                            transform: `translateX(calc(-${
                              currentBuddiesReelIndex * 100
                            }% + ${currentBuddiesReelIndex * -16}px))`,
                          }}
                        >
                          {activeStories &&
                            activeStories.slice(1).map((story, storyIndex) => {
                              return story.stories.map((userStory, index) => {
                                // console.log("===userStory===>", userStory);
                                // console.log("===currentBuddiesReelIndex===>", currentBuddiesReelIndex);
                                // console.log("===index===>", index);
                                return (
                                  <div
                                    key={userStory?.id}
                                    className={`w-[396px] h-[650px] flex-shrink-0 ${
                                      index === currentBuddiesReelIndex
                                        ? "scale-100 z-10"
                                        : "scale-90 opacity-70"
                                    } transition-all duration-500`}
                                    style={{ flexBasis: "100%" }}
                                  >
                                    <div className="flex items-center justify-between absolute top-9 w-[396px] px-4">
                                      <div className="flex items-center gap-[8px]">
                                        <div>
                                          <img
                                            src={
                                              userStory?.profile_image ||
                                              dummyUserImage
                                            }
                                            alt="Girl"
                                            className="w-[44px] h-[44px] rounded-full"
                                          />
                                        </div>
                                        <div className="flex flex-col">
                                          <p className="flex items-center gap-[5px] font-poppins font-semibold text-[16px] text-[#FFFFFF]">
                                            {userStory?.full_name}{" "}
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M8 0L14.2547 3.01208L15.7994 9.78017L11.4711 15.2078H4.52893L0.200577 9.78017L1.74535 3.01208L8 0Z"
                                                fill="#9747FF"
                                              />
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11.6843 5.53415C11.8633 5.71314 11.8633 6.00334 11.6843 6.18233L7.40656 10.4601C7.22757 10.6391 6.93736 10.6391 6.75837 10.4601L4.31393 8.01566C4.13494 7.83667 4.13494 7.54647 4.31393 7.36748C4.49292 7.18849 4.78312 7.18849 4.96211 7.36748L7.08246 9.48783L11.0362 5.53415C11.2151 5.35515 11.5053 5.35515 11.6843 5.53415Z"
                                                fill="white"
                                              />
                                            </svg>
                                          </p>
                                          <p className="-mt-1 text-left font-inter font-medium text-[14px] text-[#FFFFFF]">
                                            {userStory?.badge?.split("-")[0]}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-[5px]">
                                        <div>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M19.7479 4.99993C21.1652 6.97016 22 9.38756 22 11.9999C22 14.6123 21.1652 17.0297 19.7479 18.9999M15.7453 7.99993C16.5362 9.13376 17 10.5127 17 11.9999C17 13.4872 16.5362 14.8661 15.7453 15.9999M9.63432 5.36561L6.46863 8.5313C6.29568 8.70425 6.2092 8.79073 6.10828 8.85257C6.01881 8.9074 5.92127 8.9478 5.81923 8.9723C5.70414 8.99993 5.58185 8.99993 5.33726 8.99993H3.6C3.03995 8.99993 2.75992 8.99993 2.54601 9.10892C2.35785 9.20479 2.20487 9.35777 2.10899 9.54594C2 9.75985 2 10.0399 2 10.5999V13.3999C2 13.96 2 14.24 2.10899 14.4539C2.20487 14.6421 2.35785 14.7951 2.54601 14.8909C2.75992 14.9999 3.03995 14.9999 3.6 14.9999H5.33726C5.58185 14.9999 5.70414 14.9999 5.81923 15.0276C5.92127 15.0521 6.01881 15.0925 6.10828 15.1473C6.2092 15.2091 6.29568 15.2956 6.46863 15.4686L9.63431 18.6342C10.0627 19.0626 10.2769 19.2768 10.4608 19.2913C10.6203 19.3038 10.7763 19.2392 10.8802 19.1175C11 18.9773 11 18.6744 11 18.0686V5.9313C11 5.32548 11 5.02257 10.8802 4.88231C10.7763 4.76061 10.6203 4.69602 10.4608 4.70858C10.2769 4.72305 10.0627 4.93724 9.63432 5.36561Z"
                                              stroke="white"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </div>
                                        <div>
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M5 5.12037C5 4.14921 5 3.66363 5.20249 3.39595C5.37889 3.16277 5.64852 3.01847 5.9404 3.00104C6.27544 2.98103 6.67946 3.25039 7.48752 3.78909L18.0031 10.7995C18.6708 11.2446 19.0046 11.4672 19.1209 11.7477C19.2227 11.9929 19.2227 12.2686 19.1209 12.5138C19.0046 12.7943 18.6708 13.0169 18.0031 13.462L7.48752 20.4724C6.67946 21.0111 6.27544 21.2805 5.9404 21.2604C5.64852 21.243 5.37889 21.0987 5.20249 20.8655C5 20.5979 5 20.1123 5 19.1411V5.12037Z"
                                              stroke="white"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </div>
                                        <div className="cursor-pointer">
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            // onClick={toggleSetting}
                                            onClick={() =>
                                              setOpenDropdownId(userStory.id)
                                            }
                                          >
                                            <path
                                              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                              stroke="white"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                              stroke="white"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                              stroke="white"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          {/* DropdownSetting Menu */}
                                          {openDropdownId === userStory?.id && (
                                            <div className="fixed top-1/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ddd] rounded-md rounded-[16px] shadow-md w-[200px]">
                                              <div className="flex items-center justify-between p-2 px-4 border-b border-b-gray-500 w-full">
                                                <h6 className="font-poppins font-semibold text-[16px] text-[#212626] ">
                                                  More Options
                                                </h6>

                                                {/* Close Button (X) */}
                                                <button
                                                  className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                                                  onClick={() =>
                                                    setOpenDropdownId(null)
                                                  }
                                                  aria-label="Close"
                                                >
                                                  &#x2715;
                                                </button>
                                              </div>
                                              <ul>
                                                <li className="font-inter font-medium text-[16px] text-[#212626] px-4 py-2 flex items-center gap-[5px] cursor-pointer hover:bg-[#f0f0f0]">
                                                  <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M12 10.5V7M12 14H12.01M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z"
                                                      stroke="black"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                  Report comment
                                                </li>
                                                <li className="px-4 py-2 flex items-center gap-[5px] cursor-pointer hover:bg-[#f0f0f0]">
                                                  <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M22 8.99993L16 14.9999M16 8.99993L22 14.9999M9.63432 4.36561L6.46863 7.5313C6.29568 7.70425 6.2092 7.79073 6.10828 7.85257C6.01881 7.9074 5.92127 7.9478 5.81923 7.9723C5.70414 7.99993 5.58185 7.99993 5.33726 7.99993H3.6C3.03995 7.99993 2.75992 7.99993 2.54601 8.10892C2.35785 8.20479 2.20487 8.35777 2.10899 8.54594C2 8.75985 2 9.03987 2 9.59993V14.3999C2 14.96 2 15.24 2.10899 15.4539C2.20487 15.6421 2.35785 15.7951 2.54601 15.8909C2.75992 15.9999 3.03995 15.9999 3.6 15.9999H5.33726C5.58185 15.9999 5.70414 15.9999 5.81923 16.0276C5.92127 16.0521 6.01881 16.0925 6.10828 16.1473C6.2092 16.2091 6.29568 16.2956 6.46863 16.4686L9.63431 19.6342C10.0627 20.0626 10.2769 20.2768 10.4608 20.2913C10.6203 20.3038 10.7763 20.2392 10.8802 20.1175C11 19.9773 11 19.6744 11 19.0686V4.9313C11 4.32548 11 4.02257 10.8802 3.88231C10.7763 3.76061 10.6203 3.69602 10.4608 3.70858C10.2769 3.72305 10.0627 3.93724 9.63432 4.36561Z"
                                                      stroke="#212626"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                  Mute Story
                                                </li>

                                                {userStory?.user_id !==
                                                  userDetails?.id && (
                                                  <li
                                                    className="px-4 py-2 flex items-center gap-[5px] cursor-pointer hover:bg-[#f0f0f0]"
                                                    onClick={() =>
                                                      blockTheUser(
                                                        userStory?.user_id
                                                      )
                                                    }
                                                  >
                                                    <svg
                                                      width="22"
                                                      height="22"
                                                      viewBox="0 0 22 22"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        d="M3.93 3.93L18.07 18.07M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
                                                        stroke="#212626"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      />
                                                    </svg>
                                                    Block account
                                                  </li>
                                                )}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between absolute bottom-5 z-10 w-[396px] px-4">
                                      <div className="relative flex items-center">
                                        <input
                                          type="text"
                                          placeholder="Add a comment"
                                          onKeyDown={(e) =>
                                            handleStoryCommentEnter(
                                              e,
                                              userStory?.id,
                                              userStory?.user_id
                                            )
                                          }
                                          className="flex-1 bg-[#FFFFFFBF] focus:outline-none text-gray-600 rounded-[24px] md:w-[256px] h-[44px] placeholder:font-inter placeholder:font-medium placeholder:text-[14px] placeholder:text-[#212626] pl-9"
                                          value={
                                            storyReply[userStory?.id] || ""
                                          }
                                          onChange={(e) =>
                                            handleStoryReplyInputChange(
                                              e,
                                              userStory?.id
                                            )
                                          }
                                        />
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="absolute left-2 cursor-pointer"
                                          // onClick={() =>
                                          //   setShowEmojiPickerStory(
                                          //     !showEmojiPickerStory
                                          //   )
                                          // }
                                          onClick={() =>
                                            handleEmojiSelectUserID(
                                              userStory?.id
                                            )
                                          }
                                        >
                                          <g clipPath="url(#clip0_40000261_30967)">
                                            <path
                                              d="M6.66602 11.6665C6.66602 11.6665 7.91602 13.3332 9.99935 13.3332C12.0827 13.3332 13.3327 11.6665 13.3327 11.6665M12.4993 7.49984H12.5077M7.49935 7.49984H7.50768M18.3327 9.99984C18.3327 14.6022 14.6017 18.3332 9.99935 18.3332C5.39698 18.3332 1.66602 14.6022 1.66602 9.99984C1.66602 5.39746 5.39698 1.6665 9.99935 1.6665C14.6017 1.6665 18.3327 5.39746 18.3327 9.99984ZM12.916 7.49984C12.916 7.72996 12.7295 7.9165 12.4993 7.9165C12.2692 7.9165 12.0827 7.72996 12.0827 7.49984C12.0827 7.26972 12.2692 7.08317 12.4993 7.08317C12.7295 7.08317 12.916 7.26972 12.916 7.49984ZM7.91602 7.49984C7.91602 7.72996 7.72947 7.9165 7.49935 7.9165C7.26923 7.9165 7.08268 7.72996 7.08268 7.49984C7.08268 7.26972 7.26923 7.08317 7.49935 7.08317C7.72947 7.08317 7.91602 7.26972 7.91602 7.49984Z"
                                              stroke="#212626"
                                              strokeWidth="1.66667"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_40000261_30967">
                                              <rect
                                                width="20"
                                                height="20"
                                                fill="white"
                                              />
                                            </clipPath>
                                          </defs>
                                        </svg>
                                        {/* {showEmojiPickerStory && (
                                          <div className="absolute -top-[380px] left-0 z-50">
                                            <EmojiPicker
                                              onEmojiClick={(emojiObject) =>
                                                handleEmojiClickStory(
                                                  emojiObject,
                                                  userStory?.id
                                                )
                                              }
                                              className="w-[250px] h-[300px] shadow-lg rounded-lg"
                                            />
                                          </div>
                                        )} */}
                                        {activeEmojiStoryId === userStory.id &&
                                          showEmojiPickerStory && (
                                            <div className="absolute -top-[380px] left-0 z-50">
                                              <EmojiPicker
                                                onEmojiClick={(emojiObject) =>
                                                  handleEmojiClickStory(
                                                    emojiObject,
                                                    userStory.id
                                                  )
                                                }
                                                className="w-[250px] h-[300px] shadow-lg rounded-lg"
                                              />
                                            </div>
                                          )}
                                      </div>
                                      <div>
                                        <svg
                                          width="44"
                                          height="44"
                                          viewBox="0 0 44 44"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="cursor-pointer "
                                          onClick={() =>
                                            handleLikeUnlikeStory(userStory?.id)
                                          }
                                        >
                                          <rect
                                            width="44"
                                            height="44"
                                            rx="22"
                                            fill="#2DC6BE"
                                          />
                                          <path
                                            d="M17.556 18.3639C17.4669 19.3139 17.4044 20.9951 17.9654 21.7107C17.9654 21.7107 17.7013 19.8639 20.0685 17.5467C21.0216 16.6139 21.2419 15.3451 20.9091 14.3936C20.7201 13.8545 20.3748 13.4092 20.0748 13.0982C19.8998 12.9154 20.0341 12.6139 20.2888 12.6248C21.8294 12.6936 24.3263 13.1217 25.3873 15.7842C25.8529 16.9529 25.8873 18.1607 25.6654 19.3889C25.5248 20.1732 25.0248 21.917 26.1654 22.1311C26.9794 22.2842 27.3732 21.6373 27.5498 21.1717C27.6232 20.9779 27.8779 20.9295 28.0154 21.0842C29.3904 22.6482 29.5076 24.4904 29.2232 26.0764C28.6732 29.142 25.5685 31.3732 22.4841 31.3732C18.631 31.3732 15.5638 29.1685 14.7685 25.1779C14.4482 23.567 14.6107 20.3795 17.0951 18.1295C17.2794 17.9607 17.581 18.1107 17.556 18.3639Z"
                                            fill="white"
                                          />
                                          <path
                                            d="M23.8923 24.097C22.472 22.2689 23.1079 20.183 23.4564 19.3517C23.5032 19.2424 23.3782 19.1392 23.2798 19.2064C22.6689 19.622 21.4173 20.6002 20.8345 21.9767C20.0454 23.8377 20.1017 24.7486 20.5689 25.8611C20.8501 26.5314 20.5235 26.6736 20.3595 26.6986C20.2001 26.7236 20.0532 26.6174 19.936 26.5064C19.5989 26.1828 19.3587 25.7715 19.2423 25.3189C19.2173 25.222 19.0907 25.1955 19.0329 25.2752C18.5954 25.8799 18.3689 26.8502 18.3579 27.5361C18.3235 29.6564 20.0751 31.3752 22.1939 31.3752C24.8642 31.3752 26.8095 28.422 25.2751 25.9533C24.8298 25.2345 24.411 24.7642 23.8923 24.097Z"
                                            fill="#2DC6BE"
                                          />
                                        </svg>
                                      </div>
                                      <div>
                                        <svg
                                          width="44"
                                          height="44"
                                          viewBox="0 0 44 44"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="cursor-pointer "
                                          onClick={() =>
                                            handleOpenShareStoryPopup(
                                              userStory?.id
                                            )
                                          }
                                        >
                                          <g filter="url(#filter0_b_40000261_30974)">
                                            <rect
                                              width="44"
                                              height="44"
                                              rx="22"
                                              fill="white"
                                              fillOpacity="0.75"
                                            />
                                            <path
                                              d="M17.9257 16.9667L25.4423 14.4584C28.8173 13.3334 30.6507 15.1751 29.534 18.5501L27.0257 26.0667C25.3423 31.1251 22.5757 31.1251 20.8923 26.0667L20.1507 23.8334L17.9173 23.0917C12.8673 21.4167 12.8673 18.6584 17.9257 16.9667Z"
                                              fill="#212626"
                                            />
                                            <path
                                              d="M22.0996 21.6916L25.2746 18.5083L22.0996 21.6916Z"
                                              fill="white"
                                            />
                                            <path
                                              d="M22.0995 22.317C21.9411 22.317 21.7828 22.2587 21.6578 22.1337C21.4161 21.892 21.4161 21.492 21.6578 21.2503L24.8245 18.067C25.0661 17.8253 25.4661 17.8253 25.7078 18.067C25.9495 18.3087 25.9495 18.7087 25.7078 18.9503L22.5411 22.1337C22.4161 22.2503 22.2578 22.317 22.0995 22.317Z"
                                              fill="white"
                                            />
                                          </g>
                                          <defs>
                                            <filter
                                              id="filter0_b_40000261_30974"
                                              x="-15"
                                              y="-15"
                                              width="74"
                                              height="74"
                                              filterUnits="userSpaceOnUse"
                                              colorInterpolationFilters="sRGB"
                                            >
                                              <feFlood
                                                floodOpacity="0"
                                                result="BackgroundImageFix"
                                              />
                                              <feGaussianBlur
                                                in="BackgroundImageFix"
                                                stdDeviation="7.5"
                                              />
                                              <feComposite
                                                in2="SourceAlpha"
                                                operator="in"
                                                result="effect1_backgroundBlur_40000261_30974"
                                              />
                                              <feBlend
                                                mode="normal"
                                                in="SourceGraphic"
                                                in2="effect1_backgroundBlur_40000261_30974"
                                                result="shape"
                                              />
                                            </filter>
                                          </defs>
                                        </svg>
                                        {/* to show sharepopup on story section */}
                                        {activeStoryId === userStory?.id &&
                                          isShareStoryPopup && (
                                            <ShareStoryPopup
                                              isOpen={isShareStoryPopup}
                                              // onClose={() => setIsSharePopup(false)}
                                              onClose={() =>
                                                handleShareStoryPopupClose()
                                              }
                                              storyId={userStory?.id}
                                              userName={userStory?.user_name}
                                            />
                                          )}
                                      </div>
                                    </div>
                                    <div>
                                      {userStory?.media_url?.length > 0 ? (
                                        userStory?.media_url.map(
                                          (media, mediaIndex) => {
                                            return (
                                              <div key={mediaIndex}>
                                                <img
                                                  // src={userStory?.media_url[0]}
                                                  src={media}
                                                  alt={`Media`}
                                                  className="w-full h-[650px] object-cover rounded-lg"
                                                  loading="lazy"
                                                  onMouseEnter={() =>
                                                    increaseViewersCount(
                                                      userStory?.id
                                                    )
                                                  }
                                                />
                                              </div>
                                            );
                                          }
                                        )
                                      ) : (
                                        <video
                                          src={userStory.src}
                                          controls
                                          className="w-full h-[650px] object-cover rounded-lg"
                                        />
                                      )}
                                    </div>
                                  </div>
                                );
                              });
                            })}
                        </div>
                      </div>

                      {/* Right Navigation Button */}
                      <button
                        className="absolute top-1/2 -right-[50px] w-9 h-9 transform -translate-y-1/2 bg-white text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                        onClick={() => handleBuddiesStoryNext()}
                      >
                        <svg
                          width="8"
                          height="14"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 13L7 7L1 1"
                            stroke="#212626"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 mt-5 w-full">
                {/* Profile Image */}
                <img
                  src={userDetails?.profile_image || dummyUserImage}
                  alt="Profile"
                  className="w-[48px] h-[44px] rounded-full object-cover"
                />

                <div className="flex items-center bg-[#F0F7F7] p-2 rounded-full h-[44px] w-full">
                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="Post a story about your travel..."
                    className="flex-1 bg-transparent border-none outline-none placeholder:font-inter font-medium text-[14px] text-[#869E9D] ml-2 "
                    onClick={() => setIsCreatePostPopup(true)}
                  />
                  {isCreatePostPopup && (
                    <CreateaPostPopup
                      isOpen={isCreatePostPopup}
                      onClose={() => setIsCreatePostPopup(false)}
                      openPostDetail={() => setIsPostDetailPopup(true)}
                      postData={postData}
                      setPostData={setPostData}
                    />
                  )}

                  {isPostDetailPopup && (
                    <>
                      <PostDetailPopup
                        isOpen={isPostDetailPopup}
                        onClose={handlePostDetailPopup}
                        postData={postData}
                        handlePostUpload={handlePostUpload}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            {/*-------- First Section --------*/}

            {/*-------- Second Section --------*/}

            {allPosts &&
              allPosts.map?.((post, index) => {
                return (
                  <div key={post?.id}>
                    <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mb-4">
                      {/* Top Fixed Section */}
                      <div className="flex items-center justify-between space-x-4 mb-1 pb-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={post?.profile_image || dummyUserImage}
                            alt="Avatar"
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <h3 className="font-poppins font-semibold text-left text-[20px] text-[#212626]">
                                  {post?.full_name}
                                </h3>
                                <div>
                                  {post?.buddies_id.length > 0 && (
                                    <div className="">
                                      <p
                                        className="font-poppins font-semibold text-[20px] text-[#212626] cursor-pointer"
                                        onClick={() => togglePopup(post.id)}
                                      >
                                        <span className="text-[#869E9D]">
                                          &nbsp;with
                                        </span>{" "}
                                        {post?.buddies_id?.length} others{" "}
                                      </p>

                                      {isotherDataVisible &&
                                        showTaggedBuddiesPostId == post?.id && (
                                          <div className="absolute mt-0 w-[416px] p-[24px] bg-white border border-gray-300 rounded-[16px] shadow-lg z-10 flex flex-col gap-[34px]">
                                            {post?.buddies_id?.map((buddy) => {
                                              return (
                                                <div
                                                  className="flex flex-col"
                                                  key={buddy?.id}
                                                >
                                                  <div className="flex items-center space-x-3">
                                                    <div>
                                                      <img
                                                        src={
                                                          buddy?.profile_image ||
                                                          dummyUserImage
                                                        }
                                                        alt="Image"
                                                        className="w-[44px] h-[44px] rounded-full"
                                                      />
                                                    </div>
                                                    <div className="flex flex-col">
                                                      <div className="flex items-center gap-2">
                                                        <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                                                          {buddy?.full_name}
                                                        </h5>
                                                        <div className="relative group">
                                                          <img
                                                            src={
                                                              badges[
                                                                buddy?.badge?.split(
                                                                  "-"
                                                                )[0]
                                                              ] ||
                                                              BadgesIconFirst
                                                            }
                                                            alt="BadgesIconFirst"
                                                            className="w-[24px] h-[24px]"
                                                          />
                                                          <div className="absolute left-0 mt-1 hidden group-hover:block bg-[#2DC6BE] text-white text-sm p-2 rounded shadow-lg w-[250px] text-justify">
                                                            {
                                                              buddy?.badge?.split(
                                                                "-"
                                                              )[1]
                                                            }
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div>
                                                        <p className="-mt-2 font-inter font-medium text-[16px] text-[#667877] text-left">
                                                          {buddy?.user_name}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="md:w-[338px] md:h-[32px] flex items-center justify-center rounded-full bg-[#E5FFFE] mt-3">
                                                    <p className="font-inter font-medium items-center text-center text-[12px] text-[#212626]">
                                                      {
                                                        buddy?.badge?.split(
                                                          "-"
                                                        )[0]
                                                      }{" "}
                                                      &nbsp;•&nbsp; 0 Trips
                                                      &nbsp;•&nbsp;{" "}
                                                      {buddy?.followers_count ||
                                                        0}{" "}
                                                      followers &nbsp;•&nbsp;{" "}
                                                      {buddy?.buddies_count ||
                                                        0}{" "}
                                                      Buddies
                                                    </p>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Images beside h3 */}
                              <div className="flex space-x-1">
                                <img
                                  src={
                                    badges[
                                      userDetails?.badge?.split("-")[0]?.trim()
                                    ] || null
                                  }
                                  alt="Badge"
                                  className="w-[24px] h-[24px]"
                                />
                              </div>
                            </div>

                            <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                              {post?.badge.split("-")[0]} • {post?.location}
                            </p>
                          </div>
                        </div>
                        <div>
                          <img
                            src={dotThree}
                            alt="dotThree"
                            className="h-4 object-cover"
                          />
                        </div>
                      </div>
                      {/* Top Fixed Section */}

                      {/*---------- Scrollable Part ---------*/}
                      <div className="flex-1 overflow-y-auto scrollbar-hidden">
                        {post?.media_url?.length === 1 && (
                          <>
                            <div className="relative w-full max-w-4xl mx-auto">
                              {/* Slider */}
                              <div className="overflow-hidden relative mb-4">
                                <div>
                                  {post?.media_url[0]?.match(
                                    /\.(mp4|mov|webm|avi|mkv|flv|wmv|ogv|3gp)$/i
                                  ) ? (
                                    <video
                                      controls
                                      src={post?.media_url[0]}
                                      className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                    >
                                      {/* <source
                                  src={post?.media_url[0]}
                                  type="video/mp4"
                                /> */}
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : (
                                    <img
                                      src={post?.media_url[0]}
                                      alt={`Post Image`}
                                      className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                      onClick={() =>
                                        handleOpenCommentPopup(post?.id)
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {post?.media_url?.length > 1 && (
                          <>
                            <div className="relative w-full max-w-4xl mx-auto">
                              {/* Slider Content */}
                              <div className="overflow-hidden relative mb-4">
                                <div>
                                  {post?.media_url[
                                    currentIndices[post.id] || 0
                                  ]?.match(
                                    /\.(mp4|mov|webm|avi|mkv|flv|wmv|ogv|3gp)$/i
                                  ) ? (
                                    <video
                                      controls
                                      preload="auto"
                                      className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                    >
                                      <source
                                        src={
                                          post?.media_url[
                                            currentIndices[post.id] || 0
                                          ]
                                        }
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : (
                                    <img
                                      src={
                                        post?.media_url[
                                          currentIndices[post.id] || 0
                                        ]
                                      }
                                      alt={`Slide ${
                                        currentIndices[post.id] || 0
                                      }`}
                                      className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                      onClick={() =>
                                        handleOpenCommentPopup(post?.id)
                                      }
                                    />
                                  )}
                                </div>
                              </div>

                              {/* Left Button */}
                              <button
                                onClick={() =>
                                  goToPrevious(post.id, post?.media_url?.length)
                                }
                                className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                              >
                                <svg
                                  width="8"
                                  height="14"
                                  viewBox="0 0 8 14"
                                  fill="none"
                                >
                                  <path
                                    d="M7 13L1 7L7 1"
                                    stroke="#212626"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>

                              {/* Right Button */}
                              <button
                                onClick={() =>
                                  goToNext(post.id, post?.media_url?.length)
                                }
                                className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                              >
                                <svg
                                  width="8"
                                  height="14"
                                  viewBox="0 0 8 14"
                                  fill="none"
                                >
                                  <path
                                    d="M7 13L1 7L7 1"
                                    stroke="#212626"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>

                              {/* Dots */}
                              <div className="flex justify-center mt-1 absolute items-center justify-center inline-flex top-[400px] bg-[#FFFFFFBF] w-[68px] h-[16px] rounded-[16px]">
                                {post?.media_url?.map((_, index) => (
                                  <div
                                    key={index}
                                    onClick={() => goToSlide(post.id, index)}
                                    className={`w-2 h-2 mx-1 rounded-full transform transition-transform duration-300 ${
                                      index === (currentIndices[post.id] || 0)
                                        ? "bg-[#2DC6BE] scale-150"
                                        : "bg-[#869E9D] hover:bg-[#2DC6BE] scale-100"
                                    } cursor-pointer`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                        {/* Post Description */}
                        <p className="font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1 mt-3">
                          {isFullTextVisible
                            ? post.description
                            : post?.description?.length > 170
                            ? `${post.description.slice(0, 170)}...`
                            : post?.description}
                          <span
                            onClick={toggleFullText}
                            className="text-[#2DC6BE] cursor-pointer"
                          >
                            {post?.description?.length < 250
                              ? ""
                              : isFullTextVisible
                              ? " See less"
                              : "  See more"}
                          </span>
                        </p>

                        {/* Hashtags */}
                        <p className="text-left text-[#1DB2AA] mb-4">
                          {post?.tag_id}
                        </p>
                      </div>

                      {/*---------- Scrollable Part ---------*/}

                      {/* Bottom Fixed Section */}
                      <div className="flex items-center justify-between mb-2">
                        <ul className="flex gap-2">
                          <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                            {/* 72K Love &nbsp; &nbsp;{" "} */}
                            {post?.total_likes}&nbsp;
                            {post?.total_likes > 1 ? "Loves" : "Love"} &nbsp;
                            &nbsp;{" "}
                            <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                          </li>
                          <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                            {post?.total_comments}&nbsp;
                            {post?.total_comments > 1
                              ? "comments"
                              : "comment"}{" "}
                            &nbsp; &nbsp;{" "}
                            <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                          </li>
                          <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                            {post?.total_buckets}&nbsp;
                            {post?.total_buckets > 1
                              ? "Buckets listed"
                              : "Bucket listed"}
                            &nbsp; &nbsp;{" "}
                            <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                          </li>
                          <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                            {post?.total_shared}&nbsp; Shared &nbsp; &nbsp;
                          </li>
                        </ul>
                        <p className="font-inter font-medium text-[12px] text-[#667877] ">
                          {" "}
                          {/* 12 Oct 2024{" "} */}
                          {formatePostDate(post?.post_created_at)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <button
                          aria-label="Edit Info"
                          className={`flex items-center justify-center w-[144px] h-[36px] py-1 px-2 rounded-full ${
                            post?.is_liked
                              ? "bg-[#2DC6BE] text-white"
                              : "bg-[#F0F7F7] text-[#434C50]"
                          }`}
                          onClick={() => handleLikeUnlike(post.id)}
                        >
                          <img
                            src={noto_fire}
                            alt="like"
                            className="mr-2 w-[20px] h-[20px]"
                          />
                          {/* <span className="font-inter font-medium text-[14px] text-[#212626] "> */}
                          {!post?.is_liked ? "Like" : "Liked"}
                          {/* </span> */}
                        </button>

                        <button
                          aria-label="Edit Info"
                          className="flex items-center justify-center w-[144px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                          // onClick={() => setActivePostId(post?.id)}
                          onClick={() => handleOpenCommentPopup(post?.id)}
                        >
                          <img
                            src={Dialog}
                            alt="dialog"
                            className="mr-1 w-[20px] h-[20px]"
                          />
                          <span className="font-inter font-medium text-[14px] text-[#212626]">
                            Comment
                          </span>
                        </button>

                        <button
                          aria-label="Edit Info"
                          className="flex items-center justify-center w-[144px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full relative"
                          // onClick={() => setIsCommentWithSavedPopup(true)}
                          onClick={() => handleOpenBucketSavedPopup(post?.id)}
                        >
                          <img
                            src={entypo_bucket}
                            alt="saved"
                            className="mr-1 w-[20px] h-[20px]"
                          />
                          <span className="font-inter font-medium text-[14px] text-[#212626]">
                            Bucket List
                          </span>
                        </button>

                        <button
                          aria-label="Edit Info"
                          className="flex items-center justify-center w-[144px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                          // onClick={() => setIsSharePopup(true)}
                          onClick={() => handleOpenSharePopup(post?.id)}
                        >
                          <img
                            src={send}
                            alt="send"
                            className="mr-2 w-[20px] h-[20px]"
                          />
                          <span className="font-inter font-medium text-[14px] text-[#212626] ">
                            {postDetails.share} Share
                          </span>
                        </button>

                        {activePostId === post?.id && isCommentPopup && (
                          <CommentPopup
                            isOpen={isCommentPopup}
                            onClose={() => handleCloseCommentPopup()}
                            postId={post?.id}
                          />
                        )}

                        {activePostId === post?.id && isSharePopup && (
                          <SharePopup
                            isOpen={isSharePopup}
                            // onClose={() => setIsSharePopup(false)}
                            onClose={() => handleSharePopupClose()}
                            postId={activePostId}
                            userName={post?.user_name}
                          />
                        )}

                        {activePostId === post?.id &&
                          isCommentWithSavedPopup && (
                            <SavedPopup
                              isOpen={isCommentWithSavedPopup}
                              // onClose={() => setIsCommentWithSavedPopup(false)}
                              onClose={() => handleBucketSavedPopupClose()}
                            />
                          )}
                      </div>
                      {/* Bottom Fixed Section */}
                    </div>
                  </div>
                );
              })}

            {/*-------- Second Section --------*/}

            {/*-------- Fourth Section --------*/}
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mt-4  ">
              {/* Top Fixed Section */}
              <h2 className="mb-4 font-poppins text-[32px] font-semibold text-[#212626] text-left">
                Reels
              </h2>

              {/* Top Fixed Section */}

              {/*---------- Slider Part ---------*/}
              <div className="relative w-full max-w-4xl mx-auto">
                {/* Slider */}
                <div className="flex justify-between mb-4 overflow-hidden">
                  {Array.from({ length: 3 }).map((_, index) => {
                    const currentIndex = (ReelIndex + index) % ReelData.length; // Loop through data
                    const reel = ReelData[currentIndex];
                    return (
                      <div key={currentIndex} className="flex-shrink-0">
                        <img
                          src={reel.image}
                          alt={`Slide ${currentIndex}`}
                          className="rounded-lg"
                          style={{
                            width: "300px",
                            height: "400px",
                            objectFit: "cover",
                            marginRight: index < 2 ? "20px" : "0",
                          }}
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <img
                            src={reel.avtar}
                            alt="Avatar"
                            className="w-[44px] h-[44px] object-cover rounded-full"
                          />
                          <div>
                            <h3 className="font-poppins text-left font-semibold text-[#212626] text-[16px]">
                              {reel.title}
                            </h3>
                            <p className="font-inter font-medium text-left text-[#212626] text-[14px]">
                              {reel.subtitle} • {reel.subtitleData}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Left Button */}
                <button
                  onClick={goToPreviousReel}
                  className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                >
                  <img src={leftIcon} alt="leftIcon" />
                </button>

                {/* Right Button */}
                <button
                  onClick={goToNextReel}
                  className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                >
                  <img src={leftIcon} alt="leftIcon" />
                </button>

                {/* Dots */}
                <div className="flex justify-center">
                  {ReelData.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => goToSlideReel(index)}
                      className={`w-2 h-2 mx-1 rounded-full ${
                        index === ReelIndex
                          ? "bg-[#2DC6BE]"
                          : "bg-[#364045] hover:bg-[#2DC6BE]"
                      } cursor-pointer`}
                    ></div>
                  ))}
                </div>
              </div>
              {/*---------- Slider Part ---------*/}
            </div>
            {/*-------- Fourth Section --------*/}

            {/*-------- Fifth Section --------*/}
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mt-4">
              {/* Top Fixed Section */}
              <div className="flex items-center justify-between space-x-4 mb-1 pb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={postDetails.avtar}
                    alt="Avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-poppins font-semibold text-left text-[16px] text-[#212626]">
                        {postDetails.title}
                      </h3>
                      {/* Images beside h3 */}
                      <div className="flex space-x-1">
                        <img
                          src={p1}
                          alt="Image 1"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <img
                          src={p2}
                          alt="Image 2"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <img
                          src={p3}
                          alt="Image 3"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                      {postDetails.subtitle} • {postDetails.subtitleData}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src={dotThree}
                    alt="dotThree"
                    className="h-4 object-cover"
                  />
                </div>
              </div>
              {/* Top Fixed Section */}

              {/*---------- Scrollable Part ---------*/}
              <div className="flex-1 overflow-y-auto scrollbar-hidden">
                <div className="relative w-full max-w-4xl mx-auto">
                  {/* Slider */}
                  <div className="overflow-hidden relative mb-4">
                    <div>
                      <img
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                        className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                      />
                    </div>
                  </div>

                  {/* Left Button */}
                  <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Right Button */}
                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Dots */}
                  <div className="flex justify-center mt-1 absolute items-center justify-center inline-flex top-[400px] bg-[#FFFFFFBF] w-[68px] h-[16px] rounded-[16px]">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 mx-1 rounded-full ${
                          index === currentIndex
                            ? "bg-[#2DC6BE]"
                            : "bg-[#364045] hover:bg-[#2DC6BE]"
                        } cursor-pointer`}
                      ></div>
                    ))}
                  </div>
                </div>
                {/* Post Description */}
                <p className="font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1 mt-3">
                  {isFullTextVisible
                    ? postDetails.description
                    : `${postDetails.description.slice(0, 170)}...`}
                  <span
                    onClick={toggleFullText}
                    className="text-[#2DC6BE] cursor-pointer"
                  >
                    {isFullTextVisible ? " Show less" : " See more"}
                  </span>
                </p>

                {/* Hashtags */}
                <p className="text-left text-[#1DB2AA] mb-2">
                  {postDetails.hastag}
                </p>
              </div>
              {/*---------- Scrollable Part ---------*/}

              {/* Bottom Fixed Section */}
              <div className="flex items-center justify-between">
                <ul className="flex gap-2">
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    72K Love &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    50K comments &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    2.3K Bucket listed &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    1K Shared &nbsp; &nbsp;
                  </li>
                </ul>
                <p className="font-inter font-medium text-[12px] text-[#667877] ">
                  {" "}
                  12 Oct 2024{" "}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#2DC6BE] text-white text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full hover:bg-[#2DC6BE] hover:text-white"
                >
                  <img
                    src={like}
                    alt="like"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] hover:text-white">
                    Liked
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                >
                  <img
                    src={Dialog}
                    alt="dialog"
                    className="mr-1 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] ">
                    Comment
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full relative"
                >
                  <img
                    src={entypo_bucket}
                    alt="saved"
                    className="mr-1 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] ">
                    Bucket List
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                >
                  <img
                    src={send}
                    alt="send"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626]">
                    {postDetails.share} Share
                  </span>
                </button>
              </div>
              {/* Bottom Fixed Section */}
            </div>
            {/*-------- Fifth Section --------*/}

            {/*-------- Sixth Section --------*/}
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mt-4  ">
              {/* Top Fixed Section */}
              <div className="flex items-center justify-between space-x-4 mb-1 pb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={postDetails1.avtar}
                    alt="Avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-poppins font-semibold text-left text-[16px] text-[#212626]">
                        {postDetails1.title}
                      </h3>
                      {/* Images beside h3 */}
                      <div className="flex space-x-1">
                        <img
                          src={p1}
                          alt="Image 1"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <img
                          src={p2}
                          alt="Image 2"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <img
                          src={p3}
                          alt="Image 3"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                      {postDetails1.subtitle} • {postDetails1.subtitleData}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src={dotThree}
                    alt="dotThree"
                    className="h-4 object-cover"
                  />
                </div>
              </div>
              {/* Top Fixed Section */}

              {/*---------- Scrollable Part ---------*/}
              <div className="flex-1 overflow-y-auto scrollbar-hidden">
                <div className="relative w-full max-w-4xl mx-auto">
                  {/* Slider */}
                  <div className="overflow-hidden relative mb-4">
                    <div>
                      <img
                        src={images1[currentIndex1]}
                        alt={`Slide ${currentIndex1}`}
                        className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                      />
                    </div>
                  </div>

                  {/* Left Button */}
                  <button
                    onClick={goToPrevious1}
                    className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Right Button */}
                  <button
                    onClick={goToNext1}
                    className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Dots */}
                  <div className="flex justify-center mt-1 absolute items-center justify-center inline-flex top-[400px] bg-[#FFFFFFBF] w-[68px] h-[16px] rounded-[16px]">
                    {images1.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => goToSlide1(index)}
                        className={`w-2 h-2 mx-1 rounded-full ${
                          index === currentIndex1
                            ? "bg-[#2DC6BE]"
                            : "bg-[#364045] hover:bg-[#2DC6BE]"
                        } cursor-pointer`}
                      ></div>
                    ))}
                  </div>
                </div>
                {/* Post Description */}
                <p className="font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1 mt-3">
                  {isFullTextVisible1
                    ? postDetails1.description
                    : `${postDetails1.description.slice(0, 170)}...`}
                  <span
                    onClick={toggleFullText1}
                    className="text-[#2DC6BE] cursor-pointer"
                  >
                    {isFullTextVisible1 ? " Show less" : " See more"}
                  </span>
                </p>

                {/* Hashtags */}
                <p className="text-left text-[#1DB2AA] mb-2">
                  {postDetails1.hastag}
                </p>
              </div>
              {/*---------- Scrollable Part ---------*/}

              {/* Bottom Fixed Section */}
              <div className="flex items-center justify-between">
                <ul className="flex gap-2">
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    72K Love &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    50K comments &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    2.3K Bucket listed &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    1K Shared &nbsp; &nbsp;
                  </li>
                </ul>
                <p className="font-inter font-medium text-[12px] text-[#667877] ">
                  {" "}
                  12 Oct 2024{" "}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#2DC6BE] text-white text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full hover:bg-[#2DC6BE] hover:text-white"
                >
                  <img
                    src={like}
                    alt="like"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] hover:text-white">
                    Liked
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                >
                  <img
                    src={Dialog}
                    alt="dialog"
                    className="mr-1 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626]">
                    Comment
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full relative"
                >
                  <img
                    src={entypo_bucket}
                    alt="saved"
                    className="mr-1 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] ">
                    Bucket List
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                >
                  <img
                    src={send}
                    alt="send"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626]">
                    Share
                  </span>
                </button>
              </div>
              {/* Bottom Fixed Section */}
              <div className="flex items-center justify-center rounded-full gap-[4px] padding-[8px] h-[36px] bg-[#F0F7F7] mt-4">
                <img
                  src={Dialog}
                  alt="Dialog"
                  className="w-[20px] h-[20px] cursor-pointer"
                />
                <p className="font-inter font-medium text-[14px] text-[#212626] hover:text-[#2DC6BE] cursor-pointer">
                  Visit link
                </p>
              </div>
            </div>
            {/*-------- Sixth Section --------*/}
          </div>
          {/*-------- Middle Section -------*/}
          {/*-------- Right Section -------*/}
          <div className="w-[340px] flex flex-col">
            <CommunityRightSidebar />
          </div>
          {/*-------- Right Section -------*/}
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
