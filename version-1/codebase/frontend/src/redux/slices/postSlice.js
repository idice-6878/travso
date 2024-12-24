import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_URL;


// Thunk for getAllPosts details
export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/allposts`, {
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
      // console.log("=====data===in getAllPosts=>", data);
      return data;
    } catch (error) {
      console.log("error in getAllPosts call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for commentOnPost details
export const commentOnPost = createAsyncThunk(
  'post/commentOnPost',
  async (commentData,{ rejectWithValue }) => {
    console.log("=====commentData====>", commentData);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/comment-on-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(commentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in commentOnPost=>", data);
      return data;
    } catch (error) {
      console.log("error in commentOnPost call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for LikeUnlikePost details
export const LikeUnlikePost = createAsyncThunk(
  'post/LikeUnlikePost',
  async ({post_id},{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/like-unlike-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({post_id})
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in LikeUnlikePost=>", data);
      return data;
    } catch (error) {
      console.log("error in LikeUnlikePost call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for getAllPosts details
export const getCommentOnPost = createAsyncThunk(
  'post/getCommentOnPost',
  async (postId,{ rejectWithValue }) => {
    try {
      // console.log("====postId===")
    //   const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/comments/${postId}`, {
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

      // console.log("=====data===in getCommentOnPost=>", data);
      return data;
    } catch (error) {
      console.log("error in getCommentOnPost call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for likeAnyComment details
export const likeAnyComment = createAsyncThunk(
  'auth/likeAnyComment',
  async (commentId,{ rejectWithValue }) => {
    try {
      console.log("======commentId======",commentId);
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/like-a-comment/${commentId}`, {
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
      console.log("=====data===in likeAnyComment===>", data);
      return data;
    } catch (error) {
      console.log("error in likeAnyComment call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for commentOnReply details
export const commentOnReply = createAsyncThunk(
  'post/commentOnReply',
  async (replyData,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/reply-on-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(replyData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("=====data===in commentOnReply===>", data);
      return data;
    } catch (error) {
      console.log("error in commentOnReply call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for commitPost details
export const commitPost = createAsyncThunk(
  'post/commitPost',
  async (postData,{ rejectWithValue }) => {
    try {
  
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/commit-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in commentOnReply===>", data);
      return data;
    } catch (error) {
      console.log("error in commentOnReply call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for deleteComment details(user can delete comment on it's post)
export const deleteCommentByPostOwner = createAsyncThunk(
  'post/deleteCommentByPostOwner',
  async (commentId,{ rejectWithValue }) => {
    try {
      console.log("======commentId======",commentId);
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/owner-delete-comment/${commentId}`, {
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
      // console.log("=====data===in deleteCommentByPostOwner===>", data);
      return data;
    } catch (error) {
      console.log("error in deleteCommentByPostOwner call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleteComment details(user can delete comment on it's post)
export const deleteReplyByPostOwner = createAsyncThunk(
  'post/deleteReplyByPostOwner',
  async (replyId,{ rejectWithValue }) => {
    try {
      console.log("======commentId======",replyId);
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/owner-delete-reply/${replyId}`, {
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
      console.log("=====data===in deleteReplyByPostOwner===>", data);
      return data;
    } catch (error) {
      console.log("error in deleteReplyByPostOwner call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for followUnfollow details
export const followUnfollow = createAsyncThunk(
  'post/followUnfollow',
  async (followeeId,{ rejectWithValue }) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/follow-unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 'follwee_id': followeeId})
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in followUnfollow===>", data);
      return data;
    } catch (error) {
      console.log("error in followUnfollow call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for likeUnlikeAnyReply details
export const likeUnlikeAnyReply = createAsyncThunk(
  'post/likeUnlikeAnyReply',
  async (replyId,{ rejectWithValue }) => {
    try {
      console.log("======replyId======",replyId);
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/like-unlike-reply/${replyId}`, {
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
      // console.log("=====data===in likeUnlikeAnyReply===>", data);
      return data;
    } catch (error) {
      console.log("error in likeUnlikeAnyReply call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for SharePostWithFriends details
export const SharePostWithFriends = createAsyncThunk(
  'post/SharePostWithFriends',
  async (shareData,{ rejectWithValue }) => {
    try {
  
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/share-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(shareData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in SharePostWithFriends===>", data);
      return data;
    } catch (error) {
      console.log("error in SharePostWithFriends call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for followUnfollowOnFollowing details
export const followUnfollowOnFollowing = createAsyncThunk(
  'post/followUnfollowOnFollowing',
  async (followeeId,{ rejectWithValue }) => {
    try {
      
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/follow-unfollow-following`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 'follwee_id': followeeId})
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in followUnfollowOnFollowing===>", data);
      return data;
    } catch (error) {
      console.log("error in followUnfollowOnFollowing call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for getSharePostData details
export const getSharePostData = createAsyncThunk(
  'post/getSharePostData',
  async ({userName, postId},{ rejectWithValue }) => {

    try {
      const response = await fetch(`${apiUrl}/post/post-data/${postId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in getSharePostData===>", data);
      return data;
    } catch (error) {
      console.log("error in getSharePostData call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for getActiveStories details
export const getActiveStories = createAsyncThunk(
  'post/getActiveStories',
  async (_,{ rejectWithValue }) => {

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/stories`, {
        method: 'GET',
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
      // console.log("=====data===in getActiveStories===>", data);
      return data;
    } catch (error) {
      console.log("error in getActiveStories call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for likeUnlikeStory details
export const likeUnlikeStory = createAsyncThunk(
  'post/likeUnlikeStory',
  async ({story_id},{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/like-unlike-story`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({story_id})
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in likeUnlikeStory=>", data);
      return data;
    } catch (error) {
      console.log("error in likeUnlikeStory call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for commentOnStory details
export const commentOnStory = createAsyncThunk(
  'post/commentOnStory',
  async (commentData,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/comment-on-story`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(commentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in commentOnStory===>", data);
      return data;
    } catch (error) {
      console.log("error in commentOnStory call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for createStory details
export const createStory = createAsyncThunk(
  'post/createStory',
  async (storyData,{ rejectWithValue }) => {
    try {
  
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/create-story`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(storyData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in createStory===>", data);
      return data;
    } catch (error) {
      console.log("error in createStory call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for ShareStoryWithFriends details
export const ShareStoryWithFriends = createAsyncThunk(
  'post/ShareStoryWithFriends',
  async (shareData,{ rejectWithValue }) => {
    try {
  
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/share-story`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(shareData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      // console.log("=====data===in ShareStoryWithFriends===>", data);
      return data;
    } catch (error) {
      console.log("error in ShareStoryWithFriends call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for addCountOnStoryView details
export const addCountOnStoryView = createAsyncThunk(
  'post/addCountOnStoryView',
  async (storyId,{ rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/story-view-count/${storyId}`, {
        method: 'POST',
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
      // console.log("=====data===in addCountOnStoryView=>", data);
      return data;
    } catch (error) {
      console.log("error in addCountOnStoryView call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleteStory details(user can delete comment on it's post)
export const deleteStory = createAsyncThunk(
  'post/deleteStory',
  async (storyID,{ rejectWithValue }) => {
    try {
      console.log("======storyID======",storyID);
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/post/delete-story/${storyID}`, {
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
      console.log("=====data===in deleteStory===>", data);
      return data;
    } catch (error) {
      console.log("error in deleteStory call thunk", error.message)
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    loading: false,
    error: null,
    allPosts: null,
    postComment: null,
    sharedPostData: null,
    activeStories: null
  },
  reducers: {
    resetPostsState: (state) => {
      state.postComment = null;
      state.loading = false;
      state.error = null;
      state.sharedPostData = null;
    },
   },
  extraReducers: (builder) => {
    builder
      // Handle getAllPosts
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload.data;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle commentOnPost
      .addCase(commentOnPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(commentOnPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle LikeUnlikePost
      .addCase(LikeUnlikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LikeUnlikePost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(LikeUnlikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getCommentOnPost
      .addCase(getCommentOnPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentOnPost.fulfilled, (state, action) => {
        state.loading = false;
        state.postComment = action.payload.data;
      })
      .addCase(getCommentOnPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle likeAnyComment
      .addCase(likeAnyComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeAnyComment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(likeAnyComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle commentOnReply
      .addCase(commentOnReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentOnReply.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(commentOnReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle commitPost
      .addCase(commitPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commitPost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(commitPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteCommentByPostOwner
      .addCase(deleteCommentByPostOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommentByPostOwner.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCommentByPostOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteReplyByPostOwner
      .addCase(deleteReplyByPostOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReplyByPostOwner.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteReplyByPostOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle followUnfollow
      .addCase(followUnfollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUnfollow.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(followUnfollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle followUnfollow
      .addCase(followUnfollowOnFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUnfollowOnFollowing.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(followUnfollowOnFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle SharePostWithFriends
      .addCase(SharePostWithFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SharePostWithFriends.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(SharePostWithFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle SharePostWithFriends
      .addCase(getSharePostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSharePostData.fulfilled, (state, action) => {
        state.loading = false;
        state.sharedPostData = action.payload.data;
      })
      .addCase(getSharePostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getActiveStories
      .addCase(getActiveStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveStories.fulfilled, (state, action) => {
        state.loading = false;
        state.activeStories = action.payload.data;
      })
      .addCase(getActiveStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle likeUnlikeStory
      .addCase(likeUnlikeStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeUnlikeStory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(likeUnlikeStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle commentOnStory
      .addCase(commentOnStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentOnStory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(commentOnStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createStory
      .addCase(createStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle ShareStoryWithFriends
      .addCase(ShareStoryWithFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ShareStoryWithFriends.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(ShareStoryWithFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle addCountOnStoryView
      .addCase(addCountOnStoryView.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCountOnStoryView.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addCountOnStoryView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleteStory
      .addCase(deleteStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetPostsState } = postSlice.actions;
export default postSlice.reducer;
