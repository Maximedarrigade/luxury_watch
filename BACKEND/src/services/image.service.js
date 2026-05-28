import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (file) => {
  const result = await cloudinary.uploader.upload(file.path);

  return result.secure_url;
};
