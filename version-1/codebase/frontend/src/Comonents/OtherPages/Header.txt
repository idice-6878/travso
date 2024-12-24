/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";
import logo from "../../assets/headerIcon/logo.png";
import Message from "../../assets/headerIcon/Message.png";
import girl from "../../assets/headerIcon/girl.jpg";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import ProfilePage from "./ProfilePage";
import { Person, Settings, ExitToApp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getUserBuddies,
  getUserDetails,
  logoutUser,
  resetAuthState,
} from "../../redux/slices/authSlice";
import { getAllTags } from "../../redux/slices/tagSlices";
import { getAllPosts } from "../../redux/slices/postSlice";
import { Link, useNavigate } from "react-router-dom";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import { addToRecentSearch } from "../../redux/slices/searchSlice";


const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  const [seacrhResult, setSearchResult] = useState([]);
  const [searchAction, setSearchAction] = useState(null);
  const [searchedKeyword, setSearchedKeyword] = useState(null);
  const [activeFilter, setActiveFilter] = useState("");
  const [suggestionShow, setSuggestionShow] = useState([{ id: 1,name: "Reet sharma", img: girl },
    {
      id: 2,
      name: "Madhulika",
      username: "@Madhu.lika",
      followers: "12k Followers",
      img: girl,
    },
    {
      id: 3,
      name: "Pankaj",
      username: "@Reet.Pankaj",
      followers: "12k Followers",
      img: girl,
    },
    {
      id: 4,
      name: "Rishab",
      username: "@frontend",
      followers: "12k Followers",
      img: girl,
    }])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsSearchActive(false); // Close dropdown if clicked outside
        setSearchAction(false);
        setActiveFilter("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    user: userDetails,
    userBuddies,
    allUsers,
  } = useSelector((state) => state.auth);
  const { allTags } = useSelector((state) => state.tagSlice);
  const { allPosts } = useSelector((state) => state.postSlice);

  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetails());
    }

    if (!userBuddies) {
      dispatch(getUserBuddies());
    }

    if (!allTags) {
      dispatch(getAllTags());
    }

    if (!allUsers) {
      dispatch(getAllUsers());
    }

    if(!allPosts) {
      dispatch(getAllPosts());
    }
  }, [dispatch]);

  const recentUsers = [
    { name: "Madhulika Gupta", img: girl },
    { name: "Pankaj Sharma", img: girl },
    { name: "Shaukin Jehn", img: girl },
    { name: "Reet Loyer", img: girl },
  ];

  const searchSuggestions = [
    { id: 1,name: "Reet sharma", img: girl },
    {
      id: 2,
      name: "Madhulika",
      username: "@Madhu.lika",
      followers: "12k Followers",
      img: girl,
    },
    {
      id: 3,
      name: "Pankaj",
      username: "@Reet.Pankaj",
      followers: "12k Followers",
      img: girl,
    },
    {
      id: 4,
      name: "Rishab",
      username: "@frontend",
      followers: "12k Followers",
      img: girl,
    },
  ];

  const seacrhAccordingTo = async (option) => {
    console.log("=====option=====>", option);

    if (option === "Buddies") {
      let searchBuddies;
      if (searchedKeyword) {
        searchBuddies = userBuddies?.filter(
          (item) =>
            item?.user_name
              ?.toLowerCase()
              .includes(searchedKeyword?.toLowerCase()) ||
            item?.full_name
              ?.toLowerCase()
              .includes(searchedKeyword?.toLowerCase())
        );
      } else {
        searchBuddies = userBuddies;
      }
      setSearchResult(searchBuddies);
      setSearchAction("Buddies");
      setActiveFilter("Buddies");
    }

    if (option === "Hashtags") {
      let seacrhTags;
      if (searchedKeyword) {
        seacrhTags = allTags?.filter((item) =>
          item?.name?.toLowerCase().includes(searchedKeyword?.toLowerCase())
        );
      } else {
        seacrhTags = allTags;
      }
      setSearchResult(seacrhTags);
      setSearchAction("Hashtags");
      setActiveFilter("Hashtags");
    }

    if (option === "Place") {
      setSearchAction("Place");
      setActiveFilter("Place");
    }

    if (option === "Post") {
      let searchPosts;
      if (searchedKeyword) {
        searchPosts = allPosts?.filter((item) =>
          item?.description?.toLowerCase().includes(searchedKeyword?.toLowerCase())
        );
      } else {
        searchPosts = allPosts;
      }
      setSearchResult(searchPosts);
      setSearchAction("Post");
      setActiveFilter("Post");
    }

    if (option === "Badges") {
      setSearchAction("Badges");
      setActiveFilter("Badges");
    }

    // setIsSearchActive(false)
  };

  // remove from search list
  const removeFromSeacrh = async (removeId) => {
    setSearchResult((prevResults) =>
      prevResults.filter((item) => item.id !== removeId)
    );
  };

  // search data according to search text field
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchedKeyword(value);
    console.log("value", value);

    if (!searchAction) {
      // console.log("===allUsers===", allUsers);
      const showSearchUser = allUsers?.filter(
        (item) =>
          item?.user_name
            ?.toLowerCase()
            .includes(value?.toLowerCase()) ||
          item?.full_name
            ?.toLowerCase()
            .includes(value?.toLowerCase())
      )
      setSearchResult(showSearchUser);
    } 
    else if (searchAction === "Buddies" && value !== "") {
      const searchBuddies = userBuddies?.filter(
        (item) =>
          item?.user_name
            ?.toLowerCase()
            .includes(value?.toLowerCase()) ||
          item?.full_name
            ?.toLowerCase()
            .includes(value?.toLowerCase())
      );
      setSearchResult(searchBuddies);
    } 
    else if (searchAction === "Hashtags" && value !== "") {
      const searchHashTags = allTags?.filter((item) =>
        item?.name?.toLowerCase().includes(value?.toLowerCase())
      );
      setSearchResult(searchHashTags);
    } 
    else if (searchAction === "Post" && value !== "") {
      const searchPosts = allPosts?.filter((item) =>
        item?.description?.toLowerCase().includes(value?.toLowerCase())
      );
      setSearchResult(searchPosts);
    } 
    else if (value === "") {
      setSearchResult([]);
      setSearchedKeyword(null);
      setSearchAction(null);
      setActiveFilter("");
    }
  };

  const sendToSearch = async(searchedId) => {
    try {
       const addRecentSearch = await dispatch(addToRecentSearch(searchedId)).unwrap();
      //  console.log("=======addRecentSearch=====>", addRecentSearch);
    } catch (error) {
      console.log("error on add recent search", error);
    }
  }

  const logOut = async() => {
    try {
      const logOutResult = await dispatch(logoutUser()).unwrap();
      if(logOutResult) {
        // console.log("==logOutResult====>", logOutResult);
        await dispatch(resetAuthState());
        navigate('/login');
      }
    } catch (error) {
      console.log("error in logout", error);
    }
  }


  const removeFromSearchSuggestion = async(removeId) => {
    try {
      console.log("===removeId====", removeId);
      setSuggestionShow((prevResults) =>
        prevResults.filter((item) => item.id !== removeId)
      );
    } catch (error) {
      console.log("error in logout", error);
    }
  }

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50 ">
        <div
          className={`w-full max-w-[99%] container mx-auto px-3 ${
            isSearchActive ? "" : "py-4"
          } flex items-center justify-between`}
        >
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <img src={logo} alt="TravSo Logo" className="h-8" />
          </div>

          {/* Mobile Menu Toggle (Visible on Mobile) */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Right Section (Hidden on Mobile, Visible on Desktop) */}
          <div className="hidden md:flex flex-1 justify-end items-center">
            {/* Search Bar */}
            <div
              className={`block relative max-w-96 w-full ${
                isSearchActive ? "shadow-lg py-4 px-2" : "px-2"
              }`}
              ref={searchBarRef}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border-gray-300 focus:ring-2 focus:ring-[#FFFFFF] outline-none placeholder:text-sm"
                onClick={() => setIsSearchActive(true)}
                onChange={(e) => handleSearchChange(e)}
                // onBlur={() => setIsSearchActive(false)}
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>

              {/* Dropdown */}
              {isSearchActive && (
                <div className="absolute left-0 top-full mt-[0.5px] w-full bg-white shadow-lg rounded-b-lg overflow-hidden p-4 z-50">
                  {/* Filters */}
                  <div className="flex items-center gap-2 mb-3">
                    {["Place", "Buddies", "Post", "Hashtags", "Badges"].map(
                      (filter, index) => (
                        <button
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${
                            activeFilter === filter
                              ? "bg-blue-500 text-white" // Active styles
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Default styles
                          }`}
                          // className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                          onClick={() => seacrhAccordingTo(filter)}
                        >
                          {filter}
                        </button>
                      )
                    )}
                  </div>

                  <div className="flex-1 h-[400px] overflow-auto scrollbar-hidden">

                  {!searchAction && searchedKeyword && (
                    <>
                      {seacrhResult.map((suggestion, index) => (
                        <li
                          key={suggestion.id}
                          className="flex items-center justify-between py-2"
                          
                        >
                          <div className="flex items-center gap-3 cursor-pointer" onClick={() => sendToSearch(suggestion.id)}>
                            <img
                              src={suggestion.profile_image || dummyUserImage}
                              alt={suggestion.user_name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-left text-[#415365]">
                                {suggestion.full_name}
                              </p>
                              <div className="flex justify-between text-left gap-5">
                                <p className="text-sm text-gray-500">
                                  {suggestion.user_name || 'Test'}
                                </p>
                                <p className="text-sm text-gray-400">
                                  {suggestion.total_followers}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            className="text-[#000000] font-medium"
                            onClick={() => removeFromSeacrh(suggestion.id)}
                          >
                            X
                          </button>
                        </li>
                      ))}
                    </>
                  )}


                  {searchAction === "Buddies" && (
                    <>
                      { seacrhResult ? seacrhResult.map((suggestion, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={suggestion.profile_image || dummyUserImage}
                              alt={suggestion.user_name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-left text-[#415365]">
                                {suggestion.full_name}
                              </p>
                              <div className="flex justify-between text-left gap-5">
                                <p className="text-sm text-gray-500">
                                  {suggestion.user_name}
                                </p>
                                {/* <p className="text-sm text-gray-400">
                                  {suggestion.followers}
                                </p> */}
                              </div>
                            </div>
                          </div>
                          <button
                            className="text-[#000000] font-medium"
                            onClick={() => removeFromSeacrh(suggestion.id)}
                          >
                            X
                          </button>
                        </li>
                      ))
                    : 
                    (
                      <>
                       <p>No Data</p>
                      </>
                    )
                    }
                    </>
                  )}
                  

                  {searchAction === "Hashtags" && (
                    <>
                      { seacrhResult ? seacrhResult.map((suggestion, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium text-left text-[#415365]">
                                {suggestion.name}
                              </p>
                              <div className="flex justify-between text-left gap-5"></div>
                            </div>
                          </div>
                          <button
                            className="text-[#000000] font-medium"
                            onClick={() => removeFromSeacrh(suggestion.id)}
                          >
                            X
                          </button>
                        </li>
                      ))
                     : (
                      <>
                      <p>No Data</p>
                      </>
                     )
                    }
                    </>
                  )}

                  {searchAction === "Post" && (
                    <>
                      { seacrhResult ? seacrhResult.map((suggestion, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium text-left text-[#415365]">
                                {suggestion.description}
                              </p>
                              <div className="flex justify-between text-left gap-5"></div>
                            </div>
                          </div>
                          <button
                            className="text-[#000000] font-medium"
                            onClick={() => removeFromSeacrh(suggestion.id)}
                          >
                            X
                          </button>
                        </li>
                      ))
                     :
                     (
                      <>
                       <p>No Data</p>
                      </>
                     )
                    }
                    </>
                  )}
                 
                    {!searchAction && !searchedKeyword && (
                      <>
                        {/* Recent Views */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-5">
                            <h3 className="text-sm font-medium text-lg text-[#48555B]">
                              Recent View
                            </h3>
                            <button className="text-[#48555B] text-xs font-medium">
                              See all
                            </button>
                          </div>
                          <div className="flex items-center gap-3 overflow-x-auto">
                            {recentUsers.map((user, index) => (
                              <div
                                key={index}
                                className="flex flex-col items-center text-center"
                              >
                                <div className="rounded-full border-2 border-[#2DC6BE] shadow-lg ">
                                  <img
                                    src={user.img}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                                  />
                                </div>
                                <span className="text-sm mt-1 text-[#415365]">
                                  {user.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Search Suggestions */}
                        <div>
                          <h3 className="text-sm font-medium mb-2 text-left text-[#48555B]">
                            Try Searching
                          </h3>
                          <ul>
                            {suggestionShow?.map((suggestion, index) => (
                              <li
                                key={index}
                                className="flex items-center justify-between py-2"
                              >
                                <div className="flex items-center gap-3">
                                  <img
                                    src={suggestion.img}
                                    alt={suggestion.name}
                                    className="w-10 h-10 rounded-full"
                                  />
                                  <div>
                                    <p className="font-medium text-left text-[#415365]">
                                      {suggestion.name}
                                    </p>
                                    <div className="flex justify-between text-left gap-5">
                                      <p className="text-sm text-gray-500">
                                        {suggestion.username}
                                      </p>
                                      <p className="text-sm text-gray-400">
                                        {suggestion.followers}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="text-[#000000] font-medium"
                                  onClick={() => removeFromSearchSuggestion(suggestion.id)}
                                >
                                  X
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}

</div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center justify-between ml-5 mr-5 text-gray-500 gap-6 md:w-[400px]">
              <Link to='/community'><NavItem icon={HomeIcon} label="Home" /></Link>
              {/* <NavItem icon={HomeIcon} label="Home" /> */}
              <NavItem icon={ExploreIcon} label="Explore" />
              <NavItem icon={PersonIcon} label="Buddies Request" />
            </nav>

            {/* Icons and Profile Section */}
            <div className="flex items-center">
              <Link to='/chat'>
                <IconButton
                  icon={
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      className="w-4 h-4 hover:w-5 hover:h-5"
                    />
                  }
                />
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setIsNotificationsOpen(true)}
                onMouseLeave={() => setIsNotificationsOpen(false)}
              >
                <IconButton
                  icon={<NotificationsIcon className="datargb w-5 h-5" />}
                />
                {isNotificationsOpen && (
                  <div className="absolute -left-[18rem] top-full mt-[0.5px] max-w-80 bg-white shadow-lg rounded-b-lg overflow-hidden p-4 z-50">
                    {/* Recent Views */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-lg text-[#48555B] text-left mb-3">
                        Notification
                      </h3>
                      <ul>
                        <li className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              {/* Background Image */}
                              <img
                                src={girl}
                                alt="Background"
                                className="w-10 h-10 rounded-full"
                              />

                              {/* Overlay Image */}
                              <img
                                src={girl}
                                alt="Overlay"
                                className="absolute top-1 left-1 right-0 w-10 h-10 rounded-full"
                              />
                            </div>

                            <div>
                              <p className="font-medium text-left text-[#415365]">
                                Follow Request
                              </p>
                              <div className="flex justify-between text-left gap-5">
                                <p className="text-sm text-gray-500">
                                  @Madhu.lika
                                </p>
                                <p className="text-sm text-gray-400">
                                  12kFollowers
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            className="text-[#000000] font-medium"
                            onClick={() => console.log("Remove item")}
                          >
                            {">"}
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-lg text-[#48555B] text-left mb-3">
                        Today
                      </h3>
                      <ul>
                        <li className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              {/* Background Image */}
                              <img
                                src={girl}
                                alt="Background"
                                className="w-10 h-10 rounded-full"
                              />

                              {/* Overlay Image */}
                              <img
                                src={girl}
                                alt="Overlay"
                                className="absolute top-1 left-1 right-0 w-10 h-10 rounded-full"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-left text-[#415365]">
                                Pankaj
                              </p>
                              <div className="flex justify-between text-left gap-5">
                                <p className="text-sm text-gray-500">
                                  @Reet.Pankaj
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            className="font-medium rounded-xl border border-[#2DC6BE] text-[#2DC6BE] p-2"
                            onClick={() => console.log("Remove item")}
                          >
                            Followed
                          </button>
                        </li>

                        <li className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              {/* Background Image */}
                              <img
                                src={girl}
                                alt="Background"
                                className="w-10 h-10 rounded-full"
                              />

                              {/* Overlay Image */}
                              <img
                                src={girl}
                                alt="Overlay"
                                className="absolute top-1 left-1 right-0 w-10 h-10 rounded-full"
                              />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 text-left">
                                @Madhu.lika & Karthik Like your Story
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-lg text-[#48555B] text-left mb-3">
                        Last Week
                      </h3>
                      <ul>
                        <li className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              {/* Background Image */}
                              <img
                                src={girl}
                                alt="Background"
                                className="w-10 h-10 rounded-full"
                              />

                              {/* Overlay Image */}
                              <img
                                src={girl}
                                alt="Overlay"
                                className="absolute top-1 left-1 right-0 w-10 h-10 rounded-full"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-left text-[#415365]">
                                Rishab
                              </p>
                              <div className="flex justify-between text-left gap-5">
                                <p className="text-sm text-gray-500">
                                  @frontend
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            className="font-medium rounded-xl border border-[#2DC6BE] text-[#2DC6BE] p-2"
                            onClick={() => console.log("Remove item")}
                          >
                            Follow Request
                          </button>
                        </li>

                        <li className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              {/* Background Image */}
                              <img
                                src={girl}
                                alt="Background"
                                className="w-10 h-10 rounded-full"
                              />

                              {/* Overlay Image */}
                              <img
                                src={girl}
                                alt="Overlay"
                                className="absolute top-1 left-1 right-0 w-10 h-10 rounded-full"
                              />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 text-left">
                                @Madhu.lika & Karthik Like your Story
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-lg text-[#48555B] text-left mb-3">
                        Last Month
                      </h3>
                      <ul>
                        <li className="flex items-center justify-between py-2">
                          <div className="flex items-center justify-between gap-3">
                            <div className="relative">
                              {/* Background Image */}
                              <img
                                src={girl}
                                alt="Background"
                                className="w-10 h-10 rounded-full"
                              />

                              {/* Overlay Image */}
                              <img
                                src={girl}
                                alt="Overlay"
                                className="absolute top-1 left-1 right-0 w-10 h-10 rounded-full"
                              />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 text-left">
                                Madhu.lika & Karthik Like your Post : Enjoying
                                Pune
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              {/* Background Image */}
                              <img
                                src={girl}
                                alt="Background"
                                className="w-10 h-10 rounded-full"
                              />

                              {/* Overlay Image */}
                              <img
                                src={girl}
                                alt="Overlay"
                                className="absolute top-1 left-1 right-0 w-10 h-10 rounded-full"
                              />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 text-left">
                                Madhu.lika & Karthik Like your Post : Enjoying
                                Pune
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-px h-6 bg-gray-300 mx-4"></div>
              <div
                className="relative"
                onMouseEnter={() => setIsProfile(true)}
                onMouseLeave={() => setIsProfile(false)}
              >
                <ProfileMenu userDetails={userDetails} />
                {isProfile && (
                  <div className="absolute -left-[10rem] right-0 top-full mt-[0.5px] max-w-80 bg-white shadow-lg rounded-b-lg overflow-hidden p-4 z-50">
                    {/* Profile, Settings, Logout */}
                    <div className="space-y-2">
                      <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded flex items-center ">
                        <Person className="mr-2 navitemDatas" />
                        <Link to='/profile'>
                          Profile
                        </Link>
                      </button>
                      <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded flex items-center">
                        <Settings className="mr-2 navitemDatas" />
                        Settings
                      </button>
                      <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded flex items-center" onClick={logOut}>
                        <ExitToApp className="mr-2 navitemDatas" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (Visible on Mobile) */}
        <div className="block md:hidden bg-white shadow-md py-2 px-3">
          <nav className="flex justify-between">
            <NavItem icon={HomeIcon} label="" />
            <NavItem icon={ExploreIcon} label="" />
            <NavItem icon={PersonIcon} label="" />
            <IconButton
              icon={<NotificationsIcon className="datargb w-6 h-6" />}
            />
          </nav>
        </div>
      </header>
    </>
  );
};

// Navigation Item Component
const NavItem = ({ icon: Icon, label }) => {
  return (
    <div className="flex items-center cursor-pointer navitemData mr-2">
      <Icon className="text-gray-500" />
      <span className="labelData ml-1">{label}</span>
    </div>
  );
};

// Icon Button Component
const IconButton = ({ icon }) => {
  return (
    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#1DB2AA] navitemDatas mx-2">
      {icon}
    </button>
  );
};
// Profile Menu Component
const ProfileMenu = ({ userDetails }) => {
  return (
    <div className="flex items-center">
      <img
        src={userDetails?.profile_image || dummyUserImage}
        alt="Profile"
        className="w-8 h-8 rounded-full mr-2"
      />
      
      <div className="flex flex-col">
      <span className="block font-medium text-gray-700 mr-5">
        {userDetails?.user_name}
      </span>
        <p className="font-inter font-medium text-[12px] text-[#667877] text-left">
          {userDetails?.email?.length > 12 ? `${userDetails?.email.slice(0, 12)}...` : userDetails?.email}
        </p>
      </div>
      <KeyboardArrowDownIcon className="h-4 w-4 text-gray-500" />
    </div>
  );
};

export default Header;
