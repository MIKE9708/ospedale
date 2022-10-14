const router = require("express").Router();
const express = require('express');
const dottoreController = require ( "../../Controller/dottori.Controller");
const gatewayConnectionToChain = require('../../middleware/fabricConnect');

router.get( '/:id' ,gatewayConnectionToChain, dottoreController.get_info );
router.get( '/:id/Pazienti/',gatewayConnectionToChain,dottoreController.get_patients_record );
router.post( '/AddRecord',gatewayConnectionToChain,dottoreController.add_patient_record );
router.get( '/DeleteRecord/:id',gatewayConnectionToChain,dottoreController.delete_patient_record );
router.post( '/UpdateRecord/:id',gatewayConnectionToChain,dottoreController.update_patient_record );
router.post( '/addPatient',gatewayConnectionToChain,dottoreController.add_patient_record );
router.get('/freePatients/',gatewayConnectionToChain,dottoreController.getFreePatients );

module.exports = router;
