import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: `tasktribe/${folderName}` },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    upload.end(fileBuffer);
  });
};
export const getPublicIdFromUrl = (url) => {
  const cleanUrl = url.split("?")[0];

  const parts = cleanUrl.split("/upload/")[1];
  if (!parts) return null;

  const withoutVersion = parts.replace(/^v[0-9]+\//, "");

  const publicId = withoutVersion.replace(/\.[^/.]+$/, "");

  return publicId;
};
export const getResourceType = (url) => {
  const extension = url.split(".").pop().toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension))
    return "image";

  if (["mp4", "mov", "avi", "mkv", "webm"].includes(extension)) return "video";

  return "raw"; // pdf, doc, txt, zip, etc.
};
export const deleteCloudinaryFile = async (url) => {
  try {
    const publicId = getPublicIdFromUrl(url);
    const resourceType = getResourceType(url);
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    console.log("Cloudinary delete response:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw error;
  }
};