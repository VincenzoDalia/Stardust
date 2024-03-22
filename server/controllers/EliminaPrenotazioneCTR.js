const prenotazioni = require('../models/Prenotazioni');
const pagamenti = require('../models/Pagamenti');
const nodemailer = require('nodemailer');// modulo per gestire email
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const Veicoli = require('../models/Veicoli');
const cliente =require('../models/cliente');
const Pagamenti = require('../models/Pagamenti');
const transporter = nodemailer.createTransport({// account gmail usato per inviare email
        service: 'gmail',
        auth: {
          user: 'progettostardust@gmail.com',
          pass: 'Stardust99#'
        }
      });

var flag=new Map();







exports.get_prenotations = async (req,res,next)=>{
  
    let complete={};
   
    try{    
      
            
          console.log("flag:"+flag.get(req.body.id_client));
           if(flag.get(req.body.id_client)==false|| flag.get(req.body.id_client)==null || req.body.on==true){

                complete=await prenotazioni.getAll_js(req.body.id_client);
                flag.set(req.body.id_client,true);
              }
              else if(flag.get(req.body.id_client)==true){
                console.log("prenotazioni già memorizzate localmene\n:")
                complete=await prenotazioni.lookAll_loc(req.body.id_client);
                
              }
             
             
            console.log("complete:\n"+JSON.stringify(complete));
     
           

            
         return res.status(200).json(complete);
        
    }catch(err){
            console.log(" errore, non hai ottenuto tutte le prenotazioni\n"+err);
            return res.status(500).json({message:'errore  prenotazioni',error:err});
    }
}

//prima si deve effettuare l'eliminazione/rimborso del pagamento corrispondente
exports.delete_prenotation=async (req,res,next) =>{ 
        let result={};
        let payment={};
       
        try{
            payment=await pagamenti.remove(req.body.code_prenotation);
            console.log("eliminazione pagamento effettuata");
            result= await prenotazioni.remove(req.body.code_prenotation);
            if ( !result ) {
              console.log("result"+result);
            
            return   res.status(404).json({message:"nessuna prenotazione trovata"});
          }else if(result){
            return res.status(200).json({"message":"hai eliminato la prenotazione selezionata"});
          }
        }catch(err){
            console.log("errore  interno eliminazione prenotazione");
                   return  res.status(500).json({message:'errore eliminazione prenotazione',error:err});
        }
}


// versione con email
exports.send_refund =async (req,res,next)=> {

        let result={};
       
        let email =req.body.email;
        console.log("request"+JSON.stringify(req.body));
        try{
      
   
           
            console.log(JSON.stringify(result));
            transporter.sendMail({
                from: 'ppinuccio19@gmail.com',
                to: email,
                subject: 'rimborso',
                text: `E' stato effettuato il rimborso totale   della prenotazione , a seguito della sua eliminazione `
              }, function(err, info) {
                if (err) {
                  throw err;
                } else {
                  console.log("email mandata "+info.response);
                }
              });
            return res.status(200).json({"message":"rimborso effettuato ,controlla la tua email per vedere il resoconto"});
        }catch(err){
            console.log("errore  interno "+err);
                   return  res.status(500).json({message:'errore rimborso',errore:err});
        }

}

exports.send_refund_update =async (req,res,next)=> {

  let result={};
 let pay={};
 
  console.log("request"+JSON.stringify(req.body));
  try{

      result= await pagamenti.get_single(req.body.id_client,req.body.code_prenotation);
      pay=await pagamenti.remove(req.body.code_prenotation);
      let crypted_code_cdc=await cliente.crypt(req.body.code_cdc);
      const payment = new Pagamenti ({
          id_client:req.body.id_client,
          code_prenotation:req.body.code_prenotation,
          code_cdc:crypted_code_cdc,
          price:req.body.price,
          date:new Date()
      });
      pagamento = await Pagamenti.create(payment);
      
      return res.status(200).json({"message":"rimborso effettuato ,controlla la tua email per vedere il resoconto"});
  }catch(err){
      console.log("errore  interno "+err);
             return  res.status(500).json({message:'errore rimborso',errore:err});
  }

}



