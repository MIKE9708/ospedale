const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');

router.post('/Login',adminController.login);

router.get("/checkCode/:code",adminController.checkCode);

router.post('/recoverCredentials',adminController.recoverAccount);

router.post('/resetPassword',adminController.resetPassword);

router.get('/Logout',adminController.adminLogout);

router.post('/activateAdminAccount',adminController.ActivateAdminAccount);

module.exports = router;