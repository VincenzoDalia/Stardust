const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const cliente =require('../models/cliente');
const notp =require('notp'); // modulo per gestire OTP
const nodemailer = require('nodemailer');// modulo per gestire email
const prenotazioni = require('../models/Prenotazioni');
const Veicoli = require('../models/Veicoli');
const corse=require('../models/corse');
const transporter = nodemailer.createTransport({// account gmail usato per inviare email
    service: 'gmail',
    auth: {
      user: 'progettostardust@gmail.com',
      pass: 'Stardust99#'
    }
  });

  
var client_OTP=new Map();





// richiede le prenotazioni e le restituisce al front end
exports.get_prenotations=async  (req,res,next)=>{
var result={};

try{

    result=await  prenotazioni.getAll(req.body.id_client);
    // oppure se già sono memorizzate nella entity prenotazioni
    //result=prenotazioni.lookAll(req.body.id_client);
    return  res.status(200).json(result);



}catch(err){
    console.log("errore  ricerca prenotazioni");
            return  res.status(500).json({message:'errore ricerca prenotazioni',error:err});
}
}



exports.generate_OTP= async (req,res,next)=> {


// soluzione usando cliente 
var client= await cliente.look(req.body.id_client);


var key=new Date().getUTCMilliseconds();
var email=client.email;   
    //genero l'otp
var OTP=notp.totp.gen(key,120);
client_OTP.set(req.body.id_client,OTP);
// usare api per mandare sms con il codice otp generato
//per adesso simulo con una email

transporter.sendMail({
    from: 'progettostardust@gmail.com',
    to: email,
    subject: 'Codice OTP Stardust',
    text: 'il tuo codice OTP generato per l\'apertura del veicolo : '+OTP
    }, function(err, info) {
    if (err) {
        throw err;
    } else {
        console.log("email mandata "+info.response);
    }
    });
    return  res.status(200).json({"message":"otp generato e inviato al cliente"});
};


// confronto il codice otp generato per il cliente con quello immesso
exports.check = async  (req,res,next)=>{
    var otp_cliente=req.body.otp;
    
    if(otp_cliente==client_OTP.get(req.body.id_client)){
        
        return res.json({"flag":true,"otp":client_OTP.get(req.body.id_client)});
    }else{
        return res.json({"flag":false});
    }

};


exports.open_vehicle= async(req,res,next) =>{
    var result={};
    var pren={};
    try{
    
         result= await Veicoli.open(req.body.id_vehicle,true);
        //imposta complete a true
        result=await prenotazioni.findById(req.body.code_prenotation);
        result=result[0];
        result.complete="true";
        pren=await prenotazioni.updateById(req.body.code_prenotation,result);
        console.log("complete impostato a true");
        return  res.status(200).json(result);  
    }catch(err){
        console.log("errore apertura veicolo");
                return  res.status(500).json({message:'errore apertura veicolo',error:err});
    }

}
    

exports.close_vehicle= async(req,res,next) =>{
    var result={};
    var pren={};
    var id_vh="";
    try{  
        pren=await prenotazioni.findById(req.body.code_prenotation);
        pren=pren[0];
        id_vh=pren.ref_vehicle;
        result= await Veicoli.open(id_vh,false);
        console.log(" veicolo chiuso correttamente");
        return  res.status(200).json(result);
     
    }catch(err){
        console.log("errore chiusura veicolo");
                return  res.status(500).json({message:'errore chiusura veicolo',error:err});
    }
}




exports.add_ride=async (req,res,next)=>{
    var result={};
    try{
        const corsa = new corse ({
            ref_pren:req.body.code_prenotation,
            ref_client:req.body.ref_client,
            ref_driver:req.body.ref_driver,
            price:req.body.price

        });
        result=await corse.add_ride(corsa);
        console.log("corsa inserita correttamente nel database");
        return  res.status(200).json(result);
    }catch(err){
        console.log("errore  inserimento corsa");
               return  res.status(500).json({message:'errore inserimento corsa',error:err});
    }
  }

