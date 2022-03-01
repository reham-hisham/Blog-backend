const router = require("express").Router();
const adminController = require("../app/controller/admin.controller");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

router.get(
  "/showPendingPosts",
  auth,
  adminAuth,
  adminController.showPendingPosts
);
router.get("/showAllViewers", auth, adminAuth, adminController.showAllViewers);
router.get("/showAllAdmins", auth, adminAuth, adminController.showAllAdmins);
router.get("/showAllEditors", auth, adminAuth, adminController.showAllEditors);
router.get(
  "/showAcceptedPosts",
  auth,
  adminAuth,
  adminController.showAcceptedPosts
);
router.post("/addAccount", auth, adminAuth, adminController.addAccount);
router.post(
  "/changePostStatus/:id",
  auth,
  adminAuth,
  adminController.changePostStatus
);
router.delete(
  "/deleteAcount/:id",
  auth,
  adminAuth,
  adminController.deleteAcount
);
router.delete("/deletePost/:id", auth, adminAuth, adminController.deletePost);

module.exports = router;
