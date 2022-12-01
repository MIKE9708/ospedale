const router = require("express").Router();
const express = require('express');
const dottoreController = require ( "../../Controller/dottori.Controller");
const gatewayConnectionToChain = require('../../middleware/fabricConnect');
const checkRole = require("../../middleware/checkRole"); 

router.get( 'doctorInfo/:id' ,gatewayConnectionToChain, checkRole("Doctor"),dottoreController.get_info );
router.post( '/:id/Pazienti/',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.get_patients_record );
router.post( '/AddRecord',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.add_patient_record );
router.post( '/DeleteRecord/',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.delete_patient_record );
router.post( '/UpdateRecord/:id',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.update_patient_record );
router.post( '/addPatient',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.add_patient_record );
router.get('/freePatients/',gatewayConnectionToChain,checkRole("Doctor"),dottoreController.getFreePatients );
router.post('/followPatient', gatewayConnectionToChain,checkRole("Doctor") ,dottoreController.followPatient );

module.exports = router;
