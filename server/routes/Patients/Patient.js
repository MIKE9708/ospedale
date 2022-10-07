const router = require("express").Router();
const express = require('express');
const pazienteController = require ( "../../Controller/pazienti.Controller");


router.get( '/:id' , pazienteController.info_paziente );

module.exports = router;

