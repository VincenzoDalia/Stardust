
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware')



//costruttore
const Pagamenti = function(pagamento) {

        this.id_client=pagamento.id_client;
        this.code_prenotation=pagamento.code_prenotation;
        this.code_cdc=pagamento.code_cdc;
        this.price=pagamento.price;
        this.date=pagamento.date;

  
}

// dati da memorizzare per non gravare eccessivamente sul db

var lista_pagamenti={};//JSON

Pagamenti.create=async (pagamento)=>{
    const db =  await makeDb(config);
    let result={};
    await withTransaction(db,async()=>{ 
       result= await db.query('INSERT INTO `Pagamenti` SET ?',pagamento).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("pagamento inserito") });
        return result;


}


Pagamenti.getAllById= async (id_client)=>{
   let  result_q ={};
   const db=await   makeDb(config);
    await  withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `pagamenti` \
         WHERE `pagamenti`.id_client=?  ',id_client).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        
        }//fine async
        
    );//fine transazione
    console.log("hai richiesto tutti i Pagamenti\n");
    //memorizza in un json i pagamenti
   
    let pagamenti="\"0\""+":"+JSON.stringify(lista_pagamenti);
    
    let result_q_str=(`\"id_${result_q[0].id_client}\"`+":"+JSON.stringify(result_q));
    pagamenti="{"+pagamenti+","+result_q_str+"}";
    
    lista_pagamenti=JSON.parse(pagamenti);
  
    console.log(result_q_str);
    
    return result_q;
}

//sovrapprezzo
Pagamenti.sov=async(code_prenotation,sovrapprezzo)=>{
    const db = await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('UPDATE  `pagamenti` SET `pagamenti`.price=?\
        WHERE `pagamenti`.code_prenotation=? ',
        [sovrapprezzo,code_prenotation]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        
         });
         console.log("sovrapprezzo effettuato"+result_q[0]);
         return result_q[0];
        }

Pagamenti.remove=async(code_prenotation)=>{
    const db = await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('DELETE FROM `pagamenti` \
        WHERE `pagamenti`.code_prenotation=? ',
        code_prenotation).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        
         });
         console.log("pagamento eliminato"+result_q[0]);
         return result_q[0];
        }

 Pagamenti.get_single= async (id_client,code_prenotation)=>{
            let  result_q ={};
            const db=await   makeDb(config);
             await  withTransaction(db,async()=>{ 
                 result_q=await db.query('SELECT * FROM `pagamenti` \
                  WHERE `pagamenti`.id_client=? AND  `pagamenti`.code_prenotation=? ',[id_client,code_prenotation]).catch(err=>{
             
                 console.log("si è verificato un errore",err);
                 throw err;
                 
                 });
                 
                 }//fine async
                 
             );//fine transazione
             
             
             return result_q;
         }
         

//ritorna tutte i pagamenti di un cliente
Pagamenti.look=(id_client)=>{
let pagamenti_cliente="";
let key="id_"+id_client;

pagamenti_cliente=lista_pagamenti[key];
    
return pagamenti_cliente;

}

Pagamenti.look_single=(id_client,code_prenotation)=>{//testato
    let pagamenti_cliente="";
    let key="id_"+id_client;
    let i=0;
    console.log("lista pagamenti:\n "+JSON.stringify(lista_pagamenti[key][i]));
    while(lista_pagamenti[key][i]!=undefined ||lista_pagamenti[key][i]!=null){
        console.log("lista pagamenti:\n "+JSON.stringify(lista_pagamenti[key][i].code_prenotation))
        if(lista_pagamenti[key][i].code_prenotation==code_prenotation){
                pagamenti_cliente=JSON.stringify(lista_pagamenti[key][i]);
                return JSON.parse(pagamenti_cliente);
        }else{
            i+=1;
        }
    }
}

Pagamenti.lookAll=(id_client)=>{
    let pagamenti_cliente="";
    let key="id_"+id_client;
    let i=0;
    console.log("lista pagamenti:\n "+JSON.stringify(lista_pagamenti[key][i]));
    while(lista_pagamenti[key][i]!=undefined ||lista_pagamenti[key][i]!=null){
       
        if(lista_pagamenti[key][i].id_client==id_client){
                pagamenti_cliente+=JSON.stringify(lista_pagamenti[key][i]);
                
        }else{
            i+=1;
        }
    }
    return JSON.parse(pagamenti_cliente);
    
    }

module.exports=Pagamenti;