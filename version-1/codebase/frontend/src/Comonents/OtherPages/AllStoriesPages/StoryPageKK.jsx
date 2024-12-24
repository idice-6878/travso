/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Girl from "../../../assets/headerIcon/girl.jpg";
import chevron_down from "../../../assets/chevron-down.png";
import BadgesIconFirst from "../../../assets/BadgesIconFirst.png";
import ImageBoxed from "../../../assets/ImageBoxed.png";
import "../AllPopupComponent/AllPopupPage.css";
import { LeftIcon, RightIcon, AddImageIcon } from "../../../SvgIcons";
import leftIcon from "../../../assets/lefticon.png";
import BucketImageSecond from "../../../assets/bucketimageSecond.png";
import Travel from "../../../assets/travel.png";
import Background from "../../../assets/Background.png";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";
import { createStory, getActiveStories } from "../../../redux/slices/postSlice";

const StoryPage = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const StoryData = [
    BucketImageSecond,
    Travel,
    BucketImageSecond,
    Travel,
    BucketImageSecond,
  ];

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("Public");
  const [storyIndex, setStoryIndex] = useState(0);
  const [images, setImages] = useState([]);

  /* state to maintain story data */
  const [storyData, setStoryData] = useState({
    media_url: [],
    view: 'Public',
  })

  const { user: userDetails } = useSelector((state) => state.auth);
//   console.log("====userDetails===>", userDetails);

  const handleImageUploadPK = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const newImages = files.map((file) => URL.createObjectURL(file));
    console.log(newImages);
    setImages(newImages);
    if (!storyIndex && newImages.length > 0) {
      setStoryIndex(0);
    }
  };

  /* to upload image section starts*/

  const handleImageUpload1 = (e) => {
    const files = e.target.files;
    console.log("===files===>", files);
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const MAX_FILES = 4;
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
  
    setStoryData((prevState) => {
      const currentMediaCount = prevState.media_url.length;
  
      // Check if total files exceed the limit
      if (currentMediaCount + files.length > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} images in total.`);
        return prevState; // Do not update the state or process files
      }
  
      // Validate file sizes
      const invalidFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
  
      if (invalidFiles.length > 0) {
        alert("Each file must be less than 2 MB.");
        return prevState; // Do not update the state or process files
      }
  
      // Pass valid files to handleFileSelect
      handleFileSelect(files);
  
      return prevState; // State remains unchanged until handleFileSelect updates it
    });
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  /* for image drag */
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow drop
  };

  // store image data in storyData
  const handleFileSelect1 = (files) => {

    for(let img in files) {

      const file = files[img];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const imageUrl = reader.result; // Base64 encoded image
        setStoryData((prevState) => ({
          ...prevState,
          media_url: [...prevState.media_url, imageUrl], // Add image URL to media_url array
        }));
      };
  
      reader.readAsDataURL(file); // Read the file as base64
    }
  };

  const handleFileSelect = (files) => {
    const MAX_FILES = 4;
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
  
    setStoryData((prevState) => {
      const currentMediaCount = prevState.media_url.length;
  
      // Check if total files exceed the limit
      if (currentMediaCount + files.length > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} images in total.`);
        return prevState; // Do not update the state
      }
  
      // Validate file sizes
      const invalidFiles = Array.from(files).filter((file) => file.size > MAX_FILE_SIZE);
  
      if (invalidFiles.length > 0) {
        alert("Each file must be less than 2 MB.");
        return prevState; // Do not update the state
      }
  
      // Process valid files
      const newMediaUrls = [];
      for (let img in files) {
        const file = files[img];
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const imageUrl = reader.result; // Base64 encoded image
          newMediaUrls.push(imageUrl);
  
          // Update state only after reading all files
          if (newMediaUrls.length === files.length) {
            setStoryData((prevState) => ({
              ...prevState,
              media_url: [...prevState.media_url, ...newMediaUrls],
            }));
          }
        };
  
        reader.readAsDataURL(file); // Read the file as base64
      }
  
      return prevState;
    });
  };
  

  //   const handleImageUpload = (e) => {
  //     const files = Array.from(e.target.files).slice(0, 4);
  //     const validImages = [];

  //     files.forEach((file) => {
  //       if (file.size <= 2 * 1024 * 1024) { // Check if file size is <= 2 MB
  //         validImages.push(URL.createObjectURL(file));
  //       } else {
  //         alert(`${file.name} is larger than 2 MB and will not be uploaded.`);
  //       }
  //     });

  //     console.log(validImages);
  //     setImages(validImages);

  //     if (!storyIndex && validImages.length > 0) {
  //       setStoryIndex(0);
  //     }
  //   };

  /* to upload image and store in storyData  section ends*/
  const handleImageClick = (index) => {
    setStoryIndex(index);
  };

  /* to remove selected image for story section */
  const handleRemoveImage = (index) => {
    // setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setStoryData((prevState) => {
        const newMediaUrl = prevState.media_url.filter((_, i) => i !== index);
        return {
          ...prevState,
          media_url: newMediaUrl, // Remove the selected image from the array
        };
    });
};

  const triggerImageUpload = () => {
    document.getElementById("imageUploadInput").click();
  };

  const goToPreviousStory = () => {
    setStoryIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextStory = () => {
    setStoryIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  /* to handle story view to public, buddies, followers */
  const handleOption = (option) => {
    // setSelectedOption(option);
    setStoryData((prev) => ({
        ...prev,
        view: option,
      }));
    setDropdownOpen(false);
  };


// Simplified badge image logic
const badges = {
    Adventurer: BadgesIconFirst,
    Explorer: BadgesIconFirst,
    Foodie: BadgesIconFirst,
    "Solo Traveler": BadgesIconFirst,
    "Luxury Traveler": BadgesIconFirst,
};

/* handle story submit */
const handleStorySubmit = async() => {
    try {
        const response = await dispatch(createStory(storyData)).unwrap();
        // console.log("=====response==handleStorySubmit==>", response);
        if(response) {
            await dispatch(getActiveStories());
            setStoryData({
              media_url: [],
              view: 'Public',
            })
            onClose();
        }
    } catch (error) {
        console.log("error in handleStorySubmit", error);
    }
}

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
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center z-50"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      {userDetails && (
        <div className="bg-white rounded-[16px] shadow-3xl w-[600px] px-1 py-5 md:w-[600px] h-[672px] flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="px-4 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10 md:h-[55px]">
            <h4 className="text-[#303037] font-ubuntu font-bold text-[24px]">
              Share a story
            </h4>
            <button
              className="text-black hover:text-[#2DC6BE] font-bold text-xl"
              onClick={() => onClose()}
              aria-label="Close"
            >
              &#x2715;
            </button>
          </div>

          <div className="px-4 flex flex-col h-full flex-1 overflow-y-auto scrollbar-hidden">
            <div className="py-5 flex items-center justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div>
                  <img
                    src={userDetails?.profile_image || dummyUserImage}
                    alt="Girl"
                    className="w-[44px] h-[44px] rounded-full"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                      {userDetails?.full_name}
                    </h5>
                    <div className="relative group">
                      <img
                        src={badges[userDetails?.badge?.split("-")[0]?.trim()]}
                        alt="BadgesIconFirst"
                        className="w-[24px] h-[24px]"
                      />
                      <div className="absolute left-0 mt-1 hidden group-hover:block bg-[#2DC6BE] text-white text-sm p-2 rounded shadow-lg w-[250px] text-justify">
                        {userDetails?.badge?.split("-")[1]}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="-mt-2 font-inter font-medium text-[16px] text-[#667877] text-left">
                      {userDetails?.user_name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2">
                {/* Dropdown Button */}
                <div className="relative">
                  <button
                    className="flex items-center justify-end w-[120px] h-[24px] text-[#6D6D6D] font-normal text-[14px] rounded-full focus:outline-none"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    {/* {selectedOption} */}
                    {storyData?.view}
                    <img
                      src={chevron_down}
                      alt="Chevron"
                      className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-[340px] h-[196px] bg-white border border-gray-200 rounded-[16px] p-[16px] gap-[16px] shadow-md">
                      <div
                        className="flex items-center justify-between mb-4 cursor-pointer"
                        onClick={() => handleOption("Public")}
                      >
                        <div className="flex flex-col items-start">
                          <p className="font-medium font-inter text-[16px] text-[#212626]">
                            Public
                          </p>
                          <p className="font-inter font-medium text-[14px] text-[#667877]">
                            Anyone on and off Travso
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            storyData?.view === "Public"
                              ? "border-[#2DC6BE]"
                              : "border-gray-300"
                          }`}
                        >
                          {storyData?.view === "Public" && (
                            <div className="w-3 h-3 rounded-full bg-[#2DC6BE]"></div>
                          )}
                        </div>
                      </div>

                      {/* Buddies Option */}
                      <div
                        className="flex items-center justify-between mb-4 cursor-pointer"
                        onClick={() => handleOption("Buddies")}
                      >
                        <div className="flex flex-col items-start">
                          <p className="font-medium font-inter text-[16px] text-[#212626]">
                            Buddies
                          </p>
                          <p className="font-inter font-medium text-[14px] text-[#667877]">
                            Your buddies on Travso
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            storyData?.view === "Buddies"
                              ? "border-[#2DC6BE]"
                              : "border-gray-300"
                          }`}
                        >
                          {storyData?.view === "Buddies" && (
                            <div className="w-3 h-3 rounded-full bg-[#2DC6BE]"></div>
                          )}
                        </div>
                      </div>

                      {/* Followers Option */}
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => handleOption("Followers")}
                      >
                        <div className="flex flex-col items-start">
                          <p className="font-medium font-inter text-[16px] text-[#212626]">
                            Followers
                          </p>
                          <p className="font-inter font-medium text-[14px] text-[#667877]">
                            Your followers on Travso
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            storyData?.view === "Followers"
                              ? "border-[#2DC6BE]"
                              : "border-gray-300"
                          }`}
                        >
                          {storyData?.view === "Followers" && (
                            <div className="w-3 h-3 rounded-full bg-[#2DC6BE]"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mx-auto w-[396px] p-3 h-[700px] flex flex-col items-center justify-center">
              {/* First Div */}
              {storyData?.media_url?.length > 0 && (
                <div className="flex items-center justify-center mb-2 gap-2">
                  <div className="bg-[#F0F7F7] w-[74px] h-[40px] flex items-center justify-center rounded-[8px] gap-[2px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 7C4 6.06812 4 5.60218 4.15224 5.23463C4.35523 4.74458 4.74458 4.35523 5.23463 4.15224C5.60218 4 6.06812 4 7 4H17C17.9319 4 18.3978 4 18.7654 4.15224C19.2554 4.35523 19.6448 4.74458 19.8478 5.23463C20 5.60218 20 6.06812 20 7M9 20H15M12 4V20"
                        stroke="#212626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#212626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="bg-[#F0F7F7] w-[74px] h-[40px] flex items-center justify-center rounded-[8px] gap-[2px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99902 14C7.99902 14 9.49902 16 11.999 16C14.499 16 15.999 14 15.999 14M14.999 9H15.009M8.99902 9H9.00902M21.999 12C21.999 17.5228 17.5219 22 11.999 22C6.47618 22 1.99902 17.5228 1.99902 12C1.99902 6.47715 6.47618 2 11.999 2C17.5219 2 21.999 6.47715 21.999 12ZM15.499 9C15.499 9.27614 15.2752 9.5 14.999 9.5C14.7229 9.5 14.499 9.27614 14.499 9C14.499 8.72386 14.7229 8.5 14.999 8.5C15.2752 8.5 15.499 8.72386 15.499 9ZM9.49902 9C9.49902 9.27614 9.27517 9.5 8.99902 9.5C8.72288 9.5 8.49902 9.27614 8.49902 9C8.49902 8.72386 8.72288 8.5 8.99902 8.5C9.27517 8.5 9.49902 8.72386 9.49902 9Z"
                        stroke="#212626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#212626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="bg-[#F0F7F7] w-[74px] h-[40px] flex items-center justify-center rounded-[8px] gap-[2px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99997 11.2234L12.7778 15.0011M7.97485 20.976C6.60801 22.3429 4 22.0011 2 22.0011C3.0251 20.0011 1.65827 17.3931 3.0251 16.0263C4.39194 14.6594 6.60801 14.6594 7.97485 16.0263C9.34168 17.3931 9.34168 19.6092 7.97485 20.976ZM11.9216 15.9258L21.0587 6.05769C21.8635 5.18852 21.8375 3.83874 20.9999 3.00115C20.1624 2.16356 18.8126 2.13761 17.9434 2.94239L8.07534 12.0795C7.5654 12.5517 7.31043 12.7877 7.16173 13.0395C6.80514 13.6433 6.79079 14.3897 7.12391 15.0067C7.26283 15.264 7.50853 15.5097 7.99995 16.0011C8.49136 16.4926 8.73707 16.7383 8.99438 16.8772C9.6114 17.2103 10.3578 17.196 10.9616 16.8394C11.2134 16.6907 11.4494 16.4357 11.9216 15.9258Z"
                        stroke="#212626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#212626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="bg-[#F0F7F7] w-[74px] h-[40px] flex items-center justify-center rounded-[8px] gap-[2px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 7.99938V12.9994C16 13.795 16.3161 14.5581 16.8787 15.1207C17.4413 15.6833 18.2044 15.9994 19 15.9994C19.7957 15.9994 20.5587 15.6833 21.1213 15.1207C21.6839 14.5581 22 13.795 22 12.9994V11.9994C21.9999 9.74241 21.2362 7.55186 19.8333 5.78391C18.4303 4.01596 16.4706 2.7746 14.2726 2.26168C12.0747 1.74875 9.76794 1.99442 7.72736 2.95875C5.68677 3.92307 4.03241 5.54933 3.03327 7.5731C2.03413 9.59687 1.74898 11.8991 2.22418 14.1055C2.69938 16.3119 3.90699 18.2926 5.65064 19.7256C7.39429 21.1587 9.57144 21.9597 11.8281 21.9985C14.0847 22.0373 16.2881 21.3116 18.08 19.9394M16 11.9994C16 14.2085 14.2092 15.9994 12 15.9994C9.79087 15.9994 8.00001 14.2085 8.00001 11.9994C8.00001 9.79024 9.79087 7.99938 12 7.99938C14.2092 7.99938 16 9.79024 16 11.9994Z"
                        stroke="#212626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#212626"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
              {/* First Div */}
              {/* Second Div */}
              {storyData?.media_url.length === 0 && (
                <div 
                  className="font-inter flex flex-col justify-center font-medium text-[16px] text-[#869E9D] w-[396px] p-3 h-[500px] bg-[#F0F7F7] rounded-[8px] border-1 border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78] placeholder:font-inter placeholder:font-medium placeholder:text-[16px] "
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}  
                >
                  
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="cursor-pointer">
                      <img
                        src={ImageBoxed}
                        alt=""
                        className="w-[32px] h-[32px]"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <h2 className="font-inter font-medium text-[14px] text-[#212626]">
                        Drag and drop an Image or,
                      </h2>
                      <label
                        htmlFor="image-upload"
                        className="font-inter font-medium text-[14px] flex items-center justify-center bg-[#2DC6BE] text-white rounded-[7px] w-[82px] h-[36px]"
                      >
                        Browse
                      </label>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Display current story image */}
              {storyData?.media_url.length > 0 && (
                <div className="w-full flex justify-center  w-[396px] h-[500px]">
                  <img
                    src={storyData?.media_url[storyIndex]}
                    alt={`Story ${storyIndex}`}
                    className="rounded-[16px]"
                    style={{
                      width: "396px",
                      height: "500px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              {/* Display current story image */}

              {/* Second Div */}
            </div>

            {/*---------- Slider Part ---------*/}
            {storyData?.media_url?.length > 0 && (
              <div className="py-[8px] gap-[8px] flex items-center relative w-full max-w-4xl mx-auto">
                {/* Slider */}

                <div className="w-full flex justify-between overflow-hidden">
                {storyData?.media_url.map((reel, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 relative ${
                        index === storyIndex ? "active" : ""
                      }`}
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={reel}
                        alt={`Slide ${index}`}
                        className="rounded-[16px]"
                        style={{
                          width: "120px",
                          height: "96px",
                          objectFit: "cover",
                        }}
                      />

                      {/* Remove image icon */}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-1 right-1 bg-[#FFFFFFBF] rounded-full p-[4px] w-[20px] h-[20px]"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <path
                          d="M9 1L1 9M1 1L9 9"
                          stroke="#212626"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ))}
                  <div className="flex-shrink-0">
                  <button onClick={triggerImageUpload}>
                    <AddImageIcon />
                  </button>
                  <input
                    type="file"
                    id="imageUploadInput"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                </div>

                {/* Left Button */}
                <button
                  onClick={goToPreviousStory}
                  className="absolute top-1/2 left-0 w-9 h-9 transform -translate-y-1/2 bg-[#000000BF] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13L1 7L7 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Right Button */}
                <button
                  onClick={goToNextStory}
                  className="absolute top-1/2 right-0 w-9 h-9 transform -translate-y-1/2 bg-[#000000BF] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                >
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13L1 7L7 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
            {/*---------- Slider Part ---------*/}
          </div>
          <div className="px-4 mt-3">
            <button 
              className="bg-[#2DC6BE] text-white font-inter font-medium text-[16px] items-center w-full h-[48px] rounded-[7px]"
              onClick={() => handleStorySubmit()}
            >
              Add to your story{" "}
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default StoryPage;
