const cliente =require('../models/cliente');



exports.login=async (req,res,next)=>{

    let client={};
    let psw=await cliente.crypt(req.body.password);

    try{
    //client=await cliente.find_em_pw(req.body.email,psw);
    client=await cliente.findByEmail(req.body.email);
    if(client){
        console.log("condition:"+client.password!=psw);
        console.log("cliente:"+JSON.stringify(client));
        console.log("password cryptata:"+psw +"\n password db:"+client.password);

        if(client.password!=psw){
            return res.status(500).json({message:"password non coincidenti"});
        }
        else{
        console.log("cliente loggato");
        return  res.status(200).json(client);
        }
    }else{
        console.log("utente non trovato");
        return res.status(404).json({message:"utente non trovato"});s
    }



    }catch(err){
        console.log("errore  cliente non trovato"+err);
               return  res.status(404).json({message:'errore  cliente non trovato',error:err});
    }

}


