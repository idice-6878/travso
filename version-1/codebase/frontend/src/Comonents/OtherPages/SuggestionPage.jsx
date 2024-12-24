import React, { useEffect, useState } from "react";
import SuggestionHeader from "./SuggestionHeader";
import Girl from "../../assets/headerIcon/girl.jpg";
import Boy1 from "../../assets/headerIcon/boy1.png";
import Boy2 from "../../assets/headerIcon/boy2.jpg";
import communityafter from "../../assets/communityafter.png";
import communitybefore from "../../assets/communitybefore.png";
import DotThree from "../../assets/dotthree.png";
import starBadges from "../../assets/starBadges.png";
import SuccessError from "./SuccessError";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelectFollow } from "../../redux/slices/authSlice";

const SuggestionPage = () => {
  const dispatch = useDispatch();
  const [joinCommunity, setJoinCommunity] = useState([
    {
      id: 1,
      name: "Adventurer",
      handle: "12K Travel Enthusiast",
      image: Girl,
    },
    {
      id: 2,
      name: "Explorer",
      handle: "12K Travel Enthusiast",
      image: Boy1,
    },
    {
      id: 3,
      name: "Foodie",
      handle: "12K Travel Enthusiast",
      image: Boy2,
    },
    {
      id: 4,
      name: "Traveler",
      handle: "12K Travel Enthusiast",
      image: Boy1,
    },
    {
      id: 5,
      name: "Teerthstal",
      handle: "12K Travel Enthusiast",
      image: Girl,
    },
    {
      id: 6,
      name: "Traveler",
      handle: "12K Travel Enthusiast",
      image: Boy2,
    },
    {
      id: 7,
      name: "TravSo",
      handle: "253K Travel Enthusiast",
      image: Boy2,
    },
  ]);

  const [imageStates, setImageStates] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");
  const [threeSelected, setThreeSelected] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    setImageStates((prevStates) => {
      const newState = { ...prevStates };
      newState[id] =
        newState[id] === communitybefore ? communityafter : communitybefore;
      return newState;
    });
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

  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      name: "Pankaj Reet Tech",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Boy1,
      follow: false,
    },
    {
      id: 2,
      name: "Lakshit Bhayana",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Girl,
      follow: false,
    },
    {
      id: 3,
      name: "Pankaj Reet Tech",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Boy1,
      follow: false,
    },
  ]);

  const [influencerData, setInfluencerData] = useState([
    {
      id: 1,
      name: "Pankaj Reet Tech",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Boy1,
      follow: false,
    },
    {
      id: 2,
      name: "Lakshit Bhayana",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Girl,
      follow: false,
    },
    {
      id: 3,
      name: "Pankaj Reet Tech",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Boy1,
      follow: false,
    },
  ]);

  const [travelBuddyData, setTravelBuddyData] = useState([
    {
      id: 1,
      name: "Pankaj Reet Tech",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Boy1,
      follow: false,
    },
    {
      id: 2,
      name: "Lakshit Bhayana",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Girl,
      follow: false,
    },
    {
      id: 3,
      name: "Pankaj Reet Tech",
      title: "Solo Traveler",
      description:
        "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
      image: Boy1,
      follow: false,
    },
  ]);

  useEffect(() => {
    checkFollowedCount();
  }, [cardsData, influencerData, travelBuddyData]);

  const handleFollow = (userId, type) => {
    if (type === "community") {
      setCardsData((prevData) =>
        prevData.map((card) =>
          card.id === userId ? { ...card, follow: !card.follow } : card
        )
      );
    } else if (type === "influencer") {
      setInfluencerData((prevData) =>
        prevData.map((card) =>
          card.id === userId ? { ...card, follow: !card.follow } : card
        )
      );
    } else if (type === "travelBuddy") {
      setTravelBuddyData((prevData) =>
        prevData.map((card) =>
          card.id === userId ? { ...card, follow: !card.follow } : card
        )
      );
    }
  };

  /* Check for follow count */
  const checkFollowedCount = () => {
    const totalFollowed =
      cardsData.filter((card) => card.follow).length +
      influencerData.filter((card) => card.follow).length +
      travelBuddyData.filter((card) => card.follow).length;

    if (totalFollowed >= 3) {
      setThreeSelected(true);
      handleFlashMessage("Now you can Tap Next Button", "success");
    } else {
      setThreeSelected(false);
    }
  };

  const handleNext = async () => {
    try {
      const updateSelectFollowResult = await dispatch(
        updateSelectFollow()
      ).unwrap();
      // console.log("======updateSelectFollowResult====>", updateSelectFollowResult);
      if (updateSelectFollowResult) {
        navigate("/community");
      }
    } catch (error) {
      console.log("====error in selectpage handlenext", error);
    }
  };

  return (
    <>
      <SuggestionHeader />
      {flashMessage && (
        <SuccessError message={flashMessage} messageType={flashMsgType} />
      )}
      <div className="bg-[#F0F7F7] p-6 flex justify-center items-center">
        <div className="w-[1240px] container mx-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-poppins font-semibold text-[32px] text-[#212626] text-left mt-3">
              Follow at least 3 community or people to get started
            </h2>
            <button
              type="button"
              disabled={!threeSelected}
              onClick={handleNext}
              className={`${!threeSelected ? "border border-[#2DC6BE] bg-[#F0F7F7] text-[#2DC6BE]" : "bg-teal-500 text-white hover:bg-teal-600"} rounded-[8px] py-2 px-10 font-inter font-medium text-[16px]`}
            >
              Next
            </button>
          </div>

          <div className="flex items-center justify-between mt-3">
            <h2 className="text-left font-poppins font-semibold text-[24px] text-[#212626]">
              Community Suggestion For You
            </h2>
            <p className="font-inter font-medium text-[16px] text-[#667877]">
              View More
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-transform transform hover:scale-10 rounded-[10px]"
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-[240px] object-cover rounded-t-[8px]"
                />
                <div className="p-[16px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                        {card.name}
                      </h3>
                    </div>
                    <div>
                      <img src={DotThree} alt={DotThree} className="h-4" />
                    </div>
                  </div>
                  <p className="text-left font-inter font-medium text-[14px] text-[#667877] mb-2 -mt-1">
                    {card.title}
                  </p>
                  <p className="font-inter font-medium text-[14px] text-[#364045] text-left text-justify">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <button
                     className={`w-[175px] h-[48px] font-inter font-medium text-[16px] p-[12px] rounded-[8px] ${
                      card.follow
                        ? "border-2 border-[#2DC6BE] text-[#2DC6BE]" // Second button's class
                        : "bg-teal-500 text-white hover:bg-teal-600" // First button's default class
                    }`}
                      onClick={() => handleFollow(card.id, "community")}
                    >
                      {!card.follow ? "Follow" : "Following"}
                    </button>
                    <button className="border-2 border-[#2DC6BE] w-[175px] h-[48px] text-[#2DC6BE] font-inter font-medium text-[16px] p-[12px] rounded-[8px]">
                      Add as buddy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-left font-poppins font-semibold text-[24px] text-[#212626]">
              Influencer Suggestion For You
            </h2>
            <p className="font-inter font-medium text-[16px] text-[#667877]">
              View More
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {influencerData.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-transform transform hover:scale-10 rounded-[10px]"
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-[240px] object-cover rounded-t-[8px]"
                />
                <img
                  src={starBadges}
                  alt={starBadges}
                  className="absolute left-0 top-0 rounded-t-[8px]"
                />

                <div className="p-[16px]">
                  <h3 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                    {card.name}
                  </h3>
                  <p className="text-left font-inter font-medium text-[14px] text-[#667877] mb-2">
                    {card.title}
                  </p>
                  <p className="font-inter font-medium text-[14px] text-[#364045] text-left text-justify">
                    {card.description}
                  </p>
                  {/* <div className="flex items-center justify-between mt-4">
                    <button className="bg-gradient-to-r from-[#1DB2AA] to-[#BAE53D] w-[175px] h-[48px] text-white font-inter font-medium text-[16px] p-[12px] rounded-[8px] hover:bg-gradient-to-r from-[#1DB2AA] to-[#BAE53D]">
                      Follow
                    </button>
                    <button className="border-2 border-gradient-to-r from-[#1DB2AA] to-[#BAE53D] w-[175px] h-[48px] text-gradient-to-r from-[#1DB2AA] to-[#BAE53D] font-inter font-medium text-[16px] p-[12px] rounded-[8px]">
                      Add as buddy
                    </button>
                  </div> */}
                  <div className="flex items-center justify-between mt-4">
                    {/* First Button */}
                    <button
                      className={`${
                        card.follow
                          ? "w-[175px] h-[48px] bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#1DB2AA] to-[#BAE53D] border-2 border-[#BAE53D] rounded-[8px] font-inter font-medium text-[16px] p-[12px]"
                          : "bg-gradient-to-r from-[#1DB2AA] to-[#BAE53D] w-[175px] h-[48px] text-white font-inter font-medium text-[16px] p-[12px] rounded-[8px]"
                      }`}
                      onClick={() => handleFollow(card.id, "influencer")}
                    >
                      {card.follow ? "Following" : "Follow"}
                    </button>

                    {/* Second Button */}
                    <div className="relative inline-block">
                      <button className="w-[175px] h-[48px] bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#1DB2AA] to-[#BAE53D] font-inter font-medium text-[16px] p-[12px] rounded-[8px]">
                        Add as buddy
                      </button>
                      <div className="absolute inset-0 rounded-[8px] border-2 border-[#BAE53D] border-gradient-to-r from-[#1DB2AA] to-[#BAE53D] p-[2px] -z-10"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-left font-poppins font-semibold text-[24px] text-[#212626]">
              Travel buddy Suggestion For You
            </h2>
            <p className="font-inter font-medium text-[16px] text-[#667877]">
              View More
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {travelBuddyData.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-transform transform hover:scale-10 rounded-[10px]"
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-[240px] object-cover rounded-t-[8px]"
                />
                <div className="p-[16px]">
                  <h3 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                    {card.name}
                  </h3>
                  <p className="text-left font-inter font-medium text-[14px] text-[#667877] mb-2">
                    {card.title}
                  </p>
                  <p className="font-inter font-medium text-[14px] text-[#364045] text-left text-justify">
                    {card.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <button
                      className={`w-[175px] h-[48px] font-inter font-medium text-[16px] p-[12px] rounded-[8px] ${
                        card.follow
                          ? "border-2 border-[#2DC6BE] text-[#2DC6BE]" // Second button's class
                          : "bg-teal-500 text-white hover:bg-teal-600" // First button's default class
                      }`}
                      onClick={() => handleFollow(card.id, "travelBuddy")}
                    >
                      {!card.follow ? "Follow" : "Following"}
                    </button>

                    <button className="border-2 border-[#2DC6BE] w-[175px] h-[48px] text-[#2DC6BE] font-inter font-medium text-[16px] p-[12px] rounded-[8px]">
                      Add as buddy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestionPage;
