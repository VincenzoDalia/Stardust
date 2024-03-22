
const cliente =require('../models/cliente');

const nodemailer = require('nodemailer');// modulo per gestire email
const Veicoli=require('../models/Veicoli');
const Pagamenti = require('../models/Pagamenti');
const transporter = nodemailer.createTransport({// account gmail usato per inviare email
    service: 'gmail',
    auth: {
      user: 'progettostardust@gmail.com',
      pass: 'Stardust99#'
    }
  });


exports.get_Price=async(req,res,next)=>{
  try{
    let start=new Date(req.body.start_date);
    let end=new Date(req.body.end_date);
    let price_v={};
    price_v=await Veicoli.price(req.body.ref_vehicle);
    let fin_price=price_v*Math.round(((end-start)/1800000));
    console.log("req.body.start_date: " +req.body.start_date+ "\nstart: " + start);
    console.log("req.body.end_date"+req.body.end_date+ "\nend :" +end);
    console.log("end - start = " + (end-start))
    console.log("prezzo finale: " + fin_price)
    return res.status(200).json({price:fin_price});
} catch(err){
  console.log("errore"+err);
  return res.status(500).json({message:"errore nell'acquisizione del prezzo"});
} 
}

  exports.get_data=async(req,res,next)=>{
      let data ={};
      
       data = await cliente.findByEmail(req.body.email);
      if (data){
          console.log("dati utente trovati");
          return res.status(200).json(data);
      }
      else {
          console.log("errore  interno per la ricerca utente");
          return  res.status(500).json({message:'errore ricerca utente'});
      }
  
  }



  exports.pay= async(req,res,next)=>{
    let pagamento ={};
    try{
        let crypted_code_cdc=await cliente.crypt(req.body.code_cdc);
        const payment = new Pagamenti ({
            id_client:req.body.id_client,
            code_prenotation:req.body.code_prenotation,
            code_cdc:crypted_code_cdc,
            price:req.body.price,
            date:new Date()
        });
        pagamento = await Pagamenti.create(payment);
    
        console.log("pagamento effettuato e memorizzato nel database");
        return res.status(200).json(pagamento);
  
    
    }catch(err){
        
        console.log("errore  interno per il pagamento" + err);
        return  res.status(500).json({message:'errore pagamento'});

}
  }

  // restituisce tutti i pagamenti effettuati da un cliente
  exports.getAll= async(req,res,next)=>{
    let pagamenti ={};
    try{
        pagamenti = await Pagamenti.getAllById(req.body.id_client);
    
        console.log("pagamenti trovati");
        return res.status(200).json(pagamenti);
  
    
    }catch(err){
        
        console.log("errore  interno , nessun  pagamento trovato"+err+"\
        -\n"+JSON.stringify(pagamenti));
        return  res.status(500).json({message:'errore individuazione pagamenti'});

}
  }



// se già è stato effettuato getAll i pagamenti del cliente sono memorizzati localmente
  // restituisce tutti i pagamenti effettuati da un cliente
  exports.getAll_local= async(req,res,next)=>{
    let pagamenti ={};
    try{
        pagamenti = await Pagamenti.look(req.body.id_client);
    
        console.log("pagamenti trovati");
        return res.status(200).json(pagamenti);
  
    
    }catch(err){
        
        console.log("errore  interno , nessun  pagamento trovato"+ err);
        return  res.status(500).json({message:'errore individuazione pagamenti'});

}
  }

