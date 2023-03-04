const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');
const gatewayConnectionToChain = require('../../middleware/fabricConnect');


router.post('/deleteUser',gatewayConnectionToChain,adminController.deleteUser);

router.post('/addUser',gatewayConnectionToChain,adminController.addUser);

router.get('/listDoctors',gatewayConnectionToChain,adminController.listDoctors);

router.get('/listPatients',gatewayConnectionToChain,adminController.listPatients);

router.post('/login',adminController.login);

router.post('/addAdmin',adminController.AddAdmin);

module.exports = router;