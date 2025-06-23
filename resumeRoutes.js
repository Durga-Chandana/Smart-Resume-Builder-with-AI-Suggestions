const express = require('express');
const { saveResume, getResumes } = require('../controllers/resumeController');

const router = express.Router();

router.post('/save', saveResume);
router.get('/all', getResumes);

module.exports = router;

