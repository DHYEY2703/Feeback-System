const express = require('express');
const router = express.Router();
const { login, getUsers, getUserById, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/login', login);
router.route('/users').get(protect, getUsers);
router.route('/users/:id').get(protect, getUserById).delete(protect, deleteUser);

module.exports = router;
