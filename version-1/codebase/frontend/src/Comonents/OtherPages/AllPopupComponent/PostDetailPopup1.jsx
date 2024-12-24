/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Girl from "../../../assets/headerIcon/girl.jpg";
import chevron_down from "../../../assets/chevron-down.png";
// import ImageBoxed from "../../../assets/ImageBoxed.png";
import BadgesIconFirst from "../../../assets/BadgesIconFirst.png";
// import Select from "react-select";
import Travel from "../../../assets/travel.png";
import BucketImageSecond from "../../../assets/bucketimageSecond.png";
import First from "../../../assets/1.png";
import Boy1 from "../../../assets/headerIcon/boy1.png";
import leftIcon from "../../../assets/lefticon.png";
import "./AllPopupPage.css";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import { useSelector } from "react-redux";

const PostDetailPopup = ({ isOpen, onClose, postData, handlePostUpload }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("Select View");
  const [isotherDataVisible, setIsotherDataVisible] = useState(false);
  //   const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  //   // Function to toggle the full text
  //   const toggleFullText = () => {
  //     setIsFullTextVisible(!isFullTextVisible);
  //   };

  const handleOption = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const postDetails = {
    title: "Pankaj Reet Tech",
    subtitle: "Solo Traveler",
    subtitleData: "Rameswaram",
    description:
      "The world of innovation is driven by a relentless pursuit of progress, where creativity and technology merge to shape the future. In this dynamic landscape, adaptability becomes a crucial skill, enabling individuals and organizations to thrive amidst constant change. Whether it's the development of groundbreaking software, the invention of sustainable energy solutions, or the design of user-centric products, innovation fuels every aspect of modern life. Collaboration plays a pivotal role in this process, as diverse perspectives bring fresh ideas to the table, fostering an environment where breakthroughs are not only possible but inevitable. The integration of artificial intelligence, machine learning, and automation is transforming industries, streamlining processes, and enhancing efficiency at an unprecedented pace. However, the journey toward innovation is not without challenges. Ethical considerations, data privacy, and environmental sustainability must remain at the forefront to ensure that progress benefits society as a whole. Amid these challenges lies an opportunity to create meaningful change, where individuals leverage their unique skills to solve complex problems and contribute to a better world. The rapid pace of technological advancement requires a mindset of continuous learning, empowering people to embrace new tools and methodologies. As innovation reshapes the global economy, it also fosters new opportunities for entrepreneurs and visionaries to redefine industries and challenge conventional norms. Ultimately, the power of innovation lies in its ability to inspire, connect, and elevate humanity, proving that the possibilities are truly limitless when creativity and ambition converge.",
    image: [Travel, BucketImageSecond, First],
    avtar: Boy1,
    hastag: "#arsitek #art #creative",
  };

  // const images = postDetails.image;
  const images = postData?.media_url;

  const [currentIndex, setCurrentIndex] = useState(0);

  const { user: userDetails, userBuddies } = useSelector((state) => state.auth);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] shadow-lg w-[696px] px-1 py-5 md:w-[696px] h-[672px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 flex flex-col justify-between sticky top-0 bg-white z-10 mb-4">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={userDetails?.profile_image || dummyUserImage}
                  alt="Girl"
                  className="w-[44px] h-[44px] object-cover rounded-full"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                    {userDetails?.full_name} {postData?.buddies.length > 0 ? `with ${postData?.buddies.length} others` : "" }
                    {/* {userDetails?.full_name} */}
                  </h5>

                  {/* <div className="flex space-x-1 relative inline-block">
                    <p
                      className="font-poppins font-semibold text-[20px] text-[#212626]"
                      onClick={() => setIsotherDataVisible(!isotherDataVisible)}
                    >
                      {" "}
                      with<span className="text-[#869E9D]"></span> 2 others{" "}
                    </p>
                    <div>
                      <img
                        src={BadgesIconFirst}
                        alt="BadgesIconFirst"
                        className="w-[24px] h-[24px]"
                      />
                    </div>

                
                    {isotherDataVisible && (
                      <div className="absolute mt-10 w-[416px] p-[24px] bg-white border border-gray-300 rounded-[16px] shadow-lg z-10 flex flex-col gap-[34px]">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-3">
                            <div>
                              <img
                                src={Girl}
                                alt="Girl"
                                className="w-[44px] h-[44px] rounded-full"
                              />
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                                  Pankaj Reet Tech
                                </h5>
                                <div className="relative group">
                                  <img
                                    src={BadgesIconFirst}
                                    alt="BadgesIconFirst"
                                    className="w-[24px] h-[24px]"
                                  />
                                  <div className="absolute left-0 mt-1 hidden group-hover:block bg-[#2DC6BE] text-white text-sm p-2 rounded shadow-lg w-[250px] text-justify">
                                    Solo travel is an empowering and
                                    transformative experience where you venture
                                    out into the world on your own. It's an
                                    opportunity to discover new destinations,
                                    meet diverse people, and learn more about
                                    yourself.
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="-mt-2 font-inter font-medium text-[16px] text-[#667877] text-left">
                                  @Madhu.lika
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-[338px] md:h-[32px] flex items-center justify-center rounded-full bg-[#E5FFFE] mt-3">
                            <p className="font-inter font-medium items-center text-center text-[12px] text-[#212626]">
                              Solo Traveler &nbsp;•&nbsp; 252 Trips
                              &nbsp;•&nbsp; 14K followers &nbsp;•&nbsp; 24
                              Buddies
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-3">
                            <div>
                              <img
                                src={Girl}
                                alt="Girl"
                                className="w-[44px] h-[44px] rounded-full"
                              />
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                                  Pankaj Reet Tech
                                </h5>
                                <div className="relative group">
                                  <img
                                    src={BadgesIconFirst}
                                    alt="BadgesIconFirst"
                                    className="w-[24px] h-[24px]"
                                  />
                                  <div className="absolute left-0 mt-1 hidden group-hover:block bg-[#2DC6BE] text-white text-sm p-2 rounded shadow-lg w-[250px] text-justify">
                                    Solo travel is an empowering and
                                    transformative experience where you venture
                                    out into the world on your own. It's an
                                    opportunity to discover new destinations,
                                    meet diverse people, and learn more about
                                    yourself.
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="-mt-2 font-inter font-medium text-[16px] text-[#667877] text-left">
                                  @Madhu.lika
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-[338px] md:h-[32px] flex items-center justify-center rounded-full bg-[#E5FFFE] mt-3">
                            <p className="font-inter font-medium items-center text-center text-[12px] text-[#212626]">
                              Solo Traveler &nbsp;•&nbsp; 252 Trips
                              &nbsp;•&nbsp; 14K followers &nbsp;•&nbsp; 24
                              Buddies
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div> */}
                </div>
                <div>
                  <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                    {postDetails.subtitle} • {postData?.location || ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-2">
              {/* Dropdown Button */}
              <div className="relative">
                <button
                  className="flex items-center justify-end w-[120px] h-[24px] bg-[#FFFFFF] text-[#6D6D6D] font-normal text-[14px] rounded-full focus:outline-none"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  {postData.is_public ? "Public" : "Private"} View
                  {/* <img
                    src={chevron_down}
                    alt="Chevron"
                    className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  /> */}
                </button>
                {/* {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
                    <button
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      onClick={() => handleOption("Public")}
                    >
                      Public View
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      onClick={() => handleOption("Private")}
                    >
                      Private View
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>

        {/*---------- Scrollable Part ---------*/}
        <div className="mb-3 px-4 flex-1 overflow-y-auto scrollbar-hidden">

          {
            images.length === 1 && (
              <div>
                <div className="overflow-hidden relative">
                  <div>
                    <img
                      src={images[0]}
                      alt={`Slide ${0}`}
                      className="rounded-lg w-full h-[344px] object-cover transition duration-500"
                    />
                  </div>
                </div>
              </div>
            )
          }

          {images.length > 1 && (
            <>
              <div className="relative w-full max-w-4xl mx-auto">
                {/* Slider */}
                <div className="overflow-hidden relative">
                  <div>
                    <img
                      src={images[currentIndex]}
                      alt={`Slide ${currentIndex}`}
                      className="rounded-lg w-full h-[344px] object-cover transition duration-500"
                    />
                  </div>
                </div>

                {/* Left Button */}
                <button
                  onClick={goToPrevious}
                  className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#FFFFFFBF] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                >
                  <img src={leftIcon} alt="leftIcon" className="" />
                </button>

                {/* Right Button */}
                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#FFFFFFBF] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                >
                  <img src={leftIcon} alt="leftIcon" className="" />
                </button>

                {/* Dots */}
                <div className="flex justify-center mt-1 absolute items-center justify-center inline-flex top-[310px] bg-[#FFFFFFBF] w-[68px] h-[16px] rounded-[16px]">
                  {postData.media_url.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-[8px] h-[8px] mx-1 rounded-full transform transition-transform duration-300 ${
                        index === currentIndex
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
          <p className="mt-3 font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1">
            {postData?.description}
            {/* {isFullTextVisible
              ? postDetails.description
              : `${postDetails.description.slice(0, 170)}...`} */}
            {/* <span
              onClick={toggleFullText}
              className="text-[#2DC6BE] cursor-pointer"
            >
              {isFullTextVisible ? " Show less" : " See more"}
            </span> */}
          </p>

          {/* Hashtags */}
          {postData.tags.length > 0 && (
            <>
              <p className="text-left text-[#1DB2AA] mb-2">{postData.tags}</p>
            </>
          )}
        </div>
        {/*---------- Scrollable Part ---------*/}

        <div className="px-4 flex items-center justify-between">
          <button
            type="button"
            className="font-inter font-medium text-[14px] flex items-center justify-center bg-[#F0F7F7] text-[#2DC6BE] rounded-[7px] w-[312px] h-[48px]"
            onClick={() => onClose()}
          >
            Edit
          </button>
          <button
            className="font-inter font-medium text-[14px] flex items-center justify-center bg-[#2DC6BE] text-white rounded-[7px] w-[312px] h-[48px]"
            onClick={() => handlePostUpload()}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PostDetailPopup;
