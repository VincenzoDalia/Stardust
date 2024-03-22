const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const cliente =require('../models/cliente');
const corse=require('../models/corse');
const nodemailer = require('nodemailer');// modulo per gestire email
const prenotazioni = require('../models/Prenotazioni');
const impiegati = require('../models/Impiegati');
const stalli= require('../models/stalli');
const Veicoli = require('../models/Veicoli');
const pagamenti= require('../models/Pagamenti');

const transporter = nodemailer.createTransport({// account gmail usato per inviare email
    service: 'gmail',
    auth: {
      user: 'progettostardust@gmail.com',
      pass: 'Stardust99#'
    }
  });




  exports.segnala=async (req,res,next)=>{

    let autista={};
    let corsa={};
      //cerco i dati della prenotazione 
      let prenotazione={};
      //corsa= await corse.get(req.body.code_prenotation);
      prenotazione=await prenotazioni.findById(req.body.code_prenotation);
      prenotazione=prenotazione[0];
     
      console.log("prenotazione:\n"+JSON.stringify(prenotazione));
      try{
          if(req.body.motivation =="guasto" || req.body.motivation =="incidente"){
              // devo cercare un autista disponibile per il cliente
              autista=await impiegati.available_em(new Date(),prenotazione.end_date);
              console.log("autista disponibile:\n"+autista);
              if(autista.length!=0){
              

                // devo aggiungere una prenotazione straordinaria con l'autista suddetto
                const segnalazione = new prenotazioni ({
                  ref_client:req.body.id_client,
                  primary_opt:"autista",
                  start_date:new Date (),          
                  end_date:prenotazione.end_date, 
                  start_address:req.body.start_address,
                  end_address:prenotazione.end_address,
                  vehicle_type:null,
                  ref_vehicle:null,
                  ref_driver:autista.id_impiegato,
                  price:prenotazione.price+30,// supplemento 
                  complete:"extra"
                });
               pren_extra= await prenotazioni.create(segnalazione); 
              console.log("prenotazione straordinaria creata con successo");
              let payment=await pagamenti.sov(req.body.code_prenotation,prenotazione.price+30);
              console.log("sovrapprezzo:\n"+payment);
                  return res.status(200).json({message:"prenotazione straordinaria creata con successo\
                  con un sovrapprezzo di "+30+"euro"});
              }else if(autista.length==0 || autista===undefined){
                // non vi sono autisti disponibili per quell'orario
                return res.status(404).json({message:"nessun autista disponibile,chiamare il numero verde"});
              }
              //fino a qui testato e funzionanente bene
         } else{
           //ritardo 
            // modifico la prenotazione   e gestisco eventuali sovrapposizioni
            let end_date=new Date(req.body.end_date);
            const segnalazione = new prenotazioni ({
              ref_client:req.body.id_client,
              primary_opt:prenotazione.primary_opt,
              start_date:prenotazione.start_date,          
              end_date:end_date, //variabile
              start_address:prenotazione.start_address,
              end_address:req.body.end_address, //variabile
              vehicle_type:prenotazione.vehicle_type,
              ref_vehicle:prenotazione.ref_vehicle,
              ref_driver:prenotazione.ref_driver,
              price:(prenotazione.price+15),// supplemento 
              complete:"true"
            });
            let pren_extra={};
            let corsa={};
            let price_pren=(prenotazione.price+15);
            pren_extra=await prenotazioni.updateById(prenotazione.code_prenotation,segnalazione);
            console.log("modifica prenotazione causa ritardo "+pren_extra);
            corsa=await corse.update(req.body.id_ride,prenotazione.ref_driver,price_pren);
              console.log("modifica corsa:\n"+corsa);
        
   


          //mando una mail per segnalare il sovrapprezzo 
          let email=await cliente.findById(req.body.id_client);
          email=email.email;
          transporter.sendMail({
            from: 'progettostardust@gmail.com',
            to: email,
            subject: 'VARIAZIONE PREZZO CAUSATA DA SEGNALAZIONE',
            text: 'le informiamo che il prezzo è variato a causa di una sua segnalazione per la corsa : '+(prenotazione.price+15)
          },function(err,info) {
            if (err) {
              throw err;
            } else {
              console.log("email mandata "+info.response);
            }
          });
          
          

          // gestisco le sovrapposizioni di veicoli
          
          let pren={};
          pren=await prenotazioni.find_sov(prenotazione.start_date,req.body.end_date,
            prenotazione.ref_vehicle,req.body.code_prenotation);// prenotazione con sovrapposizione
            pren=pren[0];
            console.log("prenotazione sovrapposta da gestire:"+JSON.stringify(pren));
              if(pren!=undefined || pren!=null){// se esiste almeno una prenotazione sovrapposta
                    console.log("sei dentro il primo if");
                if(new Date (req.body.end_date)>new Date(pren.start_date) && pren.start_address==req.body.end_address ){ 
                  console.log("caso in cui vi è ritardo ma non cambiamento di stallo"); 
                      //modifico la prenotazione sovrapposta
                      const pren2 = new prenotazioni ({
                        ref_client:pren.ref_client,
                        primary_opt:pren.primary_opt,
                        start_date:req.body.end_date, //  variazione di orario
                        end_date:pren.end_date,
                        start_address:pren.start_address, 
                        end_address:pren.end_address, 
                        vehicle_type:pren.vehicle_type,
                        ref_vehicle:pren.ref_vehicle,
                        ref_driver:pren.ref_driver,
                        price:(pren.price-(pren.price*5/100)), //sconto per la modifica non voluta
                        complete:"true"
                      });
                    console.log("pren2 creata:\n"+pren2);
                let sov_pren=await prenotazioni.updateById(pren.code_prenotation,pren2);
                console.log("prenotazione sovrapposta modificata"+sov_pren);
                // mando una email per avvisare il cliente della modifica 
                let email2= await cliente.findById(pren.ref_client);
                email2=email2.email;
                console.log("email cliente con sovrapposizione"+email2);
                transporter.sendMail({
                  from: 'progettostardust@gmail.com',
                  to: email2,
                  subject: 'VARIAZIONE ORARIO DI NOLEGGIO',
                  text: 'le informiamo che l\'orario di inizio noleggio del suo mezzo\
                    è variato a causa di un imprevisto sul mezzo: \
                    : '+pren2.end_date +" \nper scusarci dell'imprevisto le abbiamo rimborsato il 5% della sua spesa:"+pren2.price
                },function(err,info) {
                  if (err) {
                    throw err;
                  } else {
                    console.log("email mandata "+info.response);
                  }
                });
                
              }

              else if(new Date(req.body.end_date)>new Date(pren.start_date) && pren.start_address==prenotazione.end_address && pren.start_address!=req.body.end_address){
                    // devo gestire la variazione di stallo
                let vh={};
                let add={};
                let model={};
                // elimino dallo stallo il veicolo 
                vh=await Veicoli.vehicle_position_delete(pren.ref_vehicle);
                console.log("veicolo eliminato dallo stallo con successo"+JSON.stringify(vh));
                model=await Veicoli.find(pren.ref_vehicle);
                model=model.model;
                //lo aggiungo al nuovo stallo
                add= await Veicoli.vehicle_position_add(pren.ref_vehicle,pren.vehicle_type,req.body.end_address,model);
                console.log("veicolo inserito nel nuovo stallo:"+add);
                // controllo se vi sono altri veicoli di quel tipo presenti nello stallo
                let vehicles={};
                vehicles= await Veicoli.vehicle_position_type(model,pren.start_address);
                console.log("veicolo sostituitivo trovato\n"+JSON.stringify(vehicles));
                if(vehicles){
                  console.log("sei dentro if di vehicles");
                  // allora cambio il veicolo dalla prenotazione del cliente successivo
                  const pren3 = new prenotazioni ({
                    ref_client:pren.ref_client,
                    primary_opt:pren.primary_opt,
                    start_date:pren.start_date,          
                    end_date:pren.end_date, 
                    start_address:pren.start_address,
                    end_address:pren.end_address, 
                    vehicle_type:pren.vehicle_type,
                    ref_vehicle:vehicles.ref_vehicle,// nuovo veicolo
                    ref_driver:pren.ref_driver,
                    price:pren.price,
                    complete:"true"
                  });
                  let pren_up=  await  prenotazioni.updateById(pren.code_prenotation,pren3);
                  console.log("prenotazione  modificata - stallo cliente invariato"+pren_up);
                  // mando una email per avvisare il cliente della modifica 
                  let email3= await cliente.findById(pren.ref_client);
                  email3=email3.email;
                  console.log("email cliente con sovrapposizione"+email3);
                  
                  transporter.sendMail({
                    from: 'progettostardust@gmail.com',
                    to: email3,
                    subject: 'VARIAZIONE MEZZO DI NOLEGGIO',
                    text: 'le informiamo che la targa  del suo mezzo è variata a causa di un imprevisto :'
                   + `${pren3.ref_vehicle}`+ ',ma  tutte le caratteristiche da lei scelte rimangono invariate' 
                      
                  },function(err,info) {
                    if (err) {
                      throw err;
                    } else {
                      console.log("email mandata "+info.response);
                    }
                  });

                }else {
                  console.log(vehicles);
                  console.log("nessun veicolo disponibile di quella tipologia");
                  //non vi sono veicoli disponibili
                  // notifico al cliente successivo la eliminazione della prenotazione
                  let email4= await cliente.findById(pren.ref_client);
                  email4=email4.email;
              
                // rimborso il pagamento 
                let payment={};
                payment=await pagamenti.getAllById(pren.ref_client);
                let price;
                for(el of payment){
                  if(el.code_prenotation==pren.code_prenotation){
                      price=el.price;
                      
                }}
                
              
                  transporter.sendMail({
                      from: 'progettostardust@gmail.com',
                      to: email4,
                      subject: 'rimborso',
                      text: `è stato effettuato il rimborso totale della prenotazione :` +price+ `$ , a seguito \
                      dell'imprevisto di cui ,con una precedente email ,è stato avvisato`
                    }, function(err, info) {
                      if (err) {
                        throw err;
                      } else {
                        console.log("email mandata "+info.response);
                      }
                    });
                    let pay_del=await pagamenti.remove(pren.code_prenotation);
                    console.log("pagamento eliminato\n"+pay_del);
                    let pren_dl= await prenotazioni.remove(pren.code_prenotation);
                    console.log("prenotazione del cliente eliminata:\n"+pren_dl);
                      transporter.sendMail({
                        from: 'progettostardust@gmail.com',
                        to: email4,
                        subject: 'ELIMINAZIONE DELLA PRENOTAZIONE',
                        text: 'le informiamo a causa di un imprevisto abbiamo cancellato la sua prenotazione e rimborsato interamente la prenotazione ,in seguito il codice della prenotazione cancellata:\
                        '+pren.code_prenotation
                      },function(err,info) {
                        if (err) {
                          throw err;
                        } else {
                          console.log("email mandata "+info.response);
                        }
                      });
                }
            
              }// fine variazione di stallo
              
            return  res.status(200).json({message:'segnalazione effettuata con successo,\
            e risoluzione possibili casi di sovrapposizione'});
          
        
          

            }//fine if (pren)

            //nessun caso di sovrapposizione
            console.log("nessun caso di sovrapposizione");
          return res.status(200).json({flag:true});
        
      }//fine ritardo
    }catch(err){
        console.log("errore  segnalazione non inviata"+err);
               return  res.status(500).json({message:'errore segnalazione non inviata',error:err});
    }

  }

exports.prenotazione=async(req,res,next)=>{
  let result={};
  let pren={};
  try{
    result=await corse.getById(req.body.id_ride);
    pren=await prenotazioni.findById(result.ref_pren);
    return res.status(200).json(pren[0]);
  }catch(err){
    console.log("errore "+err);
    return res.status(500).json({message:"errore nella ricerca della prenotazione "});
  }

}



/*
testing

progetto-stardust.herokuapp.com/Client/EliminaPrenotazione_get_pren
{
  "id_client":1
  "on":true
}


progetto-stardust.herokuapp.com/Client/Segnalazione

{
    "id_client":1,
    "end_date":"2021-08-19 13:35:00",
    "motivation":"ritardo",
    "end_address":"via amerigo vespucci n°45",
    "code_prenotation":10,
    "id_ride":2
}




*/
