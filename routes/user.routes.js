const router = require("express").Router();
const auth = require("../middleware/auth");
const userController = require("../app/controller/user.controller");
const upload = require("../middleware/uploadImage");

// router.post("/profile", userController.uploadProfileImage);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.get("/info", auth, userController.singleUser);
router.delete("/deleteAccount", auth, userController.deleteSingleAcount);
router.post("/edit", auth, userController.edit);
router.post("/activate", auth, userController.activateAccount);
router.post(
  "/profile",
  auth,
  upload.single("profile"),
  userController.uploadProfileImage
);
module.exports = router;
