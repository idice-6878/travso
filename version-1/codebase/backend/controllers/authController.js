const pool = require("../utils/db");
const twilio = require("twilio");
const bcrypt = require("bcrypt");
const puppeteer = require('puppeteer');
const generateOTP = require("../utils/generateOTP");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fileUpload = require('express-fileupload');
const sendMobileOTP = require("../utils/sendMobileOTP");
const path = require('path');
const fs = require('fs');
// const UPLOAD_DIR = require('../server/UPLOAD_DIR');

const PROFILE_UPLOAD_DIR = path.join(__dirname, "../uploads/profile_img");
const COVER_UPLOAD_DIR = path.join(__dirname, "../uploads/cover_img");

async function registerUser(req, res) {
  try {
    const { fullName, gender, dob, state, city, email, mobileNumber } = req.body; 

    const [existingUsers] = await pool.execute(
      "SELECT * FROM users WHERE email = ? OR mobile_number = ?",
      [email, mobileNumber]
    );

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];

      // Compare existing values with the provided ones
      if (
        existingUser.email === email &&
        existingUser.mobile_number === mobileNumber
      ) {
        if (existingUser.isOtpVerified === 0) {
          // console.log("yes i am in isOtpVerified")
          return res
            .status(200)
            .json({ message: "User is registered" });
        } else {
          return res
            .status(400)
            .json({
              error:
                "User already registered with the same email and mobile number",
            });
        }
      } else {
        return res
          .status(409)
          .json({ error: "Email or mobile number already registered" });
      }
    }

    // Split the full name into parts
  const nameParts = fullName.trim().split(/\s+/); // Split by spaces, ignoring multiple spaces

  let firstName = nameParts[0];
  let lastName = nameParts.slice(1).join(' '); // Join the rest as last name

  // Handle edge cases where only one name is provided
  if (nameParts.length === 1) {
    lastName = ''; // If no last name, set to empty string
  }

    // generate otp
    const otp = await generateOTP();
    console.log("====otp====>", otp);

    
    // Proceed with the insertion if no conflicts
    const valuesToInsert = [
      fullName,
      gender,
      dob,
      state,
      city,
      email,
      mobileNumber,
      otp,
      0,
      0,
      'traveler',
      firstName,
      lastName
    ];

    // console.log("=====valuesToInsert===>", valuesToInsert);

    const [result] = await pool.execute(
      "INSERT INTO users (full_name, gender, dob, state, city, email, mobile_number, otp, isOtpVerified, is_influencer, user_type, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      valuesToInsert
    );


    // Retrieve the inserted ID
    const insertedUserId = result.insertId;

    // Fetch the newly inserted user's data
    const [userResult] = await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [insertedUserId]
    );

    // Get the user details
    // const insertedUser = userResult[0];

    // console.log(insertedUser);

    // res
    //   .status(200)
    //   .json({ message: "User Registered Successfully", user: insertedUser });

    return res
      .status(200)
      .json({ message: "User Registered Successfully" });

  } catch (error) {
    console.log('error in register', error);
    res.status(500).json({ message: "Internal server error" });
  }
  // res.status(200).json({'message': 'api working'})
}

async function sendOTP(req, res) {
  try {
    const { mobileNumber } = req.body;

    // find user by mobile number
    const [user] = await pool.execute(
      "SELECT * FROM users WHERE mobile_number = ?",
      [mobileNumber]
    );

    if (user.length === 0) {
      res.status(404).json({ error: "No User Found" });
      return;
    }

    if (user[0].isOtpVerified !== 0) {
      return res.status(409).json({ error: "User is already registered" });
    }

    // Your Twilio Account SID and Auth Token
    const accountSid = process.env.TWILIO_ACCOUNTSID;
    const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN;

    // Create a Twilio client
    const client = await twilio(accountSid, authToken);

    // Send the SMS
    // const otpSent = await client.messages
    //   .create({
    //     body: `Your OTP is ${user[0].otp}`,
    //     // from: '+13858316478',
    //     from: process.env.TWILIO_MOBILE_NUMBER,
    //     to: `+91${user[0].mobile_number}`,
    //     // to: '+918720096457'
    //   })
    //   .then((message) =>  true)
    //   .catch((error) => false);

    //   console.log("=====otpSent===>", otpSent);
    //   if(otpSent) {
    //     return res
    //     .status(200)
    //     .json({ message: "OTP sent successfully" });
    //   } else {
    //     return res.status(404).json({ error: "Something went wrong while generating OTP" });
    //   }

    const result = await sendMobileOTP(user[0].otp, mobileNumber);

    // const otpResult = await fetch(`http://cloud.smsindiahub.in/vendorsms/pushsms.aspx?APIKey=lUvHtyPCL0mIz0T3Y5hTBg&msisdn=${mobileNumber}&sid=AREPLY
    //   &msg=Your One Time Password is ${user[0].otp}. Thanks SMSINDIAHUB&fl=0&gwid=2`)
      
    //       console.log("===otpResult====>", otpResult);

    // if (result.success) {
    //   return res.status(200).json({ message: result.message });
    // } else {
    //   return res.status(500).json({ error: result.error });
    // }


      return res
      .status(200)
      .json({ message: "OTP sent successfully" });
    
  } catch (err) {
    console.log("error in catch part send otp", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// old working fine
// async function verifyOTP(req, res) {

//     try {
//         const { mobileNumber, otp } = req.body;

//         // find user by mobile number
//         const [user] = await pool.execute(
//             "SELECT * FROM users WHERE mobile_number = ?",
//             [mobileNumber]
//         );

//         if(user.length === 0) {
//             return res.status(404).json({error: "No User with this mobile number Found"});
//         }

//         if(otp == user[0].otp) {
//             return res.status(200).json({message: 'OTP verified'});
//         } else {
//             return res.status(400).json({error: 'Invalid OTP'});
//         }

//     } catch (error) {
//         console.log("error in catch part verify otp", err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// }

async function verifyOTP(req, res) {
  try {
    const { mobileNumber, otp } = req.body;

    // find user by mobile number
    const [user] = await pool.execute(
      "SELECT * FROM users WHERE mobile_number = ?",
      [mobileNumber]
    );

    if (user.length === 0) {
      return res
        .status(404)
        .json({ error: "No User with this mobile number Found" });
    }

    if (otp == user[0].otp) {
      // Update the isOtpVerified field to 1 and set otp to NULL if the OTP matches
      // const [updateResult] = await pool.execute(
      //     "UPDATE users SET isOtpVerified = 1, otp = NULL WHERE email = ? AND mobile_number = ? AND otp = ?",
      //     [user[0].email, mobileNumber, otp]
      // );

      // // Check if any row was updated
      // if (updateResult.affectedRows === 0) {
      //     return res.status(400).json({ error: "Invalid email, mobile number, or OTP" });
      // }

      return res.status(200).json({ message: "OTP verified" });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.log("error in catch part verify otp", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function resendOTP(req, res) {
  const { email, mobileNumber } = req.body;
    try {

        // find user by mobile number and email
        const [user] = await pool.execute(
            "SELECT * FROM users WHERE email = ? AND mobile_number = ?",
            [email, mobileNumber]
        );
  
      if (user.length === 0) {
        res.status(404).json({ error: "No User Found" });
        return;
      }
  
      if (user[0].isOtpVerified !== 0 ) {
        return res.status(409).json({ error: "User is already registered" });
      }

        const otp = await generateOTP();

        const otpSentResult = await sendMobileOTP(otp, mobileNumber);

        // if otp sent succesfully,  commented till testing
          // if (otpSentResult.success) {
          //   // Update OTP in the database
          //       const [result] = await pool.execute(
          //         "UPDATE users SET otp = ? WHERE id = ? AND email = ? AND mobile_number = ?",
          //         [otp, user[0].id, email, mobileNumber]
          //     );

          //     // Validate if the update was successful
          //     if (result.affectedRows === 0) {
          //         return res.status(500).json({ error: "Failed to update OTP. Please try again later." });
          //     }
          //   return res.status(200).json({ message: otpSentResult.message });
          // } else {
          //   return res.status(500).json({ error: otpSentResult.error });
          // }


        // Update OTP in the database
        const [result] = await pool.execute(
            "UPDATE users SET otp = ? WHERE id = ? AND email = ? AND mobile_number = ?",
            [otp, user[0].id, email, mobileNumber]
        );

        // Validate if the update was successful
        if (result.affectedRows === 0) {
            return res.status(500).json({ error: "Failed to update OTP. Please try again later." });
        }

        // Respond with success
        return res.status(200).json({ message: "OTP resent successfully" });

    } catch (err) {
        console.log("error in catch part resend otp", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function finalSignUp(req, res) {

  try {
    const {
      city,
      dob,
      email,
      fullName,
      gender,
      isInfluencer,
      mobileNumber,
      password,
      state,
      userName,
    } = req.body;

    // Check if the username already exists in the database
    const [existingUsers] = await pool.execute(
      `SELECT user_name FROM users WHERE user_name = ?`,
      [userName]
    );

    if (existingUsers.length > 0) {
      // If a user with the same username exists, return an error
      return res.status(400).json({ error: "Username already exists. Please choose a different username." });
    }

    // Hash the password
    const saltRounds = 10; // Adjust based on security needs
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user in the database using email and mobile number
    const [result] = await pool.execute(
      `UPDATE users 
             SET city = ?, dob = ?, full_name = ?, gender = ?, 
                 password = ?, state = ?, user_name = ?
             WHERE email = ? AND mobile_number = ?`,
      [
        city,
        dob,
        fullName,
        gender,
        hashedPassword,
        state,
        userName,
        email,
        mobileNumber,
      ]
    );

    // Check if any rows were updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the updated user details
    const [updatedUser] = await pool.execute(
      `SELECT * FROM users WHERE email = ? AND mobile_number = ?`,
      [email, mobileNumber]
    );

    const token = await jwt.sign({ userId: updatedUser[0].id, email: updatedUser[0].email, userName: updatedUser[0].user_name }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    
    const userData = {
      id: updatedUser[0].id,
      dob: updatedUser[0].dob,
      created_at: updatedUser[0].created_at,
      user_name: updatedUser[0].user_name,
      profile_image: updatedUser[0].profile_image,
      cover_image: updatedUser[0].cover_image,
      description: updatedUser[0].description,
      first_name: updatedUser[0].first_name,
      last_name: updatedUser[0].last_name,
      city: updatedUser[0].city,
      state: updatedUser[0].state,
      gender: updatedUser[0].gender,
      full_name: updatedUser[0].full_name,
    };
    return res.status(200).json({ message: "User updated successfully", token, data: userData });

 
  } catch (err) {
    console.error("Error in catch part final update", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getFollowersCount1(req, res) {
  try {
    const { smlink1, mobileNumber, email } = req.body;
    // console.log("====smlink1====>", smlink1);
    // Launch Puppeteer and open a new browser instance
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to Instagram profile URL
    // const url = 'https://www.instagram.com/nikhil__patankar/';
    const url = smlink1;
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extract meta tag content (e.g., followers, following, posts)
    const data = await page.evaluate(() => {
        const metaTags = {};
        document.querySelectorAll('meta').forEach(tag => {
            if (tag.getAttribute('property')) {
                metaTags[tag.getAttribute('property')] = tag.getAttribute('content');
            }
        });
        return metaTags;
    });

    // Extract followers count from the og:description meta tag
    const description = data['og:description'] || '';
    const followersMatch = description.match(/(\d+) Followers/); // Match the number of followers

    let followersCount = null;
    if (followersMatch && followersMatch[1]) {
        followersCount = followersMatch[1]; // Get the first capturing group
    }

    // Close the browser
    await browser.close();

    const [user] = await pool.execute(
      "SELECT * FROM users WHERE email = ? OR mobile_number = ?",
      [email, mobileNumber]
    );

    // set user as influencer if followers are more than 3000 otherwise traveler
    if(followersCount > 3000) {
      // update user type to influencer
      const [updateResult] = await pool.execute(
        "UPDATE users SET is_influencer = ?, user_type = ?, smlink1 = ? WHERE id = ? AND email = ? AND mobile_number = ?",
        [1, 'influencer', smlink1 ,user[0].id, email, mobileNumber]
      );

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
    
      return res.status(200).json({ setInfluencer: true });
    } else {
     // update user type to traveler
      const [updateResult] = await pool.execute(
        "UPDATE users SET is_influencer = ?, user_type = ?, smlink1 = ? WHERE id = ? AND email = ? AND mobile_number = ?",
        [0, 'traveler', smlink1, user[0].id, email, mobileNumber]
      );

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ setInfluencer: false });
    }

    // Send extracted data as response
    // res.status(200).json({
    //     success: true,
    //     data: {
    //         instaFollowers: followersCount,  // Add the followers count to the response
    //     },
    // });
  } catch (err) {
    console.error("Error in catch part final update", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getFollowersCount(req, res) {
  try {
    const { smlink1, smlink2, mobileNumber, email } = req.body;
    // console.log("====smlink1====>", smlink1);

      const [user] = await pool.execute(
        "SELECT * FROM users WHERE email = ? OR mobile_number = ?",
        [email, mobileNumber]
      );
  
      // update user type to influencer
      const [updateResult] = await pool.execute(
        "UPDATE users SET is_influencer = ?, user_type = ?, smlink1 = ?, smlink2 = ?, WHERE id = ? AND email = ? AND mobile_number = ?",
        [1, 'influencer', smlink1, smlink2 ,user[0].id, email, mobileNumber]
      );

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
    
      return res.status(200).json({ setInfluencer: true });


    // Send extracted data as response
    // res.status(200).json({
    //     success: true,
    //     data: {
    //         instaFollowers: followersCount,  // Add the followers count to the response
    //     },
    // });
  } catch (err) {
    console.error("Error in catch part final update", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const [user] = await pool.execute(
      "SELECT * FROM users WHERE user_name = ?",
      [username]
    );

    // return if no user is found
    if (user.length === 0) {
      res.status(404).json({ error: "No User Found" });
      return;
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT
    const token = await jwt.sign({ userId: user[0].id, email: user[0].email, userName: user[0].user_name }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    const [result] = await pool.execute(
      "UPDATE users SET is_online = ? WHERE id = ? AND email = ?",
      [1, user[0].id, user[0]?.email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Login successful", token, is_follow_selected: user[0].is_follow_selected });

  } catch (err) {
    console.log("Error in catch part login api", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function sendEmailOTP(req, res) {
  try {
    const { email, userName } = req.body;
    const otp = generateOTP(); // Generate OTP

    const [user] = await pool.execute(
      "SELECT * FROM users WHERE user_name = ? AND email = ?",
      [userName, email]
    );

    // return if no user is found
    if (user.length === 0) {
      res.status(404).json({ error: "No User Found" });
      return;
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Replace with your email service provider (e.g., Gmail, Outlook, etc.)
      auth: {
        user: process.env.APP_EMAIL, // Your email
        pass: process.env.APP_PASSWORD, // Your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.APP_EMAIL, // Sender address
      to: email, // Receiver's email address
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };


    // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);

      // Validate if the email was sent successfully
      // The receiving server returns a 250 response code when it has successfully processed an SMTP command.
      if (!info || !info.response.includes("250")) {
        return res.status(500).json({ error: "Failed to send email. Please try again later." });
      }

    // Update OTP in the database
    const [result] = await pool.execute(
      "UPDATE users SET otp = ? WHERE id = ? AND email = ?",
      [otp, user[0].id, email]
    );

    // Validate if the update was successful
    if (result.affectedRows === 0) {
        return res.status(500).json({ error: "Failed to update OTP. Please try again later." });
    }

    return res.status(200).json({ message: 'OTP sent successfully' });

  } catch (error) {
    console.log("Error in catch part send email otp api", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function sendOTPForgotPassword(req, res) {
  try {
    const { mobileNumber, userName } = req.body;
    const otp = generateOTP(); // Generate OTP

    const [user] = await pool.execute(
      "SELECT * FROM users WHERE user_name = ? AND mobile_number = ?",
      [userName, mobileNumber]
    );

    // return if no user is found
    if (user.length === 0) {
      res.status(404).json({ error: "No User Found" });
      return;
    }

    const otpSentResult = await sendMobileOTP(otp, mobileNumber);

            // if otp sent succesfully,  commented till testing
          // if (otpSentResult.success) {
          //   // Update OTP in the database
          //       const [result] = await pool.execute(
          //         "UPDATE users SET otp = ? WHERE id = ? AND mobile_number = ?",
          //         [otp, user[0].id, mobileNumber]
          //     );

          //     // Validate if the update was successful
          //     if (result.affectedRows === 0) {
          //         return res.status(500).json({ error: "Failed to update OTP. Please try again later." });
          //     }
          //   return res.status(200).json({ message: otpSentResult.message });
          // } else {
          //   return res.status(500).json({ error: otpSentResult.error });
          // }


        // Update OTP in the database
        const [result] = await pool.execute(
          "UPDATE users SET otp = ? WHERE id = ? AND mobile_number = ?",
          [otp, user[0].id, mobileNumber]
      );

      // Validate if the update was successful
      if (result.affectedRows === 0) {
          return res.status(500).json({ error: "Failed to update OTP. Please try again later." });
      }

      // Respond with success
      return res.status(200).json({ message: "OTP resent successfully" });


  } catch (error) {
    console.log("Error in catch part send mobile otp api", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function forgotPassVerify(req, res) {

  try {
     const { mobileNumber, email, userName, otp } = req.body;
     let user;
     if(mobileNumber) {
      // console.log("in mobile block");
      [user] = await pool.execute(
        "SELECT * FROM users WHERE user_name = ? AND mobile_number = ?",
        [userName, mobileNumber]
      );
     } else if(email) {
      // console.log("in email block");
      [user] = await pool.execute(
        "SELECT * FROM users WHERE user_name = ? AND email = ?",
        [userName, email]
      );
     }
  
     // return if no user is found
      if (user.length === 0) {
        res.status(404).json({ error: "No User Found" });
        return;
      }

      // OTP matches or not
      if(otp === user[0].otp) {
        return res.status(200).json({ message: 'OTP Verified Successfully'});
      } else {
        return res.status(400).json({ error: "Invalid OTP" });
      }
  } catch (error) {
    console.log("Error in catch part verify forgot password otp api", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updatePassword(req, res) {
  try {
    const { mobileNumber, email, userName, password } = req.body;
     let user;
     if(mobileNumber) {
      // console.log("in mobile block");
      [user] = await pool.execute(
        "SELECT * FROM users WHERE user_name = ? AND mobile_number = ?",
        [userName, mobileNumber]
      );
     } else if(email) {
      // console.log("in email block");
      [user] = await pool.execute(
        "SELECT * FROM users WHERE user_name = ? AND email = ?",
        [userName, email]
      );
     }
  
     // return if no user is found
      if (user.length === 0) {
        res.status(404).json({ error: "No User Found" });
        return;
      }

      // Hash the password
      const saltRounds = 10; // Adjust based on security needs
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const [result] = await pool.execute(
        `UPDATE users 
               SET password = ?
               WHERE email = ? AND mobile_number = ?`,
        [
          hashedPassword,
          user[0].email,
          user[0].mobile_number
        ]
      );
     
      // Check if any rows were updated
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ message: 'Password Updated Successfully' });
  } catch (error) {
    console.log("Error in catch part updatePassword api", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserBuddies1(req, res) {
  try {
    // const { id } = req.params;
    const userId = req.user.userId; // Assuming `id` is part of the token payload

    // get buddies according to userid
    const [buddies] = await pool.execute(
      "SELECT * FROM buddies WHERE user_id = ?",
      [userId]
    );

    const buddiesIds = buddies.map(buddy => buddy.buddies_id);

    if (buddiesIds.length === 0) {
      return res.status(404).json({ message: "No buddies found." });
    }

     // Fetch details from users_table using the buddies_id
    const placeholders = buddiesIds.map(() => '?').join(','); // Create placeholders for IN clause

    const [buddiesDetails] = await pool.execute(
      `SELECT id, full_name, user_name, profile_image FROM users WHERE id IN (${placeholders})`,
      buddiesIds
    );

    return res.status(200).json({ message: "Buddies fetched successfully", data: buddiesDetails});
  } catch (error) {
    console.log("Error in catch part getUserBuddies api", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserBuddies(req, res) {
  try {
    
    const userId = req.user.userId;
    const [buddies] = await pool.execute(
      `
      SELECT DISTINCT
        u.id,
        u.profile_image,
        u.full_name,
        u.user_name,
        u.cover_image,
        u.is_influencer,
        u.description,
        EXISTS (
          SELECT 1 
          FROM buddies 
          WHERE user_id = u.id AND buddies_id = ?
        ) AS is_buddies,
         EXISTS (
          SELECT 1 
          FROM followers f1
          WHERE f1.follower_id = ? AND f1.followee_id = u.id
        ) 
        AND EXISTS (
          SELECT 1
          FROM followers f2
          WHERE f2.follower_id = u.id AND f2.followee_id = ?
        ) AS is_followers,
        (
          SELECT COUNT(*)
          FROM followers
          WHERE followee_id = u.id
        ) AS followers_count,
          (
          SELECT COUNT(*)
          FROM buddies
          WHERE user_id = u.id
        ) AS buddies_count
      FROM 
        buddies b
      JOIN 
        users u  
      ON 
        b.buddies_id = u.id
      WHERE 
        b.user_id = ? 
        AND EXISTS (
          SELECT 1 
          FROM buddies 
          WHERE user_id = u.id AND buddies_id = ?
        )
      `,
      [userId, userId, userId, userId, userId] // Pass userId for both user-to-buddy and buddy-to-user checks
    );

    console.log("===buddies data====>", buddies);
    return res.status(200).json({
      message: "Data fetched successfully",
      data: buddies,
    });
  } catch (error) {
    console.error("===error fetching buddies====>", error);
    return res.status(500).json({
      error: "An error occurred while fetching data",
    });
  }
}

// async function getUserFollower(req, res) {
//   try {
//     //  const { id } = req.params  // extract user id from params
//     const userId = req.user.userId; // Assuming `id` is part of the token payload

//      const [followers] = await pool.execute(
//       "SELECT * FROM followers WHERE follower_id = ?",
//       [userId]
//     );

//     const followingIds = followers.map(user => user.followee_id);

//     if (followingIds.length === 0) {
//       return res.status(404).json({ message: "No Follower found" });
//     }

//     const placeholders = followingIds.map(() => '?').join(','); // Create placeholders for IN clause

//     const [followeeDetails] = await pool.execute(
//       `SELECT id, full_name, user_name, profile_image FROM users WHERE id IN (${placeholders})`,
//       followingIds
//     );

//      return res.status(200).json({message: "followers fetched successfully", data: followeeDetails})
//   } catch (error) {
//     console.log("Error in catch part getUserFollower api", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// } 



// API to get user followers
async function getUserFollower1(req, res) {
  try {
    const userId = req.user.userId; // Assuming `userId` comes from the token payload

    // Fetch followers of the user
    const [followers] = await pool.execute(
      "SELECT * FROM followers WHERE followee_id = ?",
      [userId]
    );

    // const followingIds = followers.map((user) => user.followee_id);
    const followingIds = followers.map((user) => user.follower_id);

    if (followingIds.length === 0) {
      return res.status(404).json({ message: "No Follower found" });
    }

    // Fetch users that the current user is following
    const [following] = await pool.execute(
      "SELECT follower_id FROM followers WHERE followee_id = ?",
      [userId]
    );

    const userFollowingIds = new Set(following.map((f) => f.follower_id)); 
    const placeholders = followingIds.map(() => "?").join(","); // Create placeholders for IN clause

    // Fetch followee details
    const [followeeDetails] = await pool.execute(
      `SELECT id, full_name, user_name, profile_image FROM users WHERE id IN (${placeholders})`,
      followingIds
    );

    // Add isMutual field
    const enrichedFollowees = followeeDetails.map((followee) => ({
      ...followee,
      isMutual: userFollowingIds.has(followee.id),
    }));

    return res
      .status(200)
      .json({
        message: "Followers fetched successfully",
        data: enrichedFollowees,
      });
  } catch (error) {
    console.log("Error in catch part getUserFollower API", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserFollower(req , res){
  
  try {
    const userId = req.user.userId;
    const [followers] = await pool.execute(
      ` SELECT 
        u.id,
        u.user_name,
        u.full_name,
        u.profile_image,
        u.cover_image,
        u.description,
        u.is_influencer,
        EXISTS (
          SELECT 1 
          FROM followers 
          WHERE follower_id = ? AND followee_id = u.id
        ) AS is_mutual,
         EXISTS(
         SELECT 1
         FROM buddies b1
         WHERE b1.user_id = ? AND b1.buddies_id = u.id 
        ) AND EXISTS(
          SELECT 1
          FROM buddies b2
          WHERE b2.user_id = u.id AND buddies_id = ?
         ) AS is_buddies
      FROM 
        followers f
      JOIN 
        users u 
      ON 
        f.follower_id = u.id
      WHERE 
        f.followee_id = ?
      ` ,[userId,userId,userId,userId ]
    )

    return res.status(200).json({
      message:"followers fetched",
      data:followers
    });
    
  } catch (error) {
    console.log("=====followeers====>",error)
    return res.status(500).json({
      error:"error followers fetched",

    });
  }
}

async function toWhomUserFollows1(req, res) {
  try {

    const userId = req.user.userId;
    
    // Fetch user to whom user follows
    const [userFollowing] = await pool.execute(
      "SELECT * FROM followers WHERE followee_id = ?",
      [userId]
    );

    const followingIds = userFollowing.map((user) => user.follower_id);

    if (followingIds.length === 0) {
      return res.status(404).json({ message: "No Follower found" });
    }

    const placeholders = followingIds.map(() => "?").join(","); // Create placeholders for IN clause

    // Fetch follower details
    const [followerDetail] = await pool.execute(
      `SELECT id, full_name, user_name, profile_image FROM users WHERE id IN (${placeholders})`,
      followingIds
    );

    return res
      .status(200)
      .json({
        message: "Following fetched successfully",
        data: followerDetail,
      });


  } catch (error) {
    console.log("Error in catch part toWhomUserFollows API", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function toWhomUserFollows(req , res){
  
  try {
  
    const userId = req.user.userId;
    const [followers] = await pool.execute(
      ` SELECT 
        u.id,
        u.user_name,
        u.full_name,
        u.profile_image,
        u.cover_image,
        u.is_influencer,
        EXISTS (
          SELECT 1 
          FROM followers 
          WHERE follower_id = ? AND followee_id = u.id
        ) AS is_mutual,
         EXISTS(
         SELECT 1
         FROM buddies b1
         WHERE b1.user_id = ? AND b1.buddies_id = u.id 
        ) AND EXISTS(
          SELECT 1
          FROM buddies b2
          WHERE b2.user_id = u.id AND buddies_id = ?
         ) AS is_buddies
      FROM 
        followers f
      JOIN 
        users u 
      ON 
        f.followee_id = u.id
      WHERE 
        f.follower_id = ?
      ` ,[userId,userId, userId,userId ]
    )

    return res.status(200).json({
      message:"followee fetched",
      data:followers
    });
    
  } catch (error) {
    console.log("=====followeers====>",error)
    return res.status(500).json({
      error:"error followee fetched",

    });
  }
}

// function to get user details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming `id` is part of the token payload
    // console.log("===userId===>", userId);
    // const { userId } = req.params;


    // Query to fetch user details
    const [rows] = await pool.query(
      "SELECT id, dob, email, created_at, user_name, profile_image, cover_image, description, first_name, last_name, city, state, gender, full_name, badge FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message:'Profile Fetched', data: rows[0] });
  } catch (error) {
    console.error("Error in getUserDetails API", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async(req, res) => {
  try {
    const userId = req.user.userId; // Assuming `id` is part of the token payload
    const { firstName, lastName, gender, city, description, badge } = req.body;
  
    const fullName = `${firstName} ${lastName}`;
    // Update user in the database using email and mobile number
    const [updateResult] = await pool.execute(
      `UPDATE users 
             SET first_name = ?, last_name = ?, full_name = ?, city = ?, description = ?, gender = ?, badge = ?
             WHERE id = ?`,
      [
        firstName,
        lastName,
        fullName,
        city,
        description,
        gender,
        badge,
        userId,
      ]
    );

    // Check if any rows were updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }


    return res.status(200).json({ message: 'Data Updated Successfully' });
  } catch (error) {
    console.error("Error in updateUser API", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function insertProfileImage(req, res) {

  try {
    // Assuming req.user contains the authenticated user details
    const userId = req.user.userId;
    const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  // Extract Base64 part of the image
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const extension = image.substring("data:image/".length, image.indexOf(";base64"));
  const fileName = `profile_${Date.now()}.${extension}`;
  const filePath = path.join(PROFILE_UPLOAD_DIR, fileName);
  const imagePath = `${process.env.APP_SERVER_URL}/uploads/profile_img/${fileName}`;
  fs.writeFile(filePath, base64Data, { encoding: "base64" }, async(err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save image" });
    }

       const [result] = await pool.execute(
        'UPDATE users SET profile_image = ? WHERE id = ?',
         [imagePath, userId]
       );
    
       // Check if the user was found and updated
       if (result.affectedRows === 0) {
         return res.status(404).json({ error: "User not found" });
       }

    // Save the file path or URL in the database (if needed)
     res.status(201).json({ message: "Image uploaded and saved" });
  });

  } catch (error) {
    console.log("Error in insertProfileImage:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// for uploading cover image
async function uploadCoverImage(req, res) {

  try {
    // Assuming req.user contains the authenticated user details
    const userId = req.user.userId;
    const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  // Extract Base64 part of the image
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const extension = image.substring("data:image/".length, image.indexOf(";base64"));
  const fileName = `profile_${Date.now()}.${extension}`;
  const filePath = path.join(COVER_UPLOAD_DIR, fileName);
  const imagePath = `${process.env.APP_SERVER_URL}/uploads/cover_img/${fileName}`;
  fs.writeFile(filePath, base64Data, { encoding: "base64" }, async(err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save image" });
    }

       const [result] = await pool.execute(
        'UPDATE users SET cover_image = ? WHERE id = ?',
         [imagePath, userId]
       );
    
       // Check if the user was found and updated
       if (result.affectedRows === 0) {
         return res.status(404).json({ error: "User not found" });
       }

    // Save the file path or URL in the database (if needed)
     res.status(201).json({ message: "Image uploaded and saved" });
  });

  } catch (error) {
    console.log("Error in insertProfileImage:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function removeProfileImage(req, res) {
  try {
    const userId = req.user.userId; // extract user id from token
    console.log("=======userId======>", userId);

    // Execute SQL query to update profile_image
    const [result] = await pool.execute(
      'UPDATE users SET profile_image = ? WHERE id = ?',
      [null, userId]
    );

    if(result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found'});
    }

    return res.status(200).json({message:'Profile image removed successfully'});
  } catch (error) {
    console.log("Error removing profile image:", error); // Log actual error
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getallUsers(req , res){
  try {
    const [allusers] = await pool.execute(

      `SELECT 
              u.id,
              u.full_name,
              u.email,
              u.profile_image,
              u.user_name,
              (SELECT COUNT(*) FROM followers f WHERE f.follower_id = u.id) As total_followers
        FROM 
              users u
        WHERE
              is_active;`
    );
   
    return res.status(200).json({
      message:"All users Fetched",
      data: allusers
    })
  } catch (error) {
    console.log("==error==getallUsers=>", error)
    return res.status(500).json({
      error: "Internal Server Error"
    })
  }
}

async function removeCoverImage(req, res) {
  try {
    const userId = req.user.userId; // extract user id from token

    // Execute SQL query to update profile_image
    const [result] = await pool.execute(
      'UPDATE users SET cover_image = ? WHERE id = ?',
      [null, userId]
    );

    if(result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found'});
    }

    return res.status(200).json({message:'Cover image removed successfully'});
  } catch (error) {
    console.log("Error removing profile image:", error); // Log actual error
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function logOut(req, res) {

  const userId = req.user.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE users SET is_online = 0 WHERE id = ?`,
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'Logout successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

async function addSearch(req, res) {
  try {
    const userId = req.user.userId; // Extract user ID from token
    const { searchedId } = req.body;

    if(!userId || !searchedId) {
      return res.status(404).json({ message: 'Misssing details' });
    }

    // Check if the search already exists
    const [existingSearch] = await pool.execute(
      `SELECT * FROM recent_search WHERE user_id = ? AND searched_id = ?`,
      [userId, searchedId]
    );

    if (existingSearch.length > 0) {
      return res.status(200).json({ message: "Search already exists" });
    }

    // Insert the search into the database
    await pool.execute(
      `INSERT INTO recent_search (user_id, searched_id) VALUES (?, ?)`,
      [userId, searchedId]
    );

    return res.status(200).json({ message: "Search added successfully" });

  } catch (error) {
    console.log("Error in add search function:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

async function updateFollowSelect(req, res) {
  try {
    const userId = req.user.userId; // Extract user ID from token

    if(!userId) {
      return res.status(404).json({ message: 'Misssing User Id' });
    }

    // Update user in the database using user id
    const [updateResult] = await pool.execute(
      `UPDATE users 
             SET is_follow_selected = ?
             WHERE id = ?`,
      [
        true,
        userId,
      ]
    );

    console.log("=======in updateCommunitySelect====>", updateResult.affectedRows);
    // Check if any rows were updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "follow selected updated successfully" });
    
  } catch (error) {
    console.log("Error in updateCommunitySelect function:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

// async function onlineFriends(req , res){
//   try {
//     const userId = req.user.userId; // Extract user ID from token
//     console.log("======userId====onlineFriends===>", userId);
//     const [online]  = await pool.execute(
//     `SELECT * FROM users WHERE is_online = 1`, 
//     );

//     return res.status(200).json({
//       message: "My online friends.",
//       data: online,
//     });
//   } catch (error) {
//       console.log("==erro fetch data===>",error);
//     return res.status(500).json({
//       error: "Internal Server Error"
//     })
//   }
// }

async function onlineFriends(req, res) {
  try {
    const userId = req.user.userId; // Extract user ID from token

    // Query to get online buddies and followers
    const [onlineFriends] = await pool.execute(
      `
      SELECT DISTINCT
       u.id,
       u.profile_image,
       u.user_name,
       u.full_name,
       u.is_active

      FROM users u
       JOIN buddies b 
        ON (u.id = b.user_id OR u.id = b.buddies_id)
       JOIN followers f
        ON (u.id = f.follower_id OR u.id = f.followee_id)
      WHERE (b.user_id = ? OR b.buddies_id = ? OR f.followee_id = ?) 
        AND u.is_online = 1
        AND u.id != ?
      `,
      [userId, userId, userId, userId]
    );

    return res.status(200).json({
      message: "My online friends.",
      data: onlineFriends,
    });
  } catch (error) {
    console.error("==Error fetching data===>", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

async function addBuddies(req, res) {
  const user_id = req.user.userId; // Extract user ID from token

  const { buddies_id } = req.body;

  try {
    // Check if the buddy relationship already exists
    const [existReply] = await pool.execute(
      `SELECT * FROM buddies WHERE user_id = ? AND buddies_id = ?`,
      [user_id, buddies_id]
    );
    console.log("===existReply===>", existReply);
    if (existReply.length > 2) {
      return res.status(409).json({
        message: "Buddy relationship already exists",
        data: {
          user_id,
          buddies_id,
        },
      });
    }

    // Check if the follower relationship already exists
    const [followerExistReply] = await pool.execute(
      `SELECT * FROM followers WHERE follower_id = ? AND followee_id = ?`,
      [user_id, buddies_id]
    );

    if (followerExistReply.length > 0) {
      // If followers relationship exists, only insert into the buddies table
      await pool.execute(
        `INSERT INTO buddies (user_id, buddies_id) VALUES (?, ?)`,
        [user_id, buddies_id]
      );

      return res.status(200).json({
        message: "Buddy relationship added successfully",
        data: {
          user_id,
          buddies_id,
        },
      });
    }

    // Insert the buddy relationship if it doesn't exist
    await pool.execute(
      `INSERT INTO buddies (user_id, buddies_id) VALUES (?, ?)`,
      [user_id, buddies_id]
    );

    await pool.execute(
      `INSERT INTO followers (follower_id, followee_id) VALUES (?, ?)`,
      [user_id, buddies_id]
    );

    return res.status(200).json({
      message: "Buddies and followers added successfully",
      data: {
        user_id,
        buddies_id,
      },
    });
  } catch (error) {
    console.error("Error in addBuddies:", { error, user_id, buddies_id });
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function removeBuddy(req, res) {
  const user_id = req.user.userId; // Extract user ID from token
  const { buddies_id } = req.params;

  try {
    // Check if the buddy relationship exists
    const [existReply] = await pool.execute(
      `SELECT * FROM buddies WHERE user_id = ? AND buddies_id = ?`,
      [user_id, buddies_id]
    );

    if (existReply.length === 0) {
      return res.status(404).json({
        message: "Buddy relationship does not exist",
        data: {
          user_id,
          buddies_id,
        },
      });
    }

    // Remove the buddy relationship
    await pool.execute(
      `DELETE FROM buddies WHERE user_id = ? AND buddies_id = ?`,
      [user_id, buddies_id]
    );

    // Remove the follower relationship
    await pool.execute(
      `DELETE FROM followers WHERE follower_id = ? AND followee_id = ?`,
      [user_id, buddies_id]
    );

    return res.status(200).json({
      message: "Buddy and follower relationship removed successfully",
      data: {
        user_id,
        buddies_id,
      },
    });
  } catch (error) {
    console.error("Error in removeBuddy:", { error, user_id, buddies_id });
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function blockAccount(req , res){
  try {

    const userId = req.user.userId; // Extract user ID from token
    const { block_id } = req.params;

    const [ data ] = await pool.execute(
      `INSERT INTO block_user (user_id, blocked_id) VALUES (?, ?)`,[userId, block_id]
    );

    await pool.execute(
      `
      DELETE FROM followers 
      WHERE (follower_id = ? AND followee_id = ?)
         OR (follower_id = ? AND followee_id = ?)
      `,
      [userId, block_id, block_id, userId]
    );

    // Delete relationships from buddies table
    await pool.execute(
      `
      DELETE FROM buddies 
      WHERE (user_id = ? AND buddies_id = ?)
         OR (user_id = ? AND buddies_id = ?)
      `,
      [userId, block_id, block_id, userId]
    );
    return res.status(200).json({
      message:"Account Blocked  Successfully"
    });
  } catch (error) {
    console.log("=======error block account====",error);
    return res.status(500).json({
      error:"Error Blocking Account"
    });
  }
}

// to show suggestions to user for follow and add buddy
async function suggestions1(req, res) {
  try {
    // const { userId } = req.params; // User requesting suggestions
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query; // Optional pagination params
    const offset = (page - 1) * limit; // Calculate offset

    // Fetch suggested users based on logic (excluding already followed and userId)
    const [suggestions] = await pool.execute(
      `
      SELECT 
        u.id,
        u.full_name,
        u.user_name,
        u.profile_image,
        u.badge,
        (SELECT COUNT(*) FROM followers f WHERE f.followee_id = u.id) AS followers_count,
        (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id AND p.status = 'active') AS posts_count,
        EXISTS(
          SELECT 1 
          FROM followers f1 
          WHERE f1.follower_id = u.id 
          AND f1.followee_id = ?
        ) AS is_mutual,
         EXISTS(
          SELECT 1 
          FROM buddies b 
          WHERE (b.user_id = ? AND b.buddies_id = u.id) 
             OR (b.user_id = u.id AND b.buddies_id = ?)
        ) AS is_buddies
      FROM users u
      WHERE 
        u.id != ? -- Exclude the requesting user
        AND u.id NOT IN (SELECT followee_id FROM followers WHERE follower_id = ?) -- Exclude already followed users
      ORDER BY followers_count DESC, posts_count DESC -- Sort by activity/popularity
      LIMIT ? OFFSET ?;
      `,
      [userId, userId, userId,userId,userId, parseInt(limit), parseInt(offset)] // Bind params
    );

    return res.status(200).json({
      message: 'Suggestions fetched successfully',
      data: suggestions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return res.status(500).json({
      error: 'Error getting suggestions',
    });
  }
}

async function suggestions(req, res) {
  try {
    // const { userId } = req.params; // User requesting suggestions
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query; // Optional pagination params
    const offset = (page - 1) * limit; // Calculate offset

    // Fetch suggested users based on logic (excluding already followed and userId)
    const [suggestions] = await pool.execute(
      `
      SELECT 
        u.id,
        u.full_name,
        u.user_name,
        u.profile_image,
        u.badge,
        (SELECT COUNT(*) FROM followers f WHERE f.followee_id = u.id) AS followers_count,
        (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id AND p.status = 'active') AS posts_count,
        EXISTS(
          SELECT 1 
          FROM followers f1 
          WHERE f1.followee_id = u.id 
          AND f1.follower_id = ?
        ) AS is_mutual,
         EXISTS(
          SELECT 1 
          FROM buddies b 
          WHERE (b.user_id = ? AND b.buddies_id = u.id) 
             OR (b.user_id = u.id AND b.buddies_id = ?)
        ) AS is_buddies
      FROM users u
      WHERE 
        u.id != ? -- Exclude the requesting user
        AND u.id NOT IN (SELECT follower_id FROM followers WHERE followee_id = ?) -- Exclude already followed users
      ORDER BY followers_count DESC, posts_count DESC -- Sort by activity/popularity
      LIMIT ? OFFSET ?;
      `,
      [userId, userId, userId,userId,userId, parseInt(limit), parseInt(offset)] // Bind params
    );

    return res.status(200).json({
      message: 'Suggestions fetched successfully',
      data: suggestions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return res.status(500).json({
      error: 'Error getting suggestions',
    });
  }
}

async function validateToken(req, res) {
  const token = req.body.token;
  console.log("====token===>", token);
  if (!token) {
    return res.status(401).json({ valid: false, message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace 'your_secret_key' with your JWT secret
    return res.status(200).json({ valid: true, decoded });
  } catch (error) {
    return res.status(401).json({ valid: false, message: 'Token is invalid or expired' });
  }
}

module.exports = {
  registerUser,
  sendOTP,
  verifyOTP,
  finalSignUp,
  resendOTP,
  getFollowersCount,
  loginUser,
  sendEmailOTP,
  sendOTPForgotPassword,
  forgotPassVerify,
  updatePassword,
  getUserBuddies,
  getUserFollower,
  getUserDetails,
  updateUser,
  toWhomUserFollows,
  insertProfileImage,
  removeProfileImage,
  getallUsers,
  removeCoverImage,
  uploadCoverImage,
  logOut,
  addSearch,
  updateFollowSelect,
  onlineFriends,
  addBuddies,
  removeBuddy,
  blockAccount,
  suggestions,
  validateToken
};
