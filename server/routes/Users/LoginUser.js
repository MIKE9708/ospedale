
const router = require("express").Router();
const express = require('express');
const utenteController = require('../../Controller/utenti.Controller');

router.post('/login', utenteController.user_login);

module.exports = router;