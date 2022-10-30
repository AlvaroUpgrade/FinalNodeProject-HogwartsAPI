const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const folder = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hpPics",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ folder });

module.exports = upload;
