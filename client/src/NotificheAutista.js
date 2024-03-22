import React, {Component} from "react";
import { Button} from 'react-bootstrap';
import axios from "axios"; 
import { Card } from "react-bootstrap";
import Cookie from "universal-cookie";

export default class NotificheAutista extends Component{

    state={
        object:[],

        id_impiegato:"",
        email:""
        
    }

    componentWillMount(){
        const cookie = new Cookie();
        this.setState({
            ...this.state.id_impiegato=cookie.get("cookieUserid"),
            ...this.state.email=cookie.get("cookieEmail")
        })
        axios.post("http://localhost:3000/Employer/NotificaPrenotazioni_pren", this.state).
            then(result => {
                    this.setState({
                    ...this.state,
                    object: result.data,
                })   
            }).catch(error => {
                console.log(error);
                alert('Si è verificato un errore imprevisto:' + error);
            })
    }

    render(){
        let prenotazioni

        prenotazioni = this.state.object.map( prenotazione => {

                if(prenotazione.complete==="false"){
                    return <div>
                    <div className="container" align="center" style={{margin:"15px"}}>
                    <Card border="dark" style={{width: '80%', alignItems:"center", backgroundColor:"#e3e3e3"}}>
                    <Card.Body>
                    <Card.Title>Codice Prenotazione: {prenotazione.code_prenotation} - {prenotazione.primary_opt}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Prezzo: {prenotazione.price} </Card.Subtitle>
                    <Card.Text>
                        Veicolo targato: {prenotazione.ref_vehicle} <br/>
                        Partenza il {prenotazione.start_date.slice(0,10)} alle ore {prenotazione.start_date.slice(11,19)} da {prenotazione.start_address} <br/>
                        Arrivo il {prenotazione.end_date.slice(0,10)} alle ore {prenotazione.end_date.slice(11,19)} a {prenotazione.end_address} <br/> <br/>

                        <Button variant="primary" style={{margin:"20px"}}
                            onClick={
                                clickEvent=>{

                                    const oggettoAggiungiNotifica={
                                        id_impiegato: this.state.id_impiegato,
                                        code_prenotation: prenotazione.code_prenotation
                                    }
                                    const oggettoEmail={
                                        id_client: prenotazione.ref_client
                                    }

                                    axios.post("http://localhost:3000/Employer/NotificaPrenotazioni_ride", oggettoAggiungiNotifica).
                                    then(result => {
                                        alert("Prenotazione accettata con successo!")

                                        axios.post("http://localhost:3000/Employer/NotificaPrenotazioni_em", oggettoEmail).
                                        then(result => {
                                        alert("È stata inviata una mail di conferma al cliente")
                                        document.location.href = '/NotificheAutista';
                                                
                                        }).catch(error => {
                                            console.log(error);
                                            alert('Si è verificato un errore imprevisto:' + error);
                                        })
                                            
                                    }).catch(error => {
                                        console.log(error);
                                        alert('Si è verificato un errore imprevisto:' + error);
                                    })
                                }
                            }
                        >Accetta</Button>
                        <Button variant="danger"
                            onClick={
                                clickEvent=>{
                                    const oggettoRifiutaPrenotazione={
                                        code_prenotation: prenotazione.code_prenotation,
                                        id_impiegato: this.state.id_impiegato
                                    }
                                    const oggettoEmailNegativa={
                                        id_client: prenotazione.ref_client,
                                        code_prenotation: prenotazione.code_prenotation
                                    }

                                    axios.post("http://localhost:3000/Employer/NotificaPrenotazioni_driver", oggettoRifiutaPrenotazione).
                                        then(result => {
                                        alert("Hai rifiutato la corsa, sarà assegnato un nuovo autista al cliente")

                                        if(result.status===404){
                                            alert("Nessun autista disponibile, invio un rimborso al cliente")

                                            axios.post("http://localhost:3000/Employer/NotificaPrenotazioni_ref", this.state).
                                                then(result => {
                                                
                                                    axios.post("http://localhost:3000/Employer/NotificaPrenotazioni_nem", oggettoEmailNegativa).
                                                        then(result => {
                                                        alert("È stata inviata una mail di conferma al cliente")
                                                        document.location.href = '/NotificheAutista';
                                                            
                                                    }).catch(error => {
                                                        console.log(error);
                                                        alert('Si è verificato un errore imprevisto:' + error);
                                                    })
                                                }).catch(error => {
                                                    console.log(error);
                                                    alert('Si è verificato un errore imprevisto:' + error);
                                                })
                                        }else{
                                            document.location.href = '/NotificheAutista';
                                        }
                                                
                                        }).catch(error => {
                                            console.log(error);
                                            alert('Si è verificato un errore imprevisto:' + error);
                                        })

                                }
                            }
                        >Rifiuta</Button>
                        
                    </Card.Text>
                    </Card.Body>
                    </Card>
                    
                </div>
            </div>
                }else{
                    return <div>
                    <div className="container" align="center" style={{margin:"15px"}}>
                    <Card border="dark" style={{width: '80%', alignItems:"center", backgroundColor:"#e3e3e3"}}>
                    <Card.Body>
                    <Card.Title>Codice Prenotazione: {prenotazione.code_prenotation} - {prenotazione.primary_opt}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Prezzo: {prenotazione.price} </Card.Subtitle>
                    <Card.Text>
                        Veicolo targato: {prenotazione.ref_vehicle} <br/>
                        Partenza il {prenotazione.start_date.slice(0,10)} alle ore {prenotazione.start_date.slice(11,19)} da {prenotazione.start_address} <br/>
                        Arrivo il {prenotazione.end_date.slice(0,10)} alle ore {prenotazione.end_date.slice(11,19)} a {prenotazione.end_address} <br/> <br/>
 
                    </Card.Text>
                    </Card.Body>
                    </Card>
                    
                </div>
            </div>
            }

                    
        
            
    })
        return(
            
            <div align="center">
                <h1>Le Mie Prenotazioni</h1> <br/>
                {prenotazioni}
                {/* <p>codice prenotazione: {this.state.object.code_prenotation}</p> */}

            </div>
        );
    }
    

}