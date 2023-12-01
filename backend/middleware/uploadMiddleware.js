import multer from "multer";
import fs from 'fs';
import path from "path";

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });


// Custom file upload middleware
const uploadMiddleware = (req, res, next) => {
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Retrieve uploaded files
    const files = req.files;
    const errors = [];

    // Validate file types and sizes
    for (const fieldName in files) {
      const file = files[fieldName][0];
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      // if (!allowedTypes.includes(file.mimetype)) {
      //   errors.push(`Invalid file type for ${fieldName}: ${file.originalname}`);
      // }

      // if (file.size > maxSize) {
      //   errors.push(`File too large for ${fieldName}: ${file.originalname}`);
      // }
    }

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      for (const fieldName in files) {
        const file = files[fieldName][0];
        fs.unlinkSync(file.path);
      }

      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default uploadMiddleware;