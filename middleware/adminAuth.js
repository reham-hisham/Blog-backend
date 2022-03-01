const adminAuth = async (req, res, next) => {
  try {
    if (req.user.userRole != "admin") throw new Error("Must be an admin");
    next();
  } catch (e) {
    res.send({
      apiStatus: false,
      date: e.message,
      message: "admin not authorized",
    });
  }
};

module.exports = adminAuth;
