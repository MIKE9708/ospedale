const router = require("express").Router();
const express = require('express');
const dottoreController = require ( "../../Controller/dottori.Controller");
const gatewayConnectionToChain = require('../../middleware/fabricConnect');

router.get( 'doctorInfo/:id' ,gatewayConnectionToChain, dottoreController.get_info );
router.get( '/:id/Pazienti/',gatewayConnectionToChain,dottoreController.get_patients_record );
router.post( '/AddRecord',gatewayConnectionToChain,dottoreController.add_patient_record );
router.post( '/DeleteRecord/',gatewayConnectionToChain,dottoreController.delete_patient_record );
router.post( '/UpdateRecord/:id',gatewayConnectionToChain,dottoreController.update_patient_record );
router.post( '/addPatient',gatewayConnectionToChain,dottoreController.add_patient_record );
router.get('/freePatients/',gatewayConnectionToChain,dottoreController.getFreePatients );
router.post('/followPatient', gatewayConnectionToChain,dottoreController.followPatient );

module.exports = router;
