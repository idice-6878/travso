import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_URL;
// Thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    console.log("apiUrl", apiUrl)
    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("===data===>", data);
      return data;
    } catch (error) {
      console.log("error in signup api call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for OTP generation
// export const generateOtp = createAsyncThunk(
//   'auth/generateOtp',
//   async ({ mobileNumber, action = 'generate' }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${apiUrl}/send-otp`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobileNumber, action }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         return rejectWithValue(errorData);
//       }

//       const otpData = await response.json();
//       return otpData;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const generateOtp = createAsyncThunk(
  'auth/generateOtp',
  async ({ mobileNumber }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const otpData = await response.json();
      console.log("======otpData===generate=>", otpData);
      return otpData;
    } catch (error) {
      console.log("error in otp generate api call thunk", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ mobileNumber, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber,
          otp
        }),
      });

      const data = await response.json();

      console.log("data in verify otp", data);
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      console.log("error in verify otp api call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for resend OTP
export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async ({ email, mobileNumber }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mobileNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const otpData = await response.json();
      console.log("======otpData===resend=>", otpData);
      return otpData;
    } catch (error) {
      console.log("error in otp resend api call thunk", error.message);
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for final registration
export const finalSignup = createAsyncThunk(
  'auth/finalSignUp',
  async (formData, { rejectWithValue }) => {
    console.log("apiUrl", apiUrl)
    try {
      const response = await fetch(`${apiUrl}/auth/final-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("===data==in final signup=>", data);
      return data;
    } catch (error) {
      console.log("error in final signup api call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for social media link
export const setInfluencerType = createAsyncThunk(
  'auth/setInfluencerType',
  async ({smlink1, email, mobileNumber}, { rejectWithValue }) => {
    console.log("apiUrl", apiUrl)
    try {
      const response = await fetch(`${apiUrl}/auth/followers-count`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ smlink1, email, mobileNumber}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("===data==in followers-count ===>", data);
      return data;
    } catch (error) {
      console.log("error in followers-count call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
)

// Thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("===data==in login user ===>", data);
      return data;
    } catch (error) {
      console.log("error in login user call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
)

// Thunk for email otp
export const getEmailOTP = createAsyncThunk(
  'auth/getEmailOTP',
  async (formData, { rejectWithValue }) => {
    console.log("apiUrl", apiUrl)
    try {
      const response = await fetch(`${apiUrl}/auth/email-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("===data==in login user ===>", data);
      return data;
    } catch (error) {
      console.log("error in login user call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
)

// Thunk for forgot password mobile otp
export const getMobileOTPForgotPass = createAsyncThunk(
  'auth/getMobileOTPForgotPass',
  async (formData, { rejectWithValue }) => {
    console.log("apiUrl", apiUrl)
    try {
      const response = await fetch(`${apiUrl}/auth/mobile-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("===data==in login user ===>", data);
      return data;
    } catch (error) {
      console.log("error in login user call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
)

// Thunk for forgot password mobile otp
export const verifyForgotPassOTP = createAsyncThunk(
  'auth/verifyForgotPassOTP',
  async ({email=null, mobileNumber=null, userName=null, otp=null}, { rejectWithValue }) => {
    console.log("===mobileNumber====>", mobileNumber)
    try {
      const response = await fetch(`${apiUrl}/auth/fp-otp-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,mobileNumber,userName,otp}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("===data==in login user ===>", data);
      return data;
    } catch (error) {
      console.log("error in login user call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
)

// Thunk for forgot password update password
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({email=null, mobileNumber=null, userName=null, password=null}, { rejectWithValue }) => {
    console.log("===mobileNumber====>", mobileNumber)
    try {
      const response = await fetch(`${apiUrl}/auth/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,mobileNumber,userName,password}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("===data==in login user ===>", data);
      return data;
    } catch (error) {
      console.log("error in login user call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for getUserBuddies
export const getUserBuddies = createAsyncThunk(
  'auth/getUserBuddies',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/get-buddies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in getBuddies=>", data)
      return data;
    } catch (error) {
      console.log("error in getUserBuddies call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for getUserFollowers
export const getUserFollowers = createAsyncThunk(
  'auth/getUserFollowers',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/get-followers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in getUserFollowers=>", data)
      return data;
    } catch (error) {
      console.log("error in getUserFollowers call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for getUserFollowers
export const toWhomUserIsFollowing = createAsyncThunk(
  'auth/toWhomUserIsFollowing',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/user-following`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in toWhomUserIsFollowing=>", data)
      return data;
    } catch (error) {
      console.log("error in toWhomUserIsFollowing call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for getUserData
export const getUserDetails = createAsyncThunk(
  'auth/getUserDetails',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in getUserDetails=>", data)
      return data;
    } catch (error) {
      console.log("error in getUserDetails call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for updateUser details
export const updateUserDetails = createAsyncThunk(
  'auth/updateUserDetails',
  async (formData,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/update-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in updateUserDetails=>", data)
      return data;
    } catch (error) {
      console.log("error in updateUserDetails call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for getUserPosts details
export const getUserPosts = createAsyncThunk(
  'auth/getUserPosts',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/userpost`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in getUserPosts=>", data);
      return data;
    } catch (error) {
      console.log("error in getUserPosts call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for removeProfileImage details
export const removeProfileImage = createAsyncThunk(
  'auth/removeProfileImage',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/remove-profile-img`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in removeProfileImage=>", data);
      return data;
    } catch (error) {
      console.log("error in removeProfileImage call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for removeProfileImage details
export const uploadProfileImage = createAsyncThunk(
  'auth/uploadProfileImage',
  async (imageData, { rejectWithValue }) => {
    // console.log("=======imageData======>", imageData);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/profile-img-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for getAllUsers details
export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async (_,{ rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/get-all-users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in getAllUsers=>", data);
      return data;
    } catch (error) {
      console.log("error in getAllUsers call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for removeCoverImage details
export const removeCoverImage = createAsyncThunk(
  'auth/removeCoverImage',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/remove-cover-img`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in removeCoverImage=>", data);
      return data;
    } catch (error) {
      console.log("error in removeCoverImage call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for uploadCoverImage details
export const uploadCoverImage = createAsyncThunk(
  'auth/uploadCoverImage',
  async (imageData, { rejectWithValue }) => {
    // console.log("=======imageData======>", imageData);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/cover-img-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging out
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      localStorage.removeItem('token'); // Remove token from localStorage
      return true;
    } else {
      return thunkAPI.rejectWithValue('Logout failed');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


// Thunk for getOnlineFriends details
export const getOnlineFriends = createAsyncThunk(
  'auth/getOnlineFriends',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/auth/online-friends`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in getOnlineFriends=>", data);
      return data;
    } catch (error) {
      console.log("error in getOnlineFriends call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for getSuggestionList details
export const getSuggestionList = createAsyncThunk(
  'auth/getSuggestionList',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/auth/get-suggestions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in getSuggestionList=>", data);
      return data;
    } catch (error) {
      console.log("error in getSuggestionList call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updateSelectFollow details
export const updateSelectFollow =  createAsyncThunk(
  'auth/updateSelectFollow',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/update-follow-select`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in updateSelectFollow=>", data);
      return data;
    } catch (error) {
      console.log("error in updateSelectFollow call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for addBuddy 
export const addBuddy = createAsyncThunk(
  'auth/addBuddy',
  async (buddyId,{ rejectWithValue }) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/add-buddy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 'buddies_id': buddyId})
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in addBuddy===>", data);
      return data;
    } catch (error) {
      console.log("error in addBuddy call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for removeBuddy 
export const removeBuddy = createAsyncThunk(
  'auth/removeBuddy',
  async (buddyId,{ rejectWithValue }) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/remove-buddy/${buddyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in removeBuddy===>", data);
      return data;
    } catch (error) {
      console.log("error in removeBuddy call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for blockAccount 
export const blockAccount = createAsyncThunk(
  'auth/BlockAccount',
  async (blockId,{ rejectWithValue }) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/auth/block-account/${blockId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in BlockAccount===>", data);
      return data;
    } catch (error) {
      console.log("error in BlockAccount call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);




const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    otpData: null,
    verifyOtpData: null,
    loading: false,
    error: null,
    setInfluencer: null,
    token: null,
    updatePass: null,
    userBuddies: null,
    userPosts: null,
    userFollowers: null,
    toWhomUserFollows: null,
    allUsers: null,
    onlineFriends: null,
    suggestionList: null
  },
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.otpData = null;
      state.verifyOtpData = null;
      state.loading = false;
      state.error = null;
      state.token = null;
      state.userBuddies = null;
      state.userFollowers = null;
      state.toWhomUserFollows = null;
      state.onlineFriends = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle generateOtp
      .addCase(generateOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpData = action.payload;
      })
      .addCase(generateOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyOtpData = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle finalSIgnup
      .addCase(finalSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finalSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(finalSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // handle resend otp
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpData = action.payload;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // handle setInfluencerType
      .addCase(setInfluencerType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setInfluencerType.fulfilled, (state, action) => {
        state.loading = false;
        state.setInfluencer = action.payload
      })
      .addCase(setInfluencerType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getEmailOTP
      .addCase(getEmailOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmailOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpData = action.payload;
      })
      .addCase(getEmailOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getMobileOTPForgotPass
      .addCase(getMobileOTPForgotPass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMobileOTPForgotPass.fulfilled, (state, action) => {
        state.loading = false;
        state.otpData = action.payload;
      })
      .addCase(getMobileOTPForgotPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle verifyOtp for forgot password
      .addCase(verifyForgotPassOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyForgotPassOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyOtpData = action.payload;
      })
      .addCase(verifyForgotPassOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle update password for forgot password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.updatePass = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getUserBuddies
      .addCase(getUserBuddies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBuddies.fulfilled, (state, action) => {
        state.loading = false;
        state.userBuddies = action.payload.data;
      })
      .addCase(getUserBuddies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getUserDetails
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getUserPosts
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload.data;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getUserFollowers
      .addCase(getUserFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.userFollowers = action.payload.data;
      })
      .addCase(getUserFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle toWhomUserIsFollowing
      .addCase(toWhomUserIsFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toWhomUserIsFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.toWhomUserFollows = action.payload.data;
      })
      .addCase(toWhomUserIsFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle removeProfileImage
      .addCase(removeProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProfileImage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle uploadProfileImage
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.data
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle removeCoverImage
      .addCase(removeCoverImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCoverImage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle uploadCoverImage
      .addCase(uploadCoverImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCoverImage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // handle logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // handle updateSelectFollow
      .addCase(updateSelectFollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSelectFollow.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSelectFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getOnlineFriends
      .addCase(getOnlineFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOnlineFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.onlineFriends = action.payload.data;
      })
      .addCase(getOnlineFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getOnlineFriends
      .addCase(getSuggestionList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuggestionList.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestionList = action.payload.data;
      })
      .addCase(getSuggestionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addBuddy
      .addCase(addBuddy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBuddy.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addBuddy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle removeBuddy
      .addCase(removeBuddy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBuddy.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeBuddy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle blockAccount
      .addCase(blockAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockAccount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(blockAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
