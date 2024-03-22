const prenotazioni = require('../models/Prenotazioni');
const pagamenti = require('../models/Pagamenti');
const nodemailer = require('nodemailer');// modulo per gestire email
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const Veicoli = require('../models/Veicoli');



exports.modify=async (req,res,next)=>{
    
    let result={};
    let start=new Date(req.body.start_date);
    let end=new Date(req.body.end_date);
    try{    

        
        const pren= new prenotazioni({
            ref_client:req.body.id_client,
            primary_opt:req.body.primary_opt,
            
            start_date:start,
            
            end_date:end,
            start_address:req.body.start_address,
            end_address:req.body.end_address,
            
            vehicle_type:req.body.vehicle_type,
            ref_vehicle:req.body.ref_vehicle,
            ref_driver:req.body.ref_driver,
            price:req.body.price,
            complete:req.body.complete});

            result=await prenotazioni.updateById(req.body.code_prenotation,pren);
            console.log("hai modificato la seguente  prenotazione"+ pren);
        
           
    
         return res.status(200).json(result);
        
    }catch(err){
            console.log(" errore, non hai modificato la  prenotazione");
            return res.status(500).json({message:'errore modifica  prenotazione',error:err});
    }
}






