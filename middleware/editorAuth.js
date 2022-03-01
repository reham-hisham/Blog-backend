const editorAuth = async (req, res, next) => {
  try {
    if (req.user.userRole != "editor") throw new Error("Must be an editor");
    next();
  } catch (e) {
    res.send({
      apiStatus: false,
      date: e.message,
      message: "editor not authorized",
    });
  }
};

module.exports = editorAuth;
