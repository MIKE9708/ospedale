
const router = require("express").Router();
const express = require('express');
const utenteController = require('../../Controller/utenti.Controller');

router.post('/Login', utenteController.user_login);
router.get("/checkCode/:code",utenteController.checkCode);
router.post('/recoverCredentials',utenteController.recoverAccount);
router.post('/resetPassword',utenteController.resetPassword);

module.exports = router;
