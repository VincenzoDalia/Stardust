const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const impiegati = require('../models/Impiegati');






exports.delete_employer=async (req,res,next) =>{ 
    let result={};
    
   
    try{
    
        // rimozione singola
        result= await impiegati.remove(req.body.id_impiegati);
        return res.status(200).json({"message":"hai eliminato l'impiegato"});
    
  
    
    
   
    
    }catch(err){
        console.log("errore  interno eliminazione impiegato"+err);
               return  res.status(500).json({message:'errore eliminazione impiegato',error:err});
    }


}

// prendo gl impiegati localmente memorizzati e li mando come json
exports.get_employers = async (req,res,next)=> {

    let result={};
    
    try{
    result= await impiegati.look_ad();
    console.log("look:\n"+result);
    if(result.length==0){
        return res.status(404).send("non vi sono impiegati memorizzati localmente ");
        
      }
      return res.status(200).json(result);
    }catch(err){
        console.log("errore acquisizione impiegati\n"+err+"\n"+JSON.stringify(result));
               return   res.status(500).json({message:'errore acquisizione impiegati',error:err});
    }

}

