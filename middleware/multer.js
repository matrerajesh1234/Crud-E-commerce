import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const uploadPath = "./uploads";

// Ensure upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4(); // Generate unique UUID
    cb(null, uniqueFilename + "_" + file.originalname);
  },
});

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default uploadMiddleware;
