const router = require("express").Router();
const express = require('express');
const dottoreController = require ( "../../Controller/dottori.Controller");


router.get( '/:id' , dottoreController.get_info );
router.get( '/:id/Pazienti/',dottoreController.get_patients_record );
router.post( '/AddRecord',dottoreController.add_patient_record );
router.get( '/DeleteRecord/:id',dottoreController.delete_patient_record );
router.post( '/UpdateRecord/:id',dottoreController.update_patient_record );
router.post( '/addPatient',dottoreController.addPatient );
router.get('/freePatients/',dottoreController.getFreePatients );

module.exports = router;
