
const express = require('express');
const router = express.Router();
const refresh_tokenController = require('../../Controller/refresh_token.Controller');

router.get('/',refresh_tokenController.handleRefreshToken);


module.exports = router;