const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');
const gatewayConnectionToChain = require('../../middleware/fabricConnect');
const checkRole = require("../../middleware/checkRole"); 


router.post('/deleteUser',gatewayConnectionToChain,checkRole("Admin"),adminController.deleteUser);

router.post('/addUser',gatewayConnectionToChain,checkRole("Admin"),adminController.addUser);

router.get('/listDoctors',gatewayConnectionToChain,checkRole("Admin"),adminController.listDoctors);

router.get('/listPatients',gatewayConnectionToChain,adminController.listPatients);
//router.post( '/DeleteRecord/',gatewayConnectionToChain,checkRole("Admin"),dottoreController.delete_patient_record );
//router.post( '/AddRecord',gatewayConnectionToChain,checkRole("Admin"),dottoreController.add_patient_record );
//router.post( '/addPatient',gatewayConnectionToChain,checkRole("Admin"),dottoreController.add_patient_record );

router.post('/addAdmin',adminController.AddAdmin);



module.exports = router;