/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import Girl from "../../../assets/headerIcon/girl.jpg";
import chevron_down from "../../../assets/chevron-down.png";
import ImageBoxed from "../../../assets/ImageBoxed.png";
import image_add_logo from "../../../assets/image_add_logo.png";
import BadgesIconFirst from "../../../assets/BadgesIconFirst.png";
import Select from "react-select";
import "./AllPopupPage.css";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import PostDetailPopup from "./PostDetailPopup";
import { fetchCities } from "../../../redux/slices/stateCitySlice";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CreateaPostPopup = ({
  isOpen,
  onClose,
  openPostDetail,
  postData,
  setPostData,
}) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select View");
  const [wordsCount, setWordsCount] = useState(
    postData?.description.length || 0
  );
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showTagBuddySuggestions, setShowBuddyTagSuggestions] = useState(false);
  const [buddyInput, setBuddyInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestion, setShowTagSuggestion] = useState(false);
  const [filteredTagSuggestions, setFilteredTagSuggestions] = useState([]);
  const [isPostDetailPopup, setIsPostDetailPopup] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const validateFields = () => {
    const { description, location, buddies, tags, media_url, buddies_id } =
      postData;

    // Check if all fields are empty
    // if (
    //   !description.trim() &&
    //   !location.trim() &&
    //   buddies.length === 0 &&
    //   tags.length === 0 &&
    //   media_url.length === 0 &&
    //   buddies_id.length === 0
    // ) {
    //   return false;
    // }

    if (!description.trim() && media_url.length === 0) {
      return false;
    }
    return true;
  };

  const handlePostUpload = async () => {
    // console.log("running");
    const isValid = await validateFields();
    if (isValid) {
      onClose();
      // setIsPostDetailPopup(true);
      openPostDetail();
    } else {
      alert("At least discription or image is required.");
    }
  };

  const handlePostDetailPopup = () => {
    setIsPostDetailPopup(false);
    isOpen();
  };

  /* user details from auth slice */
  const { user: userDetails, userBuddies } = useSelector((state) => state.auth);

  /* store data for post */
  // const [postData, setPostData] = useState({
  //   description: "",
  //   location: "",
  //   buddies: [],
  //   tags: [],
  //   media_url: [],
  //   is_public: true,
  //   buddies_id: []
  // });

  const handleLocationChange = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };

  /* handle buddy tag */
  const handleBuddyTag = (e) => {
    const { value } = e.target;
    const match = value.match(/@(\w*)$/); // Match word after @
    setBuddyInput(value);
    if (match) {
      const query = match[1].toLowerCase();
      const filtered = userBuddies.filter((person) =>
        person.full_name.toLowerCase().includes(query)
      );
      setFilteredSuggestions(filtered);
      setShowBuddyTagSuggestions(filtered.length > 0);
    } else {
      setShowBuddyTagSuggestions(false);
    }
  };

  /* handle public and private account choose */
  const handleOption = (option) => {
    if (option === "public") {
      setPostData((prev) => ({
        ...prev,
        is_public: true,
      }));
    } else if (option === "private") {
      setPostData((prev) => ({
        ...prev,
        is_public: false,
      }));
    }

    setDropdownOpen(false);
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

  /* handle description change value and show words count*/
  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setWordsCount(value.length);

    setPostData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  /* handle location set */
  const handleLocationInputChange = async (e) => {
    const { value } = e.target;
    setPostData((prev) => ({
      ...prev,
      location: value,
    }));
  };

  const handleSuggestionClick = (person) => {
    // Add selected buddy to postData.buddies
    setPostData((prevData) => {
      const isAlreadyAdded = prevData.buddies.some(
        (buddy) => buddy.id === person.id
      );
      if (isAlreadyAdded) return prevData; // Avoid duplicates
      return {
        ...prevData,
        buddies: [
          ...prevData.buddies,
          {
            id: person.id,
            name: person.full_name,
            profile_image: person.profile_image,
            followers_count: person.followers_count || 0,
            buddies_count: person.buddies_count || 0,
            trips_count: person.trips_count || 0,
            role: person.user_role,
            user_name: person.user_name,
          },
        ],
        buddies_id: [...prevData.buddies_id, person.id], // Maintain IDs separately
      };
    });
    setBuddyInput("");
    setShowBuddyTagSuggestions(false);
  };

  // Remove buddy from tagged list
  const handleRemoveBuddy = (id) => {
    setPostData((prevData) => ({
      ...prevData,
      buddies: prevData.buddies.filter((buddy) => buddy.id !== id),
      buddies_id: prevData.buddies_id.filter((buddyId) => buddyId !== id),
    }));
  };

  // Remove tag
  const handleRemoveTag = (tagName) => {
    setPostData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagName),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form");
  };

  /* when user hits enter after writing tag */
  const handleTagEnter = async (e) => {
    if (postData?.tags.length > 10) {
      alert("Only 10 tags are acceptable");
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!tagInput.includes("#")) {
        console.log("need keyword #");
        return;
      }
      setPostData((prevData) => {
        const isAlreadyAdded = prevData.tags.some((tag) => tag === tagInput);
        if (isAlreadyAdded) return prevData; // Avoid duplicates
        return {
          ...prevData,
          tags: [...prevData.tags, tagInput],
        };
      });
      setTagInput("");
    }
  };

  const handleTagInputChange = async (e) => {
    if (postData?.tags.length > 10) {
      alert("Only 10 tags are acceptable");
      return;
    }
    setTagInput(e.target.value);
  };

  /* for image drag */
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow drop
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input when Browse is clicked
  };

  /* running on change of input file change */
  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   console.log("===files===>", files);
  //   if (files.length > 0) {
  //     handleFileSelect(files);
  //   }
  // };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const MAX_FILES = 4;
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
    const MAX_VIDEO_SIZE = 30 * 1024 * 1024; // 30 MB

    console.log("===files===>", files);
    if (files.length > 0) {
      const filesArray = Array.from(files); // Convert FileList to an array

      // Check if total files exceed the limit
      const currentMediaCount = postData.media_url.length;
      if (currentMediaCount + filesArray.length > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} files in total.`);
        return; // Do not process the files
      }

      // Validate file sizes and types
      const invalidFiles = filesArray.filter((file) => {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (isImage && file.size > MAX_IMAGE_SIZE) {
          return true; // Invalid image size
        }

        if (isVideo && file.size > MAX_VIDEO_SIZE) {
          return true; // Invalid video size
        }

        if (!isImage && !isVideo) {
          return true; // Invalid file type
        }

        return false;
      });

      if (invalidFiles.length > 0) {
        alert(
          `Invalid file(s) detected. Images must be less than 2 MB, and videos must be less than 30 MB.`
        );
        return; // Do not process the files
      }

      // Pass valid files to handleFileSelect
      handleFileSelect(filesArray);
    }
  };

  // console.log("===postData===>", postData);

  /* working on drop of video or image */
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  /* for setting image in postData */
  const handleFileSelect1 = (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result; // Base64 encoded image
      setPostData((prevState) => ({
        ...prevState,
        media_url: [...prevState.media_url, imageUrl], // Add image URL to media_url array
      }));
    };

    reader.readAsDataURL(file); // Read the file as base64
  };

  /* save image or video in postData state */
  const handleFileSelect = (files) => {
    for (let img in files) {
      const file = files[img];
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result; // Base64 encoded image
        setPostData((prevState) => ({
          ...prevState,
          media_url: [...prevState.media_url, imageUrl], // Add image URL to media_url array
        }));
      };

      reader.readAsDataURL(file); // Read the file as base64
    }
  };

  // Remove image from media_url
  const handleRemoveImage = (index) => {
    console.log("=====index====>", index);
    setPostData((prevState) => {
      const newMediaUrl = prevState.media_url.filter((_, i) => i !== index);
      return {
        ...prevState,
        media_url: newMediaUrl, // Remove the selected image from the array
      };
    });
  };

  /* set postData to initial state if popup is closed */
  const handlePopUpClose = () => {
    setPostData({
      description: "",
      location: "",
      buddies: [],
      tags: [],
      media_url: [],
      is_public: true,
      buddies_id: [],
    })
    onClose()
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
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-[16px] shadow-lg w-[696px] px-1 py-5 md:w-[696px] h-[672px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10 md:h-[55px]">
            <h4 className="text-[#303037] font-ubuntu font-bold text-[24px]">
              Create a Post
            </h4>
            <button
              className="text-black hover:text-[#2DC6BE] font-bold text-xl"
              onClick={() => handlePopUpClose()}
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
                    alt="profile_image"
                    className="w-[44px] h-[44px] rounded-full"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                      {userDetails?.full_name}
                    </h5>
                    <img
                      src={BadgesIconFirst}
                      alt="BadgesIconFirst"
                      className="w-[24px] h-[24px]"
                    />
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
                    className="flex items-center justify-center w-[120px] h-[24px] bg-[#FFFFFF] border border-[#D5D5D5] text-[#6D6D6D] font-normal text-[14px] rounded-full focus:outline-none"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    {postData?.is_public ? "Public" : "Private"}
                    <img
                      src={chevron_down}
                      alt="Chevron"
                      className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={() => handleOption("public")}
                      >
                        Public View
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={() => handleOption("private")}
                      >
                        Private View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Input Fields */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                      Description
                    </p>
                    <p className="text-left font-inter font-medium text-[12px] text-[#869E9D] mb-3">
                      {wordsCount}/300
                    </p>
                  </div>
                  <textarea
                    placeholder="Your Story in few words..."
                    className="font-inter font-medium text-[16px] text-[#212626] w-full p-3 h-[132px] bg-[#F0F7F7] rounded-[8px] border-1 border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
                    maxLength="300"
                    value={postData?.description || ""}
                    onChange={(e) => handleDescriptionChange(e)}
                  ></textarea>
                </div>

                <div className="flex flex-col dataSelect">
                  <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                    Add Location ( Only one )
                  </p>
                  {/* <Select
                  options={options}
                  onChange={handleLocationChange}
                  placeholder="eg: Mysore"
                  className=""
                /> */}
                  <input
                    type="text"
                    onChange={(e) => handleLocationInputChange(e)}
                    placeholder="eg: Mysore"
                    value={postData?.location || ""}
                    className="flex-grow font-inter font-medium text-[16px] text-[#212626] w-full p-3 h-[48px] bg-[#F0F7F7] rounded-[8px] border-1 border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
                  />
                </div>

                {/* <div className="flex flex-col">
                <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                  Add Buddies
                </p>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="eg: @calvin"
                    className="font-inter font-medium text-[16px] text-[#212626] w-full p-3 h-[48px] bg-[#F0F7F7] rounded-[8px] border border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78]"
                    value={buddyInput}
                    onChange={(e) => handleBuddyTag(e)}
                  />

                  {postData.buddies.map((buddy) => (
                    <span
                      key={buddy.id}
                      className="absolute left-2 top-2 inline-flex items-center gap-2 bg-[#E8F5F5] text-[#2DC6BE] px-3 py-1 rounded-full text-sm"
                    >
                      {buddy.name}
                      <button
                        onClick={() => handleRemoveBuddy(buddy.id)}
                        className="text-[#2DC6BE] font-bold"
                      >
                        &times;
                      </button>
                    </span>
                  ))}

                  {showTagBuddySuggestions &&
                    filteredSuggestions.length > 0 && (
                      <div className="absolute bg-white border border-gray-200 rounded shadow-lg mt-1 w-full z-10">
                        <ul className="max-h-40 overflow-y-auto">
                          {filteredSuggestions.map((person) => (
                            <li
                              key={person.id}
                              onClick={() => handleSuggestionClick(person)}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              {person.full_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                
              </div> */}

                {/* Prashant Code Start */}
                <div className="flex flex-col relative">
                  <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                    Add Buddies
                  </p>

                  <div className="relative flex flex-wrap items-center gap-2 p-2 bg-[#F0F7F7] rounded-[8px] border border-[#F5F5F5]">
                    {/* Tag Show inside input */}
                    {postData.buddies.map((buddy) => (
                      <span
                        key={buddy.id}
                        className="inline-flex items-center justify-center gap-2 bg-[#09857E] text-white w-[108px] h-[24px] rounded-[4px] text-[12px] font-inter font-medium "
                      >
                        {buddy.name}
                        <button
                          onClick={() => handleRemoveBuddy(buddy.id)}
                          className="text-[#2DC6BE] font-bold"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4L4 12M4 4L12 12"
                              stroke="white"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}

                    {/* Input Field */}
                    <input
                      type="text"
                      placeholder={
                        postData.buddies.length === 0 ? "eg: @calvin" : ""
                      }
                      className="flex-grow font-inter font-medium text-[16px] text-[#212626] h-[30px] bg-transparent outline-none placeholder:text-[#869E9D] placeholder:font-medium"
                      value={buddyInput}
                      onChange={(e) => handleBuddyTag(e)}
                    />
                  </div>

                  {/* Search show dropdown */}
                  {showTagBuddySuggestions &&
                    filteredSuggestions.length > 0 && (
                      <div className="absolute top-[80px] bg-white border border-gray-200 rounded shadow-lg w-[656px] z-10">
                        <ul className="max-h-40 overflow-y-auto">
                          {filteredSuggestions.map((person) => (
                            <li
                              key={person.id}
                              onClick={() => handleSuggestionClick(person)}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              {person.full_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                <div className="flex flex-col relative">
                  <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                    Add Tags (Up to 10)
                  </p>

                  <div className="relative flex flex-wrap items-center gap-2 p-2 bg-[#F0F7F7] rounded-[8px] border border-[#F5F5F5]">
                    {/* Tag Show inside input */}
                    {postData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="absolute left-2 inline-flex items-center justify-center gap-2 bg-[#09857E] text-white w-[108px] h-[24px] rounded-[4px] text-[12px] font-inter font-medium "
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-[#2DC6BE] font-bold"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4L4 12M4 4L12 12"
                              stroke="white"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}

                    <input
                      type="text"
                      onKeyDown={(e) => handleTagEnter(e)}
                      onChange={(e) => handleTagInputChange(e)}
                      placeholder={
                        postData.tags.length === 0 ? "eg: #travel" : ""
                      }
                      value={tagInput}
                      className="flex-grow font-inter font-medium text-[16px] text-[#212626] w-full p-3 h-[48px] bg-[#F0F7F7] rounded-[8px] border-1 border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
                    />
                  </div>

                  {/* Search show dropdown */}
                  {/* {showTagBuddySuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-[335px] bg-white border border-gray-200 rounded shadow-lg w-[656px] z-10">
                    <ul className="max-h-40 overflow-y-auto">
                      {filteredSuggestions.map((person) => (
                        <li
                          key={person.id}
                          onClick={() => handleSuggestionClick(person)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {person.full_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
                </div>
                {/* Prashant Code End */}

                {/* <div className="flex flex-col">
                <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                  Add Tags (Up to 10)
                </p>

                <div className="flex flex-wrap gap-2 mb-2">
                  {postData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 bg-[#E8F5F5] text-[#2DC6BE] px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-[#2DC6BE] font-bold"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  onKeyDown={(e) => handleTagEnter(e)}
                  onChange={(e) => handleTagInputChange(e)}
                  placeholder="eg: #travel"
                  value={tagInput}
                  className="font-inter font-medium text-[16px] text-[#212626] w-full p-3 h-[48px] bg-[#F0F7F7] rounded-[8px] border-1 border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
                />
              </div> */}

                {/* <div className="font-inter font-medium text-[16px] text-[#869E9D] w-full p-3 h-[133px] bg-[#F0F7F7] rounded-[8px] border-1 border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="cursor-pointer">
                    <img src={ImageBoxed} alt="" className="w-[32px] h-[32px]" />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <h2 className="font-inter font-medium text-[14px] text-[#212626]">
                    Drag and drop an Image or,
                    </h2>
                    <button type="button" className="font-inter font-medium text-[14px] flex items-center justify-center bg-[#2DC6BE] text-white rounded-[7px] w-[82px] h-[36px]">
                    Browse
                    </button>
                  </div>
                </div>
              </div> */}

                <div
                  className="font-inter font-medium text-[16px] text-[#869E9D] w-full p-3 h-[133px] bg-[#F0F7F7] rounded-[8px] border-1 border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div
                    className={`flex flex-col ${
                      postData.media_url.length > 0
                        ? "items-start"
                        : "items-center"
                    } justify-center gap-2`}
                  >
                    <div className="cursor-pointer flex flex-col items-center">
                      {postData.media_url.length > 0 ? (
                        <div className="flex gap-2">
                          {postData.media_url.map((url, index) => (
                            <div
                              key={index}
                              className="relative inline-block items-start"
                            >
                              {url.startsWith("data:image/") ? (
                                // Render image for image files
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Uploaded ${index}`}
                                  className="w-[100px] h-[110px] object-cover"
                                />
                              ) : url.startsWith("data:video/") ? (
                                // Render video for video files
                                <video
                                  key={index}
                                  src={url}
                                  alt={`Uploaded ${index}`}
                                  className="w-[100px] h-[110px] object-cover"
                                  controls
                                />
                              ) : (
                                // Fallback in case of invalid media type
                                <div className="w-[100px] h-[110px] bg-gray-300 flex items-center justify-center">
                                  <span>Invalid File</span>
                                </div>
                              )}
                              {/* Cancel button */}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 bg-[#2dc6be] p-1 rounded-l-[8px] rounded-t-[0px]"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 4L4 12M4 4L12 12"
                                    stroke="white"
                                    strokeWidth="1.33333"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={handleClick}
                            className="font-inter font-medium text-[14px] flex items-center justify-center bg-[#2DC6BE] text-white rounded-[7px] w-[100px] h-[112px]"
                          >
                            <img
                              src={image_add_logo}
                              alt="image_add_logo"
                              className=""
                            />
                          </button>
                        </div>
                      ) : (
                        <>
                          <img
                            src={ImageBoxed}
                            alt=""
                            className="w-[32px] h-[32px]"
                          />
                          <div className="flex flex-col items-center justify-center gap-3">
                            <h2 className="font-inter font-medium text-[14px] text-[#212626]">
                              Drag and drop Images or,
                            </h2>
                            <button
                              type="button"
                              onClick={handleClick}
                              className="font-inter font-medium text-[14px] flex items-center justify-center bg-[#2DC6BE] text-white rounded-[7px] w-[82px] h-[36px]"
                            >
                              Browse
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e)}
                    className="hidden"
                    accept="image/*,video/*"
                    multiple // Allows multiple file selection
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="font-inter font-medium text-[14px] flex items-center justify-center bg-[#2DC6BE] text-white rounded-[7px] w-[82px] h-[36px]"
                    onClick={() => handlePostUpload()}
                  >
                    Next
                  </button>
                </div>
                {/* {
                isPostDetailPopup && (
                  <>
                  <PostDetailPopup
                      isOpen={isPostDetailPopup}
                      onClose={handlePostDetailPopup}
                  />
                  </>
                )
              } */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateaPostPopup;
