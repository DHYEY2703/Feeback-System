const express = require('express');
const router = express.Router();
const { checkUser, saveUser, generateQr, validateToken, submitFeedback } = require('../controllers/userController');
const { validateUserRegistration } = require('../middlewares/validationMiddleware');

router.post('/check-user', checkUser);
router.post('/save-user', validateUserRegistration, saveUser);
router.post('/generate-qr', generateQr);
router.get('/validate-token', validateToken);
router.post('/submit-feedback', submitFeedback);

module.exports = router;
