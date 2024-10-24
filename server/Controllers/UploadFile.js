// express upload image in firebase storage using multer

import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import storage from "../config/firebaseStorage.js";

const Uploadrouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

Uploadrouter.post("/", upload.single("file"), async (req, res) => {
  try {
    // get file
    const file = req.file;
    // create new filename
    if (file) {
      const filename = `${uuidv4()}${path.extname(file.originalname)}`;

      const blob = storage.file(filename);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });
      // if error
      blobStream.on("error", (error) => {
        res.status(400).json({ error });
      });
      // if success
      blobStream.on("finish", () => {
        //  return url
        const url = `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2drcn@movie-database-90802.iam.gserviceaccount.com`;
        res.status(200).json(url);
      });
      blobStream.end(file.buffer);
    } else {
      res.status(400).json("file not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default Uploadrouter;

// Path: Server/Controllers/UploadFile.js
