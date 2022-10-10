const router = require("express").Router();
const express = require('express');
const recordController = require('../../Controller/record.Controller');


router.get('/:id',recordController.getRecord);