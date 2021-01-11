const { Router } = require('express');
const router = Router();

const UploadControllers = require('../controllers/data');
const UploadDataMiddleware = require('../middlewares/uploadData');

router.post('/:categoryMarketId', UploadDataMiddleware.uploadData.single('file'),
                 UploadControllers.ExcelToJson);

module.exports = router;