import React, { useEffect, useState } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditHeader from './EditHeader';
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, removeProfileImage, updateUserDetails, uploadProfileImage } from '../../redux/slices/authSlice';
import { fetchCities } from '../../redux/slices/stateCitySlice';
import { useNavigate } from 'react-router-dom';
import SuccessError from './SuccessError';

const EditProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [genderData, setGenderData] = useState({
    'male': 'Male',
    'female': 'Female',
    'other': 'Other'
  });
  const [formData, setFormData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    gender: "",
    state: "",
    city: "",
    userName: "",
    description: "",
  });
  const [formDataError, setFormDataError] = useState({});
  const [flashMessage, setFlashMessage] = useState('');
  const [flashMsgType, setFlashMsgType] = useState('');


  const { user: userDetails } = useSelector((state) => state.auth);
  const { cities, states } = useSelector((state) => state.stateCity);

  useEffect(() => {

    if(!userDetails) {
      dispatch(getUserDetails());
    }

    if(cities.length === 0 && userDetails) {
      console.log("running")
      dispatch(fetchCities({ state: userDetails?.state, country: "India" }));
    }

    if(userDetails && !formData.fullName) {
      setFormData({
        fullName: userDetails?.full_name,
        firstName: userDetails?.first_name,
        lastName: userDetails?.last_name,
        gender: userDetails?.gender,
        state: userDetails?.state,
        city: userDetails?.city,
        userName: userDetails?.user_name,
        description: userDetails?.description,
      })
      console.log("yes working")
    }
  }, [dispatch, userDetails,cities]);


  // check for input validations
  const validate = () => {
    let formErrors = {};

      // First Name validation
      if (!formData.firstName.trim()) {
        formErrors.firstName = "*First name is required";
      }

      // Last Name validation
      if (!formData.lastName.trim()) {
        formErrors.lastName = "*Last name is required";
      }

      // City validation
      if (!formData.city.trim()) {
        formErrors.city = "*City is required";
      }

      // Gender validation
      if (!formData.gender.trim()) {
        formErrors.gender = "*Gender is required";
      }

      // description validation
      if (!formData.description.trim()) {
        formErrors.description = "*Description is required";
      }

      setFormDataError(formErrors);
      return Object.keys(formErrors).length === 0;

  };


  // const handleImageUpload = async(e) => {
  //   const file = e.target.files[0];
  //   console.log("========file======>", file);
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   const uploadImageResult = await dispatch(uploadProfileImage(formData)).unwrap();
  //   console.log("=======uploadImageResult====>", uploadImageResult);
  //   // if (file) {
  //   //   const reader = new FileReader();
  //   //   reader.onload =async (event) => {
  //   //     // Update the userDetails profile_image
  //   //     // setUserDetails((prevDetails) => ({
  //   //     //   ...prevDetails,
  //   //     //   profile_image: event.target.result,
  //   //     // }));
  //   //     const uploadImageResult = await dispatch(uploadProfileImage(file)).unwrap();
  //   //    console.log("=======uploadImageResult====>", uploadImageResult);
  //   //   };
  //   //   reader.readAsDataURL(file);
  //   // }
  // };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log("=====file===>", file);
  
    // Create FormData and append the file
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const uploadImageResult = await dispatch(uploadProfileImage(formData)).unwrap();
      console.log("Upload successful:", uploadImageResult);
    } catch (error) {
      console.log("Upload failed:", error);
    }
  };

  const genderOption = Object.keys(genderData).map((genderName) => ({
    value: genderName,
    label: genderName.charAt(0).toUpperCase() + genderName.slice(1)
  }));

  const cityOptions = 
  // userDetails ? 
  cities
        .map((cityName) => ({
          value: cityName,
          label: cityName,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
    // : [];


  // handle change on city and state select
  const handleSelectChange = async(selectedOption, name) => {

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
    // console.table({
    //   name: name,
    //   value: value,
    // });
  
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
}


  const handleSave = async() => {

    const isValid = await validate();
    console.log("=====formData====>", formData);

    if(isValid) {
      try {
        const token = localStorage.getItem('token');
        if(!token) {
          navigate('/login');
          return;
        }

        const updateResult = await dispatch(updateUserDetails(formData)).unwrap();
        console.log("updateResult", updateResult);
        
      } catch (error) {
        console.log("error in catch part of handle save", error);
      }
    } else {
      console.log("all fields are required");
      alert("all fields are required")
    }

  }

  const handleImageRemove = async() => {
    // setImageSrc(null); // Reset the uploaded image
    try {
      const removePic = await dispatch(removeProfileImage()).unwrap();
      if(removePic) {
        handleFlashMessage(removePic.message, 'success');
        await dispatch(getUserDetails());
      }
    } catch (error) {
      console.log("error in removing profile image", error);
      const errorMessage = error.error || 'Unexpected error occured';
      handleFlashMessage(errorMessage, 'error');
    }
  };

  

  return (
    <>
      {flashMessage && <SuccessError message={flashMessage} messageType={flashMsgType}/>}
      <EditHeader />
      {/* Main Wrapper with Gradient Background */}
      <div className="bg-gradient-to-b from-teal-50 to-teal-200 min-h-screen">
        {/* Centered Heading */}
        <h2 className="p-8 text-2xl font-bold text-black-400 text-center">
          Profile Setup
        </h2>

        <div className="flex items-center justify-center">
          <div className="bg-white w-full max-w-[97%] shadow-[0_4px_10px_rgba(0,0,0,0.25)] rounded-lg relative mb-6">
            {/* Cover Photo Upload */}
            <div className="relative bg-gray-100 border-0 border-dashed border-gray-300 rounded-lg h-[515px] flex justify-center items-center w-full">
              
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                {userDetails?.cover_image ? (
                  <>
                    <div className="flex items-center justify-center gap-x-2">
                      {" "}
                      {/* Use gap-x-2 for horizontal spacing */}
                      <img src={userDetails.cover_image} />
                      <button className="">Upload Cover Photo</button>
                      <input id="" type="" accept="" className="hidden" />
                      <button className="">Delete</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 text-xl mb-2">
                      <AttachFileIcon className="mr-2" /> Upload Cover Photo
                      (optional)
                    </p>
                  </>
                )}
              </div>

               {/* Profile Photo and Badge Overlap */}
               <div className="absolute bottom-[-90px] left-16 bg-gray-100 border-2 border-gray-300 rounded-full h-56 w-56 flex justify-center items-center overflow-hidden group">
                {/* Image or Default Placeholder */}
                <label
                  htmlFor="profile-upload"
                  className="relative w-full h-full cursor-pointer flex justify-center items-center"
                >
                  {userDetails?.profile_image ? (
                    <div>
                      <img
                        src={userDetails?.profile_image}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                      {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity duration-300">
                        <button
                          className="bg-[#2DC6BE] text-white py-1 px-3 mb-2 rounded-full"
                          onClick={() =>
                            document.getElementById("profile-upload").click()
                          }
                        >
                          Upload
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded-full"
                          onClick={handleImageRemove}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-full text-gray-500">
                      <AttachFileIcon className="mr-2" />
                      <p>Upload Profile Photo</p>
                    </div>
                  )}

                </label>

                {/* Hidden File Input */}
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              {/* <div className="absolute bottom-[-90px] left-16 bg-gray-100 border-2 border-gray-300 rounded-full h-56 w-56 flex justify-center items-center relative group">
                  {userDetails && (
                    <img
                      src={userDetails.profile_image}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-gray-800 bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 cursor-pointer">
                    <AttachFileIcon className="text-white mb-2" />
                    <p className="text-white">Upload Profile Photo</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleImageUpload(e)}
                    />
                  </div>
                </div> */}


              <button className="absolute bottom-[-20px] right-8 bg-[#2DC6BE] text-white py-2 px-10 rounded-md">
                Add Badge*
              </button>
            </div>

            {/* Form Section */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 p-12">
              <div>
                <label className="block text-gray-600 text-base font-medium mb-2 float-left">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData?.firstName || ''}
                  name='firstName'
                  onChange={handleInputChange}
                  placeholder="Your First Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DC6BE] bg-gray-100 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-base font-medium mb-2 float-left">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData?.lastName || ''}
                  onChange={handleInputChange}
                  name='lastName'
                  placeholder="Your Last Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DC6BE] bg-gray-100 text-gray-500"
                />
              </div>
              <div>
                {/* <label className="block text-gray-600 text-base font-medium mb-2 float-left">
                  Gender
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DC6BE] bg-gray-100 text-gray-500">
                  <option>Your Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select> */}
                <Select
                    id="gender"
                    name="gender"
                    options={genderOption}
                    placeholder="Select Gender"
                    value={genderOption.find(
                      (option) => option.value === formData.gender
                    )}
                    onChange={(option) => handleSelectChange(option, "gender")}
                    // className="appearance-none bg-white text-[#364045] w-full p-2 border border-[#2DC6BE] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    className="appearance-none bg-white text-[#364045] w-full p-[2px] border border-[#2DC6BE] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:font-poppins placeholder:text-customBlack"                   
                    isSearchable
                  />
              </div>
              <div>
                {/* <label className="block text-gray-600 text-base font-medium mb-2 float-left">
                  City
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DC6BE] bg-gray-100 text-gray-500">
                  <option>Select City</option>
                  <option>Indore</option>
                  <option>Ratlam</option>
                  <option>Ujjain</option>
                </select> */}
                <Select
                  name="city"
                  options={cityOptions}
                  placeholder="Select City"
                  value={
                    cityOptions.find(
                      (option) => option.value === formData.city
                    ) || formData?.city
                  }
                  onChange={(option) => handleSelectChange(option, "city")}
                  isSearchable
                  isDisabled={!formData?.city}
                  className="appearance-none bg-white text-[#364045] w-full p-[2px] border border-[#2DC6BE] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:font-poppins placeholder:text-customBlack"
                  // className="appearance-none bg-white text-[#364045] w-full p-2 border border-[#2DC6BE] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <div className="mb-4 p-6">
              <label className="block text-gray-600 text-base font-medium mb-2 float-left">
                Description
              </label>
              <textarea
                placeholder="Your Story in 50 words..."
                value={formData?.description || ''}
                rows="3"
                onChange={handleInputChange}
                name="description"
                className="bg-gray-100 text-gray-500 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DC6BE]"
              ></textarea>
            </div>
            <button type='button' onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default EditProfile
