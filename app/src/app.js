const express = require("express");
const adminRoutes = require("../../routes/admin.routes");
const userRoutes = require("../../routes/user.routes");
const app = express();
const editorRoutes = require("../../routes/editor.routes");
const viewerRoutes = require("../../routes/viewer.routes");require("dotenv").config();
require("../../database/connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRoutes);

app.use("/api/user/editor", editorRoutes);

// app.post("/profile", userController.uploadProfileImage);

app.use("/api/user/admin", adminRoutes);

app.use("/api/user/viewer", viewerRoutes);

app.get("*", (req, res) => res.send({ error: "invalide url" }));

module.exports = app;
