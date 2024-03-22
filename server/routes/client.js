


var express = require('express');
var router = express.Router();

var RegistrazioneCTR=require('../controllers/RegistrazioneCTR.js');
var AggiungiPrenotazioneCTR=require('../controllers/AggiungiPrenotazioneCTR');
var EliminaPrenotazioneCTR=require('../controllers/EliminaPrenotazioneCTR');
var EliminaPrenotazioneCTR=require('../controllers/EliminaPrenotazioneCTR');
//var NotificaPrenotazioneCTR=require('../controllers/NotificaPrenotazioniCTR');
var PagamentoCTR=require('../controllers/PagamentoCTR');
var ModificaPrenotazioneCTR=require('../controllers/ModificaPrenotazione');
var AccessoClienteCTR=require('../controllers/AccessoCliente');
var ModificaDatiPersonaliCTR=require('../controllers/ModificaDatiControl');
var RecuperaPasswordCTR=require('../controllers/RecuperaPassword');
var GestioneImprevistiCTR=require('../controllers/GestioneImprevistiCTR');
var RitiroMezzoCTR=require('../controllers/RitiroMezzoCTR');
var TerminaCorsaCTR= require('../controllers/TerminaCorsa');


/* vietiamo la rotta /client 
router.get('/', function(req, res, next) {
  next(createError(403));
});
*/

/*Rotte per il caso d'uso Prenotazione*/

router.post('/AggiungiPrenotazione_add',AggiungiPrenotazioneCTR.add_prenotation);//testato
router.post('/AggiungiPrenotazione_add_div',AggiungiPrenotazioneCTR.add_prenotation_driver);
router.post('/AggiungiPrenotazione_check_otp',AggiungiPrenotazioneCTR.check);//testato
router.post('/AggiungiPrenotazione_vehicles',AggiungiPrenotazioneCTR.check_vehicles_compatible);//testato
router.post('/AggiungiPrenotazione_OTP',AggiungiPrenotazioneCTR.generate_OTP);//testato
router.post('/AggiungiPrenotazione_email',AggiungiPrenotazioneCTR.email);//testato
router.post('/AggiungiPrenotazione_drivers',AggiungiPrenotazioneCTR.get_avaible_drivers);//testato
router.post('/AggiungiPrenotazione_pren_tmp',AggiungiPrenotazioneCTR.get_prenotations_tmp);//testato




router.post('/EliminaPrenotazione_del',EliminaPrenotazioneCTR.delete_prenotation);//testato
router.post('/EliminaPrenotazione_get_pren',EliminaPrenotazioneCTR.get_prenotations);//testato
router.post('/EliminaPrenotazione_refund',EliminaPrenotazioneCTR.send_refund);//testato
router.post('/EliminaPrenotazione_refund_up',EliminaPrenotazioneCTR.send_refund_update);//testato

router.post('/ModificaPrenotazione',ModificaPrenotazioneCTR.modify);//testato




router.post('/Pagamento_get_data',PagamentoCTR.get_data);// testato

router.post('/Pagamento_get_price',PagamentoCTR.get_Price);// testato
router.post('/Pagamento_pay',PagamentoCTR.pay);//testato
router.post('/Pagamento_getAll',PagamentoCTR.getAll);//testato
router.post('/Pagamento_get_local',PagamentoCTR.getAll_local);//testato

/*Rotta per il caso d'uso Autenticazione*/
router.post('/AccessoCliente',AccessoClienteCTR.login);//testato

/*Rotte per il caso d'uso Gestione Account*/
router.post('/ModificaDati_get',ModificaDatiPersonaliCTR.get_data);//testato
router.post('/ModificaDati_mod',ModificaDatiPersonaliCTR.modify);//testato


router.post('/RecuperaPassword_exist',RecuperaPasswordCTR.exist);//testato
router.post('/RecuperaPassword_pass',RecuperaPasswordCTR.generate_password);// testato

/*Rotta per il caso d'uso Registrazione*/
router.post('/Registrazione',RegistrazioneCTR.register);// testato

/*Rotte per il caso d'uso Gestione Corse*/
router.post('/Segnalazione',GestioneImprevistiCTR.segnala);
router.post('/Segnalazione_pren',GestioneImprevistiCTR.prenotazione);

router.post('/RitiroMezzo_get',RitiroMezzoCTR.get_prenotations);//testato
router.post('/RitiroMezzo_otp',RitiroMezzoCTR.generate_OTP);//testato
router.post('/RitiroMezzo_check',RitiroMezzoCTR.check);//testato
router.post('/RitiroMezzo_open',RitiroMezzoCTR.open_vehicle);//testato
router.post('/RitiroMezzo_close',RitiroMezzoCTR.close_vehicle);//testato
router.post('/RitiroMezzo_ride',RitiroMezzoCTR.add_ride);//testato


router.post('/TerminaCorsa_get',TerminaCorsaCTR.getAll);//testato
router.post('/TerminaCorsa_get_single',TerminaCorsaCTR.getRide);//testato
router.post('/TerminaCorsa_del',TerminaCorsaCTR.delete_ride);//testato




module.exports = router;
