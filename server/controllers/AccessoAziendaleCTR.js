const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const impiegati = require('../models/Impiegati');




exports.login=async (req,res,next)=>{

    let emp={};
    let psw=await impiegati.crypt(req.body.password);
    console.log(psw);
    try{
    emp=await impiegati.findByEmail(req.body.email);
    if(emp){
        console.log("condition:"+emp.password!=psw);
        console.log("empe:"+JSON.stringify(emp));
        console.log("password cryptata:"+psw +"\n password db:"+emp.password);

        if(emp.password!=psw){
            return res.status(500).json({message:"password non coincidenti"});
        }
        else{
        console.log("impiegato loggato");
        return  res.status(200).json(emp);
        }
    }else{
        console.log("utente non trovato");
        return res.status(404).json({message:"utente non trovato"});s
    }


    
    }catch(err){
        console.log("errore  impiegato non trovato");
               return  res.status(404).json({message:'errore impiegato non trovato',error:err});
    }

}


