const express = require('express');
const RootController = require('./root.controller');
const router = express.Router();


router.post('/login', RootController.login);
router.post('/sign-up', RootController.signUp);

// Fallback
router.use(RootController.notFound);

module.exports = router;
