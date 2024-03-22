var express = require('express');
var router = express.Router();
var AggiungiImpiegatiCTR=require('../controllers/AggiungiImpiegatiCTR');
var ModificaImpiegatiCTR=require('../controllers/ModificaImpiegati');
var EliminaImpiegatiCTR=require('../controllers/EliminaImpiegatiCTR');
var AccessoAziendaleCTR=require('../controllers/AccessoAziendaleCTR');
var ModificaDatiPersonaliCTR=require('../controllers/ModificaDatiControl');
var Segnalazione=require('../controllers/GestioneImprevistiCTR');
var TerminaCorsaCTR=require('../controllers/TerminaCorsa');
var EliminaPrenotazioneCTR=require('../controllers/EliminaPrenotazioneCTR');
var ModificaPrenotazioneCTR=require('../controllers/ModificaPrenotazione');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*Rotta per il caso d'uso Accesso Aziendale*/
router.post('/AccessoAziendale',AccessoAziendaleCTR.login);//testato


/*Rotte per il caso d'uso Gestione impiegati*/
router.post('/AggiungiImpiegati_add',AggiungiImpiegatiCTR.add_employer);//testato
router.post('/AggiungiImpiegati_get',AggiungiImpiegatiCTR.get_employers);//testato
router.post('/EliminaImpiegati_del',EliminaImpiegatiCTR.delete_employer);//testato
//get locale
router.post('/EliminaImpiegati_get',EliminaImpiegatiCTR.get_employers);//testato
router.post('/ModificaImpiegati_mod',ModificaImpiegatiCTR.modify_employer);//testato
//get locale
router.post('/ModificaImpiegati_get',ModificaImpiegatiCTR.get_employers);//testato


/*Rotta per il caso d'uso Gestione Corse*/
router.post('/TerminaCorsa_del',TerminaCorsaCTR.delete_ride);//testato
router.post('/TerminaCorsa_get',TerminaCorsaCTR.getAll);//testato

/*Rotte per il caso d'uso Prenotazione*/
router.post('/EliminaPrenotazione_del',EliminaPrenotazioneCTR.delete_prenotation);//testato
router.post('/EliminaPrenotazione_get',EliminaPrenotazioneCTR.get_prenotations);//testato
router.post('/EliminaPrenotazione_refund',EliminaPrenotazioneCTR.send_refund);//testato

router.post('/ModificaPrenotazione',ModificaPrenotazioneCTR.modify);//testato

router.post('/ModificaDati_get',ModificaDatiPersonaliCTR.get_data_emp);//testato
router.post('/ModificaDati_mod',ModificaDatiPersonaliCTR.modify_emp);//testato


router.post('/Segnalazione',Segnalazione.segnala);



module.exports = router;