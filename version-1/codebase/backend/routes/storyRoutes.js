const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const { getActiveStory } = require("../controllers/storyController");


router.get("/get-stories", verifyToken, getActiveStory);



module.exports = router;