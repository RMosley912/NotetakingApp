
const express = require('express');
const noteRoutes = require('./noteRoutes');

const router = express.Router();

router.use('/notes', noteRoutes);

module.exports = router;
