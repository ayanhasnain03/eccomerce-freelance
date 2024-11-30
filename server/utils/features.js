import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { SendError } from "./sendError.js";
const transformFileOnBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

export const uploadFile = async (files = []) => {
  const upload = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        transformFileOnBase64(file),
        {
          folder: "fashAt",
          resource_type: "image",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const res = await Promise.all(upload);
    const formAtImage = res.map((file) => ({
      public_id: file.public_id,
      url: file.secure_url,
    }));
    return formAtImage;
  } catch (error) {
    throw new SendError(error.message || "Something went wrong", 400);
  }
};