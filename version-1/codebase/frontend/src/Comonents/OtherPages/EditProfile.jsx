import React, { useEffect, useState } from "react";
import Icon from "../../assets/Icon.png";
import Select from "react-select";
import EditHeader from "./EditHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  removeCoverImage,
  removeProfileImage,
  updateUserDetails,
  uploadCoverImage,
  uploadProfileImage,
} from "../../redux/slices/authSlice";
import { fetchCities } from "../../redux/slices/stateCitySlice";
import SuccessError from "./SuccessError";
import "./EditProfile.css";
// import dummyImage from "../../assets/user_image-removebg-preview.png";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const cityOptions = [
  { value: "new-york", label: "New York" },
  { value: "london", label: "London" },
  { value: "tokyo", label: "Tokyo" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "8px",
    padding: "2px 4px",
    minHeight: "48px",
    backgroundColor: "#F0F7F7",
    border: "1px solid #d1d5db", // Light grey border
    boxShadow: "none",
    "&:hover": {
      borderColor: "#93C5FD", // Blue on hover
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#869E9D",
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "Inter, sans-serif",
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "16px",
    fontFamily: "Inter, sans-serif",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    overflow: "hidden",
  }),
};

const EditProfile = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [genderData, setGenderData] = useState({
    male: "Male",
    female: "Female",
    other: "Other",
  });

  // for user details
  const [formData, setFormData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    gender: "",
    state: "",
    city: "",
    userName: "",
    description: "",
    badge: ""
  });
  const [formDataError, setFormDataError] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  const { user: userDetails } = useSelector((state) => state.auth);
  const { cities, states } = useSelector((state) => state.stateCity);
  // console.log("===userDetails====>", userDetails)

  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetails());
    }

    if (cities.length === 0 && userDetails) {
      console.log("running");
      dispatch(fetchCities({ state: userDetails?.state, country: "India" }));
    }

    if (userDetails && !formData.fullName) {
      setFormData({
        fullName: userDetails?.full_name,
        firstName: userDetails?.first_name,
        lastName: userDetails?.last_name,
        gender: userDetails?.gender,
        state: userDetails?.state,
        city: userDetails?.city,
        userName: userDetails?.user_name,
        description: userDetails?.description || "",
        badge: userDetails?.badge || ""
      });
      console.log("yes working");
    }
  }, [dispatch, userDetails, cities]);

  // check for input validations
  const validate = () => {
    let formErrors = {};
    // console.log("===formData===>", formData);
    // First Name validation
    if (!formData.fullName.trim()) {
      formErrors.fullName = "*Full name is required";
    }

    // Last Name validation
    if (!formData.userName.trim()) {
      formErrors.userName = "*Unique Id is required";
    }

    // City validation
    if (!formData.city.trim()) {
      formErrors.city = "*City is required";
    }

    // City validation
    if (!formData.badge.trim()) {
      formErrors.badge = "*Badge is required";
    }

    // Gender validation
    if (!formData.gender.trim()) {
      formErrors.gender = "*Gender is required";
    }

    // description validation
    if (!formData.description || !formData.description.trim()) {
      formErrors.description = "*Description is required";
    }

    setFormDataError(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onloadend = async () => {
  //       try {
  //         const uploadImageResult = await dispatch(
  //           uploadProfileImage({ image: reader.result })
  //         ).unwrap();
  //         if (uploadImageResult) {
  //           await dispatch(getUserDetails());
  //         }
  //         console.log("Image upload successful:", uploadImageResult);
  //       } catch (error) {
  //         console.error("Image upload failed:", error);
  //       } finally {
  //         e.target.value = null;
  //       }
  //     };
  //   }
  // };

  /* handle image upload with validation of 2mb */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log("======file=====>", file);
    // Check if a file is selected and if it's not more than 2MB
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
      if (fileSizeInMB > 2) {
        alert("File size exceeds 2MB. Please choose a smaller image.");
        e.target.value = null; // Reset the file input
        return; // Stop further processing
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onloadend = async () => {
        try {
          const uploadImageResult = await dispatch(
            uploadProfileImage({ image: reader.result })
          ).unwrap();
          if (uploadImageResult) {
            await dispatch(getUserDetails());
          }
          console.log("Image upload successful:", uploadImageResult);
        } catch (error) {
          console.error("Image upload failed:", error);
        } finally {
          e.target.value = null; // Reset the file input
        }
      };
    }
  };
  

  // to show gender option on select box
  const genderOption = Object.keys(genderData).map((genderName) => ({
    value: genderName,
    label: genderName.charAt(0).toUpperCase() + genderName.slice(1),
  }));

  // to show city options on select box
  const cityOptions =
    // userDetails ?
    cities
      .map((cityName) => ({
        value: cityName,
        label: cityName,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  // : [];

  const handleRemovePhoto = () => {
    setCoverPhoto(null); // Remove the cover photo
  };

  // handle badge select
  const handleBadgeSelect = (e) => {
    const { name, value } = e.target;
    // Update the form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Validate the selection
    setFormDataError((prevErrors) => {
      let updatedErrors = { ...prevErrors };
  
      // Ensure the badge is selected
      if (value === "") {
        updatedErrors[name] = "Please select a badge.";
      } else {
        delete updatedErrors[name];
      }
  
      return updatedErrors;
    });
  };

  // handle change on city and state select
  const handleSelectChange = async (selectedOption, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : "",
    }));

    if (name === "state") {
      // set city blank if new state is chosen
      setFormData((prevData) => ({
        ...prevData,
        city: "",
      }));
      // await dispatch(fetchCities({ state: selectedOption.value, country: "India" }));
    }

    if (formDataError[name]) {
      setFormDataError((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // handle input change with dob validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the input
    setFormDataError((prevErrors) => {
      let updatedErrors = { ...prevErrors };
      // Clear error if the field is not empty
      if (value !== "" && updatedErrors[name]) {
        delete updatedErrors[name];
      }

      return updatedErrors;
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

  const handleSave = async () => {
    const isValid = await validate();
    // console.log("=====formData====>", formData);

    if (isValid) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const updateResult = await dispatch(
          updateUserDetails(formData)
        ).unwrap();
        console.log("updateResult", updateResult);
        if (updateResult) {
          navigate("/suggestion");
        }
      } catch (error) {
        console.log("error in catch part of handle save", error);
      }
    } else {
      console.log("all fields are required");
      // alert("all fields are required")
    }
  };

  const handleImageRemove = async () => {
    // setImageSrc(null); // Reset the uploaded image
    try {
      const removePic = await dispatch(removeProfileImage()).unwrap();
      if (removePic) {
        handleFlashMessage(removePic.message, "success");
        await dispatch(getUserDetails());
      }
    } catch (error) {
      console.log("error in removing profile image", error);
      const errorMessage = error.error || "Unexpected error occured";
      handleFlashMessage(errorMessage, "error");
    }
  };

  const removeCoverPic = async () => {
    //  console.log("yes")
    try {
      const removeCoverImgResult = await dispatch(removeCoverImage()).unwrap();
      if (removeCoverImgResult) {
        await dispatch(getUserDetails());
      }
      // console.log("====removeCoverImgResult====>", removeCoverImgResult);
    } catch (error) {
      console.log("error in cover image profilepage", error);
    }
  };

  // upload cover image
  // const handleCoverUpload = async (e) => {
  //   const file = e.target.files[0];
  //   console.log("===file====>", file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onloadend = async () => {
  //       try {
  //         const uploadImageResult = await dispatch(
  //           uploadCoverImage({ image: reader.result })
  //         ).unwrap();
  //         if (uploadImageResult) {
  //           await dispatch(getUserDetails());
  //         }
  //         console.log("Image upload successful:", uploadImageResult);
  //       } catch (error) {
  //         console.error("Image upload failed:", error);
  //       } finally {
  //         e.target.value = null;
  //       }
  //     };
  //   }
  // };

  // upload cover image
const handleCoverUpload = async (e) => {
  const file = e.target.files[0];
  // console.log("===file====>", file);
  
  // Check if a file is selected and if it's not more than 2MB
  if (file) {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
    if (fileSizeInMB > 2) {
      // handleFlashMessage("File size exceeds 2MB. Please choose a smaller image.", 'error');
      alert("File size exceeds 2MB. Please choose a smaller image.");
      e.target.value = null; // Reset the file input
      return; // Stop further processing
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const uploadImageResult = await dispatch(
          uploadCoverImage({ image: reader.result })
        ).unwrap();
        if (uploadImageResult) {
          await dispatch(getUserDetails());
        }
        // console.log("Image upload successful:", uploadImageResult);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        e.target.value = null; // Reset the file input
      }
    };
  }
};


  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result); // Set the uploaded profile photo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePhoto = () => {
    setProfilePhoto(null); // Remove the profile photo
  };

  console.log("===setFlashMessage===>", flashMessage);

  return (
    <>
      {flashMessage && (
        <SuccessError message={flashMessage} messageType={flashMsgType} />
      )}
      {/* Header Section */}
      <EditHeader />
      <div className="bg-[#F0F7F7] flex justify-center items-center min-h-screen">
        <div className="w-full mt-12 rounded-[16px] mb-5 max-w-[1024px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden p-[24px]">
          {/* Title and Subtitle */}
          <div className="text-center mb-8">
            <h2 className="font-poppins text-[32px] font-semibold text-[#212626]">
              Profile Setup
            </h2>
            <p className="font-inter font-medium text-[20px] text-[#667877]">
              Fill important details to get started
            </p>
          </div>

          {/* Form Section */}
          <form className="w-[976px]">
            {/* Cover Photo section */}
            <div className="relative border-dashed border-2 border-[#F0F7F7] rounded-[10px] h-[320px] flex items-center justify-center bg-[#F0F7F7] mb-6 overflow-hidden group">
              {userDetails?.cover_image ? (
                <>
                  <img
                    src={userDetails?.cover_image}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Buttons on hover */}
                    <label
                      htmlFor="cover-upload"
                      className="bg-[#2DC6BE] text-white py-2 px-4 rounded-lg cursor-pointer"
                      onClick={() =>
                        document.getElementById("cover-upload-1").click()
                      }
                    >
                      Upload
                    </label>
                    <button
                      type="button"
                      onClick={removeCoverPic}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg"
                    >
                      Remove
                    </button>
                    <input
                      type="file"
                      id="cover-upload-1"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleCoverUpload(e)}
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <img src={Icon} alt="Placeholder" className="w-8 h-8 mb-2" />
                  <span className="font-inter font-medium text-[16px] text-[#869E9D]">
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer"
                      onClick={() =>
                        document.getElementById("cover-upload-2").click()
                      }
                    >
                      Upload Cover Photo (optional)
                    </label>
                  </span>
                  <input
                    type="file"
                    id="cover-upload-2"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleCoverUpload(e)}
                  />
                </div>
              )}
            </div>

            {/* Profile Photo and Badge */}
            <div className="flex justify-between items-center mb-6">
              {/* Profile Photo Section */}
              <div className="relative w-[220px] h-[220px] left-[64px] -top-[130px] rounded-full overflow-hidden border-[14px] border-[#FFFFFF] bg-[#F0F7F7] flex flex-col items-center justify-center group">
                {userDetails?.profile_image ? (
                  <>
                    <img
                      src={userDetails?.profile_image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    {/* Buttons on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <label
                        htmlFor="profile-upload"
                        className="bg-[#2DC6BE] text-white py-2 px-4 rounded-lg cursor-pointer"
                        onClick={() =>
                          document.getElementById("profile-upload").click()
                        }
                      >
                        Upload
                      </label>
                      <button
                        type="button"
                        onClick={handleImageRemove}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg"
                      >
                        Remove
                      </button>
                      <input
                        type="file"
                        id="profile-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <img
                      src={Icon}
                      alt="Placeholder"
                      className="w-8 h-8 mb-2"
                    />
                    <button
                      type="button"
                      className="font-inter font-medium text-[16px] text-[#869E9D] cursor-pointer"
                      onClick={() =>
                        document.getElementById("profile-upload-1").click()
                      }
                    >
                      Upload Profile Photo
                    </button>
                    <input
                      type="file"
                      id="profile-upload-1"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                    />
                  </div>
                )}
              </div>

              {/* Badge Selector */}
              <div className="flex justify-center items-center">
                <div className="relative right-[40px] -top-[130px] rounded-full border-[14px] border-[#FFFFFF] bg-[#F0F7F7] px-10 py-4 shadow-sm flex items-center">
                  {/* Dropdown Select */}
                  <select 
                    className="appearance-none bg-transparent text-[#667877] font-medium text-center w-full focus:outline-none cursor-pointer pr-4" 
                    onChange={(e) => handleBadgeSelect(e)}
                    name="badge"
                    value={formData?.badge || ""}
                  >
                    <option
                      className="font-inter font-medium text-[16px] text-[#869E9D]"
                      disabled
                      value=""
                    >
                      Select your Badge
                    </option>
                    <option
                      className="font-inter font-medium text-[16px] text-[#869E9D]"
                      value="Explorer - a person who travels around a place in order to learn about it"
                    >
                      Explorer
                    </option>
                    <option
                      className="font-inter font-medium text-[16px] text-[#869E9D]"
                      value="Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels"
                    >
                      Adventurer
                    </option>
                    <option
                      className="font-inter font-medium text-[16px] text-[#869E9D]"
                      value="Foodie - A foodie is a person who has an ardent or refined interest in food, and who eats food not only out of hunger but also as a hobby."
                    >
                      Foodie
                    </option>
                    <option
                      className="font-inter font-medium text-[16px] text-[#869E9D]"
                      value="Solo Traveler - A solo traveler is someone who travels independently, without friends or companions."
                    >
                      Solo Traveler
                    </option>
                    <option
                      className="font-inter font-medium text-[16px] text-[#869E9D]"
                      value="Luxury Traveler - Luxury travel is a type of leisure tourism that involves high-end accommodations, personalized service, and exclusive experiences"
                    >
                      Luxury Traveler
                    </option>
                  </select>

                  {/* Centered Dropdown Icon */}
                  <svg
                    className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-none font-semibold"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#667877"
                    width="18"
                    height="18"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                  {formDataError.badge && (
                      <p className="error text-left text-[#ff0000] text-sm">
                        {formDataError.badge}
                      </p>
                  )}
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 -mt-32">
              {/* Full Name */}
              <div>
                <label className="text-left font-inter block text-[#000000] mb-1 text-[14px] font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  value={formData?.fullName || ""}
                  placeholder="Your FullName Name"
                  className="rounded-[8px] px-4 py-2 w-full h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F7F7] placeholder:text-[#869E9D] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
                  disabled
                />
                {formDataError.fullName && (
                  <p className="error text-left text-[#ff0000] text-sm">
                    {formDataError.fullName}
                  </p>
                )}
              </div>

              {/* Unique ID */}
              <div>
                <label className="text-left font-inter block text-[#000000] mb-1 text-[14px] font-medium">
                  Unique ID
                </label>
                <input
                  type="text"
                  value={formData?.userName || ""}
                  onChange={handleInputChange}
                  name="userName"
                  placeholder="Your userName Name"
                  className="rounded-[8px] px-4 py-2 w-full h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F7F7] placeholder:text-[#869E9D] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
                  disabled
                />
                {formDataError.userName && (
                  <p className="error text-left text-[#ff0000] text-sm">
                    {formDataError.userName}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="text-left font-inter block text-[#000000] mb-1 text-[14px] font-medium">
                  Gender
                </label>
                <Select
                  id="gender"
                  name="gender"
                  className="dataName"
                  options={genderOption}
                  placeholder="Choose your gender"
                  onChange={(option) => handleSelectChange(option, "gender")}
                  value={genderOption.find(
                    (option) => option.value === formData.gender
                  )}
                  styles={customStyles}
                  classNamePrefix="custom"
                  isSearchable
                />
                {formDataError.gender && (
                  <p className="error text-left text-[#ff0000] text-sm">
                    {formDataError.gender}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="text-left font-inter block text-[#000000] mb-1 text-[14px] font-medium">
                  City
                </label>
                <Select
                  name="city"
                  options={cityOptions}
                  className="dataName"
                  placeholder="Select your city"
                  value={
                    cityOptions.find(
                      (option) => option.value === formData.city
                    ) || formData?.city
                  }
                  styles={customStyles}
                  classNamePrefix="custom"
                  onChange={(option) => handleSelectChange(option, "city")}
                  isSearchable
                />
                {formDataError.city && (
                  <p className="error text-left text-[#ff0000] text-sm">
                    {formDataError.city}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="text-left font-inter block text-[#000000] mb-1 text-[14px] font-medium">
                Description
              </label>
              <textarea
                placeholder="Your Story in 50 words..."
                value={formData?.description || ""}
                onChange={handleInputChange}
                name="description"
                maxLength={300}
                className="rounded-[8px] px-4 py-2 w-full h-[132px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F0F7F7] placeholder:text-[#869E9D] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
              ></textarea>
              {formDataError.description && (
                <p className="error text-left text-[#ff0000] text-sm">
                  {formDataError.description}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="mt-4 w-[234px] h-[53px] bg-[#2DC6BE] text-white py-3 px-4 rounded-[7px] hover:bg-[#2DC6BE] transition text-[16px] font-bold font-poppins"
              onClick={handleSave}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
