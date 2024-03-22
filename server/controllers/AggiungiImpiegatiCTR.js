const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const impiegati = require('../models/Impiegati');






exports.add_employer=async (req,res,next) =>{ 
    let result={};
    
    var encpsw=await impiegati.crypt(req.body.password);// password cifrata
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
        code_document:req.body.code_document,
        role:req.body.role,
        email:req.body.email,
        password:encpsw
    });
    console.log(employer)
    try{
      
    // inserisco  nel db l'impiegato
    // lo inserisco anche localmente
    result= await impiegati.create(employer);
   
    return res.status(200).json(result);
    }catch(err){
        console.log("errore  inserimento impiegato"+ err );
               return  res.status(500).json({message:'errore inserimento impiegato',error:err});
    }


}

// da fare dopo il login di admin al fine di memorizzare  localmente gli impiegati
exports.get_employers = async (req,res,next)=> {

    let result={};
    
    try{
    result= await impiegati.getAll();// ho aggiunto anche localmente gli impiegati
    if(result.length==0){
        return res.status(404).send("non vi sono impiegati nel database ");
        
      }
      res.status(200).json(result);
    }catch(err){
        console.log("errore acquisizione impiegati\n"+err);
               return   res.status(500).json({message:'errore acquisizione impiegati',error:err});
    }

}