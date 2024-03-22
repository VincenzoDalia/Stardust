var express = require('express');
var router = express.Router();

var AccessoAziendaleCTR=require('../controllers/AccessoAziendaleCTR');

var NotificaPrenotazioniCTR= require('../controllers/NotificaPrenotazioniCTR');
var ModificaDatiPersonaliCTR=require('../controllers/ModificaDatiControl');
var Segnalazione=require('../controllers/GestioneImprevistiCTR');
var TerminaCorsaCTR=require('../controllers/TerminaCorsa');
var RecuperaPassword=require('../controllers/RecuperaPassword');




/*Rotte per il caso d'uso Autenticazione*/
router.post('/AccessoAziendale',AccessoAziendaleCTR.login);//testato

router.post('/NotificaPrenotazioni_pren',NotificaPrenotazioniCTR.avaible_prenotations);//testato

router.post('/NotificaPrenotazioni_em',NotificaPrenotazioniCTR.email_client);//testato
router.post('/NotificaPrenotazioni_ride',NotificaPrenotazioniCTR.add_ride);//testato
router.post('/NotificaPrenotazioni_nem',NotificaPrenotazioniCTR.negative_email);
router.post('/NotificaPrenotazioni_ref',NotificaPrenotazioniCTR.send_refund);
router.post('/NotificaPrenotazioni_driver',NotificaPrenotazioniCTR.avaible_driver_v1);//testato


/*Rotta per il caso d'uso Gestione Corse*/
router.post('/TerminaCorsa_del',TerminaCorsaCTR.delete_ride);//testato


router.post('/Segnalazione',Segnalazione.segnala);//testato

/*Rotta per il caso d'uso Gestione Account*/
router.post('/ModificaDati_get',ModificaDatiPersonaliCTR.get_data_emp);//testato
router.post('/ModificaDati_mod',ModificaDatiPersonaliCTR.modify_emp);//testato
router.post('/RecuperaPass_ex',RecuperaPassword.exist_emp);//testato
router.post('/RecuperaPass_gen',RecuperaPassword.generate_password);//testato






module.exports = router;