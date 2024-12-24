import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, getUserPosts } from "../../redux/slices/authSlice";
// import ProfilePageHeaderData from "./ProfilePageHeaderData";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const PostDataDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userPosts, user: userDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userPosts) {
      dispatch(getUserPosts());
    }

    if (!userDetails) {
      dispatch(getUserDetails());
    }
  }, [dispatch]);

  const posts = [
    {
      username: "Pankaj Reet Tech",
      userTitle: "Solo Traveler",
      location: "Rameswaram",
      image: "https://via.placeholder.com/600x400",
      love: "72K",
      comments: "50K",
      bucketList: "2.3K",
      shared: "1K",
      date: "12 Oct 2024",
    },
    {
      username: "Alex Johnson",
      userTitle: "Explorer",
      location: "Paris",
      image: "https://via.placeholder.com/600x400",
      love: "50K",
      comments: "30K",
      bucketList: "2.3K",
      shared: "1K",
      date: "10 Oct 2024",
    },
    {
      username: "Sophia Garcia",
      userTitle: "Photographer",
      location: "New York",
      image: "https://via.placeholder.com/600x400",
      love: "120K",
      comments: "80K",
      bucketList: "2.3K",
      shared: "1K",
      date: "8 Oct 2024",
    },
    {
      username: "Rajesh Kumar",
      userTitle: "Food Blogger",
      location: "Delhi",
      image: "https://via.placeholder.com/600x400",
      love: "90K",
      comments: "60K",
      bucketList: "2.3K",
      shared: "1K",
      date: "5 Oct 2024",
    },
    {
      username: "Emily Brown",
      userTitle: "Hiker",
      location: "Swiss Alps",
      image: "https://via.placeholder.com/600x400",
      love: "85K",
      comments: "40K",
      bucketList: "2.3K",
      shared: "1K",
      date: "3 Oct 2024",
    },
    {
      username: "Chris Lee",
      userTitle: "Travel Enthusiast",
      location: "Seoul",
      image: "https://via.placeholder.com/600x400",
      love: "65K",
      comments: "35K",
      bucketList: "2.3K",
      shared: "1K",
      date: "1 Oct 2024",
    },
    {
      username: "Fatima Noor",
      userTitle: "Adventure Seeker",
      location: "Dubai",
      image: "https://via.placeholder.com/600x400",
      love: "78K",
      comments: "42K",
      bucketList: "2.3K",
      shared: "1K",
      date: "28 Sep 2024",
    },
    {
      username: "Michael Robinson",
      userTitle: "Cyclist",
      location: "Amsterdam",
      image: "https://via.placeholder.com/600x400",
      love: "55K",
      comments: "25K",
      bucketList: "2.3K",
      shared: "1K",
      date: "25 Sep 2024",
    },
  ];

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

  return (
    <>
      <Header />
      {/* <ProfilePageHeaderData /> */}
      <div className="min-h-screen bg-gray-50 p-4">
        <p className="font-poppins text-[#212626] font-semibold text-[28px] mb-5 text-left flex items-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate("/profile")}
          >
            <path
              d="M22.5 27L13.5 18L22.5 9"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All Posts ({userPosts ? userPosts.length : "0"})
        </p>
        <div className="container mx-auto flex gap-5">
          {/* Main Content */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {userPosts &&
                userPosts.map(
                  (post, index) =>
                    post.media_url.length > 0 && (
                      <div
                        key={post?.id}
                        className="h-[588px] bg-white relative rounded-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 mb-4"
                      >
                        <div className="flex items-center mb-4">
                          <img
                            src={post?.profile_image || dummyUserImage}
                            alt="User Avatar"
                            className="w-[44px] h-[44px] rounded-full"
                          />
                          <div className="ml-3 w-full">
                            <div className="flex items-center justify-between">
                              <h4 className="font-poppins text-[20px] text-[#212626] font-semibold flex items-center gap-[5px]">
                                {post.user_name}
                                <span className="ml-1 text-blue-500 text-xs">
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
                                      d="M11.6843 5.53463C11.8633 5.71362 11.8633 6.00382 11.6843 6.18281L7.40656 10.4606C7.22757 10.6396 6.93736 10.6396 6.75837 10.4606L4.31393 8.01615C4.13494 7.83716 4.13494 7.54696 4.31393 7.36797C4.49292 7.18898 4.78312 7.18898 4.96211 7.36797L7.08246 9.48832L11.0362 5.53463C11.2151 5.35564 11.5053 5.35564 11.6843 5.53463Z"
                                      fill="white"
                                    />
                                  </svg>
                                </span>
                              </h4>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                  stroke="#212626"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                  stroke="#212626"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                  stroke="#212626"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <p className="text-left text-[14px] text-[#667877] font-inter font-medium -mt-1">
                              {"Solo Traveler"} • {"Rameswaram"}
                            </p>
                          </div>
                        </div>

                        {/* Post Image */}

                        <img
                          src={post.media_url[0]}
                          alt="Post"
                          className="w-full rounded-[5px] h-[432px] object-cover"
                        />

                        {/* Post Stats */}
                        <div className="mt-4 text-sm flex justify-between items-center text-gray-600">
                          <div className="flex items-center gap-3 text-[12px] text-[#667877] font-inter font-medium">
                            <span>
                              {post.total_likes} Love&nbsp; • &nbsp;
                              {post.total_comments}{" "}
                              {post.total_comments > 1 ? "Comments" : "Comment"}
                              &nbsp; • &nbsp;{post.total_buckets} Bucket
                              listed&nbsp; • &nbsp;{post.total_shared} Shared
                            </span>
                          </div>
                          <div className="text-right text-[12px] text-[#667877] font-inter font-medium">
                            {formatDate(post?.post_created_at)}
                          </div>
                        </div>

                        {/* Footer */}
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDataDetailPage;
