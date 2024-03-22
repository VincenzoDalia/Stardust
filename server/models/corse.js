const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

const db = makeDb(config);

// costruttore
const corse =function(corsa){
this.ref_pren=corsa.ref_pren;
this.ref_client=corsa.ref_client;
this.ref_driver=corsa.ref_driver;
this.price=corsa.price;
};

var corse_clienti=new Map();


corse.add_ride=async (corsa)=>{
    const db =await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('INSERT INTO `corse` SET ?',corsa).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("corsa inserita"+result_q);
        
         });
         return result_q;


  }

  
  corse.update=async (id_ride,id_driver,price)=>{
    const db = await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('UPDATE  `corse` SET \
        `corse`.ref_driver=? AND `corse`.price=?   \
        WHERE `corse`.id_ride=?  ',
        [
          
            id_driver,
            price,
            id_ride
        ]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("corsa modificata"+result_q[0]);
        
         });
         return result_q[0];


  }

  

//rimozione singola
corse.remove=async (id_ride)=>{
    const db =await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('DELETE FROM `corse` WHERE `corse`.id_ride=? ',[id_ride]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       console.log(result_q);
       console.log("prima condizione"+result_q[0]===undefined);
       console.log("seconda condizione"+result_q.length== 0);
       console.log("affected"+(`${result_q.affectedRows}`==0));
        //
       
        }//fine async
    );//fine transazione
    if ((`${result_q.affectedRows}`==0)) {
        console.log('corsa  non trovata!');
     
        return false;
        
     } else  if(`${result_q.affectedRows}`==1){
            console.log(`corsa eliminata : ${result_q.affectedRows}`);
            
            return true;
        }
}



corse.getAll=async (id)=>{
    const db =await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `corse` WHERE `corse`.ref_client=?   ',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        }//fine async
        
    );//fine transazione
    //memorizziamo le corse del cliente
    for (const el of result_q){
        corse_clienti.set({id_client:el.id_cliente,id_ride:el.id_ride},el);
    }
    return result_q;
}


corse.get=async (code_prenotation)=>{
    const db =await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `corse` WHERE `corse`.ref_pren=?   ',[code_prenotation]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        }//fine async
        
    );//fine transazione
    //memorizziamo la corsa del cliente
    if(result_q.length==0 || result_q.length===undefined){
        return false;
    }
        corse_clienti.set(el.id_ride,el);
    
    return result_q[0];
}


corse.getById=async (id_ride)=>{
    const db =await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `corse` WHERE `corse`.id_ride=?   ',[id_ride]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        }//fine async
        
    );//fine transazione
    
    
    return result_q[0];
}


  module.exports=corse;