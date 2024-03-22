
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware')



//costruttore
const Veicoli = function(veicolo) {

    this.id_vehicle=veicolo.id_vehicle;
    this.price=veicolo.price;
    this.type=veicolo.type;
    this.licences_needed=veicolo.licences_needed;
    this.model=veicolo.model;
    this.description=veicolo.description;
    this.open=veicolo.open;
    this.ref_stallo=veicolo.ref_stallo;
}
// dati da memorizzare per non gravare eccessivamente sul db
var lista_veicoli={};


Veicoli.create=async (newveicolo)=>{
    const db =await makeDb(config);
    let result={};
    await withTransaction(db,async()=>{ 
       result= await db.query('INSERT INTO `veicoli` SET ?',newveicolo).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("veicolo  inserito") });
        return result;
}


Veicoli.avaible=async (personal_document,start,end)=>{
    let  result_q ={};
   
    const db=await makeDb(config);
   
     await  withTransaction(db,async()=>{ 
        
        if(personal_document=="patente"){
            //veicoli disponibili rispetto i dati inseriti
         result_q=await db.query('SELECT * \
         FROM `veicoli` WHERE ( `veicoli`.licences_needed =1 OR `veicoli`.licences_needed =0)  AND  `veicoli`.id_vehicle NOT IN\
         (SELECT `prenotazioni`.ref_vehicle FROM `prenotazioni`\
          WHERE (`prenotazioni`.primary_opt="mezzo") AND ((`prenotazioni`.start_date>? AND `prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
         (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
          (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
          (`prenotazioni`.start_date>? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
          (  timestampdiff(hour ,?,`prenotazioni`.start_date)<0.5)  AND  (timestampadd(hour,0.5,`prenotazioni`.end_date)>? )\
          ))',[start,end,end,
            start,start,end,
            start,end,
            start,start,end,
            end,start]).catch(err=>{
     
         console.log("si è verificato un errore",err);
         throw err;      
         });
        }else{
            //veicoli disponibili rispetto i dati inseriti
            result_q=await db.query('SELECT * \
            FROM `veicoli` WHERE ( `veicoli`.licences_needed =0)  AND  `veicoli`.id_vehicle NOT IN\
            (SELECT `prenotazioni`.ref_vehicle FROM `prenotazioni`\
             WHERE `prenotazioni`.primary_opt="mezzo" AND (`prenotazioni`.start_date>? AND `prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
            (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
             (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
             (`prenotazioni`.start_date>? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
             (  timestampdiff(hour ,?,`prenotazioni`.start_date)<0.5)  AND  (timestampadd(hour,0.5,`prenotazioni`.end_date)>? )\
             )',[start,end,end,start,start,end,start,end,start,start,end,end,start]).catch(err=>{
        
            console.log("si è verificato un errore",err);
            throw err;      
            });

        }


         }//fine async
     );//fine transazione
     
     console.log("hai richiesto tutti i veicoli disponibili:\n"+result_q+"\n patenti:lic");
     return result_q;
}



// trovi in quali stalli è presente quel tipo di veicolo ed il suo identificativo
Veicoli.vehicle_availability=async (vehicle_type)=>{
    const db = await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT DISTINCT `stalli`.address , `stalli`.ref_vehicle FROM `stalli`,`veicoli`\
         WHERE `stalli`.type_vehicle=?  ',vehicle_type).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("veicoli trovati"+result_q);
        
         });
         return result_q;


  }



  // trovi in quale stallo è presente quel veicolo
  Veicoli.vehicle_position=async (id_vehicle)=>{
    const db = await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT  `stalli`.address FROM `stalli`,`veicoli`\
         WHERE `stalli`.ref_vehicle=? ',id_vehicle).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("veicolo trovato"+result_q);
        
         });
         return result_q;


  }

  // trovi se in uno stallo  è presente quel tipo di  veicolo
  Veicoli.vehicle_position_type=async (model_vehicle,add)=>{
    const db = await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT  `stalli`.ref_vehicle FROM `stalli`\
         WHERE `stalli`.model_vehicle=? AND `stalli`.address=?',[model_vehicle,add]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("veicolo trovato"+result_q[0]);
        
         });
         /*if(result_q.length==0){
             return ;
         }*/
         return result_q[0];


  }

// elimina il veicolo dallo stallo 
Veicoli.vehicle_position_delete=async (id_vehicle)=>{
    const db =await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('DELETE FROM `stalli` \
         WHERE `stalli`.ref_vehicle=? ',id_vehicle).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("veicolo eliminato"+result_q[0]);
        
         });
         return result_q;


  }


  // aggiungi  il veicolo allo stallo 
Veicoli.vehicle_position_add=async (id_vehicle,vehicle_type,address,model)=>{
    const db =await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('INSERT INTO `stalli`(address,ref_vehicle,type_vehicle,model_vehicle) \
         VALUES (?,?,?,?) ',[address,id_vehicle,vehicle_type,model]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("veicolo aggiunto allo stallo"+result_q);
        
         });
         return result_q;


  }


Veicoli.getAll= async ()=>{
   let  result_q ={};
   const db=await makeDb(config);
    await  withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `veicoli` ').catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        
        }//fine async
        
    );//fine transazione
    console.log("hai richiesto tutti i veicoli");
    lista_veicoli=result_q;    
    return lista_veicoli;
}


Veicoli.open=async(id_vehicle,flag)=>{
    let  result_q ={};
    const db=await makeDb(config);
     await  withTransaction(db,async()=>{ 
         result_q=await db.query('UPDATE `veicoli` SET `veicoli`.open=? \
         WHERE`veicoli`.id_vehicle=? ',[flag,id_vehicle]).catch(err=>{
     
         console.log("si è verificato un errore",err);
         throw err;
         
         });
         
         }//fine async
         
     );//fine transazione
     if(flag==true){
     console.log("hai aperto il veicolo con il seguente identificativo\n:"+id_vehicle);
     }else {
        console.log("hai chiuso il veicolo con il seguente identificativo\n:"+id_vehicle);
     }
     return result_q;



}

Veicoli.price= async(id_vehicle)=>{
    let  result_q ={};
    const db=await makeDb(config);
     await  withTransaction(db,async()=>{ 
         result_q=await db.query('SELECT `veicoli`.price FROM  `veicoli` \
         WHERE `veicoli`.id_vehicle=? ',id_vehicle).catch(err=>{
     
         console.log("si è verificato un errore",err);
         throw err;
         
         });
         
         }//fine async
         
     );//fine transazione
     console.log("prezzo veicolo query:\n"+JSON.stringify(result_q[0].price));
     return result_q[0].price;
}


Veicoli.find= async(id_vehicle)=>{
    let  result_q ={};
    const db=await makeDb(config);
     await  withTransaction(db,async()=>{ 
         result_q=await db.query('SELECT * FROM  `veicoli` \
         WHERE `veicoli`.id_vehicle=? ',id_vehicle).catch(err=>{
     
         console.log("si è verificato un errore",err);
         throw err;
         
         });
         
         }//fine async
         
     );//fine transazione
     console.log("prezzo veicolo query:\n"+JSON.stringify(result_q[0].price));
     return result_q[0].price;
}

/* prova per postaman
var v={};
Veicoli.getById= async (result)=>{
    let  result_q ={};
    const db =await makeDb(config);
    await withTransaction(db,async()=>{
        console.log("prima della query");
        result_q= await db.query('SELECT* FROM `veicoli` \
        WHERE `veicoli`.type =?  ',result);
  
 });
 console.log(result_q);
 console.log("hai ottenuto  correttamente il veicolo");
  v = new Veicoli(result_q[0]);
 return v;
}
Veicoli.look= ()=>{
    return v;
}



this.availability=veicolo.availability;/*"1am-1.5am-2am-2.5am-3am-3.5am-4am-4.5am-5am-5.5am-6am
    -6.5am-7am-7.5am-8am-8.5am-9am-9.5am-10am-10.5am-11am-11.5am-12am-1pm-
    1.5pm-2pm-2.5pm-3pm-3.5pm-4pm-4.5pm-5pm-5.5pm-6pm-6.5pm-7pm-7.5pm-8pm-
    8.5pm-9pm-9.5pm-10pm-10.5pm-11pm-11.5pm-12pm";*/


module.exports=Veicoli;