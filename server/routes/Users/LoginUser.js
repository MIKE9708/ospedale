
const router = require("express").Router();
const express = require('express');
const utenteController = require('../../Controller/utenti.Controller');

router.post('/login', utenteController.get_user);

module.exports = router;