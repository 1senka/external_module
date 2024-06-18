const express = require("express");
const path = require('path')
const router = express.Router();
const config = require(path.join(__dirname, "./config.json"));

router.get("/", function (req, res) {
  console.log('config.menu', config.menu)
  res.json(config.menu);
});

module.exports = router;
