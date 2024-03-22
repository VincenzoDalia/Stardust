import React, { Component, Select, Alert,} from "react";

export default class About extends Component{



    render(){


        return(
            <div>
            <div style={{backgroundColor:"aliceblue", borderRadius:"10px", boxShadow:"2px 2px 2px 2px grey"}} >
                <div align="center" className="container">
                    <h1>Chi siamo?</h1>
                </div>
                <div style={{padding:"30px"}}>
                <h4>Stardust è il servizio di car sharing con l’obiettivo di rendere sempre più sostenibili i sistemi di trasporto individuali e collettivi:  tutti i nostri veicoli sono elettrici, nel pieno rispetto dell'ambiente.   
                Siamo costantemente alla ricerca di nuove soluzioni per offrire servizi innovativi, in grado di semplificare la mobilità delle persone, dei veicoli e delle merci: esploriamo nuovi modelli di servizio per rispondere ai bisogni in continua evoluzione degli utenti finali e per garantire ai nostri clienti la sostenibilità ambientale, economica e finanziaria dei progetti.</h4><br/>
                <h4>Se vuoi scoprire di più di noi seguici sui nostri Social!</h4>
                </div>
                
            </div>
            <br/><br/><br/>
            </div>
        );
    }
}

    

