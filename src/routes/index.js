const express = require('express');
const router = express.Router();

const analysisRoutes = require('./analysisRoutes');
const searchRoutes = require('./searchRoutes');
const healthRoutes = require('./healthRoutes');

router.use('/analyze-text', analysisRoutes);
router.use('/search-term', searchRoutes);
router.use('/health', healthRoutes);

module.exports = router;