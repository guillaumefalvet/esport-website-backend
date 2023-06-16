/* eslint-disable max-len */
const multer = require('multer');

/**
 * Handles file upload using Multer middleware.
 *
 * @param {Object} req - The request object.
 * @param {string} mainFolder - The main folder where files will be uploaded.
 * @param {string} subFolder - The subfolder within the main folder where files will be uploaded.
 * @param {string} fieldname - The name of the field in the request containing the file.
 * @param {Function} next - The next middleware function to pass the error to.
 * @returns {Promise<Object>} A Promise that resolves to an object containing the uploaded file information.
 * @throws {Error} If there is an error during file upload.
 */
const uploadHandler = (req, mainFolder, subFolder, fieldname, next) => {
  const uploadFolder = `${mainFolder}/${subFolder}`;

  const storage = multer.diskStorage({
    destination(_, file, cb) {
      cb(null, uploadFolder);
    },
    filename(_, file, cb) {
      const extArray = file.mimetype.split('/');
      const extension = extArray[extArray.length - 1];
      cb(null, `${fieldname}-${Date.now()}.${extension}`);
    },
  });

  const upload = multer({ storage });

  return new Promise((resolve, reject) => {
    upload.single(fieldname)(req, null, (err) => {
      if (err) {
        // Pass the error to the next middleware
        return reject(err);
      }
      // File upload successful
      const { filename, path } = req.file;

      // Process the file and resolve the Promise with the result
      resolve({ filename, path });
    });
  })
    .then((result) => result)
    .catch((error) => {
    // Pass the error to the next middleware
      next(error);
      throw error; // Add this line to prevent further execution
    });
};

module.exports = uploadHandler;
