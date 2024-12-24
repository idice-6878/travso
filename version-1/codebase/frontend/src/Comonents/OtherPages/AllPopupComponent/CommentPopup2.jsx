/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Boy1 from "../../../assets/headerIcon/boy1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faImage,
  faSmile,
  faUser,
  faPaperclip,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import Travel from "../../../assets/travel.png";
import First from "../../../assets/1.png";
import BucketImageSecond from "../../../assets/bucketimageSecond.png";
import Dialog from "../../../assets/Dialog.png";
import entypo_bucket from "../../../assets/entypo_bucket.png";

import like from "../../../assets/like.png";
import Saved from "../../../assets/headerIcon/archive-minus.png";
import send from "../../../assets/headerIcon/send.png";
import Girl from "../../../assets/headerIcon/girl.jpg";
import "../Header.css";
import leftIcon from "../../../assets/lefticon.png";
import dotThree from "../../../assets/dotThree.png";
import chevron_down from "../../../assets/chevron-down.png";
import dots_vertical from "../../../assets/dots-vertical.png";
import noto_fire from "../../../assets/noto_fire.png";
import face_smile from "../../../assets/face_smile.png";
import Send from "../../../assets/Send.png";
import trash from "../../../assets/trash.png";
import alert from "../../../assets/alert.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserBuddies, getUserDetails, getUserPosts } from "../../../redux/slices/authSlice";
import {
  commentOnPost,
  commentOnReply,
  deleteCommentByPostOwner,
  deleteReplyByPostOwner,
  getCommentOnPost,
  likeAnyComment,
  likeUnlikeAnyReply,
  LikeUnlikePost,
} from "../../../redux/slices/postSlice";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import EmojiPicker from "emoji-picker-react";
import "./AllPopupPage.css";
import SuccessError from "../SuccessError";

const CommentPopup = ({ isOpen, onClose, postId }) => {
  const dispatch = useDispatch();

  // State for handling "See more"
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const [dropdownOpenSetting, setDropdownOpenSetting] = useState(false);
  const [commentInputVal, setCommentInputVal] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // For displaying image
  const [commentReplyInputVal, setCommentReplyInputVal] = useState("");
  const [allPosts, setAllPosts] = useState(null);
  const [showReplyField, setShowReplyField] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openDropdownReplyId, setOpenDropdownReplyId] = useState(null);
  const [showShareFilePopup, setShowShareFilePopup] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");
  const [visibleReplies, setVisibleReplies] = useState({}); // Object to track visible replies for each comment
  
  const [showTagSuggestionsForReply, setShowTagSuggestionsForReply] = useState(false);
  const [filteredSuggestionsForReply, setFilteredSuggestionsForReply] = useState([]);
  /* for tag people suggestion starts */

  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [taggedUsers, setTaggedUsers] = useState([]); // To store tagged user IDs/names
  const people = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Kevin Brooks' },
    { id: 5, name: 'Kate Wilson' },
  ];

  const handleSuggestionClick = (person) => {
    // Replace the @mention in input with the selected person's name
    const newText = commentInputVal.replace(/@\w*$/, `@${person.full_name} `);
    setCommentInputVal(newText);

    // Add the tagged user's ID to the taggedUsers array
    setTaggedUsers((prev) => [...prev, person.id]);

    setShowTagSuggestions(false);
  };

  /* for tag people suggestion ends */
  // to show more replies
  const handleViewMoreReplies = (commentId, totalReplies) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: Math.min((prev[commentId] || 2) + 5, totalReplies),
    }));
  };

// Handle showing fewer replies (View Less)
const handleViewLessReplies = (commentId) => {
  setVisibleReplies((prev) => ({
    ...prev,
    [commentId]: 2, // Reset to initial state (show only 2 replies)
  }));
};


  const handleReplyClick = (commentId) => {
    // console.log("====replyToCommentId===>", replyToCommentId)
    setReplyToCommentId(replyToCommentId === commentId ? null : commentId);
  };

  const toggleSetting = () => {
    setDropdownOpenSetting(!dropdownOpenSetting);
  };

  // Function to toggle the full text
  const toggleFullText = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  const { postComment } = useSelector((state) => state.postSlice);
  const { userPosts, user: userDetails, userBuddies } = useSelector((state) => state.auth);

  /* emoji functionality starts */
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // working on reply on comment
  const [showEmojiPicker1, setShowEmojiPicker1] = useState(false); // wprking on normal comment

  // const handleEmojiClick = (emoji) => {
  //   console.log("first")
  //   setCommentInputVal((prevComment) => prevComment + emoji);
  //   setShowEmojiPicker1(false); // Close the emoji picker after selection
  // };

  const handleEmojiClick = (emojiObject) => {
    setCommentInputVal((prevComment) => prevComment + emojiObject.emoji);
    setShowEmojiPicker1(false);
  };

  const handleEmojiClickComment = (emojiObject, commentId) => {
    // setCommentReplyInputVal((prevComment) => prevComment + emojiObject.emoji);

    setCommentReplyInputVal((prevReplies) => ({
      ...prevReplies,
      [commentId]: (prevReplies[commentId] || "") + emojiObject.emoji,
    }));
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };
  //  console.log("===showEmojiPicker==>", showEmojiPicker);
  /* emoji functionality ends */

  useEffect(() => {
    if (!userPosts) {
      // dispatch(getAllPosts());
      dispatch(getUserPosts());
    }

    if (!postComment) {
      dispatch(getCommentOnPost(postId));
    }

    if (!userDetails) {
      dispatch(getUserDetails());
    }

    if (!userBuddies) {
      dispatch(getUserBuddies());
    }

    const foundPost = userPosts.find((post) => post.id === postId);
    
    if (foundPost) {
      setAllPosts([foundPost]); // Place the found post at the 0 index
    }
  }, [dispatch, userPosts, postId]);

  // to handle like and unlike
  const handleLikeUnlike = async (postId) => {
    try {
      const likeUnlikeResult = await dispatch(
        LikeUnlikePost({ post_id: postId })
      ).unwrap();
      if (likeUnlikeResult) {
        // await dispatch(getAllPosts());
        await dispatch(getUserPosts());
        // handleFlashMessage(likeUnlikeResult.message, 'success');
      }
    } catch (error) {
      console.log("error in likeunlike api", error);
      const errorMessage = error.error || "Unexpected Error Occured";
      // handleFlashMessage(errorMessage, 'error')
    }
  };


  // handle flash messages show
  const handleFlashMessage = (errorMessage, msgType) => {
    setFlashMessage(errorMessage);
    setFlashMsgType(msgType);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };

  const handleInputEnter = async (e, postId) => {
    // console.log("=====commentInputVal====>", commentInputVal);
    if (e.key === "Enter" && !e.shiftKey) {
      try {
        const commentPayload = {
          post_id: postId,
          content: commentInputVal, // Full comment text
          taggedUsers: taggedUsers.length ? taggedUsers : null, // Send IDs of tagged users
        };
        const commentResult = await dispatch(
          commentOnPost(commentPayload)
        ).unwrap();
        if (commentResult) {
          // await dispatch(getAllPosts());
          // handleFlashMessage(commentResult.message, 'success');
          await dispatch(getCommentOnPost(postId));
          await dispatch(getUserPosts());
          setCommentInputVal("");
          setTaggedUsers([]);
        }
      } catch (error) {
        console.log("error in comment api", error);
        const errorMessage = error.error || "Unexpected Error Occured";
        // handleFlashMessage(errorMessage, 'error')
      }
      
    }
  };

  // sending comment on button click
  const sendComment = async (postId) => {
    try {
      const commentPayload = {
        post_id: postId,
        content: commentInputVal, // Full comment text
        taggedUsers: taggedUsers.length ? taggedUsers : null, // Send IDs of tagged users
      };
      const commentResult = await dispatch(
        commentOnPost(commentPayload)
      ).unwrap();
      if (commentResult) {
        // await dispatch(getAllPosts());
        // handleFlashMessage(commentResult.message, 'success');
        await dispatch(getCommentOnPost(postId));
        await dispatch(getUserPosts());
      }
    } catch (error) {
      console.log("error in sendComment", error);
    } finally {
      setCommentInputVal("");
      setTaggedUsers([]);
    }
  };

  // show post date and time
  function formatISODate(isoDate) {
    const date = new Date(isoDate);

    // Format options for date only
    const options = {
      day: "numeric",
      month: "short", // "short" for abbreviated month (e.g., Oct)
      year: "numeric",
    };

    // Format the date
    return date.toLocaleDateString("en-GB", options);
  }

  // for comment time difference
  function getTimeDifferenceFromNow(timestamp) {
    const givenDate = new Date(timestamp);
    const currentDate = new Date();

    // Calculate the absolute difference in milliseconds
    const timeDifference = Math.abs(givenDate - currentDate);

    // Convert the difference to hours
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor(timeDifference / (1000 * 60)) % 60;

    if (hoursDifference >= 24) {
      const days = Math.floor(hoursDifference / 24);
      return `${days}d`;
    }

    if (hoursDifference >= 1) {
      return `${hoursDifference}h`;
    }
  
    return `${minutesDifference}m`;
  }

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaArray.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // for deleting comment on user post only
  const deleteThisComment = async(commentId) => {
      try {
        const deleteResponse = await dispatch(deleteCommentByPostOwner(commentId)).unwrap();
        if(deleteResponse) {
          setOpenDropdownId(null);
          await dispatch(getCommentOnPost(postId));
          await dispatch(getUserPosts());
          handleFlashMessage(deleteResponse.message, 'success');
        }
      } catch (error) {
        console.log("=======error====in deleteThisComment==>", error);
        handleFlashMessage(error.error || "Unexpected Error", 'error');

      }
  }

  // for deleting reply on user post only
  const deleteThisReply = async(replyId) => {

    try {
      const deleteResponse = await dispatch(deleteReplyByPostOwner(replyId)).unwrap();
      if(deleteResponse) {
        setOpenDropdownReplyId(null);
        await dispatch(getCommentOnPost(postId));
        await dispatch(getUserPosts());
        handleFlashMessage(deleteResponse.message, 'success');
      }
    } catch (error) {
      console.log("=======error====in deleteThisComment==>", error);
      handleFlashMessage(error.error || "Unexpected Error", 'error');

    }
}

  const handleCommentLikeUnlike = async (commentId, postId) => {
    try {
      const response = await dispatch(likeAnyComment(commentId)).unwrap();
      if (response) {
        await dispatch(getCommentOnPost(postId));
      }
      console.log("=====response=====>", response);
    } catch (error) {
      console.log("error in handleCommentLikeUnlike", error);
    }
  };

  
  const handleCommentLikeUnlikeOnReply = async(replyId) => {
    try {
      const response = await dispatch(likeUnlikeAnyReply(replyId)).unwrap();
      if (response) {
        await dispatch(getCommentOnPost(postId));
      }
      // console.log("=====response=====>", response);
      
    } catch (error) {
      console.log("error in handleCommentLikeUnlikeOnReply", error);
    }
  }

  // to show post images
  // const mediaArray =
  //   allPosts && allPosts[0].media_url.replace(/^\[\"|\"?\]$/g, "").split('","'); // Split the string into individual URLs

   // to show post images
   const mediaArray =
   allPosts && allPosts[0].media_url;


  // handle input change on comment input
  const handleCommentInputChange = (e) => {
    const { value } = e.target;
    
    setCommentInputVal(value);
    const match = value.match(/@(\w*)$/); // Match word after @
    if (match) {
      const query = match[1].toLowerCase();
      const filtered = userBuddies.filter((person) =>
        person.full_name.toLowerCase().includes(query)
      );
      setFilteredSuggestions(filtered);
      setShowTagSuggestions(filtered.length > 0);
    } else {
      setShowTagSuggestions(false);
    }
  }

  // to detect tag if user deleted any character
  const detectRemovedTag = (text) => {
    console.log("======text=====>", text);
    return taggedUsers.find((tag) => !text.includes(`@${tag.name}`));
  };

  // to remove tag name from input field if any character from tagged name is removed
  const removeTag = (tag) => {
    console.log("tag====", tag)
    setTaggedUsers((prev) => prev.filter((t) => t.id !== tag.id));
  };

  // handle input change on reply input
  const handleReplyCommentInputChange = (e, commentId) => {
    const { value } = e.target;

    setCommentReplyInputVal((prev) => ({
      ...prev,
      [commentId]: value,
    }))

    const match = value.match(/@(\w*)$/); // Match word after @
    if (match) {
      const query = match[1].toLowerCase();
      const filtered = userBuddies.filter((person) =>
        person.full_name.toLowerCase().includes(query)
      );
      setFilteredSuggestionsForReply(filtered);
      setShowTagSuggestionsForReply(filtered.length > 0);
    } else {
      setShowTagSuggestionsForReply(false);
    }
  }

  const handleSuggestionClickForReply = (person, commentId) => {
      console.log("======commentId====>", commentId);
    // Replace the @mention in input with the selected person's name
    // Replace the @mention in input with the selected person's name
      const currentText = commentReplyInputVal[commentId] || ""; // Retrieve the current value for the commentId
      const newText = currentText.replace(/@\w*$/, `@${person.full_name} `);

      // Update the input value for the specific commentId
      setCommentReplyInputVal((prev) => ({
        ...prev,
        [commentId]: newText,
      }));

    // Add the tagged user's ID to the taggedUsers array
    setTaggedUsers((prev) => [...prev, person.id]);

    setShowTagSuggestionsForReply(false);
  };

  // handle when user replies on any comment and hits enter
  const handleReplyInputEnter = async (e, commentId) => {
    // console.log("====commentId===>", commentId);
    try {
      if (e.key === "Enter" && !e.shiftKey) {
        try {
          const commentReplyPayload = {
            comment_id: commentId,
            content: commentReplyInputVal[commentId], // Full comment text
            taggedUsers: taggedUsers.length ? taggedUsers : null, // Send IDs of tagged users
          };
          const replyResponse = await dispatch(
            commentOnReply(commentReplyPayload)
          ).unwrap();
          if (replyResponse) {
            setCommentReplyInputVal({});
            setTaggedUsers([]);
            await dispatch(getCommentOnPost(postId));
            await dispatch(getUserPosts());
          }
        } catch (error) {
          console.log("error in comment api", error);
          const errorMessage = error.error || "Unexpected Error Occured";
          // handleFlashMessage(errorMessage, 'error')
        }
      }
    } catch (error) {
      console.log("error in handleReplyInputEnter commentpopup page", error);
    }
  };

  const sendReplyComment = async (commentId, postId) => {
    try {
      const replyResponse = await dispatch(
        commentOnReply({
          comment_id: commentId,
          content: commentReplyInputVal[commentId],
        })
      ).unwrap();
      console.log("====replyResponse===>", replyResponse);
      if (replyResponse) {
        await dispatch(getCommentOnPost(postId));
        await dispatch(getUserPosts());
        setCommentReplyInputVal({});
      }
    } catch (error) {
      console.log("error in sendReplyComment commentpopup page", error);
    }
  };

  const handleCommentImageUpload = async (e) => {
    console.log("file handleCommentImageUpload===>");
    const file = e.target.files[0];
    console.log("===file===>", file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          setImagePreview(reader.result);
          setImagePreview(reader.result); // Set the image preview

          // Append the image preview as part of the comment (you can also append it to a markdown or HTML format)
          setCommentInputVal(
            (prevComment) =>
              prevComment + `<img src="${reader.result}" alt="comment-image" />`
          );
          console.log("Image uploaded successfully");
        } catch (error) {
          console.error("Image upload failed handleCommentImageUpload:", error);
        } finally {
          e.target.value = null;
        }
      };
    }
  };

  // console.log("======allPosts[0].description.length====>", allPosts[0].description.length);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.15)] flex items-center justify-center z-50">
      {flashMessage && (
        <SuccessError message={flashMessage} messageType={flashMsgType} />
      )}
      <div className="bg-white rounded-2xl shadow-lg w-[1100px] md:w-[1100px] h-[640px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-4 sticky top-0 bg-white z-10">
          <h2 className="font-poppins font-semibold text-[#212626] text-[24px]">
            Comment section
          </h2>
          <button
            className="text-black hover:text-[#2DC6BE] font-bold text-xl"
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Section */}
          <div className="w-3/5 px-6 py-4 flex flex-col justify-between">
            {/* Top Fixed Section */}
            <div className="flex items-center justify-between space-x-4 mb-1 pb-2 ">
              <div className="flex items-center gap-2">
                <img
                  src={
                    (allPosts && allPosts[0]?.profile_image) || dummyUserImage
                  }
                  alt="Avatar"
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-poppins font-semibold text-left text-[16px] text-[#212626]">
                    {allPosts && allPosts[0]?.full_name}
                  </h3>
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
                {/* Slider */}
                { mediaArray && mediaArray.length > 0 && (
                  <div className="relative w-full max-w-4xl mx-auto">
                
                    <div className="overflow-hidden relative">
                      <div>
                        <img
                          // src={images[currentIndex]}
                          src={mediaArray && mediaArray.length > 0 && mediaArray[currentIndex]}
                          alt={`Slide ${currentIndex}`}
                          className="rounded-lg w-full h-[344px] object-cover transition duration-500"
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
                <div className="flex justify-center mt-1">
                  {mediaArray && mediaArray.length > 0 &&
                    mediaArray?.map((_, index) => (
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
              )}
              {/* Post Description */}
              <p className="font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1">
                {isFullTextVisible
                  ? allPosts && allPosts[0].description
                  : allPosts && `${allPosts[0].description.slice(0, 100)}...`}
                <span
                  onClick={toggleFullText}
                  className="text-[#2DC6BE] cursor-pointer"
                >
                  {allPosts && allPosts[0].description.length < 100 ? "" : isFullTextVisible ? " Show less" : " See more"}
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
                  {(allPosts && allPosts[0]?.total_likes) || ""} Love &nbsp;
                  &nbsp;{" "}
                  <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                </li>
                <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                  {(allPosts && allPosts[0]?.total_comments) || ""} comments
                  &nbsp; &nbsp;{" "}
                  <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                </li>
                <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                  {(allPosts && allPosts[0]?.total_buckets) || ""} Bucket listed
                  &nbsp; &nbsp;{" "}
                  <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                </li>
                <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                  {(allPosts && allPosts[0]?.total_shared) || ""} Shared &nbsp;
                  &nbsp;
                </li>
              </ul>
              <p className="font-inter font-medium text-[12px] text-[#667877] ">
                {" "}
                {/* 12 Oct 2024{" "} */}
                {allPosts && formatISODate(allPosts[0]?.post_created_at)}{" "}
              </p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                aria-label="Edit Info"
                className="flex items-center justify-center w-[130px] h-[36px] bg-[#2DC6BE] text-white text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full hover:bg-[#2DC6BE] hover:text-white"
                onClick={() => handleLikeUnlike(allPosts[0].id)}
              >
                <img src={like} alt="like" className="mr-2 w-[20px] h-[20px]" />
                <span className="font-inter font-medium text-[14px] text-[#212626]">
                  Liked
                </span>
              </button>

              <button
                aria-label="Edit Info"
                className="flex items-center justify-center w-[130px] h-[36px] bg-[#cdd0d499] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
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
                className="flex items-center justify-center w-[130px] h-[36px] bg-[#cdd0d499] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full relative"
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
                className="flex items-center justify-center w-[130px] h-[36px] bg-[#cdd0d499] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
              >
                <img src={send} alt="send" className="mr-2 w-[20px] h-[20px]" />
                <span className="font-inter font-medium text-[14px] text-[#212626]">
                  {postDetails.share} Share
                </span>
              </button>
            </div>
            {/* Bottom Fixed Section */}
          </div>

          {/* Right Section - Post Activity */}
          <div className="w-2/4 px-6 py-4 h-full border-l border-gray-100 flex flex-col justify-between">
            {/* Top Fixed Section */}
            <div className="flex items-center justify-between sticky top-0 bg-white z-10 cursor-pointer">
              <h3 className="font-poppins font-semibold text-[20px] text-[#212626]">
                Comments ({allPosts && allPosts[0]?.total_comments})
              </h3>
            </div>
            {/* Top Fixed Section */}

            {/*---------- Scrollable Part ---------*/}
            <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4">
              {/* <div className="mt-6"> */}
              {postComment &&
                postComment.map((userPosts, index) => {
                  return (
                    <>
                    <div className="mt-6" key={index}>
                      {/* Parent Comment Reaction */}
                      <div className="flex items-start space-x-3 rounded-md">
                        {/* Profile Image */}
                        <img
                          src={userPosts?.profile_image || dummyUserImage}
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />

                        {/* Content Section */}
                        <div className="w-full flex flex-col space-y-2">
                          {/* Comment Content */}
                          <div className="flex flex-col bg-[#EEF0F29C] p-2 rounded-[12px] w-full">
                            <div className="flex items-center justify-between">
                              <p className="flex items-center font-inter font-medium text-[#212626] text-[16px] text-left">
                                {userPosts?.user_name || userPosts?.full_name}{" "}
                                &nbsp;{" "}
                                <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>{" "}
                                &nbsp;{" "}
                                {/* <span className="font-inter font-medium text-[16px] text-[#667877]">
                                  {getTimeDifferenceFromNow(
                                    userPosts?.created_at
                                  )}{" "}
                                  ago
                                </span> */}
                                <span className="font-inter font-medium text-[16px] text-[#667877]">
                                  {getTimeDifferenceFromNow(userPosts?.created_at) == '0m' ? 'just now' : `${getTimeDifferenceFromNow(userPosts?.created_at)} ago`}{" "}
                                </span>
                              </p>
                              <img
                                src={dots_vertical}
                                alt="dots_vertical"
                                className="w-[24px] h-[24px] cursor-pointer"
                                // onClick={toggleSetting}
                                onClick={() => setOpenDropdownId(userPosts.id)}
                              />
                              {/* DropdownSetting Menu */}
                              {openDropdownId === userPosts?.id && (
                                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ddd] rounded-md rounded-[16px] shadow-md w-[200px]">
                                  <div className="flex items-center justify-between p-2 px-4 ">
                                    <h6 className="font-poppins font-semibold text-[16px] text-[#212626]">
                                      More Options
                                    </h6>

                                    {/* Close Button (X) */}
                                    <button
                                      className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                                      // onClick={() =>
                                      //   setDropdownOpenSetting(false)
                                      // }
                                      onClick={() => setOpenDropdownId(null)}
                                      aria-label="Close"
                                    >
                                      &#x2715;
                                    </button>
                                  </div>
                                  <ul>
                                    <li className="font-inter font-medium text-[16px] text-[#212626] px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0]">
                                      <img
                                        src={alert}
                                        alt="alert"
                                        className="w-[20px] h-[20px] cursor-pointer mr-2"
                                      />{" "}
                                      Report comment
                                    </li>
                                    <li className="px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0]" onClick={() => deleteThisComment(userPosts?.id)}>
                                      <img
                                        src={trash}
                                        alt="alert"
                                        className="w-[20px] h-[20px] cursor-pointer mr-2"
                                      />{" "}
                                      Delete comment
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>

                            <p className="font-inter font-normal text-[14px] text-[#212626] text-left">
                              {userPosts?.content}
                            </p>
                          </div>

                          {/* Interaction Section */}
                          <div className="flex flex-col">
                            <div className="-mt-1 flex items-center gap-4">
                              <div
                                className="flex items-center cursor-pointer"
                                onClick={() =>
                                  handleCommentLikeUnlike(
                                    userPosts.id,
                                    allPosts[0]?.id
                                  )
                                }
                              >
                                <div className="flex items-center">
                                  <img
                                    src={noto_fire}
                                    alt="noto_fire"
                                    className="w-4 h-4"
                                  />
                                </div>
                                <div className="flex items-center">
                                  <p className="font-inter font-medium text-[12px] text-[#415365] text-left">
                                    {userPosts?.total_likes_on_comment || ""}{" "}
                                    {userPosts?.total_likes_on_comment > 1
                                      ? "likes"
                                      : "like"}{" "}
                                  </p>
                                </div>
                              </div>
                              <div
                                className="flex items-center"
                                onClick={() => handleReplyClick(userPosts?.id)}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={Dialog}
                                    alt="Dialog"
                                    className="w-4 h-4"
                                  />
                                </div>
                                <div className="flex items-center cursor-pointer">
                                  <p className="font-inter font-medium text-[12px] text-[#415365] text-left">
                                    {userPosts?.total_reply_on_comment || ""}{" "}
                                    {userPosts?.total_reply_on_comment > 1
                                      ? "replies"
                                      : "reply"}{" "}
                                  </p>
                                </div>
                              
                              </div>
                            </div>
                            
                          </div>
                        </div>
                        
                          
                      </div>
                      {/* Parent Comment Reaction */}
                    </div>
                    {/* SubReplies */}
                    {userPosts?.replies?.length > 0 &&
                          userPosts?.replies?.slice(0, visibleReplies[userPosts.id] || 2).map((userReply, replyIndex) => {
                            return (
                              <div key={userReply?.reply_id}>
                                <div className="mt-4 ml-8">
                                  <div className="flex items-start rounded-md">
                                    <img
                                      src={userReply?.reply_user_profile_image || dummyUserImage}
                                      alt="User"
                                      className="w-8 h-8 rounded-full"
                                    />

                                    <div className="w-full flex flex-col space-y-2">
                                      <div className="flex flex-col bg-[#EEF0F29C] p-2 rounded-[12px] w-full">
                                        <div className="flex items-center justify-between cursor-pointer">
                                          <p className="flex items-center font-inter font-medium text-[#212626] text-[16px] text-left">
                                            {userReply?.reply_user_full_name} &nbsp;{" "}
                                            <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>{" "}
                                            &nbsp;{" "}
                                            <span className="font-inter font-medium text-[16px] text-[#667877]">
                                              {getTimeDifferenceFromNow(userReply?.reply_created_at) == '0m' ? 'just now' : `${getTimeDifferenceFromNow(userReply?.reply_created_at)} ago`}{" "}
                                            </span>
                                          </p>
                                          <img
                                            src={dots_vertical}
                                            alt="dots_vertical"
                                            className="w-[24px] h-[24px]"
                                            onClick={() => setOpenDropdownReplyId(userReply?.reply_id)}
                                          />
                                          {/* DropdownSetting Menu */}
                                            {openDropdownReplyId === userReply?.reply_id && (
                                              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ddd] rounded-md rounded-[16px] shadow-md w-[200px]">
                                                <div className="flex items-center justify-between p-2 px-4 ">
                                                  <h6 className="font-poppins font-semibold text-[16px] text-[#212626]">
                                                    More Options
                                                  </h6>

                                                  {/* Close Button (X) */}
                                                  <button
                                                    className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                                                    onClick={() => setOpenDropdownReplyId(null)}
                                                    aria-label="Close"
                                                  >
                                                    &#x2715;
                                                  </button>
                                                </div>
                                                <ul>
                                                  <li className="font-inter font-medium text-[16px] text-[#212626] px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0]">
                                                    <img
                                                      src={alert}
                                                      alt="alert"
                                                      className="w-[20px] h-[20px] cursor-pointer mr-2"
                                                    />{" "}
                                                    Report comment
                                                  </li>
                                                  <li className="px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0]" onClick={() => deleteThisReply(userReply?.reply_id)}>
                                                    <img
                                                      src={trash}
                                                      alt="alert"
                                                      className="w-[20px] h-[20px] cursor-pointer mr-2"
                                                    />{" "}
                                                    Delete comment
                                                  </li>
                                                </ul>
                                              </div>
                                            )}
                                        </div>

                                        <p className="font-inter font-normal text-[14px] text-[#212626] text-left">
                                          {userReply?.reply_content}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-2 cursor-pointer">
                                        <div 
                                          className="flex items-center"
                                          onClick={() =>
                                            handleCommentLikeUnlikeOnReply(
                                              userReply?.reply_id
                                            )
                                          }   
                                        >
                                          <div className="flex items-center" >
                                            <img
                                              src={noto_fire}
                                              alt="noto_fire"
                                              className="w-4 h-4"
                                            />
                                          </div>
                                          <div className="flex items-center">
                                            <p className="font-inter font-medium text-[12px] text-[#415365] text-left">
                                            {/* {userReply?.total_likes_on_reply > 1 ? "like" : "likes"} */}
                                            {userReply?.total_likes_on_reply || ""}{" "}
                                            {userReply?.total_likes_on_reply > 1
                                              ? "likes"
                                              : "like"}{" "}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-center">
                                          {/* <div className="flex items-center">
                                            <img
                                              src={Dialog}
                                              alt="Dialog"
                                              className="w-4 h-4"
                                            />
                                          </div> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                    })}
                   
                   {/* View More Button */}
                      {userPosts?.replies?.length > (visibleReplies[userPosts.id] || 2) && (
                        <button
                          onClick={() => handleViewMoreReplies(userPosts.id, userPosts.replies.length)}
                          className="text-blue-500 mt-2 ml-8 text-sm"
                        >
                          View {Math.min(5, userPosts.replies.length - (visibleReplies[userPosts.id] || 2))} more replies
                        </button>
                      )}

                      {/* View Less Button */}
                      {userPosts?.replies?.length > 2 && (visibleReplies[userPosts.id] || 2) >= userPosts?.replies?.length && (
                        <button
                          onClick={() => handleViewLessReplies(userPosts.id)}
                          className="text-red-500 mt-2 ml-8 text-sm"
                        >
                          View Less
                        </button>
                      )}

                      {/* Input Section New */}
                      {replyToCommentId === userPosts?.id && (
                              <div className="mt-3">
                                {showTagSuggestionsForReply && (
                                        <ul className="suggestions">
                                          {filteredSuggestionsForReply.map((person) => (
                                            <li key={person.id} onClick={() => handleSuggestionClickForReply(person, replyToCommentId)}>
                                              {person.full_name}
                                            </li>
                                          ))}
                                        </ul>
                                )}
                                <div className="flex items-center gap-2">
                                  {/* Profile Image */}
                                  <img
                                    src={
                                      (userDetails &&
                                        userDetails?.profile_image) ||
                                      dummyUserImage
                                    }
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                  />

                                  <div className="relative">
                                    {showEmojiPicker && (
                                      <div className="absolute top-10 left-0 z-50">
                                        <EmojiPicker
                                          onEmojiClick={(emojiObject) =>
                                            handleEmojiClickComment(
                                              emojiObject,
                                              userPosts?.id
                                            )
                                          }
                                          className="w-[250px] h-[300px] shadow-lg rounded-lg"
                                        />
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex items-center bg-gray-200 py-2 pl-2 rounded-full w-[100%]">
                                    {/* {showEmojiPicker && (
                                    <div className="absolute top-10 right-72 bg-white border rounded-lg shadow-lg p-3 grid grid-cols-8 gap-2 z-50 max-h-48 overflow-y-auto">
                                      {emojis.map((emoji, index) => (
                                        <button
                                          key={index}
                                          className="text-2xl hover:bg-gray-200 p-2 rounded"
                                          onClick={() =>
                                            handleEmojiClickComment(emoji)
                                          }
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                    </div>
                                  )} */}

                                    <img
                                      src={face_smile}
                                      alt="smile"
                                      className="cursor-pointer"
                                      onClick={() =>
                                        setShowEmojiPicker(!showEmojiPicker)
                                      }
                                    />
                                    {/* Input Field */}
                                    <input
                                      type="text"
                                      placeholder="Add a Reply"
                                      onKeyDown={(e) =>
                                        handleReplyInputEnter(
                                          e,
                                          userPosts?.id,
                                          allPosts[0]?.id
                                        )
                                      }
                                      value={
                                        commentReplyInputVal[userPosts?.id] ||
                                        ""
                                      }
                                      // onChange={(e) =>
                                      //   setCommentReplyInputVal((prev) => ({
                                      //     ...prev,
                                      //     [userPosts?.id]: e.target.value,
                                      //   }))
                                      // }
                                      onChange={(e) => handleReplyCommentInputChange(e, userPosts?.id)}
                                      className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 ml-2 text-sm"
                                    />

                                    {/* Icons */}
                                    <div className="flex items-center justify-center space-x-3 text-gray-400">
                                      <button className="hover:text-gray-600">
                                        <FontAwesomeIcon
                                          icon={faPaperclip}
                                          className="w-5 h-5"
                                        />
                                      </button>
                                      <button className="">
                                        <img
                                          src={Send}
                                          onClick={() =>
                                            sendReplyComment(
                                              userPosts?.id,
                                              allPosts[0]?.id
                                            )
                                          }
                                          className="w-[44px] h-[44px] -my-5"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                    </>
                  );
                })}

              {/* </div> */}
            </div>
            {/*---------- Scrollable Part ---------*/}

            {/* Bottom Fixed Section */}

            {showTagSuggestions && (
                    <ul className="suggestions">
                      {filteredSuggestions.map((person) => (
                        <li key={person.id} onClick={() => handleSuggestionClick(person)}>
                          {person.full_name}
                        </li>
                      ))}
                    </ul>
            )}
            <div className="mt-3">
              <div className="flex items-center gap-2">
                {/* Profile Image */}
                <img
                  src={
                    (userDetails && userDetails.profile_image) || dummyUserImage
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />

                {/* <div>
                  {showEmojiPicker1 && (
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  )}
                </div> */}

                <div className="relative">
                  {showEmojiPicker1 && (
                    <div className="absolute -top-[380px] left-0 z-50">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        className="w-[250px] h-[300px] shadow-lg rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center bg-gray-200 py-2 pl-2 rounded-full w-[100%]">
                  {/* {showEmojiPicker1 && (
                    <div className="absolute top-96 right-52 bg-white border rounded-lg shadow-lg p-3 grid grid-cols-8 gap-2 z-50 max-h-48 overflow-y-auto">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          className="text-2xl hover:bg-gray-200 p-2 rounded"
                          onClick={() => handleEmojiClick(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )} */}

                  <img
                    src={face_smile}
                    alt="smile"
                    className="cursor-pointer"
                    onClick={() => setShowEmojiPicker1(!showEmojiPicker1)}
                  />

                  {/* Input Field */}
                  {/* <div> */}
                      <input
                        type="text"
                        placeholder="Add a comment"
                        onKeyDown={(e) => handleInputEnter(e, allPosts[0]?.id)}
                        value={commentInputVal}
                        // onChange={(e) => setCommentInputVal(e.target.value)}
                        onChange={(e) => handleCommentInputChange(e)}
                        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 ml-2 text-sm"
                      />

                  {/* </div> */}

                  {/* Icons */}
                  <div className="flex items-center justify-center space-x-3 text-gray-400">
                    {/* <button className="hover:text-gray-600" onClick={() => document.getElementById("uploadCommentImage").click()}>
                    <input type="file" id="uploadCommentImage" hidden onChange={(e) => handleCommentImageUpload(e)} />
                      <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5" />
                    </button> */}
                    <button
                      className="hover:text-gray-600"
                      onClick={() => setShowShareFilePopup(!showShareFilePopup)}
                    >
                      <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5" />
                    </button>

                    {/* Popup Menu */}
                    {showShareFilePopup && (
                      <div className="absolute top-[520px] right-72 bg-white shadow-lg rounded-md p-2 w-20 z-50 flex flex-col space-y-3">
                        {/* Image Icon */}
                        <button
                          className="flex items-center justify-center hover:text-blue-500"
                          onClick={() => {
                            document
                              .getElementById("uploadCommentImage")
                              .click();
                            setShowShareFilePopup(false);
                          }}
                        >
                          <FontAwesomeIcon icon={faImage} className="w-6 h-6" />
                        </button>

                        {/* GIF Icon */}
                        <button
                          className="flex items-center justify-center hover:text-green-500"
                          onClick={() => {
                            // Handle GIF upload logic or open GIF picker
                            setShowShareFilePopup(false);
                          }}
                        >
                          <FontAwesomeIcon icon={faFilm} className="w-6 h-6" />
                        </button>
                      </div>
                    )}

                    <input
                      type="file"
                      id="uploadCommentImage"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleCommentImageUpload(e)}
                    />

                    <button className="">
                      <img
                        src={Send}
                        onClick={() => sendComment(allPosts[0]?.id)}
                        className="w-[44px] h-[44px] -my-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Fixed Section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
