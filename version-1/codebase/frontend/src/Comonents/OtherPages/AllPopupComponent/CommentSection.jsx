/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";


const CommentSection = ({ postComment, getTimeDifferenceFromNow }) => {
  // State to manage replies visibility for each comment
  const [visibleReplies, setVisibleReplies] = useState({});

  const handleViewMoreReplies = (postId, totalReplies) => {
    setVisibleReplies((prev) => {
      const currentCount = prev[postId] || 2;
      return {
        ...prev,
        [postId]: Math.min(currentCount + 5, totalReplies),
      };
    });
  };

  return (
    <div>
      {postComment &&
        postComment.map((userPosts, index) => {
          const totalReplies = userPosts?.replies?.length || 0;
          const visibleCount = visibleReplies[userPosts.id] || 2;
          const repliesToShow = userPosts.replies.slice(0, visibleCount);

          return (
            <div key={index} className="mt-6">
              {/* Parent Comment */}
              <div className="flex items-start space-x-3 rounded-md">
                <img
                  src={userPosts?.profile_image || dummyUserImage}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div className="w-full flex flex-col space-y-2">
                  <div className="flex flex-col bg-[#EEF0F29C] p-2 rounded-[12px] w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[16px] text-[#212626]">
                        {userPosts?.user_name || userPosts?.full_name}
                      </p>
                      <span className="text-[16px] text-[#667877]">
                        {getTimeDifferenceFromNow(userPosts?.created_at)} ago
                      </span>
                    </div>
                    <p className="font-normal text-[14px] text-[#212626]">
                      {userPosts?.content}
                    </p>
                  </div>

                  {/* Replies */}
                  {repliesToShow.map((userReply, replyIndex) => (
                    <div key={userReply?.reply_id} className="mt-4 ml-8">
                      <div className="flex items-start">
                        <img
                          src={userReply?.reply_user_profile_image || dummyUserImage}
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="w-full flex flex-col space-y-2">
                          <div className="flex flex-col bg-[#EEF0F29C] p-2 rounded-[12px] w-full">
                            <p className="font-medium text-[16px] text-[#212626]">
                              {userReply?.reply_user_full_name}
                            </p>
                            <span className="text-[16px] text-[#667877]">
                              {getTimeDifferenceFromNow(userReply?.reply_created_at)} ago
                            </span>
                            <p className="font-normal text-[14px] text-[#212626]">
                              {userReply?.reply_content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* View More Replies Button */}
                  {totalReplies > visibleCount && (
                    <button
                      onClick={() => handleViewMoreReplies(userPosts.id, totalReplies)}
                      className="text-blue-500 text-sm mt-2"
                    >
                      View {Math.min(totalReplies - visibleCount, 5)} more replies
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CommentSection;
