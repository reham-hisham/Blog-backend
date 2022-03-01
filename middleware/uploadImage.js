const multer = require("multer");
const path = require("path");
const fs = require("fs");
const isImage = require("is-image");

// const upload = multer({ dest: 'images/profile/' })
let loc = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.user) {
    

      loc = path.join("images", file.fieldname, req.user._id.toString());
    } else {
     
      loc = path.join("images", file.fieldname);
    }
    fs.mkdir(loc, (err) => {});
    cb(null, loc);
  },
  filename: function (req, file, cb) {
    const myName = `${req.user._id.toString()}-${path.extname(
      file.originalname
    )}`;
    cb(null, myName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20000000 },
  fileFilter: function (req, file, cb) {

    if (!isImage(file.originalname)) {
      return cb(new Error("ONLY IMAGES"), false);
    }

    cb(null, true);
  },
});

module.exports = upload;
