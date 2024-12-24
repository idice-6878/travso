const pool = require("../utils/db");

async function addstory(req , res){
  try {
    const { userid } = req.params;
    const { media_url }  = req.body;
    const [storyData] = await pool.execute(
        `INSERT INTO story (user_id, media_url) VALUES(?,?)`,[userid, media_url ]
    );

    return res.status(200).json({
        message:"Story are successfully published.",
        data: storyData
    })
  } catch (error) {
    console.log("==========ERROR POSTINF STORY=====>",error);
    return res.status(500).json({
        error: "Error Posting Story"
    });
  }

}


async function storeStorys(req, res) {
  try {
    // POST_UPLOAD_DIR
    // const user_id = req.user.userId; // extrcting from token

    const { user_id } = req.params;
  
    const {
      media_url,
      tags,
      view,
      story_text,
    } = req.body;

    // Validate required fields
    if (!user_id ) {
      return res.status(400).json({
        message: "Missing required fields (user_id).",
      });
    }

    const storyImages = [];

    if(media_url.length > 0) {
      for(let image of media_url) {
        // Extract Base64 part of the image
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const extension = image.substring("data:image/".length, image.indexOf(";base64"));
        const fileName = `post_${Date.now()}.${extension}_${user_id}`;
        const filePath = path.join(POST_UPLOAD_DIR, fileName);
        const imagePath = `${process.env.APP_SERVER_URL}/uploads/post_img/${fileName}`;
        storyImages.push(imagePath);

        fs.writeFile(filePath, base64Data, { encoding: "base64" }, async(err) => {
          if (err) {
            return res.status(500).json({ error: "Failed to save image" });
          }
        });
        console.log("=====imagePath====>", imagePath);
      }
    }


    // Insert the post into the database
    const [result] = await pool.execute(
      `INSERT INTO stories (
        user_id,
        tag,
        media_url,
        view,
        story_text
      ) VALUES (?, ?, ?, ?, ?)`,
      [
        user_id,
        JSON.stringify(tags) || [],
        JSON.stringify(storyImages) || [], // Default to empty JSON array
        JSON.stringify(story_text) || [], // Default to empty JSON array
        view || "", // Default to 'active'
   
      ]
    );

    // Respond with success message
    return res.status(200).json({
      message: "Story Added  successfully.",
      post_id: result.insertId, // Return the ID of the newly created post
    });
  } catch (error) {
    console.error("Error in storing story", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

async function storeStory(req, res) {
  try {
    const { user_id } = req.params;
    const { media_url = [], tags = [], view = "public", story_text = [] } = req.body;

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
          const fileName = `post_${Date.now()}.${extension}_${user_id}`;
          const filePath = path.join(POST_UPLOAD_DIR, fileName);
          const imagePath = `${process.env.APP_SERVER_URL}/uploads/post_img/${fileName}`;
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
        JSON.stringify(story_text), // Story text
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

async function getActiveStory(req, res){
  try {
    const {userid} = req.params;

    const  [data]  = await pool.execute(
      `SELECT * FROM stories WHERE user_id  = ? AND expires_at = NOW()`,[userid]
    );

    return res.status(200).json({
      message:"All Actives Stories.",
      data:data
    });
    
  } catch (error) {
    console.log("===error===",error);
    return res.status(500).json({
      error:"error fetching active stories"
    });
  }
}

async function getArchive(req , res){
  try {
    const {userId} = req.params;
    const [ data ] = await pool.execute(
      `SELECT * FROM stories WHERE user_id = ? AND expires_at < CURRENT_TIMESTAMP`,[userId]
    )
    return res.status(200).json({
      message:"Archive Story Fetched.",
      data:[ data ]
    });

  } catch (error) {
    console.log("====ERROR====>",error);
    return res.status(500).json({
      error:"Error Fetching stories"
    });
  }
}

// async function suggestions(req ,res){
//   try {
//     const {userId} = req.params;
//     const { data } = await pool.execute(
//       `SELECT * FROM users where user_id = ? `
//     )
//   } catch (error) {
//     return res.status(500).json({
//       error:"Error gitting suggestions"
//     });
//   }
// }


module.exports = {
addstory,
storeStory,
getArchive,
getActiveStory
};