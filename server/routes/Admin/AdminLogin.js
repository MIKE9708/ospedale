const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');

router.post('/Login',adminController.login);

router.get("/checkCode/:code",adminController.checkCode);

router.post('/recoverCredentials',adminController.recoverAccount);

router.post('/resetPassword',adminController.resetPassword);

router.get('/Logout',adminController.adminLogout);

router.post('/activateAdminAccount',adminController.ActivateAdminAccount);

router.get('/adRefresh',adminController.handleAdminRefreshToken);

router.post('/checkDeviceCode',adminController.save_device);

module.exports = router;