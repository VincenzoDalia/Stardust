const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');



const stalli = function(stallo){
    
    this.address=stallo.address;
    this.ref_vehicle=stallo.ref_vehicle;
    this.type_vehicle=stallo.type_vehicle;
    this.model_vehicle=stallo.model_vehicle;

}

// veicoli di uno stallo
stalli.getAllVehicles=async (address)=>{
    let  result_q ={};
    const db=await makeDb(config);
     await  withTransaction(db,async()=>{ 
         result_q=await db.query('SELECT * FROM `stalli` WHERE `stalli`.address=?',address).catch(err=>{
     
         console.log("si è verificato un errore",err);
         throw err;
         
         });
         
         }//fine async
         
     );//fine transazione
     console.log("hai richiesto tutti i veicoli di uno stallo");
        
     return result_q;
 }
 


// veicoli presenti in tutti gli stalli
stalli.getAll=async ()=>{
    let  result_q ={};
    const db=await makeDb(config);
     await  withTransaction(db,async()=>{ 
         result_q=await db.query('SELECT  * FROM `stalli`').catch(err=>{
     
         console.log("si è verificato un errore",err);
         throw err;
         
         });
         
         }//fine async
         
     );//fine transazione
     console.log("hai richiesto tutti i veicoli di tutti gli stalli");
        
     return result_q;
 }
 
stalli.create=async (obj_cliente)=>{
    const db =await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 

       console.log("sei dentro create");
      
        result_q=await db.query("INSERT INTO stalli (address,ref_vehicle,type_vehicle,model_vehicle)\
        SET (?,?,?,?)",[
            
              obj_cliente.address,
              obj_cliente.ref_vehicle,
              obj_cliente.type_vehicle,
              obj_cliente.model_vehicle
             
             
        ]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("stallo inserito") ;
     });
       return result_q;
}

   


  module.exports=stalli;