
const prenotazioni = require('../models/Prenotazioni');

const nodemailer = require('nodemailer');// modulo per gestire email

const corse=require('../models/corse');
const veicoli=require('../models/Veicoli');
const transporter = nodemailer.createTransport({// account gmail usato per inviare email
    service: 'gmail',
    auth: {
      user: 'ppinuccio19@gmail.com',
      pass: 'Stardust99#'
    }
  });


  exports.delete_ride =async (req,res,next)=>{

    var ride={};
    try{
    
    ride=await corse.remove(req.body.id_ride);
    console.log("controllo termina corsa"+JSON.stringify(ride));
    if( !ride ){
      
      console.log("ride"+ride);
      return  res.status(404).json({message:"nessuna corsa trovata"});
    }
    else if(ride){
      await veicoli.open(req.body.id_vehicle,false);
      console.log("chiusura veicolo avvenuta con successo");
    return  res.status(200).json(ride);

    }
    
    }catch(err){
        console.log("errore  eliminazione corsa: \n"+err);
               return  res.status(500).json({message:'errore eliminazione corsa',error:err});
    }

}


exports.getAll=async (req,res,next)=>{

    var rides={};
    try{
    
    rides=await corse.getAll(req.body.id_client);
   
    return  res.status(200).json(rides);


    
    }catch(err){
        console.log("errore  individuazioni corse");
               return  res.status(500).json({message:'errore individuazioni corse',error:err});
    }

}

exports.getRide=async (req,res,next)=>{

  var rides={};
  try{
  
  rides=await corse.get(req.body.code_prenotation);
 if(rides){
  return  res.status(200).json(rides);
 }
 else{
   return res.status(404).json({message:"corsa non trovata"});
 }

  
  }catch(err){
      console.log("errore  individuazioni corse");
             return  res.status(500).json({message:'errore individuazioni corse',error:err});
  }

}


exports.delete_ride_emp =async (req,res,next)=>{

  var ride={};
  var id_vh={};
  var pren={};
  try{
  pren=await corse.getById(req.body.id_ride);
  pren=pren.ref_pren;
    id_vh=await prenotazioni.get_single(pren);
    id_vh=id_vh.ref_vehicle;
  ride=await corse.remove(req.body.id_ride);
  
    await veicoli.open(id_vh,false);
    console.log("chiusura veicolo avvenuta con successo");
  return  res.status(200).json(ride);


  
  }catch(err){
      console.log("errore  eliminazione corsa: \n"+err);
             return  res.status(500).json({message:'errore eliminazione corsa',error:err});
  }

}