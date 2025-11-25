// src/middleware/multer.js
import multer from "multer";

const storage = multer.memoryStorage(); // store file in memory buffer

const upload = multer({ storage });

export default upload;
