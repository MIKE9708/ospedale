const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');
const gatewayConnectionToChain = require('../../middleware/fabricConnect');


router.post('/deleteUser',gatewayConnectionToChain,adminController.deleteUser);

router.post('/addUser',gatewayConnectionToChain,adminController.addUser_to_blockchain);

router.get('/listDoctors',gatewayConnectionToChain,adminController.listDoctor_from_blockchain);

router.get('/listPatients',gatewayConnectionToChain,adminController.listPatient_from_blockchain);


module.exports = router;