const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const cliente =require('../models/cliente');
const stalli=require('../models/stalli');



exports.register=async (req,res,next)=>{ 
    
       
    let check={};
    let psw="";
    psw= await cliente.crypt(req.body.password);
    let birthdate_c=new Date(req.body.birthdate);
    let exp=new Date(req.body.expiration_date);
    
   
   const client = new cliente ({                
    name:req.body.name,
    surname:req.body.surname,
    gender:req.body.gender,
    cf:req.body.cf,
    birthdate:birthdate_c,
    address:req.body.address,
    city:req.body.city,
    region:req.body.region,
    personal_document:req.body.personal_document,

    cellphone_number:req.body.cellphone_number,

   
    cvv2:req.body.cvv2,
    code_cdc:req.body.code_cdc,
    expiration_date:exp,
    code_document:req.body.code_document,
    email:req.body.email,
    password:psw

    });

    try{
    
    check= await  cliente.create(client);
    console.log("registrazione avvenuta"+check);
    return  res.status(200).json({flag:true});
    

    
    }catch(err){
        console.log("errore  registrazione"+err);
           
              return  res.status(500).json({flag:false});
    }

}


/* json per testing
{
         
        "name":"pippo",
        "surname":"pluto",
        "gender":"m",
        "cf":"cf_prova",
        "birthdate": "01-04-2012" ,
        "address":"via topolino 43",
        "city":"palermo",
        "region":"sicilia",
        "personal_document":"carta_identità_pr",
        "cellphone_number":"+393367208383",
        "iban":"iban_prova",
        "cvv2":176,
        "code_cdc":90772433,
        "expiration_date":"01-04-2012" ,
        "code_document":"a-b-a2",
        "email":"prova@prova.it",
       "password":"abcdef1."

}*/











