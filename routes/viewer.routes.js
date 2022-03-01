const router = require("express").Router();
const viwerController = require("../app/controller/viewer.controller");
const auth = require("../middleware/auth");
const viewerAuth = require("../middleware/viewerAuth");

router.post("/addComment/:id", auth, viewerAuth, viwerController.addComment);
router.post("/like/:id", auth, viewerAuth, viwerController.addlike);
router.get("/showPost/:id", auth, viewerAuth, viwerController.showPost);
router.get(
  "/findPostsByTitle",
  auth,
  viewerAuth,
  viwerController.findPostsByTitle
);
router.get(
  "/findPostsByType",
  auth,
  viewerAuth,
  viwerController.findPostsByType
);

module.exports = router;
