const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

const db = makeDb(config);
const crypto= require('crypto');
// costruttore
const cliente =function(cliente){

this.name=cliente.name;
this.surname=cliente.surname;
this.gender=cliente.gender;
this.cf=cliente.cf;
this.birthdate=cliente.birthdate;
this.address=cliente.address;
this.city=cliente.city;
this.region=cliente.region;
this.personal_document=cliente.personal_document;

this.cellphone_number=cliente.cellphone_number;


this.cvv2=cliente.cvv2;
this.code_cdc=cliente.code_cdc;
this.expiration_date=cliente.expiration_date;
this.code_document=cliente.code_document;
this.email=cliente.email;
this.password=cliente.password;
};
// clienti memorizzati per evitare richieste superflue al db
var lista_clienti =new Map();


cliente.create=async (obj_cliente)=>{// testato
    const db =await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 

        result_q=await db.query("INSERT INTO `cliente` (name,surname,gender,cf,birthdate,address,city,\
            region,personal_document,cellphone_number,cvv2,code_cdc,expiration_date,code_document,email,password)\
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
            
              obj_cliente.name,
              obj_cliente.surname,
              obj_cliente.gender,
              obj_cliente.cf,
              obj_cliente.birthdate,
              obj_cliente.address,
              obj_cliente.city,
              obj_cliente.region,
              obj_cliente.personal_document,
         
              obj_cliente.cellphone_number,
             
              
              obj_cliente.cvv2,
              obj_cliente.code_cdc,
              obj_cliente.expiration_date,
              obj_cliente.code_document,
              obj_cliente.email,
              obj_cliente.password
             
        ]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("cliente inserito") ;
     });
       return result_q;
}

cliente.findById=async(id_client)=>{
    const db =await makeDb(config);
    var result_q={};
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `cliente` WHERE `cliente`.id_client=?',id_client).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        if (result_q.length== 0) {
            console.log('Utente non trovato!');
            //next(createError(404, 'Utente non trovato'));
            return;
        }else {
            console.log('utente trovato',result_q);
            //inserisco il cliente nelle lista per poi essere sempre reperibile
           lista_clienti.set(result_q[0].id_client,result_q[0]);
            
        }

    });//fine async e fine transazione
    return result_q[0];
}


// trova il cliente tramite email e password
cliente.find_em_pw=async(email,password)=>{//testato
    const db =await makeDb(config);
    var result_q={};
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `cliente` \
        WHERE `cliente`.email=? AND `cliente`.password=?',[
            email,
            password
        ]).catch(err=>{
    
        console.log("si è verificato un errore nel recupero del cliente",err);
        throw err;
        
        });
        if (result_q.length== 0) {
            console.log('Utente non trovato!');
            //next(createError(404, 'Utente non trovato'));
            return;
        }else {
            console.log('utente memorizzato localmente',result_q[0]);

            //inserisco il cliente nelle lista per poi essere sempre reperibile
           lista_clienti.set(result_q[0].id_client,result_q[0]);
            console.log("memorizzazione avvenuta \n"+result_q[0].id_client);
        }

    });//fine async e fine transazione
    return result_q[0];
}


//trova il cliente tramite l'email
cliente.findByEmail=async(email)=>{
    const db =await makeDb(config);
    var result_q={};
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `cliente` WHERE `cliente`.email=?',[email]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        if (result_q.length== 0 || result_q[0]=== undefined) {
            console.log('Utente non trovato!');
           
            
            //createError(404, 'Utente non trovato');
            return false;
        
          
        }

    });//fine async e fine transazione
    console.log('utente trovato',result_q[0]);
    //inserisco il cliente nelle lista per poi essere sempre reperibile
    lista_clienti.set(result_q[0].id_client,result_q[0]);
     console.log("memorizzazione avvenuta \n"+result_q[0].id_client);
    
    return result_q[0];
}



// riservato all'amministratore
cliente.getAll=async (result)=>{
    const db = await makeDb(config);
    var result_q={};
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `cliente` ').catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err; 
        }); 
        }//fine async 
    );//fine transazione
    for (const el of result_q){
        lista_clienti.set(el.id_cliente,el);
    }
    return result_q;
}

// modifica i dati del cliente
cliente.updateById=async (id_client,obj_cliente)=>{
    const db =await makeDb(config);
    var  result_q={};
    var psw = await cliente.crypt(obj_cliente.password);
    console.log("password cryptata update:"+psw);
    await withTransaction(db,async()=>{ 
        result_q=await db.query('UPDATE `cliente` SET  name=?,surname=?,gender=?,cf=?,\
        birthdate=?, address=?,city=?,region=?,personal_document=? , cellphone_number=?,\
         cvv2=?,code_cdc=?, expiration_date=?,code_document=?, email=?,password=?\
         WHERE `cliente`.id_client=?',[
            
            obj_cliente.name,
            obj_cliente.surname,
            obj_cliente.gender,
            obj_cliente.cf,
            obj_cliente.birthdate,
            obj_cliente.address,
            obj_cliente.city,
            obj_cliente.region,
            obj_cliente.personal_document,
       
            obj_cliente.cellphone_number,
           
            
            obj_cliente.cvv2,
            obj_cliente.code_cdc,
            obj_cliente.expiration_date,
            obj_cliente.code_document,
            obj_cliente.email,
            psw,
            id_client
        ]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("utente modificato");
        
        }//fine async
        
    );//fine transazione
    lista_clienti.set(id_client,obj_cliente);
    return obj_cliente;
}


// modifica i dati del cliente
cliente.updateById_rec=async (id_client,obj_cliente)=>{
    const db =await makeDb(config);
    var  result_q={};
   
    await withTransaction(db,async()=>{ 
        result_q=await db.query('UPDATE `cliente` SET  name=?,surname=?,gender=?,cf=?,\
        birthdate=?, address=?,city=?,region=?,personal_document=? , cellphone_number=?,\
         cvv2=?,code_cdc=?, expiration_date=?,code_document=?, email=?,password=?\
         WHERE `cliente`.id_client=?',[
            
            obj_cliente.name,
            obj_cliente.surname,
            obj_cliente.gender,
            obj_cliente.cf,
            obj_cliente.birthdate,
            obj_cliente.address,
            obj_cliente.city,
            obj_cliente.region,
            obj_cliente.personal_document,
       
            obj_cliente.cellphone_number,
           
            
            obj_cliente.cvv2,
            obj_cliente.code_cdc,
            obj_cliente.expiration_date,
            obj_cliente.code_document,
            obj_cliente.email,
            obj_cliente.password,
            id_client
        ]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("utente modificato");
        
        }//fine async
        
    );//fine transazione
    lista_clienti.set(id_client,obj_cliente);
    return obj_cliente;
}

//rimozione singola
cliente.remove=async (id_client,result)=>{
    const db =await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        result_q=await db.query('DELETE FROM `cliente` WHERE `cliente`.id_client=? ',[id_client]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        
        if (result_q.length== 0) {
            console.log('Utente non trovato!');
            next(createError(404, 'Utente non trovato'));
            return;
        }else {
            console.log(`utente eliminato ${result_q.affectedRows}`);
           
           
        }
        }//fine async
    );//fine transazione
    return result_q;
}

// per rimuovere più clienti
cliente.remove_plus=async (id_client,result)=>{
    const db = await makeDb(config);
    var result_q={};

    await withTransaction(db,async()=>{ 
        for (const id of id_client){
        result_q=await db.query('DELETE FROM `cliente` WHERE `cliente`.id_client=? ',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        
        if (result_q.length== 0) {
            console.log('Utente  con id :'+ result_q.id_client  +'non trovato!');
            next(createError(404, 'Utente non trovato'));
           
        }else {
            console.log(`utente eliminato ${result_q.affectedRows}`);
            return;
            
        }
        }//fine async
    }
    );//fine transazione

}


//ritorna i dati cliente memorizzati dopo il findBy
cliente.look=(id)=>{//testato
    let profile={};
     profile=lista_clienti.get(id);
    return profile;

}
// restituisce tutti i clienti già memorizzati 
// funzione per amministratore
cliente.look_ad=()=>{

    return lista_clienti;
}


cliente.crypt= async  (element)=>{
      
    let pwdhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
      pwdhash.update(element); // cifriamo 
  
      let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale
      return encpwd;
}



module.exports=cliente;