const pool = require("../utils/db");
const path = require("path");
const fs = require("fs");

const POST_UPLOAD_DIR = path.join(__dirname, "../uploads/post_img");
const STORY_UPLOAD_DIR = path.join(__dirname, "../uploads/story_img");

async function allPosts(req , res){
  try {
         const [allpost] = await pool.execute(
             "SELECT * FROM posts WHERE status = 'active'",
         );

         console.log("===allpost===>", allpost)
         return res.status(200).json({
            message: "All Posts data",
            data : allpost
         });
    
  } catch (error) {
    console.log("Error in all post.", error)
    return res.status(500).json({
        error: "Internal server Error"
    })
  }
    
}

// get all post of user buddies, followers and public posts
async function communityPagePosts(req, res) {
  try {
    // const { userId } = req.params; // Assuming the user ID is passed as a URL parameter
    const userId = req.user.userId;
    const [data] = await pool.execute(
      `SELECT DISTINCT
        p.id,
        p.user_id,
        p.is_public,
        p.description,
        p.buddies_id,
        p.tag_id,
        p.location,
        p.media_url,
        p.status,
        p.block_post,
        u.full_name,
        u.user_name,
        u.profile_image,
        u.badge,
        p.created_at AS post_created_at,
        p.updated_at AS post_updated_at,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS total_likes,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS total_comments,
        (SELECT COUNT(*) FROM shared_post sp WHERE sp.post_id = p.id) AS total_shared,
        (SELECT COUNT(*) FROM bucket_list bl WHERE bl.post_id = p.id) AS total_buckets,
        EXISTS (SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = ?) AS is_liked
      FROM 
        posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN buddies b ON b.buddies_id = p.user_id
      LEFT JOIN followers f ON f.followee_id = p.user_id
      WHERE 
        p.status = 'active' 
        AND (p.is_public = 1 
          OR f.follower_id = ? 
          OR b.user_id = ?)
      ORDER BY 
        p.created_at DESC;`,
      [userId, userId, userId] // Bind userId for followers and buddies
    );

    // Parse buddies_id and enrich with data from users table
    const parsedData = await Promise.all(
      data.map(async (post) => {
        let taggedBuddies = [];
        try {
          const buddiesIds = post.buddies_id ? JSON.parse(post.buddies_id) : [];
          if (buddiesIds.length > 0) {
            const placeholders = buddiesIds.map(() => '?').join(', ');
            const [buddiesData] = await pool.execute(
              `SELECT 
                id, 
                full_name, 
                profile_image, 
                badge,
                (SELECT COUNT(*) FROM followers WHERE followee_id = users.id) AS followers_count,
                (SELECT COUNT(*) FROM buddies WHERE user_id = users.id) AS buddies_count
              FROM users
              WHERE id IN (${placeholders})`,
              buddiesIds
            );
            taggedBuddies = buddiesData;
          }
        } catch (parseError) {
          console.error('Error parsing buddies_id:', parseError);
        }

        // Parse other JSON fields safely
        let tagId = [];
        let mediaUrl = [];
        try {
          tagId = post.tag_id ? JSON.parse(post.tag_id) : [];
          mediaUrl = post.media_url ? JSON.parse(post.media_url) : [];
        } catch (parseError) {
          console.error('Error parsing tag_id or media_url:', parseError);
        }

        return {
          ...post,
          buddies_id: taggedBuddies, // Enriched buddies data
          tag_id: tagId,
          media_url: mediaUrl,
          is_liked: !!post.is_liked
        };
      })
    );

    console.log('===alldata===>', parsedData);
    return res.status(200).json({
      message: 'Data fetched successfully',
      data: parsedData,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

 async function postWithlikes(req , res){
try {
    const [datawithlike] = await pool.execute(
      `SELECT 
                p.id,
                p.user_id,
                p.is_public,
                p.description,
                p.buddies_id,
                p.tag_id,
                p.location,
                p.media_url,
                p.status,
                p.block_post,
                u.full_name,
                u.profile_image,
                p.created_at AS post_created_at,
                p.updated_at AS post_updated_at,
                (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS total_likes,
                (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS total_comments,
                (SELECT COUNT(*) FROM shared_post sp WHERE sp.post_id = p.id) AS total_shared,
                (SELECT COUNT(*) FROM bucket_list bl WHERE bl.post_id = p.id) AS total_buckets
            FROM 
                posts p,
                users u,
                shared_post sp,
                bucket_list bl
            WHERE 
                p.status = 'active'
            GROUP BY 
                p.id, p.user_id, p.is_public, p.description, p.buddies_id, p.tag_id, 
                p.location, p.media_url, p.status, p.block_post, p.created_at, p.updated_at;`
    );
    // console.log("===alldata===>",datawithlike)
    return res.status(200).json({
        message: "data fetched done",
        data : datawithlike
    });

    
} catch (error) {
    console.log(" Error fetch data",error)
    return res.status(500).json({
        error: "Internal server Error"
    });
}
}


// function to get active stories
async function getActiveStories1(req, res) {
  try {
    // SQL query to fetch stories with user details using JOIN
    const [data] = await pool.execute(
      `SELECT 
         stories.*, 
         users.profile_image, 
         users.user_name, 
         users.full_name, 
         users.badge
       FROM stories
       JOIN users ON stories.user_id = users.id`
    );

    // Parse `media_url` and `tag` fields from JSON strings to arrays if needed
    const parsedData = data.map(story => ({
      ...story,
      media_url: story.media_url ? JSON.parse(story.media_url) : [],
      tag: story.tag ? JSON.parse(story.tag) : []
    }));

    return res.status(200).json({
      message: "All Active Stories.",
      data: parsedData,
    });
  } catch (error) {
    console.log("===error===", error);
    return res.status(500).json({
      error: "Error fetching active stories",
    });
  }
}

async function getActiveStories2(req, res) {
  try {
    // const { userid } = req.params;
    const userid = req.user.userId;
    // Fetch logged-in user's stories with user details
    const [userStories] = await pool.execute(
      `SELECT 
         stories.*, 
         users.profile_image, 
         users.full_name, 
         users.user_name,
         users.badge 
       FROM stories 
       INNER JOIN users ON stories.user_id = users.id 
       WHERE stories.user_id = ? AND stories.expires_at > NOW()`,
      [userid]
    );

    // Fetch stories from other users with user details
    const [otherUsersStories] = await pool.execute(
      `SELECT 
         stories.*, 
         users.profile_image, 
         users.full_name, 
         users.user_name,
         users.badge 
       FROM stories 
       INNER JOIN users ON stories.user_id = users.id 
       WHERE stories.user_id != ? AND stories.expires_at > NOW()
       ORDER BY stories.user_id, stories.created_at`,
      [userid]
    );

    // Helper function to parse fields into arrays
    const parseFields = (story) => ({
      ...story,
      media_url: JSON.parse(story.media_url || "[]"), // Parse media_url to array
      tag: JSON.parse(story.tag || "[]"), // Parse tag to array
    });

    // Parse userStories and otherUsersStories
    const parsedUserStories = userStories.map(parseFields);
    const parsedOtherUsersStories = otherUsersStories.map(parseFields);

    // Group stories by user_id
    const groupedStories = parsedOtherUsersStories.reduce((acc, story) => {
      if (!acc[story.user_id]) {
        acc[story.user_id] = {
          user_id: story.user_id,
          profile_image: story.profile_image,
          full_name: story.full_name,
          user_name: story.user_name,
          badge: story.badge,
          stories: [],
        };
      }
      acc[story.user_id].stories.push(story);
      return acc;
    }, {});

    // Prepare response: first logged-in user's stories, then others
    const response = [
      {
        user_id: userid,
        profile_image: userStories[0]?.profile_image || null,
        full_name: userStories[0]?.full_name || null,
        user_name: userStories[0]?.user_name || null,
        badge: userStories[0]?.badge || null,
        stories: parsedUserStories,
      },
      ...Object.values(groupedStories),
    ];
    // console.log("=====data===>",message);
    return res.status(200).json({
      message: "All Active Stories.",
      data: response,
    });
  } catch (error) {
    console.error("===error===", error);
    return res.status(500).json({
      error: "Error fetching active stories",
    });
  }
}

async function getActiveStories(req, res) {
  try {
    // const { userid } = req.params;
    const userid = req.user.userId;
    // Fetch logged-in user's stories with viewers
    const [userStories] = await pool.execute(
      `SELECT 
         stories.*, 
         users.profile_image, 
         users.full_name, 
         users.user_name,
         users.badge,
         (
           SELECT CONCAT(
             '[', 
             GROUP_CONCAT(
               CONCAT(
                 '{"user_id":', sv.user_id, 
                 ',"profile_image":"', vu.profile_image, '"',
                 ',"user_name":"', vu.user_name, '"',
                 ',"full_name":"', vu.full_name, '"}'
               )
             ), 
             ']'
           )
           FROM story_views sv
           INNER JOIN users vu ON sv.user_id = vu.id
           WHERE sv.story_id = stories.id
         ) AS viewers
       FROM stories 
       INNER JOIN users ON stories.user_id = users.id 
       WHERE stories.user_id = ? AND stories.expires_at > NOW()`,
      [userid]
    );

    // Fetch other users' stories with viewers
    const [otherUsersStories] = await pool.execute(
      `SELECT 
         stories.*, 
         users.profile_image, 
         users.full_name, 
         users.user_name,
         users.badge,
         (
           SELECT CONCAT(
             '[', 
             GROUP_CONCAT(
               CONCAT(
                 '{"user_id":', sv.user_id, 
                 ',"profile_image":"', vu.profile_image, '"',
                 ',"user_name":"', vu.user_name, '"',
                 ',"full_name":"', vu.full_name, '"}'
               )
             ), 
             ']'
           )
           FROM story_views sv
           INNER JOIN users vu ON sv.user_id = vu.id
           WHERE sv.story_id = stories.id
         ) AS viewers
       FROM stories 
       INNER JOIN users ON stories.user_id = users.id 
       WHERE stories.user_id != ? AND stories.expires_at > NOW()
       ORDER BY stories.user_id, stories.created_at`,
      [userid]
    );

    // Helper function to parse fields into arrays and parse viewers

    // const parseFieldUser = (story) => ({
    //   ...story,
    //   url: JSON.parse(story.media_url || "[]"), // Parse media_url to array
    //   tag: JSON.parse(story.tag || "[]"), // Parse tag to array
    //   viewers: story.viewers ? JSON.parse(story.viewers) : [], // Parse viewers JSON
    // });

    // const parseFields = (story) => ({
    //   ...story,
    //   media_url: JSON.parse(story.media_url || "[]"), // Parse media_url to array
    //   tag: JSON.parse(story.tag || "[]"), // Parse tag to array
    //   viewers: story.viewers ? JSON.parse(story.viewers) : [], // Parse viewers JSON
    // });

    const parseFields = (story) => ({
      ...story,
      type: "image",
      media_url: story.media_url || "",
      url: story.media_url || "", // Parse media_url to array
      tag: JSON.parse(story.tag || "[]"), // Parse tag to array
      viewers: story.viewers ? JSON.parse(story.viewers) : [], // Parse viewers JSON
    });



    // Parse userStories and otherUsersStories
    // const parsedUserStories = userStories.map(parseFields);
    const parsedUserStories = userStories.map(parseFields);
    const parsedOtherUsersStories = otherUsersStories.map(parseFields);

    // Group stories by user_id
    const groupedStories = parsedOtherUsersStories.reduce((acc, story) => {
      if (!acc[story.user_id]) {
        acc[story.user_id] = {
          user_id: story.user_id,
          profile_image: story.profile_image,
          full_name: story.full_name,
          user_name: story.user_name,
          badge: story.badge,
          stories: [],
        };
      }
      acc[story.user_id].stories.push(story);
      return acc;
    }, {});

    // Prepare response: first logged-in user's stories, then others
    const response = [
      {
        user_id: userid,
        profile_image: userStories[0]?.profile_image || null,
        full_name: userStories[0]?.full_name || null,
        user_name: userStories[0]?.user_name || null,
        badge: userStories[0]?.badge || null,
        stories: parsedUserStories,
      },
      ...Object.values(groupedStories),
    ];

    return res.status(200).json({
      message: "All Active Stories.",
      data: response,
    });
  } catch (error) {
    console.error("===error===", error);
    return res.status(500).json({
      error: "Error fetching active stories",
    });
  }
}

// api to like story
const likeStory = async (req, res) => {
  try {
    // const { user_id } = req.params; // Extract user_id from request parameters
    const user_id = req.user.userId;  // get user id from token
    const { story_id } = req.body; // Extract story_id from request body

    // Validate required fields
    if (!user_id || !story_id) {
      return res.status(400).json({
        message: "Missing required fields (user_id or story_id).",
      });
    }

    // Check if the story exists
    const [story] = await pool.execute(`SELECT id FROM stories WHERE id = ?`, [
      story_id,
    ]);

    if (story.length === 0) {
      return res.status(404).json({
        message: "Story not found.",
      });
    }

    // Check if the user already liked the story
    const [existingLike] = await pool.execute(
      `SELECT * FROM story_likes WHERE story_id = ? AND user_id = ?`,
      [story_id, user_id]
    );

    if (existingLike.length > 0) {
      // If a like exists, remove it
      await pool.execute(
        `DELETE FROM story_likes WHERE story_id = ? AND user_id = ?`,
        [story_id, user_id]
      );

      return res.status(200).json({
        message: "Like removed successfully.",
      });
    } else {
      // If no like exists, add it
      await pool.execute(
        `INSERT INTO story_likes (story_id, user_id) VALUES (?, ?)`,
        [story_id, user_id]
      );

      return res.status(200).json({
        message: "Story liked successfully.",
      });
    }
  } catch (err) {
    console.error("Error in likeStory:", err);
    return res.status(500).json({
      error: "An error occurred while processing your request.",
    });
  }
};

async function getUserPosts(req , res){
    try {
        //    const { UserId } = req.params; 
           const UserId = req.user.userId; // Assuming `id` is part of the token payload
           const [allpost] = await pool.execute(
             
        //       ` SELECT 
        //     p.id,
        //     p.user_id,
        //     p.is_public,
        //     p.description,
        //     p.buddies_id,
        //     p.tag_id,
        //     p.location,
        //     p.media_url,
        //     p.status,
        //     p.block_post,
        //     u.full_name,
        //     u.user_name,
        //     p.created_at AS post_created_at,
        //     p.updated_at AS post_updated_at,
        //     (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS total_likes,
        //     (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS total_comments,
        //     (SELECT COUNT(*) FROM shared_post sp WHERE sp.post_id = p.id) AS total_shared,
        //     (SELECT COUNT(*) FROM bucket_list bl WHERE bl.post_id = p.id) AS total_buckets,
        //     (SELECT 
        //          c.content 
        //      FROM 
        //          comments c 
        //      WHERE 
        //          c.post_id = p.id 
        //      ORDER BY 
        //          c.created_at DESC 
        //      LIMIT 1) AS last_comment
        // FROM 
        //     posts p
        // JOIN 
        //     users u ON p.user_id = u.id
        // WHERE 
        //     p.status = 'active'
        //     AND p.user_id = ?
        // GROUP BY 
        //     p.id, p.user_id, p.is_public, p.description, p.buddies_id, p.tag_id, 
        //     p.location, p.media_url, p.status, p.block_post, p.created_at, p.updated_at;
        // `,
        ` SELECT 
          p.id,
          p.user_id,
          p.is_public,
          p.description,
          p.buddies_id,
          p.tag_id,
          p.location,
          p.media_url,
          p.status,
          p.block_post,
          u.full_name,
          u.user_name,
          u.profile_image,
          u.badge,
          p.created_at AS post_created_at,
          p.updated_at AS post_updated_at,
          (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS total_likes,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS total_comments,
          (SELECT COUNT(*) FROM shared_post sp WHERE sp.post_id = p.id) AS total_shared,
          (SELECT COUNT(*) FROM bucket_list bl WHERE bl.post_id = p.id) AS total_buckets,
          (SELECT 
               c.content 
           FROM 
               comments c 
           WHERE 
               c.post_id = p.id 
           ORDER BY 
               c.created_at DESC 
           LIMIT 1) AS last_comment_content,
          (SELECT 
               uc.full_name 
           FROM 
               comments c
           JOIN 
               users uc ON c.user_id = uc.id
           WHERE 
               c.post_id = p.id 
           ORDER BY 
               c.created_at DESC 
           LIMIT 1) AS last_comment_user_full_name,
           (SELECT 
               uc.profile_image 
           FROM 
               comments c
           JOIN 
               users uc ON c.user_id = uc.id
           WHERE 
               c.post_id = p.id 
           ORDER BY 
               c.created_at DESC 
           LIMIT 1) AS last_comment_user_profile_image,
          (SELECT 
               uc.user_name 
           FROM 
               comments c
           JOIN 
               users uc ON c.user_id = uc.id
           WHERE 
               c.post_id = p.id 
           ORDER BY 
               c.created_at DESC 
           LIMIT 1) AS last_comment_user_name,
          (SELECT 
               c.created_at 
           FROM 
               comments c 
           WHERE 
               c.post_id = p.id 
           ORDER BY 
               c.created_at DESC 
           LIMIT 1) AS last_comment_created_at,
          (SELECT COUNT(*) 
           FROM comments_like cl 
           JOIN comments c ON cl.comment_id = c.id 
           WHERE c.post_id = p.id 
           ORDER BY c.created_at DESC 
           LIMIT 1) AS last_comment_likes_count,
           (SELECT 
         CASE 
             WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE 
         END 
     FROM 
         likes l 
     WHERE 
         l.post_id = p.id AND l.user_id = ?) AS user_liked_post
      FROM 
          posts p
      JOIN 
          users u ON p.user_id = u.id
      WHERE 
          p.status = 'active'
          AND p.user_id = ?
      GROUP BY 
          p.id, p.user_id, p.is_public, p.description, p.buddies_id, p.tag_id, 
          p.location, p.media_url, p.status, p.block_post, p.created_at, p.updated_at
          ORDER BY 
          p.created_at DESC;
      
      `,
        [UserId, UserId]
           );

           const formattedPosts =await allpost.map(post => {
            return {
              ...post,
              media_url: post.media_url ? JSON.parse(post.media_url) : [],
              tag_id: post.tag_id ? JSON.parse(post.tag_id) : [],
              buddies_id: post.buddies_id ? JSON.parse(post.buddies_id) : []
            };
          });
  
           return res.status(200).json({
              message: "All Posts data",
              data : formattedPosts
           });
      
    } catch (error) {
      console.log("Error in all post.", error)
      return res.status(500).json({
          error: "Internal server Error"
      })
    }
      
  }

async function addBucketList( req , res){
    try {
        const{ post_id , user_id} = req.body;
    
        if(!post_id || !user_id){
            return res.status(400).json({
                error: "Missing field - allfield are required"
    
            });
        }
        await pool.execute(
            `INSERT INTO bucket_list (post_id, user_id) VALUES(?, ?)`,
            [post_id, user_id]
              );
    
         return res.status(200).json({
            message:"Post Added to Bucket List.",
            data:{
                post_id,
                user_id
            }
         })
      
    } catch (error) {
        console.log("==Error Adding bucket===>",error);
        return res.status(500).json({
            error: "INternal Server Error"
        });
    }
    }
    
// function to share post
async function sharedPost(req , res){
    try {
        const { post_id, user_id} = req.body;
        
        if(!post_id || !user_id)
            return res.status(400).json({
              error:"All fields are required.",error
    });

    await pool.execute(
      `INSERT INTO shared_post(post_id, user_id) VALUES(?,?)`,
        [post_id, user_id]
    );

    return res.status(200).json({
        message:"Shared Post Successfully",
        data: {
            post_id,
            user_id
        }

    })

    } catch (error) {
        console.log("==Error shareding post===>",error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}
  
// function to comment on post
async function postComment(req , res){
try {
    const userId = req.user.userId; // extract user id from token 
    const { post_id, content } = req.body;

    if (!post_id || !userId || !content) {
    return res.status(400).json({
        error: "Missing required fields: post_id, user_id, or content",
    });
}

    const [comment] = await pool.execute(
        `Insert INTO comments ( post_id, user_id, content ) VALUES (? , ? , ?)`,
        [post_id, userId, content]
    );

    return res.status(200).json({
    message: "Comment post Successfully",
    data: {
        post_id,
        userId,
        content
    }
    })
} catch (error) {
    console.log("Error add comment",error);
    return res.status(500).json({
    error: "Internal server Error"
    })
}
}

// function to like and unlike post
  async function postLike(req, res) {
    try {
      const user_id = req.user.userId; // extract user id from token 

      const { post_id } = req.body;
      
      if (!post_id || !user_id) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }
      
      const [existingLike] = await pool.execute(
        `SELECT * FROM likes WHERE post_id = ? AND user_id = ?`,
        [post_id, user_id]
      );
  
      if (existingLike.length > 0) {
        // Like exists, so remove it
        await pool.execute(
          `DELETE FROM likes WHERE post_id = ? AND user_id = ?`,
          [post_id, user_id]
        );
  
        return res.status(200).json({
          message: "Like removed successfully.",
          data: null,
        });
      } else {
        // Like doesn't exist, so add it
        await pool.execute(
          `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`,
          [post_id, user_id]
        );
  
        return res.status(200).json({
          message: "Like added successfully.",
          data: {
            post_id,
            user_id,
          },
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
      
//   async function getPostComments(req , res){
//     try {
//         const { postId } = req.params;
//         console.log("=====postId==getPostComments==>", postId)
//         const [getComments] = await pool.execute(
//         //   SELECT    FROM comments where post_id = ?,[postId]

//        `SELECT 
//                 c.user_id,
//                 c.post_id,
//                 c.id,
//                 c.content,
//                 u.full_name,
//                 u.profile_image,
//                 c.created_at,
//                 -- Count total likes for each comment
//                 (SELECT COUNT(*) FROM comments_like cl WHERE cl.comment_id = c.id) AS total_likes_on_comment,
//                 -- Count total replies for each comment
//                 (SELECT COUNT(*) FROM comment_reply cr WHERE cr.comment_id = c.id) AS total_reply_on_comment
             
//             FROM 
//                 comments c
//             JOIN
//                 users u
//             ON 
//                 c.user_id = u.id
//             WHERE
//                 c.post_id = ?
//             ORDER BY 
//                 c.created_at ASC
//                 `,[postId]
//         );

//           // Fetch all replies
//           const [replies] = await pool.execute(
//             `
//             SELECT 
//                 cr.id AS reply_id,
//                 cr.comment_id,
//                 cr.user_id,
//                 cr.content AS reply_content,
//                 u.full_name AS reply_user_full_name,
//                 u.user_name AS reply_user_user_name,
//                 u.profile_image AS reply_user_profile_image,
//                 cr.created_at AS reply_created_at
//             FROM 
//                 comment_reply cr
//                 JOIN
//                 users u
//             ON 
//                 cr.user_id = u.id
//             WHERE 
//                 cr.comment_id IN (
//                     SELECT id FROM comments WHERE post_id = ?
//                 )
//             `,
//             [postId]
//         );

//         // Group replies by comment ID
//         const groupedReplies = replies.reduce((acc, reply) => {
//             if (!acc[reply.comment_id]) {
//                 acc[reply.comment_id] = [];
//             }
//             acc[reply.comment_id].push({
//                 reply_id: reply.reply_id,
//                 reply_content: reply.reply_content,
//                 reply_user_full_name: reply.reply_user_full_name,
//                 reply_user_user_name: reply.reply_user_user_name,
//                 reply_user_profile_image: reply.reply_user_profile_image,
//                 reply_created_at: reply.reply_created_at,
//             });
//             return acc;
//         }, {});

//         // Attach replies to their respective comments
//         const finalComments = Object.entries(getComments).map((comment) => ({
//             ...comment,
//             replies: groupedReplies[comment.comment_id] || [],
//         }));

//        console.log("==data Fetched==>",finalComments)
//        return res.status(200).json({
//         message: "All comments of post",
//         data: finalComments
//        });
        

//     } catch (error) {
        
//         console.log(" Error to get data getPostComments function",error)
//         return res.status(500).json({
//             error: "Internal Server Error"
//         });

//     }
// }

// function to like a comment


// async function getPostComments(req , res){
//   try {
//       const { postId } = req.params;
//       console.log("=====postId====>", postId);
//       const [getComments] = await pool.execute(
//       //   SELECT    FROM comments where post_id = ?,[postId]
//       `SELECT 
//               c.user_id,
//               c.post_id,
//               c.id,
//               c.content,
//               u.full_name,
//               u.profile_image,
//               c.created_at,
//               -- Count total likes for each comment
//               (SELECT COUNT(*) FROM comments_like cl WHERE cl.comment_id = c.id) AS total_likes_on_comment,
//               -- Count total replies for each comment
//               (SELECT COUNT(*) FROM comment_reply cr WHERE cr.comment_id = c.id) AS total_reply_on_comment
           
//           FROM 
//               comments c
//           JOIN
//               users u
//           ON 
//               c.user_id = u.id
//           WHERE
//               c.post_id = ?
//           ORDER BY 
//               c.created_at ASC
//               `,[postId]
//       );

//         // Fetch all replies
//         const [replies] = await pool.execute(
//           `
//           SELECT 
//               cr.id AS reply_id,
//               cr.comment_id,
//               cr.user_id,
//               cr.content AS reply_content,
//               u.full_name AS reply_user_full_name,
//               u.user_name AS reply_user_user_name,
//               u.profile_image AS reply_user_profile_image,
//               cr.created_at AS reply_created_at
//           FROM 
//               comment_reply cr
//               JOIN
//               users u
//           ON 
//               cr.user_id = u.id
//           WHERE 
//               cr.comment_id IN (
//                   SELECT id FROM comments WHERE post_id = ?
//               )
//           `,
//           [postId]
//       );

//       console.log("======replies====>", replies);

//       // Group replies by comment ID
//       const groupedReplies = await replies.reduce((acc, reply) => {
//         if (!acc[reply.comment_id]) {
//           acc[reply.comment_id] = [];
//         }
//         // console.log("===acc[reply.comment_id]===>", acc[reply.comment_id]);
//           acc[reply.comment_id].push({
//               reply_id: reply.reply_id,
//               reply_content: reply.reply_content,
//               reply_user_full_name: reply.reply_user_full_name,
//               reply_user_user_name: reply.reply_user_user_name,
//               reply_user_profile_image: reply.reply_user_profile_image,
//               reply_created_at: reply.reply_created_at,
//           });
//           return acc;
//       }, {});

//       // Attach replies to their respective comments
//       const finalComments = await getComments.map((comment) => ({
//           ...comment,
//           replies: groupedReplies[comment.id] || [],
//       }));

//      console.log("==data Fetched==>",getComments)
//      return res.status(200).json({
//       message: "All comments of post",
//       data: finalComments
//      });
      

//   } catch (error) {
      
//       console.log(" Error to get data",error)
//       res.status(500).json({
//           error: "Internal Server Error"
//       });

//   }
// }


async function getPostComments1(req, res) {
  try {
    const { postId } = req.params;
    
    // Fetch all comments
    const [getComments] = await pool.execute(
      `SELECT 
                c.user_id,
                c.post_id,
                c.id,
                c.content,
                u.full_name,
                u.profile_image,
                u.id,
                c.created_at,
                -- Count total likes for each comment
                (SELECT COUNT(*) FROM comments_like cl WHERE cl.comment_id = c.id) AS total_likes_on_comment,
                -- Count total replies for each comment
                (SELECT COUNT(*) FROM comment_reply cr WHERE cr.comment_id = c.id) AS total_reply_on_comment
            FROM 
                comments c
            JOIN
                users u
            ON 
                c.user_id = u.id
            WHERE
                c.post_id = ?
            ORDER BY 
                c.created_at ASC
                `,
      [postId]
    );

    // Fetch all replies (for comments)
    const [replies] = await pool.execute(
      `SELECT 
                cr.id AS reply_id,
                cr.comment_id,
                cr.user_id,
                cr.content AS reply_content,
                u.full_name AS reply_user_full_name,
                u.user_name AS reply_user_user_name,
                u.profile_image AS reply_user_profile_image,
                cr.created_at AS reply_created_at,
                 (SELECT COUNT(*) FROM reply_like crl WHERE crl.reply_id = cr.id) AS total_likes_on_reply,
                 (SELECT COUNT(*) FROM reply_comment rc WHERE rc.reply_id = cr.id) AS total_comment_on_reply
            FROM 
                comment_reply cr
            JOIN
                users u
            ON 
                cr.user_id = u.id
            WHERE 
                cr.comment_id IN (
                    SELECT id FROM comments WHERE post_id = ?
                )`,
      [postId]
    );

    // Fetch all replies to replies (nested replies)
    const [nestedReplies] = await pool.execute(
      `SELECT 
                rc.id AS nested_reply_id,
                rc.reply_id AS parent_reply_id,
                rc.user_id AS nested_reply_user_id,
                rc.content AS nested_reply_content,
                u.full_name AS nested_reply_user_full_name,
                u.user_name AS nested_reply_user_user_name,
                u.profile_image AS nested_reply_user_profile_image 
            FROM 
                reply_comment rc
            JOIN
                users u
            ON 
                rc.user_id = u.id
            WHERE
                rc.reply_id IN (
                    SELECT id FROM comment_reply WHERE comment_id IN (
                        SELECT id FROM comments WHERE post_id = ?
                    )
                )`,
      [postId]
    );

    // Group replies by comment ID
    const groupedReplies = replies.reduce((acc, reply) => {
      if (!acc[reply.comment_id]) {
        acc[reply.comment_id] = [];
      }
      acc[reply.comment_id].push({
        reply_id: reply.reply_id,
        reply_content: reply.reply_content,
        reply_user_full_name: reply.reply_user_full_name,
        reply_user_user_name: reply.reply_user_user_name,
        reply_user_profile_image: reply.reply_user_profile_image,
        reply_created_at: reply.reply_created_at,
        total_likes_on_reply: reply.total_likes_on_reply,
        total_comment_on_reply: reply.total_comment_on_reply,
        // Nested replies (reply to reply)
        nested_replies: [],
      });
      return acc;
    }, {});

    // Group nested replies by reply ID
    const groupedNestedReplies = nestedReplies.reduce((acc, nestedReply) => {
      if (!acc[nestedReply.parent_reply_id]) {
        acc[nestedReply.parent_reply_id] = [];
      }
      acc[nestedReply.parent_reply_id].push({
        nested_reply_id: nestedReply.nested_reply_id,
        nested_reply_content: nestedReply.nested_reply_content,
        nested_reply_user_full_name: nestedReply.nested_reply_user_full_name,
        nested_reply_user_user_name: nestedReply.nested_reply_user_user_name,
        nested_reply_user_profile_image: nestedReply.nested_reply_user_profile_image,
        nested_reply_created_at: nestedReply.nested_reply_created_at,
      });
      return acc;
    }, {});

    // Attach nested replies to their respective replies
    for (const reply of replies) {
      const nested = groupedNestedReplies[reply.reply_id] || [];
      const replyIndex = groupedReplies[reply.comment_id].findIndex(r => r.reply_id === reply.reply_id);
      if (replyIndex !== -1) {
        groupedReplies[reply.comment_id][replyIndex].nested_replies = nested;
      }
    }

    // Attach replies (with nested replies) to their respective comments
    const finalComments = getComments.map((comment) => ({
      ...comment,
      replies: groupedReplies[comment.id] || [],
    }));

    console.log("==data Fetched==>", getComments);
    return res.status(200).json({
      message: "All comments of post",
      data: finalComments,
    });
  } catch (error) {
    console.log("Error to get data", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

async function getPostComments(req, res) {
  try {
    const { postId } = req.params;

    // Fetch the post owner user_id
    const [postOwner] = await pool.execute(
      `SELECT user_id AS post_owner_id FROM posts WHERE id = ?`,
      [postId]
    );

    if (postOwner.length === 0) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    const postOwnerId = postOwner[0].post_owner_id;

    // Fetch all comments
    const [getComments] = await pool.execute(
      `SELECT 
                c.user_id,
                c.post_id,
                c.id,
                c.content,
                u.full_name,
                u.profile_image,
                c.created_at,
                -- Count total likes for each comment
                (SELECT COUNT(*) FROM comments_like cl WHERE cl.comment_id = c.id) AS total_likes_on_comment,
                -- Count total replies for each comment
                (SELECT COUNT(*) FROM comment_reply cr WHERE cr.comment_id = c.id) AS total_reply_on_comment
            FROM 
                comments c
            JOIN
                users u
            ON 
                c.user_id = u.id
            WHERE
                c.post_id = ?
            ORDER BY 
                c.created_at ASC
                `,
      [postId]
    );

    // Fetch all replies (for comments)
    const [replies] = await pool.execute(
      `SELECT 
                cr.id AS reply_id,
                cr.comment_id,
                cr.user_id,
                cr.content AS reply_content,
                u.full_name AS reply_user_full_name,
                u.user_name AS reply_user_user_name,
                u.profile_image AS reply_user_profile_image,
                cr.created_at AS reply_created_at,
                 (SELECT COUNT(*) FROM reply_like crl WHERE crl.reply_id = cr.id) AS total_likes_on_reply,
                 (SELECT COUNT(*) FROM reply_comment rc WHERE rc.reply_id = cr.id) AS total_comment_on_reply
            FROM 
                comment_reply cr
            JOIN
                users u
            ON 
                cr.user_id = u.id
            WHERE 
                cr.comment_id IN (
                    SELECT id FROM comments WHERE post_id = ?
                )`,
      [postId]
    );

    // Fetch all replies to replies (nested replies)
    const [nestedReplies] = await pool.execute(
      `SELECT 
                rc.id AS nested_reply_id,
                rc.reply_id AS parent_reply_id,
                rc.user_id AS nested_reply_user_id,
                rc.content AS nested_reply_content,
                u.full_name AS nested_reply_user_full_name,
                u.user_name AS nested_reply_user_user_name,
                u.profile_image AS nested_reply_user_profile_image
                
            FROM 
                reply_comment rc
            JOIN
                users u
            ON 
                rc.user_id = u.id
            WHERE
                rc.reply_id IN (
                    SELECT id FROM comment_reply WHERE comment_id IN (
                        SELECT id FROM comments WHERE post_id = ?
                    )
                )`,
      [postId]
    );

    console.log("=========replies=============>", replies);

    // Group replies by comment ID
    const groupedReplies = replies.reduce((acc, reply) => {
      if (!acc[reply.comment_id]) {
        acc[reply.comment_id] = [];
      }
      acc[reply.comment_id].push({
        reply_id: reply.reply_id,
        reply_content: reply.reply_content,
        reply_user_full_name: reply.reply_user_full_name,
        reply_user_user_name: reply.reply_user_user_name,
        reply_user_profile_image: reply.reply_user_profile_image,
        reply_created_at: reply.reply_created_at,
        total_likes_on_reply: reply.total_likes_on_reply,
        total_comment_on_reply: reply.total_comment_on_reply,
        user_id: reply?.user_id,
        post_owner_id: postOwnerId, // Add post owner ID to each reply
        // Nested replies (reply to reply)
        nested_replies: [],
      });
      return acc;
    }, {});

    // Group nested replies by reply ID
    const groupedNestedReplies = nestedReplies.reduce((acc, nestedReply) => {
      if (!acc[nestedReply.parent_reply_id]) {
        acc[nestedReply.parent_reply_id] = [];
      }
      acc[nestedReply.parent_reply_id].push({
        nested_reply_id: nestedReply.nested_reply_id,
        nested_reply_content: nestedReply.nested_reply_content,
        nested_reply_user_full_name: nestedReply.nested_reply_user_full_name,
        nested_reply_user_user_name: nestedReply.nested_reply_user_user_name,
        nested_reply_user_profile_image: nestedReply.nested_reply_user_profile_image,
        nested_reply_created_at: nestedReply.nested_reply_created_at,
        post_owner_id: postOwnerId, // Add post owner ID to each nested reply
      });
      return acc;
    }, {});

    // Attach nested replies to their respective replies
    for (const reply of replies) {
      const nested = groupedNestedReplies[reply.reply_id] || [];
      const replyIndex = groupedReplies[reply.comment_id].findIndex(r => r.reply_id === reply.reply_id);
      if (replyIndex !== -1) {
        groupedReplies[reply.comment_id][replyIndex].nested_replies = nested;
      }
    }

    // Attach replies (with nested replies) to their respective comments
    const finalComments = getComments.map((comment) => ({
      ...comment,
      post_owner_id: postOwnerId, // Add post owner ID to each comment
      replies: groupedReplies[comment.id] || [],
    }));

    return res.status(200).json({
      message: "All comments of post",
      data: finalComments,
      // post_owner_id: postOwnerId, // Add the post owner's user_id to the response
    });
  } catch (error) {
    console.log("Error to get data", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}


async function likeAnyComment(req , res){

    try {
            // const {comment_id, user_id} = req.body;
        const { comment_id } = req.params;
        const user_id = req.user.userId; // extrcting from token


        if(!comment_id || !user_id){
        return res.status(400).json({
            error:"All fields are required"
        });
        
        }

         // Check if the like already exists
      const [existingLike] = await pool.execute(
        `SELECT * FROM comments_like WHERE comment_id = ? AND user_id = ?`,
        [comment_id, user_id]
      );
  
      if (existingLike.length > 0) {
        // Like exists, so remove it
        await pool.execute(
          `DELETE FROM comments_like WHERE comment_id = ? AND user_id = ?`,
          [comment_id, user_id]
        );
  
        return res.status(200).json({
          message: "Like removed successfully.",
        });
      } else {
        // Like doesn't exist, so add it
        await pool.execute(
          `INSERT INTO comments_like (comment_id, user_id) VALUES (?, ?)`,
          [comment_id, user_id]
        );
  
        return res.status(200).json({
          message: "Like added successfully."
        });
      }
    } catch (error) {
        console.log(" Error likeAnyComment function",error)
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }

  }

async function replyOnComment(req , res){
    try {
    
      const { comment_id, content } = req.body;
      const user_id = req.user.userId; // extrcting from token

    
      if( !comment_id || !user_id || !content){
        return res.status(400).json({
          error:"All fields are required"
        });
      }
    
      const [data] = await pool.execute(
        `INSERT INTO comment_reply (comment_id , user_id, content) VALUE (? ,? ,?)`,
        [comment_id, user_id, content]
      );
       
      return res.status(200).json({
        message:" Comment added successfully",
      });
      
    } catch (error) {
      
      return res.status(500).json({
        error:"Internal server Error"
      });
    }
    }

// async function storePost(req, res) {
//     try {
//   const user_id = req.user.userId; // extrcting from token

//       const {
//         is_public,
//         description,
//         buddies_id,
//         tags,
//         location,
//         media_url,
//         status,
//         block_post,
//       } = req.body;

//       // Validate required fields
//       if (!user_id || !description) {
//         return res.status(400).json({
//           message: "Missing required fields (user_id, description).",
//         });
//       }
  
//       // Insert the post into the database
//       const [result] = await pool.execute(
//         `INSERT INTO posts (
//           user_id,
//           is_public,
//           description,
//           buddies_id,
//           tag_id,
//           location,
//           media_url,
//           status,
//           block_post,
//           created_at,
//           updated_at
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//         [
//           user_id,
//           is_public !== undefined ? is_public : 1, // Default to 1 (true) if not provided
//           description || null, // Allow null for optional fields
//           JSON.stringify(buddies_id) || [],
//           JSON.stringify(tags) || [],
//           location || null,
//           JSON.stringify(media_url) || [], // Default to empty JSON array
//           status || "active", // Default to 'active'
//           block_post !== undefined ? block_post : 0, // Default to 0 (false)
//         ]
//       );
  
//       // Respond with success message
//       return res.status(200).json({
//         message: "Post created successfully.",
//         post_id: result.insertId, // Return the ID of the newly created post
//       });
//     } catch (error) {
//       console.error("Error in storing post:", error);
//       return res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
// }


// async function storePost(req, res) {
//   try {
//     // POST_UPLOAD_DIR
//     const user_id = req.user.userId; // extrcting from token

//     const {
//       is_public,
//       description,
//       buddies_id,
//       tags,
//       location,
//       media_url,
//       status,
//       block_post,
//     } = req.body;

//     // Validate required fields
//     if (!user_id ) {
//       return res.status(400).json({
//         message: "Missing required fields (user_id).",
//       });
//     }

//     const postImages = [];

//     if(media_url.length > 0) {
//       for(let image of media_url) {
//         // Extract Base64 part of the image
//         const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
//         const extension = image.substring("data:image/".length, image.indexOf(";base64"));
//         const fileName = `post_${Date.now()}.${extension}`;
//         const filePath = path.join(POST_UPLOAD_DIR, fileName);
//         const imagePath = `${process.env.APP_SERVER_URL}/uploads/post_img/${fileName}`;
//         postImages.push(imagePath);

//         fs.writeFile(filePath, base64Data, { encoding: "base64" }, async(err) => {
//           if (err) {
//             return res.status(500).json({ error: "Failed to save image" });
//           }
//         });
//         console.log("=====imagePath====>", imagePath);
//       }
//     }


//     // Insert the post into the database
//     const [result] = await pool.execute(
//       `INSERT INTO posts (
//         user_id,
//         is_public,
//         description,
//         buddies_id,
//         tag_id,
//         location,
//         media_url,
//         status,
//         block_post,
//         created_at,
//         updated_at
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
//       [
//         user_id,
//         is_public !== undefined ? is_public : 1, // Default to 1 (true) if not provided
//         description || null, // Allow null for optional fields
//         JSON.stringify(buddies_id) || [],
//         JSON.stringify(tags) || [],
//         location || null,
//         JSON.stringify(postImages) || [], // Default to empty JSON array
//         status || "active", // Default to 'active'
//         block_post !== undefined ? block_post : 0, // Default to 0 (false)
//       ]
//     );

    

//     // Respond with success message
//     return res.status(200).json({
//       message: "Post created successfully.",
//       post_id: result.insertId, // Return the ID of the newly created post
//     });
//   } catch (error) {
//     console.error("Error in storing post:", error);
//     return res.status(500).json({
//       error: "Internal Server Error",
//     });
//   }
// }

async function storePost(req, res) {
  try {
    const user_id = req.user.userId; // Extracting user ID from the token

    const {
      is_public,
      description,
      buddies_id,
      tags,
      location,
      media_url,
      status,
      block_post,
    } = req.body;

    // Validate required fields
    if (!user_id) {
      return res.status(400).json({
        message: "Missing required fields (user_id).",
      });
    }

    const postMedia = []; // Array to store media paths

    // Validate and process media_url
    if (Array.isArray(media_url) && media_url.length > 0) {
      for (let media of media_url) {
        try {
          // Extract Base64 part of the media
          const base64Data = media.replace(/^data:(.*);base64,/, "");
          const mimeType = media.match(/^data:(.*);base64,/)[1]; // Extract MIME type
          const extension = mimeType.split("/")[1]; // Extract file extension

          // Generate file name and path
          const fileName = `post_${Date.now()}.${extension}`;
          const filePath = path.join(POST_UPLOAD_DIR, fileName);
          const mediaPath = `${process.env.APP_SERVER_URL}/uploads/post_img/${fileName}`;
          postMedia.push(mediaPath);

          // Write media to the server
          await fs.promises.writeFile(filePath, base64Data, { encoding: "base64" });
        } catch (err) {
          console.error("Failed to save media:", err);
          return res.status(500).json({ error: "Failed to save media." });
        }
      }
    }

    // Insert the post into the database
    const [result] = await pool.execute(
      `INSERT INTO posts (
        user_id,
        is_public,
        description,
        buddies_id,
        tag_id,
        location,
        media_url,
        status,
        block_post,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        user_id,
        is_public !== undefined ? is_public : 1, // Default to 1 (true) if not provided
        description || null, // Allow null for optional fields
        JSON.stringify(buddies_id) || [], // Serialize buddies_id as JSON
        JSON.stringify(tags) || [], // Serialize tags as JSON
        location || null, // Allow null for optional fields
        JSON.stringify(postMedia) || [], // Serialize media paths as JSON
        status || "active", // Default to 'active'
        block_post !== undefined ? block_post : 0, // Default to 0 (false)
      ]
    );

    // Respond with success message
    return res.status(200).json({
      message: "Post created successfully.",
      post_id: result.insertId, // Return the ID of the newly created post
    });
  } catch (error) {
    console.error("Error in storing post:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

// delete comment
async function   deleteComments(req, res) {
  try {
    const UserId = req.user.userId; // extrcting from token
    const { id } = req.params;       // Extract comment ID from request body

    
    // Begin a database transaction
    // await pool.execute('START TRANSACTION');

    // Delete replies associated with the comment
    const [replyData] = await pool.execute(
      'DELETE FROM comment_reply WHERE comment_id = ?', [id ]
    );

    // Delete the comment
    const [commentData] = await pool.execute(
      'DELETE FROM comments WHERE id = ?', [id]
    );
    console.log("===Comment Deleted===>", commentData);

    if(commentData.affectedRows === 0) {
      return res.status(404).json({ error: "comment not found" });
    }

    // Commit the transaction
    // await pool.execute('COMMIT');

    return res.status(200).json({
      message: "Comment and associated replies deleted successfully"
    });

  } catch (error) {
    console.error("===Error===>", error);

    // Rollback the transaction in case of an error
    await pool.execute('ROLLBACK');

    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
}

// delete a reply
async function deleteReply(req , res){
  try {
       
      const { replyId } = req.params;
      console.log('====output===>',replyId);
      const [ existingComment] = await pool.execute(
         `SELECT * FROM comment_reply WHERE id = ?`,[replyId]
      );

      console.log("reply not found",existingComment);

      if(existingComment.length === 0) {
          return res.status(409).json({
             error:"comment not found"
         });
      }

      const [data] = await pool.execute(
          `DELETE FROM comment_reply WHERE id = ?`,[replyId]
      );

      console.log("===comment=deleted====>",data);
      return res.status(200).json({
          message:"comment Deleted successfully"
      });
      
  } catch (error) {
      console.log("===error deleting comment===>",error);
      return res.status(500).json({
          error:"Internal Server Error"
      });
  }
}

// working for follow unfollow on follower section of ui
async function followAndUnfollow(req, res) {

  const userId = req.user.userId; // Extract user ID from token
  const { follwee_id } = req.body;

  if (!userId || !follwee_id) {
    return res.status(400).json({
      error: "UserID and follwee_id required",
    });
  }

  try {
    //check its follow yourself.
    if (parseInt(userId) === parseInt(follwee_id)) {
      return res.status(400).json({
        error: "You can not follow , Unfollow Yourself",
      });
    }

    const [
      existingdata,
    ] = await pool.execute(
      `SELECT * FROM followers WHERE follower_id = ? AND followee_id = ?`,
      // [userId, follwee_id]
      [follwee_id,userId ]
    );
    if (existingdata.length > 0) {
      await pool.execute(
        `DELETE FROM followers WHERE follower_id = ? AND followee_id  = ?`,
        // [userId, follwee_id]
        [follwee_id,userId ]
      );

      return res.status(200).json({
        message: "Successfully Unfollowed",
      });
    } else {
      await pool.execute(
        `INSERT INTO followers (follower_id , followee_id) VALUE (?,?)`,
        // [userId, follwee_id]
        [follwee_id,userId ]
      );

      return res.status(200).json({
        message: "Successfully follow",
      });
    }
  } catch (error) {
    console.log("===error===>", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

// working on follow unfollow on following section of ui
async function followAndUnfollowFollowing(req, res) {

  const userId = req.user.userId; // Extract user ID from token
  const { follwee_id } = req.body;

  if (!userId || !follwee_id) {
    return res.status(400).json({
      error: "UserID and follwee_id required",
    });
  }

  try {
    //check its follow yourself.
    if (parseInt(userId) === parseInt(follwee_id)) {
      return res.status(400).json({
        error: "You can not follow , Unfollow Yourself",
      });
    }

    const [
      existingdata,
    ] = await pool.execute(
      `SELECT * FROM followers WHERE follower_id = ? AND followee_id = ?`,
      [userId, follwee_id]
    );
    if (existingdata.length > 0) {
      await pool.execute(
        `DELETE FROM followers WHERE follower_id = ? AND followee_id  = ?`,
        [userId, follwee_id]
      );

      return res.status(200).json({
        message: "Successfully Unfollowed",
      });
    } else {
      await pool.execute(
        `INSERT INTO followers (follower_id , followee_id) VALUE (?,?)`,
        [userId, follwee_id]
      );

      return res.status(200).json({
        message: "Successfully follow",
      });
    }
  } catch (error) {
    console.log("===error===>", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}


async function likeToReply(req, res) {

  const user_id = req.user.userId; // extracting from token
  const { reply_id } = req.params;
  console.log("===reply_id==>", reply_id);
  console.log("===user_id==>", user_id);
  try {
    //check reply exist or not.
    // const [
    //   reply,
    // ] = await pool.execute(`SELECT * FROM reply_comment WHERE id = ? `, [
    //   reply_id,
    // ]);
    // if (reply.length === 0) {
    //   return res.status(404).json({
    //     error: "Reply not found",
    //   });
    // }

    const [
      existingLike,
    ] = await pool.execute(
      `SELECT * FROM reply_like WHERE reply_id = ? AND user_id = ?`,
      [reply_id, user_id]
    );

    if (existingLike.length > 0) {
      await pool.execute(
        `DELETE FROM reply_like WHERE reply_id = ? AND user_id = ?`,
        [reply_id, user_id]
      );

      return res.status(200).json({
        message: "Like Removed Successfully",
      });
    } else {
      await pool.execute(
        `INSERT INTO reply_like (reply_id, user_id ) VALUE (?,?)`,
        [reply_id, user_id]
      );

      return res.status(201).json({
        message: "Like Added SUccessfully.",
        data: {
          reply_id,
          user_id,
        },
      });
    }
  } catch (error) {
    console.log("===ERROR====>", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

async function sharePostWithFriends(req, res) {
  try {
    const UserId = req.user.userId;
    const { post_id, shared_to_id, thoughts, link } = req.body;

    if (!post_id || !UserId || !Array.isArray(shared_to_id))
      return res.status(400).json({
        error: "All fields are required.",
      });

    const sharedToIdJson = JSON.stringify(shared_to_id);

    await pool.execute(
      `INSERT INTO shared_post(post_id, user_id , shared_to_id, thoughts, link) VALUES(?,?,?,?,?)`,
      [post_id, UserId, sharedToIdJson, thoughts, link ]
    );

    return res.status(200).json({
      message: "Shared Post Successfully",
    });
  } catch (error) {
    console.log("==Error sharePostWithFrineds post===>", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

async function getPostData (req, res){
  try {
    const { postId } = req.params;
  
    const [postData] = await pool.execute(
      // SELECT * FROM posts WHERE id = ?,[postId]
      `SELECT 
        p.*,
        u.user_name,
        u.profile_image,
        u.full_name,
        u.badge,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS total_likes,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS total_comments,
          (SELECT COUNT(*) FROM shared_post s WHERE s.post_id = p.id) AS total_shared
      FROM 
        posts p
      JOIN 
        users u 
      ON 
         p.user_id = u.id 
        WHERE 
          p.id = ?
      `,[postId]
    )
  
    const post = postData[0];
    post.buddies_id = JSON.parse(post.buddies_id || "[]");
    post.tag_id = JSON.parse(post.tag_id || "[]");
    post.media_url = JSON.parse(post.media_url || "[]");
  
    return res.status(200).json({
      message:"Data Fatched",
      data:post
    })
  } catch (error) {
    console.log("====error====>",error);
    return res.status(500).json({
      error:"Error fetching Data"
    });
  }
  }

  /* to reply on a story */
  const replyOnStory = async (req, res) => {
    try {
      // const { user_id } = req.params; // Extract user_id from request parameters
      const user_id = req.user.userId;
      const { story_id, reply_text } = req.body; // Extract story_id and reply_text from the request body
  
      // Validate required fields
      if (!user_id || !story_id || !reply_text) {
        return res.status(400).json({
          message: "Missing required fields (user_id, story_id, or reply_text).",
        });
      }
  
      // Check if the story exists
      const [story] = await pool.execute(`SELECT id FROM stories WHERE id = ?`, [
        story_id,
      ]);
  
      if (story.length === 0) {
        return res.status(404).json({
          message: "Story not found.",
        });
      }
  
      // Insert the reply into the database
      const [result] = await pool.execute(
        `INSERT INTO story_replies (story_id, user_id, reply_text, created_at) VALUES (?, ?, ?, ?)`,
        [story_id, user_id, reply_text, new Date()]
      );
  
      return res.status(201).json({
        message: "Reply added successfully.",
        data: {
          reply_id: result.insertId,
          story_id,
          user_id,
          reply_text,
          created_at: new Date(),
        },
      });
    } catch (error) {
      console.error("Error in replyOnStory:", error);
      return res.status(500).json({
        error: "An error occurred while processing your request.",
      });
    }
  };

  /* to add a story */
  async function storeStory1(req, res) {
    try {

      const user_id = req.user.userId;
      const userName = req.user.userName
      const { media_url = [], tags = [], view = "Public", story_text = '' } = req.body;
     
      console.log("===media_url===>",media_url.length);
      // Validate required fields
      if (!user_id) {
        return res.status(400).json({
          message: "Missing required fields (user_id).",
        });
      }
  
      const storyImages = [];
      const created_at = new Date();
      const expires_at = new Date(created_at.getTime() + 12 * 60 * 60 * 1000); 
  
      // Validate and process media_url
      if (Array.isArray(media_url) && media_url.length > 0) {
        for (let image of media_url) {
          try {
            // Extract Base64 part of the image
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const extension = image.substring("data:image/".length, image.indexOf(";base64"));
            const fileName = `story_${Date.now()}.${extension}_${user_id}_${userName}`;
            const filePath = path.join(STORY_UPLOAD_DIR, fileName);
            const imagePath = `${process.env.APP_SERVER_URL}/uploads/story_img/${fileName}`;
            storyImages.push(imagePath);
  
            // Write image to file system
            await fs.promises.writeFile(filePath, base64Data, { encoding: "base64" });
          } catch (err) {
            console.error("Failed to save image:", err);
            return res.status(500).json({ error: "Failed to save image." });
          }
        }
      }
  
      // Insert the story into the database
      const [result] = await pool.execute(
        `INSERT INTO stories (
          user_id,
          tag,
          media_url,
          view,
          story_text,
          created_at,
          expires_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          user_id,
          JSON.stringify(tags), // Serialize tags as JSON
          JSON.stringify(storyImages), // Serialize media URLs as JSON
          view, // Default to 'active' if not provided
          JSON.stringify(story_text), // Story text,
          created_at,
          expires_at
        ]
      );
  
      // Respond with success message
      return res.status(200).json({
        message: "Story added successfully.",
        story_id: result.insertId, // Return the ID of the newly created story
      });
    } catch (error) {
      console.error("Error in storing story:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async function storeStory(req, res) {
    try {
      // const { user_id } = req.params;
      const user_id = req.user.userId;
      const userName = req.user.userName
      const {
        media_url = [],
        tags = [],
        view = "public",
        story_text = [],
      } = req.body;
  
      // Validate required fields
      if (!user_id) {
        return res.status(400).json({
          message: "Missing required fields (user_id).",
        });
      }
  
      const storyImages = [];
      const created_at = new Date();
      const expires_at = new Date(created_at.getTime() + 12 * 60 * 60 * 1000);
  
      // Validate and process media_url
      if (Array.isArray(media_url) && media_url.length > 0) {
        for (let image of media_url) {
          try {
            // Extract Base64 part of the image
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const extension = image.substring(
              "data:image/".length,
              image.indexOf(";base64")
            );
            const fileName = `story_${Date.now()}.${extension}_${user_id}_${userName}`;
            const filePath = path.join(STORY_UPLOAD_DIR, fileName);
            const imagePath = `${process.env.APP_SERVER_URL}/uploads/story_img/${fileName}`;
            storyImages.push(imagePath);
  
            // Write image to file system
            await fs.promises.writeFile(filePath, base64Data, {
              encoding: "base64",
            });
          } catch (err) {
            console.error("Failed to save image:", err);
            return res.status(500).json({ error: "Failed to save image." });
          }
        }
      }
  
      // Insert each image as a separate story record
      const queries = storyImages.map((image) =>
        pool.execute(
          `INSERT INTO stories (
            user_id,
            tag,
            media_url,
            view,
            story_text,
            created_at,
            expires_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            user_id,
            JSON.stringify(tags), // Serialize tags as JSON
            image, // Single media URL
            view,
            JSON.stringify(story_text), // Serialize story text as JSON
            created_at,
            expires_at,
          ]
        )
      );
  
      // Execute all insertion queries
      const results = await Promise.all(queries);
  
      // Collect inserted story IDs
      const storyIds = results.map((result) => result[0].insertId);
  
      // Respond with success message and story IDs
      return res.status(200).json({
        message: "Stories added successfully.",
        story_ids: storyIds,
      });
    } catch (error) {
      console.error("Error in storing story:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

// to store the count on story view
async function storeStoryView(req, res) {
  try {

    const { story_id } = req.params;
    const user_id = req.user.userId;  // extract the user id from token

    if (!story_id || !user_id) {
      return res.status(400).json({
        error: "Missign Fields are required",
      });
    }

    //check if story is exist.
    const [story] = await pool.execute(`SELECT * FROM stories WHERE id = ?`, [
      story_id,
    ]);

    if (story.length === 0) {
      return res.status(404).json({
        message: "This story is not found!!!",
      });
    }

    const [
      existingView,
    ] = await pool.execute(
      `SELECT * FROM story_views WHERE story_id = ? AND user_id = ?`,
      [story_id, user_id]
    );

    if (existingView.length > 0) {
      return res.status(200).json({
        message: "View allready Exist",
      });
    }

    await pool.execute(
      `INSERT INTO story_views (user_id , story_id) VALUES (?,?)`,
      [user_id, story_id]
    );

    return res.status(200).json({
      message: "Story View record successfully",
    });
  } catch (error) {
    console.log("=====errror======>",error);
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
}

// to delete a story
const deleteStory = async (req, res) => {
  try {
    // const { user_id } = req.params; // Extract user_id from request parameters
    const user_id = req.user.userId;  // extract the user id from token
    const {story_id} = req.params; // Extract story_id from request body
    console.table({
      user_id,
      story_id
    })
    // Validate required fields
    if (!user_id || !story_id) {
      return res.status(400).json({
        message: "Missing required fields (user_id or story_id).",
      });
    }

    // Check if the story exists and belongs to the logged-in user
    const [
      story,
    ] = await pool.execute(
      `SELECT id FROM stories WHERE id = ? AND user_id = ?`,
      [story_id, user_id]
    );

    if (story.length === 0) {
      return res.status(404).json({
        message: "Story not found or you do not have permission to delete it.",
      });
    }

    // Delete the story
    await pool.execute(`DELETE FROM stories WHERE id = ? AND user_id = ?`, [
      story_id,
      user_id,
    ]);

    return res.status(200).json({
      message: "Story deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting story:", err);
    return res.status(500).json({
      error: "An error occurred while deleting the story.",
    });
  }
};

const shareStoryWithFriends = async (req, res) => {
  try {
    // const { user_id } = req.params; // Extract user_id from request parameters
    const user_id = req.user.userId;  // extract the user id from token
    const { story_id } = req.body; // Extract story_id from request body

    // Validate required fields
    if (!user_id || !story_id) {
      return res.status(400).json({
        message: "Missing required fields (user_id or story_id).",
      });
    }

    // Check if the story exists
    const [story] = await pool.execute(`SELECT * FROM stories WHERE id = ?`, [
      story_id,
    ]);

    if (story.length === 0) {
      return res.status(404).json({
        message: "Story not found.",
      });
    }

    // Insert a record into the story_shares table
    const [
      result,
    ] = await pool.execute(
      `INSERT INTO story_shares (story_id, user_id, shared_at) VALUES (?, ?, ?)`,
      [story_id, user_id, new Date()]
    );

    return res.status(201).json({
      message: "Story shared successfully.",
      data: {
        share_id: result.insertId,
        story_id,
        user_id,
        shared_at: new Date(),
      },
    });
  } catch (error) {
    console.error("Error in shareStory:", error);
    return res.status(500).json({
      error: "An error occurred while processing your request.",
    });
  }
};

module.exports = {
    allPosts,
    postWithlikes,
    getActiveStories,
    getPostComments,
    getUserPosts,
    sharedPost,
    addBucketList,
    postComment,
    postLike,
    likeAnyComment,
    replyOnComment,
    storePost,
    deleteComments,
    deleteReply,
    followAndUnfollow,
    likeToReply,
    sharePostWithFriends,
    followAndUnfollowFollowing,
    getPostData,
    communityPagePosts,
    likeStory,
    replyOnStory,
    storeStory,
    storeStoryView,
    deleteStory,
    shareStoryWithFriends
}