const express = require('express');
const multer = require('multer');
const debug = require('debug')('app:routers:api:recruitement');

const controllerHandler = require('../../middlewares/controllerHandler');
const { recruitmentValidation } = require('../../validations/schemas/recruitment-schema');
const validate = require('../../validations/validate');
const { createRecruitment } = require('../../controllers/recruitmentController');
// const mailService = require('../../services/recruitMailing');

const router = express.Router();
/**
 * a recruitment type
 * @typedef {object} Recruitment
 * @property {number} id - a recruitment id
 * @property {string} user_name - recruitment user_name
 * @property {string} email - recruitment email
 * @property {string} first_name - recruitment first name
 * @property {string} last_name - recruitment last name
 * @property {string} message - recruitment message
 * @property {string} external_link - recruitment external link
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * POST /api/recruitment
 * @summary insert recruitment
 * @tags Recruitment
 * @returns {object} 200 - success message
 * @returns {object} 400 - bad request
 */

const uploadFile = (req, res, folder) => {
  const uploadFolder = `uploads/${folder}`;

  const storage = multer.diskStorage({
    destination(_, file, cb) {
      cb(null, uploadFolder);
    },
    filename(_, file, cb) {
      const extArray = file.mimetype.split('/');
      const extension = extArray[extArray.length - 1];
      cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
    },
  });

  const upload = multer({ storage });

  upload.single('cv')(req, res, (err) => {
    if (err) {
      // Handle the error
      return res.status(500).json({ error: err.message });
    }

    // File upload successful
    const { filename, path } = req.file;

    // Process the file and send a response
    res.status(200).json({ filename, path });
  });
};

const uploadController = (request, response) => {
  uploadFile(request, response, 'pdf');
};

// const upload = multer({ dest: 'uploads/image' });
router.post('/upload/:name', uploadController);
router.post('/', validate(recruitmentValidation), controllerHandler(createRecruitment));

module.exports = router;
