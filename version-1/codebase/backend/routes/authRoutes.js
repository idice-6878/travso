const express = require("express");
const router = express.Router();
const { registerUser, sendOTP, verifyOTP, finalSignUp, resendOTP, getFollowersCount, loginUser, sendEmailOTP, sendOTPForgotPassword, forgotPassVerify, updatePassword, getUserBuddies, getUserFollower, getUserDetails, updateUser, toWhomUserFollows, insertProfileImage, removeProfileImage, getallUsers, removeCoverImage, uploadCoverImage, logOut, addSearch, updateFollowSelect, onlineFriends, addBuddies, removeBuddy, blockAccount, suggestions, validateToken } = require('../controllers/authController');
const verifyToken = require("../utils/verifyToken");

router.post('/signup', registerUser);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/final-signup', finalSignUp);
router.post('/resend-otp', resendOTP);
router.post('/followers-count', getFollowersCount);
router.post('/login', loginUser);
router.post('/email-otp', sendEmailOTP);    // for forgot password email otp
router.post('/mobile-otp', sendOTPForgotPassword);    // for forgot password mobile otp
router.post('/fp-otp-verify', forgotPassVerify);    // for forgot password verify otp
router.post('/update-password', updatePassword);    // for forgot password
router.get("/get-buddies",verifyToken, getUserBuddies);
router.get("/get-followers",verifyToken, getUserFollower);
router.get("/user-following",verifyToken, toWhomUserFollows);
// router.get("/profile/:userId", getUserDetails);
router.get("/profile", verifyToken, getUserDetails);     // will be using with frontend
router.post("/update-user", verifyToken, updateUser);     // will be using with frontend
// router.post("/profile-img-upload/:userId", insertProfileImage);    
router.post("/profile-img-upload", verifyToken, insertProfileImage);     // will be using with frontend
router.post("/cover-img-upload", verifyToken, uploadCoverImage);     // will be using with frontend
router.get("/remove-profile-img", verifyToken, removeProfileImage);     // will be using with frontend
router.get("/remove-cover-img", verifyToken, removeCoverImage);     // will be using with frontend
router.get("/get-all-users", getallUsers);
router.get("/logout",verifyToken, logOut);
router.post("/add-search",verifyToken, addSearch);
router.post("/update-follow-select",verifyToken, updateFollowSelect);
router.get("/online-friends",verifyToken, onlineFriends);
router.post("/add-buddy",verifyToken, addBuddies);
router.post("/remove-buddy/:buddies_id",verifyToken, removeBuddy);
router.post("/block-account/:block_id",verifyToken, blockAccount);
router.get("/get-suggestions",verifyToken, suggestions);
router.post("/validate-token", validateToken);

module.exports = router;