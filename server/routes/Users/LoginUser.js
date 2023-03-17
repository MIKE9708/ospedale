
const router = require("express").Router();
const express = require('express');
const utenteController = require('../../Controller/utenti.Controller');

router.post('/Login', utenteController.user_login);
router.post('/recoverCredentials',utenteController.recoverAccount);
module.exports = router;
