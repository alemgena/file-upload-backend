const multer = require("multer");
const { extname } = require("path");
const util = require("util");

const storage = multer.diskStorage({
  destination: "uploads/images/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});
const multi_upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
      cb(null, true);

  },
}).single("image");

let uploadImage = util.promisify(multi_upload);
module.exports = uploadImage;
