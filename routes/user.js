const { Router } = require("express");
const router = Router();

const { uploadPicture } = require("../middlewares/upload_file");
const { imageUpload } = require("../middlewares/file_handler");

const userController = require("../controllers/user");

router.get("/profile", userController.getUserProfile);

router.patch("/profile", userController.updateUserProfile);

router.patch(
  "/profileImage",
  imageUpload.single("profileImage"),
  uploadPicture,
  userController.setUserProfilePicture
);

router.get("/favorites", userController.getUserFavorites);

router.post("/favorites/:productId", userController.addToFavorites);

router.delete("/favorites/:productId", userController.removeFromFavorites);

module.exports = router;
