const express = require("express");
const router = express.Router();
const config = require("./config.json");

router.get("/:pageId", function (req, res) {
  res.json(config.page[req.params.pageId]);
});

module.exports = router;
