const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');
const gatewayConnectionToChain = require('../../middleware/fabricConnect');
const checkRole = require("../../middleware/checkRole"); 

router.post('/deleteUser',gatewayConnectionToChain,checkRole("Admin"),adminController.deleteUser);

router.post('/addUser',gatewayConnectionToChain,checkRole("Admin"),adminController.addUser);

router.get('/listDoctors',gatewayConnectionToChain,checkRole("Admin"),adminController.listDoctors);

router.get('/listPatients',gatewayConnectionToChain,adminController.listPatients);

// router.post( '/addPatient',gatewayConnectionToChain,checkRole("Admin"),adminController.add_patient_record );

router.post('/addAdmin',checkRole("Admin"),adminController.AddAdmin);

router.get("/checkCode/:code",checkRole("Admin"),adminController.checkCode);

router.post('/recoverCredentials',checkRole("Admin"),adminController.recoverAccount);

router.post('/resetPassword',checkRole("Admin"),adminController.resetPassword);

module.exports = router;