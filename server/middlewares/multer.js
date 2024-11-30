import multer from "multer";
const upload = multer({
  fileSize: 1024 * 1024 * 5,
});

export const avtarUpload = upload.single("avatar");
