const router = require("express").Router();
const express = require('express');
const utenteController = require('../../Controller/utenti.Controller');



router.get('/',utenteController.userLogout);


module.exports = router;
