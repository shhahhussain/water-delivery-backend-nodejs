const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, req.user.id + "-" + file?.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

module.exports = {
  imageUpload: multer({
    storage: fileStorageEngine,
    fileFilter: fileFilter,
  }),
};
