const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const tagsRoutes = require('./routes/tagRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require("fs");
const db = require("./utils/db");

// Increase body parser size limits
app.use(express.json({ limit: "10mb" })); // Allow large payloads
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Define a directory to store uploaded images
const UPLOAD_DIR = path.join(__dirname, "uploads");
const PROFILE_UPLOAD_DIR = path.join(__dirname, "uploads/profile_img");
const COVER_UPLOAD_DIR = path.join(__dirname, "uploads/cover_img");
const POST_UPLOAD_DIR = path.join(__dirname, "uploads/post_img");
const STORY_UPLOAD_DIR = path.join(__dirname, "uploads/story_img");

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

// Ensure the uploads directory exists
if (!fs.existsSync(PROFILE_UPLOAD_DIR)) {
  fs.mkdirSync(PROFILE_UPLOAD_DIR);
}

// Ensure the uploads directory for cover image exists
if (!fs.existsSync(COVER_UPLOAD_DIR)) {
  fs.mkdirSync(COVER_UPLOAD_DIR);
}

// Ensure the uploads directory for post exists
if (!fs.existsSync(POST_UPLOAD_DIR)) {
  fs.mkdirSync(POST_UPLOAD_DIR);
}

// Ensure the uploads directory for story exists
if (!fs.existsSync(STORY_UPLOAD_DIR)) {
  fs.mkdirSync(STORY_UPLOAD_DIR);
}

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// allow cors
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

// calling routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/tags', tagsRoutes);

app.listen(PORT,(err) => {
    if(err) throw err;
    else {
       console.log( `server started at port ${PORT}`);
       // Now check the database connection in the background
      db.getConnection()
      .then(() => {
        console.log('Successfully connected to the database');
      })
      .catch((err) => {
        console.error('Failed to connect to the database:', err);
      });
    }
})

module.exports = {
  UPLOAD_DIR
}