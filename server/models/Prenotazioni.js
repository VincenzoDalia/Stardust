const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');


// costruttore
const prenotazioni =function(prenotazione){
this.ref_client=prenotazione.ref_client;
this.primary_opt=prenotazione.primary_opt;
this.start_date=prenotazione.start_date;
this.end_date=prenotazione.end_date;
this.start_address=prenotazione.start_address;
this.end_address=prenotazione.end_address;

this.vehicle_type=prenotazione.vehicle_type;

this.ref_vehicle=prenotazione.ref_vehicle;
this.ref_driver=prenotazione.ref_driver;
this.price=prenotazione.price;
this.complete=prenotazione.complete;
};

// prenotazioni cliente memorizzate per evitare query superflue sul db
var client_prenotations=new Map();

var driver_prenotations=new Map();
var client_prn= {};//JSON

prenotazioni.create=async (new_pre)=>{
    const db = await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('INSERT INTO `prenotazioni` SET ?',new_pre).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
    
        
         });
         console.log("prenotazione inserita",result_q);
        
         return result_q.insertId;
}


// crea una prenotazione incompleta 
prenotazioni.tmp=async (new_pre)=>{
    const db = await makeDb(config);
    var prenotation={};
    await withTransaction(db,async()=>{ 
         prenotation=await db.query('INSERT INTO `prenotazioni_tmp` SET ?',new_pre).catch(err=>{
     
         console.log("si è verificato un errore",err);
         throw err;
         
         });
         console.log("prenotazione  incompleta inserita",prenotation);
        
          });
          return prenotation;
 }





prenotazioni.findById=async(id)=>{
    const db = await makeDb(config);
    var result_q={};
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `prenotazioni` WHERE `prenotazioni`.code_prenotation=?',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        if (result_q.length== 0|| result_q==undefined) {
           
            next(createError(404, 'prenotazione  non trovata'));
            return[];
        }else {
            console.log('prenotazione trovata',result_q);
            
            
        }

    });//fine async e fine transazione
    return result_q;
}


// ricerca per le sovrapposizioni di un veicolo

prenotazioni.find_sov=async(start,end,id_vehicle,code)=>{
    const db = await makeDb(config);
    var result_q={};
    await withTransaction(db,async()=>{ 
      
        result_q=await db.query('  SELECT * FROM `prenotazioni`\
        WHERE \
        (`prenotazioni`.start_date>? AND `prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
        (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
        (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
        (`prenotazioni`.start_date>? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
        ((  timestampdiff(hour ,?,`prenotazioni`.start_date)<1)  AND  (timestampadd(hour,1,`prenotazioni`.end_date)>? ))\
        AND (`prenotazioni`.ref_vehicle=?) AND `prenotazioni`.code_prenotation!=?  '
     ,[ 
         start,end,end,
        start,start,end,
        start,end,
        start,start,end,
        end,start,
        id_vehicle,code]).catch(err=>{
 
     console.log("si è verificato un errore",err);
     throw err;      
     });
        if (result_q.length== 0) {
           
            next(createError(404, 'prenotazione  non trovata'));
            return;
        }else {
            console.log('prenotazioni sovrapposte  trovate',result_q);
            
            
        }

    });//fine async e fine transazione
    return result_q;
}




prenotazioni.getAll=async (id)=>{
    const db = await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT `prenotazioni`.code_prenotation,`prenotazioni`.ref_client,`prenotazioni`.primary_opt,(`prenotazioni`.start_date ),\
         (`prenotazioni`.end_date ),`prenotazioni`.start_address,`prenotazioni`.end_address,`prenotazioni`.vehicle_type,\
        `prenotazioni`.ref_vehicle,`prenotazioni`.ref_driver,`prenotazioni`.price,`prenotazioni`.complete \
        FROM `prenotazioni` WHERE `prenotazioni`.ref_client=?   ',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("inizio memorizzazione");
        //memorizziamo le prenotazioni del cliente
        let i=0;
        for (const el of result_q){
            result_q[i].start_date =new Date(new Date(result_q[i].start_date).getTime()+7200000);
            result_q[i].end_date =new Date(new Date(result_q[i].end_date).getTime()+7200000);
            client_prenotations.set(el.code_prenotation,el);
            console.log("prenotazioni cliente memorizzate \n" );
            console.log(result_q[i]);
            i++;
        }
        console.log("fine query");
        }//fine async
        
    );//fine transazione
   
    return result_q;
}



//getall con file json

prenotazioni.getAll_js=async (id_client)=>{
    let  result_q ={};
    const db=await   makeDb(config);
     
     await  withTransaction(db,async()=>{ 
         result_q=await db.query('SELECT * FROM `prenotazioni` \
          WHERE `prenotazioni`.ref_client=?',[id_client]).catch(err=>{
     
         console.log("si è verificato un errore",err);
         throw err;
         
         });
         
         }//fine async
     );//fine transazione
     try{
     console.log("hai richiesto tutti le prenotazioni\n");
    
     let tmp={};
     
     
     //memorizza in un file json le prenotazioni
    
     let prenotazioni="\"0\""+":"+JSON.stringify(client_prn);
     
     let result_q_str=(`\"id_${id_client}\"`+":"+JSON.stringify(result_q));
     prenotazioni="{"+prenotazioni+","+result_q_str+"}";
     
     client_prn=JSON.parse(prenotazioni);
   
     console.log("result_str:\n"+result_q_str);
       //aggiorno possibili prenotazioni modificate
     //testare aggiornamento
     var i=0;
    
        while( i<result_q.length){
            console.log("client_prn:\n"+JSON.stringify(client_prn["id_"+id_client][i])+"\
            code prenotation:\n"+client_prn["id_"+id_client][i].code_prenotation);
                tmp=client_prn["id_"+id_client][i].code_prenotation;
               
                   if(tmp ==result_q[i].code_prenotation){
                       console.log("aggiornamento:\n"+result_q[i].code_prenotation);
                        //se già era memorizzato aggiorniamo
                        client_prn["id_"+id_client][i]=result_q[i];
                    }
                i++;
                }
         


     return result_q;
            }catch(err){console.log("errore getall_js :\n"+err);
        throw err;
        }
 }

// prenotazioni dove è presente l'autista
prenotazioni.get_prenotations=async (id)=>{
    const db = await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `prenotazioni` WHERE `prenotazioni`.ref_driver=?   ',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        }//fine async
        
    );//fine transazione

    //memorizziamo le prenotazioni dell'autista
    for (const el of result_q){
        driver_prenotations.set(el.code_prenotation,el);
    }
    return result_q;
}


// prenotazioni incomplete
prenotazioni.getAlltmp=async (id)=>{
    const db = await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `prenotazioni_tmp` WHERE `prenotazioni_tmp`.ref_client=?',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        
        }//fine async
        
    );//fine transazione
    console.log(result_q);
    return result_q;
}

prenotazioni.get_single=async (id)=>{
    const db = await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `prenotazioni` WHERE `prenotazioni`.code_prenotation=?   ',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        }//fine async
        
    );//fine transazione

   
    
    return result_q[0];
}



prenotazioni.updateById=async (id_prenotazione,obj_prenotazioni)=>{
    const db = await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('UPDATE `prenotazioni` SET  `prenotazioni`.primary_opt=?,\
        `prenotazioni`.start_date=?,`prenotazioni`.end_address=?,\
        `prenotazioni`.end_date=?, `prenotazioni`.start_address=?, \
        `prenotazioni`.vehicle_type=?, `prenotazioni`.ref_vehicle=?,`prenotazioni`.ref_driver=?,\
        `prenotazioni`.price=?,`prenotazioni`.complete=?   WHERE `prenotazioni`.code_prenotation=?',[
            
            obj_prenotazioni.primary_opt,
            obj_prenotazioni.start_date,
            obj_prenotazioni.end_address,
            obj_prenotazioni.end_date,
            obj_prenotazioni.start_address,
            
            obj_prenotazioni.vehicle_type,
            obj_prenotazioni.ref_vehicle,
            obj_prenotazioni.ref_driver,
            obj_prenotazioni.price,
            obj_prenotazioni.complete,
            id_prenotazione
        ]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("prenotazione modificata");
        
        }//fine async
        
    );//fine transazione
    return result_q;
}


// modifica l'autista della prenotazione
prenotazioni.updateDriver=async (id_prenotazione,id_driver)=>{
const db = await makeDb(config);
var result_q={};

await withTransaction(db,async()=>{ 
    result_q=await db.query('UPDATE `prenotazioni` SET  `prenotazioni`.ref_driver=? \
      WHERE `prenotazioni`.code_prenotation=?',[
       id_driver,
        id_prenotazione
    ]).catch(err=>{

    console.log("si è verificato un errore",err);
    throw err;
    
    });
    console.log("prenotazione modificata");
    
    }//fine async
    
);//fine transazione
return result_q;
}











//rimozione singola
prenotazioni.remove=async (id_prenotazione)=>{
    const db = await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('DELETE FROM `prenotazioni` WHERE `prenotazioni`.code_prenotation=? ',[id_prenotazione]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        
        }//fine async
    );//fine transazione
    if ((`${result_q.affectedRows}`==0)) {
        console.log('prenotazione  non trovata!');
     
        return false;
        
     } else  if(`${result_q.affectedRows}`==1){
            console.log(`prenotazione eliminata : ${result_q.affectedRows}`);
            
            return true;
        }
}

// per rimuovere più prenotazioni
prenotazioni.remove_plus=async (id_prenotazioni)=>{
    const db = await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        for (const id of id_prenotazioni){
        result_q=await db.query('DELETE FROM `prenotazioni` WHERE `prenotazioni`.code_prenotation=? ',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        
        if (result_q.length== 0) {
            console.log('prenotazione con id :'+ result_q.id_prenotazioni  +'non trovata!');
            // next(createError(404, 'prenotazione non trovato')); potrebbe non essere necessario
           
        }else {
            console.log(`prenotazione eliminata ${result_q.affectedRows.code_prenotation}`);
            
            
        }
        }//fine async
    }
    );//fine transazione

}

// singola prenotazione
prenotazioni.look=(id_client,code_prenotation)=>{
let prenotazione={};
let key="id_"+id_client;
 //prenotazione=client_prenotations.get(code_prenotation);
 prenotazione=client_prn[key][code_prenotation];
 if(prenotazione== null || prenotazione==undefined){
     console.log("prenotazione non trovata");
     return ;
 }
 console.log("prenotazione ottenuta : \n"+prenotazione);
return prenotazione;

}

// multiple prenotazioni

prenotazioni.lookAll=(id_client)=>{

    
    let key="id_"+id_client;
    let prenotazioni_cliente="";
    let i=0;
    console.log("lista prenotazioni memorizzate:\n "+JSON.stringify(client_prn[key][i]));
    while(client_prn[key][i]!=undefined ||client_prn[key][i]!=null){
       
        if(client_prn[key][i].ref_client==id_client){
            prenotazioni_cliente+=JSON.stringify(client_prn[key][i])+",";
                i+=1;
        }else{
            i+=1;
        }
    }
    prenotazioni_cliente+="]";
    console.log("prenotazioni lookAll:\n"+prenotazioni_cliente);

    if(prenotazioni_cliente==''){
        console.log("prenotazioni non memorizzate localmente");
        return {};
    }else{
    return JSON.parse(prenotazioni_cliente);
    }
    }
    

prenotazioni.lookAll_loc=(id_client)=>{
        let key="id_"+id_client;
        let prenotazioni_cliente="";

        prenotazioni_cliente=client_prn[key];
            
        return prenotazioni_cliente;
        
        }






module.exports=prenotazioni;