const express = require("express");
const { getHashtags } = require("../controllers/tagsController");
const router = express.Router();

// for showing all hashtags
router.get('/get-all-tags', getHashtags);

module.exports = router;