const adminController = require("../../Controller/admin.Controller");
const router = require("express").Router();
const express = require('express');

router.post('/login',adminController.login);
