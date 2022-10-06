
const router = require("express").Router();
const express = require('express');
const utenteController = require('../../Controller/utenti.Controller');


router.post('/insert',utenteController.add_user);
//app.use('/utente',router);



module.exports = router;