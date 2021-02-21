const express = require('express');
const mainRouter = require('./root/root.router');
const router = express.Router();

router.use('/', mainRouter);

module.exports = router;
