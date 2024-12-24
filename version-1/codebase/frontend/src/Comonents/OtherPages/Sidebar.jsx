import React, { useState } from "react";
import First from "../../assets/PostImage/first.png";
import Second from "../../assets/PostImage/second.png";
import Third from "../../assets/PostImage/third.png";
import Fourth from "../../assets/PostImage/fourth.png";
import Fifth from "../../assets/PostImage/fifth.png";
import Sixth from "../../assets/PostImage/sixth.png";
import Seventh from "../../assets/PostImage/seventh.png";
import Eighth from "../../assets/PostImage/eigth.png";
import Ninth from "../../assets/PostImage/ninth.png";
import Tenth from "../../assets/PostImage/first.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    userBuddies,
    user: userDetails,
    userPosts,
    userFollowers,
    toWhomUserFollows,
  } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([
    {
      id: 1,
      imageUrl: First,
      title: "Post 1",
    },
    {
      id: 2,
      imageUrl: Second,
      title: "Post 2",
    },
    {
      id: 3,
      imageUrl: Third,
      title: "Post 3",
    },
    {
      id: 4,
      imageUrl: Fourth,
      title: "Post 4",
    },
    {
      id: 5,
      imageUrl: Fifth,
      title: "Post 5",
    },
    {
      id: 6,
      imageUrl: Sixth,
      title: "Post 6",
    },
    {
      id: 7,
      imageUrl: Seventh,
      title: "Post 7",
    },
    {
      id: 8,
      imageUrl: Eighth,
      title: "Post 8",
    },
    {
      id: 9,
      imageUrl: Ninth,
      title: "Post 9",
    },
    {
      id: 10,
      imageUrl: Tenth,
      title: "Post 10",
    },
    {
      id: 11,
      imageUrl: Sixth,
      title: "Post 11",
    },
    {
      id: 12,
      imageUrl: Seventh,
      title: "Post 12",
    },
  ]);

  const sampleData = [
    {
      title: "Europe Bucket List",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgRYMoFhRn57IhIcTXWTPbhzqwmWBC1IxFDA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHSxJDZIHumlGbMxGb77Uj2KhVlmRrdclAcw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHSxJDZIHumlGbMxGb77Uj2KhVlmRrdclAcw&s",
      ],
    },
    {
      title: "Asia Bucket List",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQutHQ734KtvKx-8La1Yprpvl4w769XbzThkw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmdZy7i30h7n6b7GRNA5vJV_hdQGwUyu8_g&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmdZy7i30h7n6b7GRNA5vJV_hdQGwUyu8_g&s",
      ],
    },
  ];

  // State to toggle visibility of more posts
  const [showAllPost, setShowAllPost] = useState(false);

  // Show only first 9 posts or all posts based on state
  // const visiblePosts = showAllPost ? posts : posts.slice(0, 9);
  const visiblePosts = showAllPost
    ? userPosts
      ? userPosts
      : []
    : userPosts
    ? userPosts.slice(0, 9)
    : [];

  const handleAllBucketList = () => {
    navigate("/bucketlist");
  };

  // for capitalizing first word of string
  function capitalizeFirstLetter(str) {
    if (!str) return str; // Handle empty or null strings
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // format in format for dob like 25 Aug 2002 and for joined Feb 2022
  function formatDate(isoDate, type) {
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

    // Handle different formats
    if (type === "dob") {
      return `${day} ${shortMonth} ${year}`; // Example: 25 Aug 2002
    } else if (type === "joined") {
      return `${month} ${year}`; // Example: September 2022
    } else {
      throw new Error("Invalid type. Use 'dob' or 'joined'.");
    }
  }

  const handleAllPost = () => {
    navigate("/postData");
  };

  return (
    <>
      <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
        {/* Header Section */}
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-lg font-semibold text-gray-800">About me</h2>
          <Link to="/editprofile">
            <button
              aria-label="Edit Info"
              className="flex items-center text-[#2DC6BE]"
            >
              <span className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline">
                Edit
              </span>
            </button>
          </Link>
        </div>

        {/* Info List */}
        <div className="mt-2">
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <svg
                width="16"
                height="18"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path
                  d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z"
                  stroke="#212626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-inter font-medium text-[16px] text-[#212626]">
                {userDetails ? capitalizeFirstLetter(userDetails?.gender) : ""}
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                width="16"
                height="18"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path
                  d="M19 9H1M14 1V5M6 1V5M5.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H5.8C4.11984 3 3.27976 3 2.63803 3.32698C2.07354 3.6146 1.6146 4.07354 1.32698 4.63803C1 5.27976 1 6.11984 1 7.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21Z"
                  stroke="#212626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-inter font-medium text-[16px] text-[#212626]">
                {/* DOB: 25 Aug 2002 */}
                DOB: {userDetails ? formatDate(userDetails?.dob, "dob") : ""}
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                width="17"
                height="19"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path
                  d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
                  stroke="#212626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 21C13 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 5 17 9 21Z"
                  stroke="#212626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-inter font-medium text-[16px] text-[#212626]">
                {/* From: Nagpur, Maharashtra */}
                From:{" "}
                {userDetails
                  ? `${userDetails?.city}, ${userDetails?.state}`
                  : ""}
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                width="17"
                height="19"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path
                  d="M11 5V11L15 13M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
                  stroke="#212626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-inter font-medium text-[16px] text-[#212626]">
                Joined:{" "}
                {userDetails
                  ? formatDate(userDetails?.created_at, "joined")
                  : ""}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
            Posts ({userPosts ? userPosts?.length : "0"})
          </h2>
          <p
            onClick={handleAllPost}
            className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline"
          >
            See All
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {/* Dynamically render images and titles */}

          {/* {visiblePosts &&
            visiblePosts.map(
              (post) =>
                post.media_url.length > 0 && (
                  <div key={post.id}>
                    <img
                      src={post.media_url[0]}
                      alt={post.description}
                      className="w-full h-[130px] rounded-sm object-cover"
                    />
                  </div>
                )
            )} */}

          {visiblePosts &&
            visiblePosts.map(
              (post) =>
                post.media_url.length > 0 && (
                  <div key={post.id}>
                    {post.media_url[0]?.match(
                      /\.(mp4|mov|webm|avi|mkv|flv|wmv|ogv|3gp)$/i
                    ) ? (
                      <video
                        controls
                        preload="auto"
                        className="w-full h-[130px] rounded-sm object-cover"
                      >
                        <source src={post.media_url[0]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={post.media_url[0]}
                        alt={post.description}
                        className="w-full h-[130px] rounded-sm object-cover"
                      />
                    )}
                  </div>
                )
            )}
        </div>
      </div>

      <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
        <div className="flex justify-between items-center -mb-4">
          <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
            Bucket List
          </h2>
          <p
            onClick={handleAllBucketList}
            className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline"
          >
            See All
          </p>
        </div>
        {sampleData.map((item, index) => (
          <div key={index} className="mt-8">
            {/* Flexbox for vertical and horizontal image arrangement */}
            <div className="flex gap-2">
              {/* Vertical image */}
              <img
                src={item.images[0]}
                alt="Vertical Image"
                className="w-1/2 h-auto object-cover rounded-md"
              />
              {/* Two horizontal images */}
              <div className="flex flex-col w-1/2 gap-2">
                {item.images.slice(1, 3).map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt="Horizontal Image"
                    className="w-full h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
            {/* Title */}
            <p className="text-left font-inter text-[16px] font-medium text-[#212626] mt-2">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
