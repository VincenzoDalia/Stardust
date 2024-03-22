const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const cliente =require('../models/cliente');
const notp =require('notp'); // modulo per gestire OTP
const nodemailer = require('nodemailer');// modulo per gestire email
const prenotazioni = require('../models/Prenotazioni');
const Veicoli = require('../models/Veicoli');
const impiegati = require('../models/Impiegati');
const transporter = nodemailer.createTransport({// account gmail usato per inviare email
    service: 'gmail',
    auth: {
      user: 'progettostardust@gmail.com',
      pass: 'Stardust99#'
    }
  });
var client_OTP=new Map();


  








    // cerca e invia  i veicoli disponibili rispetto data e inizio prenotazione
    exports.check_vehicles_compatible= async (req,res,next)=> {
         
        var result={};
        var cli={};
       cli= await cliente.findById(req.body.id_client);
       let lic=cli.personal_document;
        
        let start_date =new Date(req.body.start_date);
        let end_date=new Date(req.body.end_date);
        console.log("start:\n"+start_date+"end:\n"+end_date);
        try{
                result=await Veicoli.avaible(lic,start_date,end_date) ;
                console.log("res_query:\n"+result);
                // la query restituisce tutti i veicoli disponibili rispetto la scelta del cliente
             if(result.length==0){
              return  res.status(404).send("non ci sono veicoli disponibili per quella data e orario di partenza selezionata");
             }
            return  res.status(200).json(result);
        }catch(err){
                console.log("errore nella ricerca di veicoli compatibili");
               return  res.status(500).json({message:'errore ricerca veicoli',error:err});
        }
      };



        exports.generate_OTP= async (req,res,next)=> {
            
  
            // soluzione usando cliente 
            //var client= await cliente.look(req.body.id_client);
            
            var key=new Date().getUTCMilliseconds();
            //var email=client[0].email;  
            var email=req.body.email;
             //genero l'otp
            var OTP=notp.totp.gen(key,120);
            client_OTP.set(req.body.id_client,OTP);
            // usare api per mandare sms con il codice otp generato
            //per adesso simulo con una email
           
            transporter.sendMail({
                from: 'progettostardust@gmail.com',
                to: email,
                subject: 'Codice OTP Stardust',
                text: 'il tuo codice OTP generato per la verifica del dispositivo : '+OTP
              }, function(err, info) {
                if (err) {
                  throw err;
                } else {
                  console.log("email mandata "+info.response);
                }
              });
              return  res.status(200).json({"message":"otp generato e inviato al cliente"});
            };

            


        // confronto il codice otp generato per il cliente con quello immesso
        exports.check = async  (req,res,next)=>{
            var otp_cliente=req.body.otp;
            
            if(otp_cliente==client_OTP.get(req.body.id_client)){
              
                return res.json({"flag":true});
            }else{
                return res.json({"flag":false});
            }

        };

        

   
   
    exports.get_avaible_drivers=async (req,res,next)=>{
      const db =await makeDb(config);
      let result={};
      let start_date =new Date(req.body.start_date);
      let end_date=new Date(req.body.end_date);
      
      try{
        
          await withTransaction(db,async()=>{
              
              result=await impiegati.available(start_date,end_date);
          });// la query restituisce tutti gli autisti disponibili per data e orario di inizio rispetto la scelta del cliente
              
           if(result.length==0){
             return res.status(404).send("non ci sono autisti disponibili per quell data e orario di partenza selezionato");
            
           }
           return res.status(200).json(result);
          
      }catch(err){
              console.log("errore nella ricerca di autisti compatibili"+err);
              return res.status(500).json({message:'errore ricerca autisti',error:err});
      }

      }
     
      
      exports.add_prenotation=async(req,res,next)=>{
       try{
        let start=new Date(req.body.start_date);
        let end=new Date(req.body.end_date);
        let ref= req.body.id_client;
        console.log("start"+start+"\n end :"+end);
        //tariffa = costo veicolo*(millisecondi di uso /18000000)
       
        let price_v={};
        price_v=await Veicoli.price(req.body.ref_vehicle);
        
        console.log("price:\n"+JSON.stringify(price_v));
        console.log("end-start:"+(end-start));
        let fin_price=price_v*Math.round(((end-start)/1800000));
        console.log("final price:\n"+fin_price);
        const prenotation= new prenotazioni({
          ref_client:ref,
          primary_opt:req.body.primary_opt,
          start_date:start,
          end_date:end,
          start_address:req.body.start_address,
          end_address:req.body.end_address,
          
          vehicle_type:req.body.vehicle_type,
          ref_vehicle:req.body.ref_vehicle,
          ref_driver:null,
          price:fin_price,
          complete:"false"});
          
          
          
          

          
            console.log("start"+start+"\n end :"+end);
            result=await prenotazioni.create(prenotation);
            
              return  res.status(200).json({flag:true,code_prenotation:result});
          
        }catch(err){
          console.log("errore"+err);
          return res.status(500).json({message:"errore nell'inserimento della prenotazione"});
        }      }
        

        exports.add_prenotation_driver=async(req,res,next)=>{
          try{
           let start=new Date(req.body.start_date);
           let end=new Date(req.body.end_date);
           let ref= req.body.id_client;
           console.log("start"+start+"\n end :"+end);
           //tariffa = costo autista*(millisecondi di uso /1800000)
          
           let price_d=10;//prezzo standard per 25 min
           
           
           console.log("price:\n"+JSON.stringify(price_d));
           console.log("end-start:"+(end-start));
           let fin_price=price_d*Math.round(((end-start)/1800000));
           console.log("final price:\n"+fin_price);
           const prenotation= new prenotazioni({
             ref_client:ref,
             primary_opt:req.body.primary_opt,
             start_date:start,
             end_date:end,
             start_address:req.body.start_address,
             end_address:req.body.end_address,
             
             vehicle_type:null,
             ref_vehicle:null,
             ref_driver:req.body.ref_driver,
             price:fin_price,
             complete:"false"});
             
             
               console.log("start"+start+"\n end :"+end);
               result=await prenotazioni.create(prenotation);
              
              return  res.status(200).json({flag:true,code_prenotation:result});
           }catch(err){
             console.log("errore"+err);
             return res.status(500).json({flag:false,message:"errore nell'inserimento della prenotazione"});
           }          
   
           
   
   
             }
           





       
        
      


    
      exports.email=async (req,res,next)=>{
        var email=req.body.email;
        var prenotazione = await  prenotazioni.look(req.body.code_prenotation);
        
        transporter.sendMail({
          from: 'progettostardust@gmail.com',
          to: email,
          subject: 'conferma prenotazione',
          text: 'la  prenotazione da lei confermata è stata aggiunta '+JSON.stringify(prenotazione),
        }, function(err, info) {
          if (err) {
            throw err;
          } else {
            console.log("email mandata "+info.response);
          }
        });
        console.log("prenotazione mandata con email "+JSON.stringify(prenotazione.code_prenotation));
        return res.status(200).json({flag:true});

      }

exports.get_prenotations_tmp = async (req,res,next)=>{
  let pren_tmp={};
  try{
  pren_tmp=await prenotazioni.getAlltmp(req.body.id_client);

  console.log("prenotazioni temporanee acquisite");
    return res.status(200).json(pren_tmp);


  }catch(err){

    console.log("prenotazioni temporanee non acquisite");

  }






}








  /* json per testing prenotazione 
          
           {
          "id":1,
          "primary_opt":"mezzo",
          
          "start_date":"2021-08-21 15:30:00",
          
          "end_date":"2021-08-21 16:00:00",
          "start_address":"via cesare terranova n°49",
          "end_address":"via topolino 33°",
          
          "vehicle_type":"luxury",
          "ref_vehicle":"prova",
          "ref_driver":null,
          
          "complete":"true"
          }*/

    /*prova per postman 
    exports.ciao=  async  (req,res,next)=>{
       
        const db =await makeDb(config);
        var result={};
        try{
          console.log("prima di wait veicoli")
           result=  await Veicoli.getById(req.body.type);
          console.log("sei dentro ciao");

          console.log(result.price);
          //creo il modello consultabile
          //ho dichiarato var v ={};
          //v=  new Veicoli(result[0]);
          console.log("veicolo memorizzato :",result);
           return  res.json(result);
    
    }catch(err){
      console.log("errore nella ricerca di veicoli compatibili");
      throw err;
    }
  };



  exports.look=  async  (req,res,next)=>{
       
   
    try{
     // console.log(v.id_vehicle);
    var mezzo= Veicoli.look()
    console.log("mezzo :",mezzo);
      return  res.json(mezzo);

}catch(err){
  console.log("errore nella ricerca di veicoli compatibili");
  throw err;
}
};
*/






        
   






