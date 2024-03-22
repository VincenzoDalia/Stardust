const prenotazioni = require('../models/Prenotazioni');
const pagamenti = require('../models/Pagamenti');
const nodemailer = require('nodemailer');// modulo per gestire email
const impiegati = require('../models/Impiegati');
const corse=require('../models/corse');
const cliente=require('../models/cliente');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const transporter = nodemailer.createTransport({// account gmail usato per inviare email
    service: 'gmail',
    auth: {
      user: 'progettostardust@gmail.com',
      pass: 'Stardust99#'
    }
  });

//per ogni prenotazione rifiutata possiede la stringa con gli id degli autisti che l'hanno rifiutata
var rejected=new Map();


exports.avaible_prenotations=async (req,res,next) =>{ 

    
    let prenotations={};
    
    let json_pren="[";
   let pren_str={};
    let i=0;
   let index=0;
   const rgex=/,$/gm;
    try{
        // acquisisco i dati dell'impiegato senza chiedere al database
        // poichè avendo già effettuato il login posso prendere i dati dell'impiegato memorizzati nella mappa
        //data= await impiegati.look(req.body.id_impiegato);
        let data=await impiegati.findById(req.body.id_impiegato);
        // ottengo le prenotazioni dove è presente l'impiegato
        prenotations= await prenotazioni.get_prenotations(req.body.id_impiegato);
        for (const el of prenotations){
               console.log("elementi di prenotazione:\n"+JSON.stringify(el));
               
               console.log("start_date:\n"+el.start_date);
               
                    let m=new Date().getMonth();
                    let d=new Date().getDay();
                    let y=new Date().getFullYear();
                    let m_p=new Date(el.start_date).getMonth();
                    let d_p=new Date(el.start_date).getDay();
                    let y_p=new Date(el.start_date).getFullYear();
              
              let  time_p=new Date (el.start_date).getTime();// data prenotazione  in millisecondi
              let time_n=new Date().getTime();//data attuale in millisecondi
              
          
         console.log("condizione primo if :"+((time_p-time_n<3600000)||(time_p-time_n<0)));
          
           if((controlloData(el.start_date,el.end_date)==false)&&((time_p-time_n<3600000)||(time_p-time_n<0)) && (el.complete=="false")&& (el.primary_opt=="autista")){
               // elimino le prenotazioni ordinarie che non rispettano il vincolo dell' ora
               //mandare avviso  al cliente e rimborsarlo
               
               let email=await cliente.findById(el.ref_client);
               email=email.email;
               transporter.sendMail({
                from: 'progettostardust@gmail.com',
                to: email,
                subject: 'AUTISTA RIFIUTATO',
                text: 'la sua prenotazione  avente codice :'+el.code_prenotation+' è stata cancellata e sarà rimborsata \
                 poichè non vi sono autisti disponibili per la data e orario da lei richiesto,\
                 ci scusiamo per questo disagio e la invitiamo a scegliere altra data o ora per la sua richiesta '
              }, function(err, info) {
                if (err) {
                  throw err;
                } else {
                  console.log("email rifiuto corsa mandata "+info.response);
                }
              });
              let pay_del=await pagamenti.remove(el.code_prenotation);
              console.log("pagamento eliminato\n"+pay_del);
               transporter.sendMail({
                from: 'progettostardust@gmail.com',
                to: email,
                subject: 'rimborso',
                text: `è stato effettuato il rimborso totale della prenotazione :` +el.code_prenotation
                
              }, function(err, info) {
                if (err) {
                  throw err;
                } else {
                  console.log("email mandata "+info.response);
                }
              });
              
              let pren_rm= await prenotazioni.remove(el.code_prenotation);
               console.log("prenotazione eliminata poichè non rispetta il vincolo delle due ore"+pren_rm);
               

           }
           else if(controlloData(el.start_date,el.end_date)&& el.primary_opt=="autista" && (Object.keys(prenotations).length>i)){// prenotazioni straordinarie oppure prenotazioni accettabili rispetto il vincolo
              let str=JSON.stringify(el);
              
              json_pren+=str+",";
              console.log(pren_str);
              i++;
             
              index=json_pren.match(rgex);
              console.log("indice della virgola"+index[0] +"match :"+json_pren.match(rgex));
           }
           else if(controlloData(el.start_date,el.end_date)&& el.primary_opt=="autista" && (Object.keys(prenotations).length=i)){
            let str=JSON.stringify(el);
              
            json_pren+=str;
            
            i++;
            
           }
           
        }
        json_pren=json_pren.replace(rgex,"");

       json_pren+="]";
     
       console.log(json_pren)
      
        return res.status(200).json(JSON.parse(json_pren));
    }catch(err){
        console.log("errore  interno notifica prenotazione"+err);
               return  res.status(500).json({message:'errore notifica prenotazione',error:err});
    }
}

 function controlloData(dataInizio, dataFine){
  const now = new Date();
  const data_inizio = new Date(dataInizio)
  const data_fine = new Date(dataFine)
  if(now<data_inizio && now<data_fine){
      return true
  }else{
      return false;
  }
}

/*
exports.delete_prenotation= async (req,res,next)=>{
    const db =await makeDb(config);
    var result={};
  
    try{
      
            // rimuove pure localmente la prenotazione
            result=await prenotazioni.remove(req.body.code_prenotation);
       
        
        return  res.status(200).json(result);
    }catch(err){
            console.log("errore nella eliminazione della prenotazione"+req.body);
           return  res.status(500).json({message:'errore nella eliminazione della prenotazione',error:err});
    }
  }*/


  exports.add_ride=async (req,res,next)=>{
    var result={};
    var up={};
    try{

      let pren =await prenotazioni.findById(req.body.code_prenotation);
      
      pren=pren[0];
      pren.complete="true";
      up=await prenotazioni.updateById(req.body.code_prenotation,pren);
    const corsa = new corse ({
        ref_pren:pren.code_prenotation,
        ref_client:pren.ref_client,
        ref_driver:pren.ref_driver,
        price:pren.price
    });
    result=await corse.add_ride(corsa);
    console.log("corsa inserita correttamente nel database");
    return  res.status(200).json(result);
    }catch(err){
        console.log("errore  inserimento corsa");
               return  res.status(500).json({message:'errore inserimento corsa',error:err});
    }
  }


exports.email_client=async(req,res,next)=>{
   client= await cliente.findById(req.body.id_client);
 try{

   let email=client.email;

    transporter.sendMail({
        from: 'progettostardust@gmail.com',
        to: email,
        subject: 'CORSA ACCETTATA DALL\' AUTISTA',
        text: 'la sua prenotazione è stata accetta dall\' autista scelto '
      }, function(err, info) {
        if (err) {
          throw err;
        } else {
          console.log("email mandata "+info.response);
        }
      });

      return res.status(200).json({message:'email aggiunta corsa mandata al cliente'});
    }catch(err){
      return res.status(500).json({errore:err});
    }


}




exports.negative_email= async (req,res,next)=>{
  client= await cliente.findById(req.body.ref_client);
    let  email=client.email;
     transporter.sendMail({
         from: 'progettostardust@gmail.com',
         to: email,
         subject: 'AUTISTA RIFIUTATO',
         text: 'la sua prenotazione è stata cancellata e sarà rimborsata \
          poichè non vi sono autisti disponibili per la data e orario da lei richiesto,\
          ci scusiamo per questo disagio e la invitiamo a scegliere altra data o ora per la sua richiesta '
       }, function(err, info) {
         if (err) {
           throw err;
         } else {
           console.log("email rifiuto corsa mandata "+info.response);
         }
       });
 
       return res.status(200).json({message:'cancellazione prenotazione  effettuata'});
 
 
 
 }


//ricerca nuovo autista 
//versione senza controllo dei rifiuti degli autisti
exports.avaible_driver= async (req,res,next)=>{

    var result={};
    
    try{
      let pren=await prenotazioni.findById(req.body.code_prenotation);
      pren=pren[0];
      console.log("prenotazione :\n"+JSON.stringify(pren));
    result=await impiegati.available(pren.start_date,pren.end_date,req.body.id_impiegato);
    result=result[0];
    if(result){
    console.log("autisti disponibili trovati"+JSON.stringify(result));
        //modifico la prenotazione con l'identificativo del nuovo autista
        let prenotation=await prenotazioni.updateDriver(req.body.code_prenotation,result.id_impiegato);
        console.log("cambio autista della prenotazione effettuato"+prenotation);
    return  res.status(200).json(prenotation);


    }else{
      return  res.status(404).json({message:"nessun autista disponibile"});
    }
    }catch(err){
        console.log("errore  ricerca nuovo autista"+err);
               return  res.status(500).json({message:'errore ricerca nuovo autista',error:err});
    }

}

//ricerca nuovo autista 
exports.avaible_driver_v1= async (req,res,next)=>{//testato e funzionante

  var result={};
  var drivers_rj="";
  var i=0;
  
  var flag=true;
  try{
    let pren=await prenotazioni.findById(req.body.code_prenotation);
    pren=pren[0];
    console.log("prenotazione :\n"+JSON.stringify(pren));
  result=await impiegati.available(pren.start_date,pren.end_date,req.body.id_impiegato);
  //memorizzo il rifiuto dell'attuale autista nell'oggetto rejected
  
  let str=rejected.get(req.body.code_prenotation)+req.body.id_impiegato+"-";
  if(str==NaN+"-"){
    str=req.body.id_impiegato+"-";
  }
  console.log(str);
  rejected.set(req.body.code_prenotation,str);
  //controllo quali autisti non posso scegliere per la sostituzione causa rifiuto
  while(i<result.length && flag==true){
    
    drivers_rj=rejected.get(req.body.code_prenotation).indexOf(`${result[i].id_impiegato}-`);
    console.log("index of  "+` ${result[i].id_impiegato}=`+drivers_rj);
    if(drivers_rj==-1){//autista disponibile
        result=result[i];
        flag=false;
    }else{
      i++;
    }
  }
  
  if(result&& flag ==false){
  console.log("autisti disponibili trovati"+JSON.stringify(result));
      //modifico la prenotazione con l'identificativo del nuovo autista
      let prenotation=await prenotazioni.updateDriver(req.body.code_prenotation,result.id_impiegato);
      console.log("cambio autista della prenotazione effettuato"+prenotation);
      console.log("oggetto mappa:  "+rejected.get(req.body.code_prenotation));
  return  res.status(200).json(prenotation);


  }else {
    return  res.status(404).json({message:"nessun autista disponibile"});
  }
  }catch(err){
      console.log("errore  ricerca nuovo autista"+err);
             return  res.status(500).json({message:'errore ricerca nuovo autista',error:err});
  }

}


// versione con email
exports.send_refund =async (req,res,next)=> {

    let result={};
    
    let email =req.body.email;
    try{
  
        result= await pagamenti.look_single(req.body.id_client,req.body.code_prenotation);
        
        transporter.sendMail({
            from: 'progettostardust@gmail.com',
            to: email,
            subject: 'rimborso',
            text: `è stato effettuato il rimborso totale della prenotazione con codice` +req.body.code_prenotation+ ` , a seguito della sua eliminazione `
          }, function(err, info) {
            if (err) {
              throw err;
            } else {
              console.log("email mandata "+info.response);
            }
          });
        return res.status(200).json({"message":"rimborso effettuato ,controlla la tua email per vedere il resoconto"});
    }catch(err){
        console.log("errore  interno ");
               return  res.status(500).json({message:'errore rimborso',error:err});
    }

}