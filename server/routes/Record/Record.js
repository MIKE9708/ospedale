const router = require("express").Router();
const express = require('express');
const recordController = require('../../Controller/record.Controller');
const gatewayConnectionToChain = require('../../middleware/fabricConnect');


router.get('/:id',gatewayConnectionToChain,recordController.getRecord);

module.exports = router;
