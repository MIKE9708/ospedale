const router = require("express").Router();
const express = require('express');
const recordController = require('../../Controller/record.Controller');
const gatewayConnectionToChain = require('../../middleware/fabricConnect');
const checkRole = require('../../middleware/checkRole');

router.get('/',gatewayConnectionToChain,checkRole("patient"),recordController.getRecord);

module.exports = router;
