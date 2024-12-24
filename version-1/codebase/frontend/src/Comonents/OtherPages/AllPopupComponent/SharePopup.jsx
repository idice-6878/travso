/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Boy1 from "../../../assets/headerIcon/boy1.png";
import Girl from "../../../assets/headerIcon/girl.jpg";
import SearchIcon from "@mui/icons-material/Search";
import "../Header.css";
import { useDispatch, useSelector } from "react-redux";
import { SharePostWithFriends } from "../../../redux/slices/postSlice";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import { getUserBuddies } from "../../../redux/slices/authSlice";

const SharePopup = ({ isOpen, onClose, postId, userName }) => {
  const dispatch = useDispatch();
  const { userBuddies } = useSelector((state) => state.auth);
  const [shareIds, setShareIds] = useState([]);
  const [thought, setThought] = useState("");
  const [buddieList, setBuddieList] = useState(userBuddies);

  useEffect(() => {
    if (!userBuddies) {
      dispatch(getUserBuddies());
    }
    if (userBuddies) {
      setBuddieList(userBuddies);
    }
  }, [dispatch, userBuddies]);

  // select the people to share post with
  const handleSelect = (id) => {
    setShareIds((prevShareIds) => {
      if (prevShareIds.includes(id)) {
        // Remove the id if it already exists
        return prevShareIds.filter((shareId) => shareId !== id);
      } else {
        // Add the id if it doesn't exist
        return [...prevShareIds, id];
      }
    });
  };

  // to set thoughts
  const handleInputChange = (e) => {
    setThought(e.target.value);
  };

  // to share post with friends
  const handleShare = async () => {
    try {
      const host = window.location.origin;
      const link = `${host}/${userName}/${postId}`;
      const shareData = {
        post_id: postId,
        shared_to_id: shareIds,
        thoughts: thought,
        link: link,
      };

      const response = await dispatch(SharePostWithFriends(shareData)).unwrap();
      if (response) onClose();
    } catch (error) {
      console.log("===error in handleShare==>", error);
    }
  };

  // for seacrhing buddies
  const handleBuddiesData = (e) => {
    const { value } = e.target;
    if (value.trim()) {
      const searchResult = userBuddies
        ? userBuddies.filter((buddy) =>
            buddy.full_name.toLowerCase().includes(value.toLowerCase())
          )
        : [];
      setBuddieList(searchResult);
    } else {
      setBuddieList(userBuddies);
    }
  };

  // to copy link to clipboard
  // const copyLinkToClipBoard = async() => {
  //   const text = "hello world";
  //   console.log("====userName===>", userName);
  //   console.log("====postId===>", postId);
  //   await navigator.clipboard.writeText(text)
  //       .then(() => {
  //           console.log('Text successfully copied to clipboard');
  //       })
  //       .catch((err) => {
  //           console.error('Failed to copy text: ', err);
  //       });

  // }

  const copyLinkToClipBoard = async () => {
    try {
      // Replace `window.location.origin` with your desired host if needed
      const host = window.location.origin;
      const link = `${host}/${userName}/${postId}`;

      console.log("====Generated Link===>", link);

      await navigator.clipboard.writeText(link);
      console.log("Link successfully copied to clipboard");
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  // Disable body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          .no-scroll {
            overflow: hidden;
          }
        `}
      </style>
      <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.15)] flex items-center justify-center z-50">
        <div className="bg-white rounded-[16px] shadow-lg w-[696px] px-5 py-5 md:w-[696px] h-[660px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10 md:h-[55px]">
            <h4 className="text-[#303037] font-poppins font-semibold text-[24px]">
              Share with your friends
            </h4>
            <button
              className="text-black hover:text-[#2DC6BE] font-bold text-xl"
              onClick={onClose}
              aria-label="Close"
            >
              &#x2715;
            </button>
          </div>

          <div className="flex flex-col h-full  flex-1 overflow-y-auto scrollbar-hidden">
            <div className="block relative w-full py-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-[48px] pl-12 pr-4 py-2 rounded-full bg-gray-100 border-gray-300 focus:ring-2 focus:ring-[#FFFFFF] outline-none placeholder:text-sm"
                onChange={(e) => handleBuddiesData(e)}
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {!buddieList || buddieList.length === 0 ? (
                <div className="text-center p-4 text-[#212626]">
                  <p>Add Buddies to share post</p>
                </div>
              ) : (
                buddieList.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex flex-col items-center"
                    onClick={() => handleSelect(item.id)}
                  >
                    {shareIds.includes(item.id) && (
                      <div className="absolute top-4 right-4 flex items-center gap-[8px]">
                        <div
                          className={`relative h-6 w-6 rounded-full border-2 cursor-pointer flex items-center justify-center ${
                            shareIds.includes(item.id)
                              ? "bg-[#2DC6BE] border-[#2DC6BE]"
                              : "bg-white border-gray-300"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent onClick
                            handleSelect(item.id); // Handle checkbox selection
                          }}
                        >
                          {shareIds.includes(item.id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="white"
                              className="h-5 w-5"
                            >
                              <path d="M9 16.17l-3.59-3.58L4 14l5 5 10-10-1.41-1.42L9 16.17z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                    <img
                      src={item.profile_image || dummyUserImage}
                      alt={"Profile"}
                      className="w-[96px] h-[96px] rounded-full border-2 border-gray-300 object-cover"
                    />
                    <p className="font-inter font-medium text-[14px] mt-2 text-[#212626]">
                      {item.full_name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5  mt-5">
            <input
              type="text"
              placeholder="Add your thoughts..."
              className="w-full h-[48px] pl-5 pr-4 py-2 rounded-[8px] bg-gray-100 border-gray-300 focus:ring-2 focus:ring-[#FFFFFF] outline-none placeholder:text-[16px] placeholder:font-inter placeholder:font-medium"
              onChange={(e) => handleInputChange(e)}
            />

            <div className="flex items-center justify-between gap-10">
              <button
                className="rounded-[8px] border border-[#F0F7F7] bg-[#F0F7F7] p-[12px] w-full font-inter font-medium text-[16px] text-[#2DC6BE] hover:bg-teal-400 hover:text-white"
                onClick={() => copyLinkToClipBoard()}
              >
                Copy link
              </button>
              {/* <button
                className="rounded-[8px] border border-[#F0F7F7] bg-[#F0F7F7] p-[12px] w-full font-inter font-medium text-[16px] text-[#2DC6BE] hover:bg-teal-400 hover:text-white"
                onClick={() => handleShare()}
              >
                Share
              </button> */}
              <button
                className="rounded-[8px] border border-[#F0F7F7] bg-[#F0F7F7] p-[12px] w-full font-inter font-medium text-[16px] text-[#2DC6BE] hover:bg-teal-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F0F7F7] disabled:hover:text-[#2DC6BE]"
                onClick={() => handleShare()}
                disabled={
                  !buddieList ||
                  buddieList.length === 0 ||
                  shareIds.length === 0
                }
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharePopup;
