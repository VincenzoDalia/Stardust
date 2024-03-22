const prenotazioni = require('../models/Prenotazioni');
const pagamenti = require('../models/Pagamenti');
const nodemailer = require('nodemailer');// modulo per gestire email
const cliente =require('../models/cliente');
const impiegato=require('../models/Impiegati');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');



// versione cliente

exports.get_data=async(req,res,next)=>{
    let data ={};
    //let psw = await cliente.crypt(req.body.password);
     //data = await cliente.find_em_pw(req.body.email,psw);
     data= await cliente.findById(req.body.id_client);
    if (data){
        console.log("dati utente trovati");
        return res.status(200).json(data);
    }
    else {
        console.log("errore  interno per la ricerca utente");
        return  res.status(500).json({message:'errore ricerca utente'});
    }

}


exports.modify =async(req,res,next)=>{
    let data ={};
   
    try{
        
        const  client= new cliente({
            name:req.body.name,
            surname:req.body.surname,
            gender:req.body.gender,
            cf:req.body.cf,
            birthdate: req.body.birthdate,
            address:req.body.address,
            city:req.body.city,
            region:req.body.region,
            personal_document:req.body.personal_document,
       
            cellphone_number:req.body.cellphone_number,
           
            
            cvv2:req.body.cvv2,
            code_cdc:req.body.code_cdc,
            expiration_date:req.body.expiration_date,
            code_document:req.body.code_document,
            email:req.body.email,
            password:req.body.password,
        });
     data = await cliente.updateById(req.body.id_client,client);
   
        console.log("dati utente modificati correttamente");
        return res.status(200).json(data);
    
    
}catch(err){
    console.log("errore  interno per la modifica utente");
    return  res.status(500).json({message:'errore modifica utente'});
}

}


//versione impiegato

exports.get_data_emp=async(req,res,next)=>{
    let data ={};
    try{
    
    //data= await impiegato.look(req.body.id_impiegato);
    data=await impiegato.findByEmail(req.body.email);
    /*if(data==undefined || data==null){
        
        let psw= await impiegato.crypt(req.body.password);
        data = await impiegato.find_em_pw(req.body.email,psw);
    }*/
    if(data){
    
        console.log("dati utente trovati"+data);
        return res.status(200).json(data);
    }else{
        console.log("dati utente non trovati");
        return  res.status(404).json({message:'errore ricerca utente',errore:err});
    }
    }catch(err){
        console.log("errore  interno per la ricerca utente"+err);
        return  res.status(500).json({message:'errore ricerca utente',errore:err});
    }

}



exports.modify_emp =async(req,res,next)=>{
    let data ={};
    let id=req.body.id_impiegato;
    try{
        
        const  emp= new impiegato({
                    
            name:req.body.name,
            surname:req.body.surname,
            gender:req.body.gender,

            birthdate:req.body.birthdate,
            address:req.body.address,
            cf:req.body.cf,

            residence:req.body.residence,
            cellphone_number:req.body.cellphone_number,
            personal_document:req.body.personal_document,
            code_document:req.body.code_document,
            role:req.body.role,
            email:req.body.email,
            password:req.body.password
        });
     data = await impiegato.updateById(id,emp);
   
        console.log("dati utente modificati correttamente");
        return res.status(200).json(data);
    
    
}catch(err){
    console.log("errore  interno per la modifica utente\n"+err);
    return  res.status(500).json({message:'errore modifica utente'});
}

}