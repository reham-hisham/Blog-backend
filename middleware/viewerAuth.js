const viewerAuth = async (req, res, next) => {
  try {
    if (req.user.userRole != "viewer") throw new Error("Must be an viewer");
    next();
  } catch (e) {
    res.send({
      apiStatus: false,
      date: e.message,
      message: "viewer not authorized",
    });
  }
};

module.exports = viewerAuth;
