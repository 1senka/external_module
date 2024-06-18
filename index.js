const express = require("express");
const menuRouter = require("./menu");
const pageRouter = require("./page");
const widgetRouter = require("./widget");
const sidebarRouter = require("./sidebar");

const app = express();
app.use(express.json());
app.use(express.static('./dist'));
app.use("/external/:rkey/:culture/:device/menu", menuRouter);
app.use("/external/:rkey/:culture/:device/page", pageRouter);
app.use("/external/:rkey/:culture/:device/sidebarMenu", sidebarRouter);
app.use("/external/:rkey/:culture/:device/widget", widgetRouter);

app.listen(3000, () => {
  console.log("server listening");
});
