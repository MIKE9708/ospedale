const router = require("express").Router();
const express = require('express');
const dottoreController = require ( "../../Controller/dottori.Controller");
const gatewayConnectionToChain = require('../../middleware/fabricConnect');
const checkRole = require("../../middleware/checkRole"); 

router.get( 'doctorInfo/:id' ,gatewayConnectionToChain, checkRole("Doctor"),dottoreController.get_info );

router.post( '/:id/Pazienti/',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.get_patients_record );

router.post( '/UpdateRecord/:id',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.update_patient_record );

router.get('/freePatients/',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.getFreePatients );

router.post('/followPatient', gatewayConnectionToChain,checkRole("Doctor") ,dottoreController.followPatient );

router.post('/UnfollowPatient',gatewayConnectionToChain,checkRole("Doctor") ,dottoreController.unfollowPatient);

module.exports = router;
