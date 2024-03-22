const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const impiegati = require('../models/Impiegati');
const crypto = require('crypto');





exports.modify_employer=async (req,res,next) =>{ 
    let result={};
   


    var encpsw=await impiegati.crypt(req.body.password);
    try{
        // creo l'oggetto impiegato con i dati inviati dal frontend
        const employer = new impiegati({
            name:req.body.name,
            surname:req.body.surname,
            gender:req.body.gender,
    
            birthdate:req.body.birthdate,
            address:req.body.address,
            cf:req.body.cf,
    
            residence:req.body.residence,
            cellphone_number:req.body.cellphone_number,
            personal_document:req.body.personal_document,
            code_document:req.body_code_document,
            role:req.body.role,
            email:req.body.email,
            password:encpsw
          });
        // lo aggiorno sia nel db che localmente
        result =await impiegati.updateById(req.body.id_impiegato,employer);
            return res.status(200).json({"flag":true});
    
    }catch(err){
        console.log("errore  interno modifica impiegato");
               return  res.status(500).json({message:'errore modifica impiegato',error:err});
    }


}

// prendo gl iimpiegati localmente memorizzati e li mando come json
exports.get_employers = async (req,res,next)=> {

    let result={};
    
    try{
    result= await impiegati.look_ad();
    if(result.length==0){
        return res.status(404).send("non vi sono impiegati memorizzati localmente ");
        
      }
      return res.status(200).json(result);
    }catch(err){
        console.log("errore acquisizione impiegati");
               return   res.status(500).json({message:'errore acquisizione impiegati',error:err});
    }

}

