
const nodemailer = require('nodemailer');// modulo per gestire email
const cliente =require('../models/cliente');
const impiegato=require('../models/Impiegati');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const transporter = nodemailer.createTransport({// account gmail usato per inviare email
    service: 'gmail',
    auth: {
      user: 'progettostardust@gmail.com',
      pass: 'Stardust99#'
    }
  });


exports.exist=async (req,res,next)=>{

    const db =await makeDb(config);
    var result_q={};
   
    await withTransaction(db,async()=>{ 
        // ricerca cliente
        result_q=await db.query('SELECT * FROM `cliente` \
        WHERE `cliente`.email=? ',[
            req.body.email
           
        ]).catch(err=>{
    
        console.log("si è verificato un errore nel recupero dati",err);
        
        
        });
       
        if (result_q.length== 0  ) {
            console.log('Utente non trovato!');
            //next(createError(404, 'Utente non trovato'));
            return res.status(404).json({check:false});
        } else {
            console.log('cliente trovato');
            return res.status(200).json({check:true,role:"client",id:result_q[0].id_client});
        }

    });//fine async e fine transazione

}


exports.exist_emp=async (req,res,next)=>{

  const db =await makeDb(config);
  
  var result_q2={};
  await withTransaction(db,async()=>{ 
     
      
      //ricerca impiegato
      result_q2=await db.query('SELECT * FROM `impiegati` \
      WHERE `impiegati`.email=? ',[
          req.body.email
      ]).catch(err=>{
  
      console.log("si è verificato un errore nel recupero dati",err);
      
      
      });
      if (result_q2.length==0 ) {
          console.log('Utente non trovato!');
          //next(createError(404, 'Utente non trovato'));
          return res.status(404).json({check:false});
      
       } else{
           console.log('impiegato trovato')
          return res.status(200).json({check:true,role:"employer",id:result_q2[0].id_impiegato});
      }

  });//fine async e fine transazione

}


// genero la password ,la invio per email e modifico la password dell'utente
exports.generate_password =async (req,res,next)=>{
    let tmp_psw="";
    let email=req.body.email;
    let role =req.body.role;
    let result={};
    let cli={};
    let imp={};
        try{
          var randomstring = Math.random().toString(36).slice(-10);//genera una password di 6 caratteri
          console.log("password non cryptata"+randomstring);
        tmp_psw=await cliente.crypt(randomstring);// creo una password criptata 
       var  tmp_psw_2=await impiegato.crypt(randomstring);
        console.log("password  cryptata"+tmp_psw);
        
      // modifico la password nel database
      if(role=="driver" || role=="admin" || role=="employer"){
           imp=await impiegato.findByEmail(req.body.email);
          const new_imp= new impiegato({
              name:imp.name,
              surname:imp.surname,
              gender:imp.gender,
              cf:imp.cf,
              role:imp.role,
              birthdate:imp.birthdate,
              residence:imp.residence,
              personal_document:imp.personal_document,
              address:imp.address,
              cellphone_number:imp.cellphone_number,

              
              email:imp.email,
              password:tmp_psw_2


          });
          
        result=await impiegato.updateById_rec(imp.id_impiegato,new_imp);
        console.log('password generata');
            
        transporter.sendMail({
          from: 'progettostardust@gmail.com',
          to: email,
          subject: 'PASSWORD TEMPORANEA GENERATA DAL SISTEMA ',
          text: 'Gentile utente ,le abbiamo reimpostato la password :'+randomstring+
            '  si prega di cambiarla una volta effettuato l\'accesso per una maggiore sicurezza'
        }, function(err, info) {
          if (err) {
            throw err;
          } else {
            console.log("email mandata "+info.response);
          }
        });
        console.log("password cryptata"+tmp_psw);
        return res.status(200).json({message:'email con password temporanea mandata all\'impiegato'});
      }
      else{
         cli=await cliente.findByEmail(req.body.email);
       
        console.log("utente cli "+cli);
        const new_cli=  new cliente({
          name:cli.name,
          surname:cli.surname,
          gender:cli.gender,
          cf:cli.cf,
          birthdate:cli.birthdate,
          address:cli.address,
          city:cli.city,
          region:cli.region,
          personal_document:cli.personal_document,

          cellphone_number:cli.cellphone_number,

         
          cvv2:cli.cvv2,
          code_cdc:cli.code_cdc,
          expiration_date:cli.expiration_date,
          code_document:cli.code_document,
          email:cli.email,
          password:tmp_psw


      });
       console.log("oggetto cliente nuovo creato"+new_cli);
       result=await cliente.updateById_rec(cli.id_client,new_cli);
       console.log('password generata');
        
       transporter.sendMail({
        from: 'progettostardust@gmail.com',
        to: email,
        subject: 'PASSWORD TEMPORANEA GENERATA DAL SISTEMA ',
        text: 'Gentile utente ,le abbiamo reimpostato la password :'+randomstring+
        '  si prega di cambiarla una volta effettuato l\'accesso per una maggiore sicurezza'
      }, function(err, info) {
        if (err) {
          throw err;
        } else {
          console.log("email mandata "+info.response);
        }
      });
       return res.status(200).json({"message":'email con password temporanea mandata al cliente'});
    
      }

    }catch (err){
      console.log("errore: "+err)
        return res.status(500).json({"message":"errore nella generazione della password"+err.toString()});
    }
}