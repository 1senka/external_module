const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/:widgetId", function (req, res) {
  const widgetList = fs.readFileSync(
    path.join(__dirname, "widgets", req.params.widgetId + ".html"),
    {
      encoding: "utf8",
    }
  );
  res.send(widgetList);
});

module.exports = router;
