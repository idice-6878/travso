import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Comonents/MainPages/HomePage';
import LoginPage from './Comonents/MainPages/LoginPage';
import SignupPage from './Comonents/MainPages/SignupPage';
import InfluencerPage from './Comonents/MainPages/SignUpForms/InfluencerPage';
import AlmostPage from './Comonents/MainPages/SignUpForms/AlmostPage';
import ProfilePage from './Comonents/OtherPages/ProfilePage';
import EditProfile from './Comonents/OtherPages/EditProfile';
import ProtectedRoute from './Comonents/OtherPages/ProtectedRoute';
import SuggestionPage from './Comonents/OtherPages/SuggestionPage';
import CommunityPage from './Comonents/OtherPages/CommunityPage';
import ChatPage from './Comonents/OtherPages/ChatModule/ChatPage';
import BucketList from './Comonents/OtherPages/BucketList';
import BuddiesPage from "./Comonents/OtherPages/BuddiesPage";
import FollowersPage from "./Comonents/OtherPages/FollowersPage";
import FollowingPage from "./Comonents/OtherPages/FollowingPage";
import PostDataDetailPage from "./Comonents/OtherPages/PostDataDetailPage";
import ShowSharedPost from './Comonents/OtherPages/ShowSharedPost';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/influencer" element={<InfluencerPage />} />
        <Route path="/almostthere" element={<AlmostPage />} />
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/profile" element={<ProfilePage />} />
        {/* </Route> */}
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/suggestion" element={<SuggestionPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/bucketlist" element={<BucketList />} />
        <Route path="/buddiespage" element={<BuddiesPage />} />
        <Route path="/followers" element={<FollowersPage />} />
        <Route path="/following" element={<FollowingPage />} />
        <Route path="/PostData" element={<PostDataDetailPage />} />
        {/* <Route path={`/:Krishna005/14`} element={<ShowSharedPost />} /> */}
        <Route path="/:userName/:postId" element={<ShowSharedPost />} />
      </Routes>
    </Router>
  );
}

export default App;
