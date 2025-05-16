import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } from "../constants.js";
import apiError from "./apiError.js";
import fs from "fs";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

/**cloudinary uploder */
async function uploadOnCloudinary(localfilepath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(localfilepath)) return reject("file not found");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "/watchify",
        chunk_size: 5 * 1024 * 1024,
      },
      (error, result) => {
        /**unsink file */
        fs.unlinkSync(localfilepath);

        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error("Cloudinary upload failed"));
        }
        resolve(result);
      },
    );

    // Pipe file stream to Cloudinary upload stream
    const filestream = fs.createReadStream(localfilepath);
    filestream.pipe(uploadStream);
  });
}

async function deleteFromCloudinary(publicId, resourceType) {
  try {
    if (!publicId) {
      return null;
    }
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log("delete response", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { uploadOnCloudinary, deleteFromCloudinary };
