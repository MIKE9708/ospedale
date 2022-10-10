const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');


router.post('/deleteUser',adminController.deleteUser);

router.post('/addUser',adminController.addUser_to_blockchain);

router.get('/listDoctors',adminController.listDoctor_from_blockchain);

router.get('/listPatients',adminController.listPatient_from_blockchain);