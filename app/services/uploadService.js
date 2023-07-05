/* eslint-disable max-len */
const multer = require('multer');
const fs = require('fs');
const dayjs = require('dayjs');
require('dayjs/locale/fr');

/**
 * Handles file upload using Multer middleware.
 *
 * @param {Object} request - The request object.
 * @param {string} mainFolder - The main folder where files will be uploaded.
 * @param {string} subFolder - The subfolder within the main folder where files will be uploaded.
 * @param {string} fieldname - The name of the field in the request containing the file.
 * @param {Function} next - The next middleware function to pass the error to.
 * @param {Joi.Schema} schema - The Joi validation schema for the request body.
 * @param {number} maxSize - the maximum file size allowed for a file in megabites
 * @returns {Promise<Object>} A Promise that resolves to an object containing the uploaded file information.
 * @throws {Error} If there is an error during file upload or if the validation fails.
 */
const uploadService = (request, mainFolder, subFolder, fieldname, next, schema, maxSize) => {
  const uploadFolder = `${mainFolder}/${subFolder}`;

  // Configure the storage settings for Multer
  const storage = multer.diskStorage({
    destination(_, file, cb) {
      cb(null, uploadFolder);
    },
    filename(_, file, cb) {
      const extArray = file.mimetype.split('/');
      const extension = extArray[extArray.length - 1];
      cb(null, `${subFolder}-${dayjs().locale('fr').format('dddd-D-MMMM-YYYY-HH:mm_ss:SSS')}.${extension}`);
    },
  });

  // Create a Multer instance with the configured storage settings
  const upload = multer({
    storage,
    async fileFilter(req, file, cb) {
      // Perform file extension validation
      const allowedExtensions = [];
      if (fieldname === 'image') {
        allowedExtensions.push('.webp', '.jpg', '.jpeg', '.png');
      } else {
        allowedExtensions.push('.pdf', '.doc', '.docx');
      }
      const fileExtension = file.originalname
        .toLowerCase()
        .substring(file.originalname.lastIndexOf('.'));

      if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('INVALID_FILE_EXTENSION', `Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`));
      }
    },
    limits: {
      fileSize: maxSize * 1024 * 1024,
    },
  });

  return new Promise((resolve, reject) => {
    // Use Multer to handle the file upload
    upload.single(fieldname)(request, null, async (err) => {
      if (err) {
        // Pass the error to the next middleware
        return reject(err);
      }

      try {
        // Perform custom request body validation using Joi schema
        await schema.validateAsync(request.body);
        // If validation passes, process the file and resolve the Promise with the result

        // If there isn't any file => send empty string
        if (!request.file) {
          return resolve({ filename: '', path: '' });
        }

        // File upload successful
        const { filename, path } = request.file;

        // Process the file and resolve the Promise with the result
        return resolve({ filename, path });
      } catch (error) {
        // If validation fails, delete the uploaded file if necessary
        if (request.file) {
          fs.unlinkSync(request.file.path);
        }
        // Pass the validation error to the next middleware
        next(error);
        // Reject the Promise
        return reject(error);
      }
    });
  });
};

module.exports = uploadService;
