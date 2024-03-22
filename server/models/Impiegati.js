const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const crypto= require('crypto');


// costruttore
const impiegati =function(impiegato){

this.name=impiegato.name;
this.surname=impiegato.surname;
this.gender=impiegato.gender;

this.birthdate=impiegato.birthdate;
this.address=impiegato.address;
this.cf=impiegato.cf;

this.residence=impiegato.residence;
this.cellphone_number=impiegato.cellphone_number;
this.personal_document=impiegato.personal_document;
this.code_document=impiegato.code_document;
this.role=impiegato.role;
this.email=impiegato.email;
this.password=impiegato.password;
}

// dati da memorizzare per non gravare eccessivamente sul db
var employers= new Map();
var employer={};

impiegati.create=async (newemp)=>{
    const db = await makeDb(config);
    var result_q={};
   await withTransaction(db,async()=>{ 
        result_q=await db.query('INSERT INTO `impiegati` SET ?',[newemp]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("impiegato inserito",result_q) });
        // aggiungo anche localmente l'impiegato
        employers.set(result_q.insertid_impiegato,result_q[0]);
        return result_q;
}

impiegati.findById=async(id_impiegato)=>{
    let result_q={};
    const db =  await makeDb(config);
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `impiegati` WHERE `impiegati`.id_impiegato=? ',[id_impiegato]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        if (result_q.length== 0) {
            console.log('Utente non trovato!');
            next(createError(404, 'Utente non trovato'));
            return;
        }else {
            console.log('utente trovato',result_q);
           // employer= new impiegati(result_q[0]);
            employers.set(result_q[0].id_impiegato,result_q[0]);
            return employer ;
        }

    });//fine async e fine transazione
}

impiegati.findByrole=async(role,result)=>{
    let result_q={};
    const db =  await makeDb(config);
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `impiegati` WHERE `impiegati`.role=?',[role]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        if (result_q.length== 0) {
            console.log('Utenti non trovati!');
            next(createError(404, 'Utenti non trovato'));
            return;
        }else {
            console.log('utenti trovati',result_q);
           
            return result_q;
        }

    });//fine async e fine transazione
}


// trova il impiegati tramite email e password
impiegati.find_em_pw=async(email,password)=>{
    const db = await makeDb(config);
    var result_q={};
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `impiegati` \
        WHERE `impiegati`.email=? AND `impiegati`.password=?',[
            email,
            password
        ]).catch(err=>{
    
        console.log("si è verificato un errore nel recupero dell' impiegato",err);
        throw err;
        
        });
        if (result_q.length== 0) {
            console.log('Utente non trovato!');
            //next(createError(404, 'Utente non trovato'));
            return;
        }else {
            console.log('utente trovato',result_q);
            //inserisco l' impiegato nelle lista per poi essere sempre reperibile
           employers.set(result_q[0].id_impiegato,result_q[0]);
           
        }

    });//fine async e fine transazione
    return result_q[0];
}


// trova il impiegati tramite email
impiegati.findByEmail=async(email)=>{
    const db = await makeDb(config);
    var result_q={};
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `impiegati` \
        WHERE `impiegati`.email=? ',[
            email
        ]).catch(err=>{
    
        console.log("si è verificato un errore nel recupero dell' impiegato",err);
        throw err;
        
        });
        if (result_q.length== 0) {
            console.log('Utente non trovato!');
            //next(createError(404, 'Utente non trovato'));
            return;
        }else {
            console.log('utente trovato',result_q);
            //inserisco l' impiegato nelle lista per poi essere sempre reperibile
           employers.set(result_q[0].id_impiegato,result_q[0]);
           
        }

    });//fine async e fine transazione
    console.log("map:"+employers.get(result_q[0].id_impiegato));
    return result_q[0];
}












impiegati.getAll=async ()=>{
    let result_q={};
    const db = await makeDb(config);
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT * FROM `impiegati` ').catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        return result_q;
        }//fine async
        
    );//fine transazione
    // immetto tutti gli impiegati in employers
    for (const el of result_q){
        employers.set(el.id_impiegato,el);
        console.log(el+"\n");
    }
    return result_q;
}

/*
impiegati.getAllId=async (result)=>{
    await withTransaction(db,async()=>{ 
        result_q=await db.query('SELECT `impiegati`.id_impiegato FROM `impiegati` ').catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        result(result_q);
        }//fine async
        
    );//fine transazione
}
*/
impiegati.updateById=async (id_impiegato,obj_impiegati)=>{
    const db =  await makeDb(config);
    let result_q={};
    var psw = await impiegati.crypt(obj_impiegati.password);
    console.log("password cryptata update: "+psw);
    await withTransaction(db,async()=>{ 
        result_q=await db.query('UPDATE `impiegati` SET  `impiegati`.name=?,`impiegati`.surname=?,`impiegati`.gender=?,`impiegati`.cf=?,\
        `impiegati`.birthdate=?, `impiegati`.address=?,`impiegati`.personal_document=? ,`impiegati`.code_document=? ,`impiegati`.residence=?, `impiegati`.cellphone_number=?,\
        `impiegati`.role=?,`impiegati`.email=?,`impiegati`.password=? WHERE `impiegati`.id_impiegato=?',
            
          [  obj_impiegati.name,
            obj_impiegati.surname,
            obj_impiegati.gender,
            obj_impiegati.cf,
            obj_impiegati.birthdate,
            obj_impiegati.address,
            obj_impiegati.personal_document,
            obj_impiegati.code_document,
            obj_impiegati.residence,
            obj_impiegati.cellphone_number,
            obj_impiegati.role,
            obj_impiegati.email,
            psw,
            id_impiegato]
        ).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("utente modificato");
        
        }//fine async
        
    );//fine transazione
    console.log("query res:"+result_q[0]);
        // aggiorno anche localmente l'impiegato
        employers.set(id_impiegato,result_q[0]);
        return result_q[0];
}



impiegati.updateById_rec=async (id_impiegato,obj_impiegati)=>{
    const db =  await makeDb(config);
    let result_q={};
    
    
    await withTransaction(db,async()=>{ 
        result_q=await db.query('UPDATE `impiegati` SET  `impiegati`.name=?,`impiegati`.surname=?,`impiegati`.gender=?,`impiegati`.cf=?,\
        `impiegati`.birthdate=?, `impiegati`.address=?,`impiegati`.personal_document=? ,`impiegati`.code_document=? ,`impiegati`.residence=?, `impiegati`.cellphone_number=?,\
        `impiegati`.role=?,`impiegati`.email=?,`impiegati`.password=? WHERE `impiegati`.id_impiegato=?',
            
          [  obj_impiegati.name,
            obj_impiegati.surname,
            obj_impiegati.gender,
            obj_impiegati.cf,
            obj_impiegati.birthdate,
            obj_impiegati.address,
            obj_impiegati.personal_document,
            obj_impiegati.code_document,
            obj_impiegati.residence,
            obj_impiegati.cellphone_number,
            obj_impiegati.role,
            obj_impiegati.email,
            obj_impiegati.password,
            id_impiegato]
        ).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
        console.log("utente modificato");
        
        }//fine async
        
    );//fine transazione
    console.log("query res:"+result_q[0]);
        // aggiorno anche localmente l'impiegato
        employers.set(id_impiegato,result_q[0]);
        return result_q[0];
}


//rimozione singola
impiegati.remove=async (id_impiegato,result)=>{
    const db =await  await makeDb(config);
    let result_q={};
    await withTransaction(db,async()=>{ 
        result_q=await db.query('DELETE FROM `impiegati` WHERE `impiegati`.id_impiegato=? ',[id_impiegato]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        
        if (result_q.length== 0) {
            console.log('Utente non trovato!');
            next(createError(404, 'Utente non trovato'));
            return;
        }else {
            console.log(`utente eliminato ${result_q.affectedRows}`);
            
            return;
        }
        }//fine async
    );//fine transazione
        //rimuovo localmente
        employers.delete(id_impiegato);
}

// per rimuovere più clienti
impiegati.remove_plus=async (id_impiegati,result)=>{
    const db=await  await makeDb(config);
    let result_q={};
    await withTransaction(db,async()=>{ 
        for (const id of id_impiegati){
        result_q=await db.query('DELETE FROM `impiegati` WHERE `impiegati`.id_impiegato=? ',[id]).catch(err=>{
    
        console.log("si è verificato un errore",err);
        throw err;
        
        });
       
        
        if (result_q.length== 0) {
            console.log('Utente  con id :'+ result_q.id_impiegato  +'non trovato!');
            
           
        }else {
            console.log(`utente eliminato ${result_q.affectedRows}`);
            
        }
        }//fine for
    }// fine async
    );//fine transazione
    // rimuovo localmente
    for (const el of result_q){
        employers.remove(el.id_impiegato);
    }
}

// ritorna gli autisti disponibili
impiegati.available= async (start,end)=>{
    let  result_q ={};
    let  result_q_1 ={};
    const db= await makeDb(config); 
  
    await  withTransaction(db,async()=>{ 
        

        //autisti disponili disponibili rispetto i dati inseriti
     result_q=await db.query('SELECT * \
     FROM `impiegati` WHERE  `impiegati`.role="driver"   AND  `impiegati`.id_impiegato NOT IN\
     (   SELECT `prenotazioni`.ref_driver FROM `prenotazioni`\
     WHERE (`prenotazioni`.primary_opt="autista") AND( (`prenotazioni`.start_date>? AND `prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
     (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
     (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
     (`prenotazioni`.start_date>? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
     (  timestampdiff(hour ,?,`prenotazioni`.start_date)<1)  AND  (timestampadd(hour,1,`prenotazioni`.end_date)>? )\
   AND `prenotazioni`.ref_driver IS NOT NULL))'
     ,[start,end,end,
        start,start,end,
        start,end,
        start,start,end,
        end,start
    ]).catch(err=>{
 
     console.log("si è verificato un errore",err);
     throw err;      
     });
    //query con le prenotazioni risultanti negative
    result_q_1=await db.query('SELECT `prenotazioni`.ref_driver FROM `prenotazioni`\
    WHERE (`prenotazioni`.primary_opt="autista") AND ((`prenotazioni`.start_date>? AND `prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
    (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
    (`prenotazioni`.start_date<? AND `prenotazioni`.end_date>?)OR\
    (`prenotazioni`.start_date>? AND `prenotazioni`.end_date>? AND `prenotazioni`.end_date<? )OR\
    (  timestampdiff(hour ,?,`prenotazioni`.start_date)<1)  AND  (timestampadd(hour,1,`prenotazioni`.end_date)>? )\
  AND `prenotazioni`.ref_driver IS NOT NULL)\
  '
    ,[start,end,end,
       start,start,end,
       start,end,
       start,start,end,
       end,start
   ]).catch(err=>{

    console.log("si è verificato un errore",err);
    throw err;      
    });
     }//fine async
 );//fine transazione
 console.log("prenotazioni sovrapposte"+JSON.stringify(result_q_1));
 console.log("start"+start+"end"+end);
 console.log("hai richiesto tutti gli autisti disponibili:\n"+result_q);
 return result_q;
}





// autista disponibile per emergenza
impiegati.available_em= async (start,end)=>{
    let  result_q ={};
    const db= await makeDb(config); 
    await  withTransaction(db,async()=>{ 
        

        //autisti disponili disponibili rispetto i dati inseriti
     result_q=await db.query('SELECT * \
     FROM `impiegati` WHERE ( `impiegati`.role="driver" )  AND  `impiegati`.id_impiegato NOT IN\
     (SELECT `prenotazioni`.ref_driver FROM `prenotazioni`\
      WHERE `prenotazioni`.primary_opt="autista" AND((`prenotazioni`.start_date>=? AND `prenotazioni`.start_date<=? AND `prenotazioni`.end_date>=?)OR\
     (`prenotazioni`.start_date<=? AND `prenotazioni`.end_date>=? AND `prenotazioni`.end_date<=? )OR\
      (`prenotazioni`.start_date<=? AND `prenotazioni`.end_date>=?)OR\
      (`prenotazioni`.start_date>=? AND `prenotazioni`.end_date>=? AND `prenotazioni`.end_date<=? )\
      ))',[start,end,end,start,start,end,start,end,start,start,end]).catch(err=>{
 
     console.log("si è verificato un errore",err);
     throw err;      
     });



     }//fine async
 );//fine transazione
 if(result_q.length==0){
     let a=[];
     return a;
 }
 console.log("hai richiesto tutti gli impiegati disponibili:\n"+result_q);
 return result_q[0];
}











// ritorna i dati impiegato  memorizzati 
impiegati.look=(id)=>{
    let profile=employers.get(id);
    return profile;


}
// restituisce tutti gli impiegati già memorizzati 
// funzione per amministratore
impiegati.look_ad=()=>{//testato
 
 let output={};
 let tmp="{";
 
 for(const el of employers ){
    console.log(el[0]);
    tmp+='\"id_'+`${el[0]}`+"\":"+JSON.stringify(employers.get(el[0]))+",";
 }
 let ind=tmp.lastIndexOf(',');
 tmp=tmp.slice(0,ind);
 tmp+="}";
 console.log(tmp);
 //employers.forEach((key,values)=>{tmp+=JSON.stringify(employers.get(values))+","});
 output=JSON.parse(tmp);
 console.log(output);
 console.log("look_ad:\n"+JSON.stringify(output));
    return output;
}


impiegati.crypt= async  (element)=>{
      
    let pwdhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
       pwdhash.update(element); // cifriamo 
  
      let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale
      return encpwd;
}



module.exports=impiegati;