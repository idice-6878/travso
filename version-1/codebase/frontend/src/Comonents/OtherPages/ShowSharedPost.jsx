import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Travel from "../../assets/travel.png";
import First from "../../assets/1.png";
import BucketImageSecond from "../../assets/bucketimageSecond.png";
import Boy1 from "../../assets/headerIcon/boy1.png";
import dotThree from "../../assets/dotThree.png";
import p1 from "../../assets/headerIcon/p1.png";
import p2 from "../../assets/headerIcon/p2.png";
import p3 from "../../assets/headerIcon/p3.png";
import leftIcon from "../../assets/lefticon.png";
import like from "../../assets/like.png";
import Dialog from "../../assets/Dialog.png";
import entypo_bucket from "../../assets/entypo_bucket.png";
import send from "../../assets/headerIcon/send.png";
import { useDispatch, useSelector } from "react-redux";
import { getSharePostData, LikeUnlikePost } from "../../redux/slices/postSlice";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import travel_badges from "../../assets/travel_badges.png";
import { getUserPosts } from "../../redux/slices/authSlice";
import CommentPopup from "./AllPopupComponent/CommentPopup";
import SharePopup from "./AllPopupComponent/SharePopup";
import SavedPopup from "./AllPopupComponent/SavedPopup";


function ShowSharedPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, postId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [isCommentPopup, setIsCommentPopup] = useState(false);
  const [isCommentWithSavedPopup, setIsCommentWithSavedPopup] = useState(false);
  const [isSharePopup, setIsSharePopup] = useState(false);

  const { sharedPostData } = useSelector((state) => state.postSlice);

  useEffect(() => {
    if(!sharedPostData) {
        dispatch(getSharePostData({userName, postId}));
    }
  },[dispatch]);

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

  const goToPrevious = (imgArrLength) => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login');
        return;
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imgArrLength - 1 : prevIndex - 1
    );
  };

  const goToNext = (imgArrLength) => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login');
        return;
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === imgArrLength - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login');
        return;
    }
    setCurrentIndex(index);
  };

  const toggleFullText = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  // format in format for dob like 25 Aug 2002 and for joined Feb 2022
  function formatDate(isoDate) {
    const date = new Date(isoDate);

    // Array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getUTCDate(); // Day of the month
    const month = months[date.getUTCMonth()]; // Full month name
    const shortMonth = month.slice(0, 3); // Abbreviated month name
    const year = date.getUTCFullYear(); // Full year

    return `${day} ${shortMonth} ${year}`; // Example: 25 Aug 2002
  }

  // check for token
  const checkToken = async() => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login');
    }
  }

  const handleLikeUnlike = async (postId) => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login')
        return;
    }

    try {
      const likeUnlikeResult = await dispatch(
        LikeUnlikePost({ post_id: postId })
      ).unwrap();
      if (likeUnlikeResult) {
        // await dispatch(getAllPosts());
        await dispatch(getSharePostData({userName, postId}));
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
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login');
        return;
    }
    setActivePostId(postId);
    setIsCommentPopup(true);
  }

  // to open share popup
  const handleOpenBucketSavedPopup = (postId) => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login');
        return;
    }
    setActivePostId(postId);
    setIsCommentWithSavedPopup(true);
  }

  // to open share popup
  const handleOpenSharePopup = (postId) => {
    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/login');
        return;
    }
    setActivePostId(postId);
    setIsSharePopup(true);
  }

  // to close comment popup
  const handleCloseCommentPopup = () => {
    setIsCommentPopup(false);
    setActivePostId(null)
  }

  // to close bucket saved popup
  const handleBucketSavedPopupClose = () => {
    setIsCommentWithSavedPopup(false);
    setActivePostId(null)
  }

  // to close share popup
  const handleSharePopupClose = () => {
    setIsSharePopup(false);
    setActivePostId(null);
    dispatch(getUserPosts());
  }

  return (
    <div>

      {
        sharedPostData && (
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mt-4">
              {/* Top Fixed Section */}
              <div className="flex items-center justify-between space-x-4 mb-1 pb-2 w-full max-w-4xl mx-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={sharedPostData?.profile_image || dummyUserImage} 
                    // src={dummyUserImage} 
                    alt="Avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-poppins font-semibold text-left text-[16px] text-[#212626]">
                        {sharedPostData?.full_name}
                      </h3>

                      {/* Images beside h3 */}
                      <div className="flex space-x-1">
                        <img
                          src={p1}
                          alt="Image 1"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                      {sharedPostData?.badge?.split("-")[0]} • {sharedPostData?.location}
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
                {
                    sharedPostData?.media_url.length > 0 && (
<div className="relative w-full max-w-4xl mx-auto">
                  {/* Slider */}
                  <div className="overflow-hidden relative mb-4">
                    <div>
                      <img
                        src={sharedPostData?.media_url[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                        className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                      />
                    </div>
                  </div>

                  {/* Left Button */}
                  <button
                    onClick={() => goToPrevious(sharedPostData?.media_url?.length)}
                    className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Right Button */}
                  <button
                    onClick={() => goToNext(sharedPostData?.media_url?.length)}
                    className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Dots */}
                  <div className="flex justify-center mt-1 absolute items-center justify-center inline-flex top-[400px] bg-[#FFFFFFBF] w-[68px] h-[16px] rounded-[16px]">
                    {sharedPostData?.media_url.map((_, index) => (
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
                    )
                }
                
                {/* Post Description */}
                <p className="font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1 mt-3 flex w-full max-w-4xl mx-auto">
                  {isFullTextVisible
                    ? sharedPostData?.description
                    : sharedPostData?.description?.length > 170 ? `${sharedPostData.description.slice(0, 170)}...` : sharedPostData?.description}
                  <span
                    onClick={toggleFullText}
                    className="text-[#2DC6BE] cursor-pointer"
                  >
                    {/* {isFullTextVisible ? " Show less" : " See more"} */}
                    {sharedPostData?.description?.length < 250
                        ? ""
                        : isFullTextVisible
                        ? " See less"
                        : "  See more"}
                  </span>
                </p>

                {/* Hashtags */}
                <p className="text-left text-[#1DB2AA] mb-2 flex w-full max-w-4xl mx-auto">
                  {sharedPostData?.hashtag}
                </p>
              </div>
              {/*---------- Scrollable Part ---------*/}

              {/* Bottom Fixed Section */}
              <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
                <ul className="flex gap-2">
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    {sharedPostData?.total_likes || 0} Love &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                  {sharedPostData?.total_comments || 0}{" "}
                  {sharedPostData?.total_comments > 1 ? "comments" : "comment"}&nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    {sharedPostData?.total_buckets || 0}{" "}
                    {sharedPostData?.total_buckets > 1
                        ? "Buckets listed"
                        : "Bucket listed"} &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                  {sharedPostData?.total_shared} Shared &nbsp; &nbsp;
                  </li>
                </ul>
                <p className="font-inter font-medium text-[12px] text-[#667877] ">
                  {" "}
                  {/* 12 Oct 2024{" "} */}
                  {formatDate(sharedPostData?.created_at)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3 w-full max-w-4xl mx-auto">
                <button
                  aria-label="Edit Info"
                //   className="flex items-center justify-center w-[130px] h-[36px] bg-[#2DC6BE] text-white text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full hover:bg-[#2DC6BE] hover:text-white"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full"
                  onClick={() => handleLikeUnlike(sharedPostData?.id)}
                >
                  <img
                    src={like}
                    alt="like"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] hover:text-white">
                    Like
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                  onClick={() => handleOpenCommentPopup(sharedPostData?.id)}
                
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
                  onClick={() => handleOpenBucketSavedPopup(sharedPostData?.id)}
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
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                  onClick={() => handleOpenSharePopup(sharedPostData?.id)}               
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
                {activePostId === sharedPostData?.id && isCommentPopup && (
                    <CommentPopup
                      isOpen={isCommentPopup}
                      onClose={() => handleCloseCommentPopup()}
                      postId={sharedPostData?.id}
                    />
                  )}

                  {
                    activePostId === sharedPostData?.id && isSharePopup && (
                      <SharePopup
                        isOpen={isSharePopup}
                        // onClose={() => setIsSharePopup(false)}
                        onClose={() => handleSharePopupClose()}
                        postId={sharedPostData?.id}
                        userName={sharedPostData?.user_name}
                      />
                    )
                  }

                  {
                    activePostId === sharedPostData?.id && isCommentWithSavedPopup && (
                      <SavedPopup
                        isOpen={isCommentWithSavedPopup}
                        // onClose={() => setIsCommentWithSavedPopup(false)}
                        onClose={() => handleBucketSavedPopupClose()}
                      />
                    )
                  }
              </div>
              {/* Bottom Fixed Section */}
            </div>

        )
      }

      
    </div>
  );
}

export default ShowSharedPost;
