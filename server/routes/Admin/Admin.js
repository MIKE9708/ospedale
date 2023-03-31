const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');
const gatewayConnectionToChain = require('../../middleware/fabricConnect');


router.post('/deleteUser',gatewayConnectionToChain,adminController.deleteUser);

router.post('/addUser',gatewayConnectionToChain,adminController.addUser);

router.get('/listDoctors',gatewayConnectionToChain,adminController.listDoctors);

router.get('/listPatients',gatewayConnectionToChain,adminController.listPatients);

router.post('/Login',adminController.login);

router.post('/addAdmin',adminController.AddAdmin);

router.post('/activateAdminAccount',adminController.ActivateAdminAccount);

router.get("/checkCode/:code",adminController.checkCode);

router.post('/recoverCredentials',adminController.recoverAccount);

router.post('/resetPassword',adminController.resetPassword);

module.exports = router;