import React, {Component} from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import Cookie from "universal-cookie";
import { Button, Col, Row, Card, ListGroup, Form, Alert} from "react-bootstrap";

import { PopUpModificaPrenotazione } from "./PopUpModificaPrenotazione";

import  {confirmAlert}  from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


export default class LeMiePrenotazioni extends Component{

    state={
        
        object: [],

        id_client:"",
        email:"",
        otp:"",

        code_prenotation:""     //viene utilizzato per memorizzare temporaneamente il codice della prenotazione da modificare/eliminare
    }

    eliminaPrenotazione(code_prenotation){

        // const oggetto = {
        //     code_prenotation
        // }

        this.setState({
            ...this.state,
            code_prenotation: code_prenotation
        })
        

        confirmAlert({ 
            title: 'Conferma la tua scelta',
            message: 'Sei sicuro di voler cancellare la tua prenotazione?\nRiceverai un rimborso sul metodo di pagamento che hai utilizzato in fase di registrazione.',
            buttons: [
                {
                    label: 'Si',
                    onClick: () => {
                        //alert("Hai eliminato la prenotazione con codice: " + code_prenotation)
                        axios.post("http://localhost:3000/Client/EliminaPrenotazione_del", this.state)
                        
                        
                        .then(result => {
                                
                                alert("Hai eliminato la tua prenotazione.")
                            
                            ////////////////////////////////////////////////////////////
                            axios.post("http://localhost:3000/Client/EliminaPrenotazione_refund", this.state)
                            .then(result => {
                                alert("Abbiamo avviato la procedura per effettuare il rimborso, riceverai una mail contenente le informazioni.")
                                
                                document.location.href= '/leMiePrenotazioni' 
                                
                            })
                            .catch(error => {
                                console.log(error);
                                alert('Si è verificato un errore imprevisto:' + error);
                            })       
                            ////////////////////////////////////////////////////////////
                        
                        })    
                        
                        .catch(error => {
                            console.log(error);
                            alert('Si è verificato un errore imprevisto:' + error);
                        })

                        this.setState({
                            ...this.state,
                            code_prenotation:""
                        })
                    }

                    
                },

                {
                    label: 'No',
                    onClick: () => {
                        //alert("Non hai eliminato la tua prenotazione")

                        this.setState({
                            ...this.state,
                            code_prenotation:""
                        })
                    }
                }
            ]
        })
    }

    componentWillMount(){
        const cookie = new Cookie();
        this.setState({
            ...this.state.id_client=cookie.get("cookieUserid"),
            ...this.state.email=cookie.get("cookieEmail")
        })
        axios.post("http://localhost:3000/Client/RitiroMezzo_get", this.state).
            then(result => {

                    this.setState({
                        ...this.state,
                        object: result.data
                    })

            }).catch(error => {
                console.log(error);
                alert('Si è verificato un errore imprevisto:' + error);
            })
    }

    controlloData(dataInizio, dataFine){
        const now = new Date();

        const data_inizio = new Date(dataInizio)
        data_inizio.setHours(data_inizio.getHours() - 2)

        const data_fine = new Date(dataFine)
        data_fine.setHours(data_fine.getHours() - 2)

        if(now>data_inizio && now<data_fine){
            return false
        }else{
            return true;
        }
    }

    controlloDataModifiche(dataInizio, dataFine){
        
        const now = new Date();

        const data_inizio = new Date(dataInizio)
        data_inizio.setHours(data_inizio.getHours() - 2)

        if(now<data_inizio){
            return false
        }else{
            return true;
        }
    }



    render(){
        let prenotazioni;

        prenotazioni =this.state.object.map(prenotazione=>{
            if(prenotazione.primary_opt==='mezzo'){
                return <div>
                <div className="container" align="center" style={{margin:"15px"}}>
                    <Card border="dark" style={{width: '80%', alignItems:"center", backgroundColor:"#e3e3e3"}}>
                    <Card.Body>
                    <Card.Title>Codice Prenotazione: {prenotazione.code_prenotation} - {prenotazione.primary_opt}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Prezzo: {prenotazione.price} € </Card.Subtitle>
                    <Card.Text>
                        Veicolo targato: {prenotazione.ref_vehicle} <br/>
                        Partenza il {prenotazione.start_date.slice(0,10)} alle ore {prenotazione.start_date.slice(11,19)} da {prenotazione.start_address}<br/>
                        Arrivo il {prenotazione.end_date.slice(0,10)} alle ore {prenotazione.end_date.slice(11,19)} a {prenotazione.end_address} <br/> <br/>
                        
                        
                    </Card.Text>

                    <Form.Row >
                            <Form.Group as={Col} style={{alignSelf:"flex-end"}}>
                                 
                                    <Link 
                                        
                                        style={{color:"white", textDecoration:"none"}}
                                        to ={{
                                            pathname:"/SbloccaVeicolo",

                                            state:{
                                                code_prenotation: prenotazione.code_prenotation,
                                                price: prenotazione.price
                                            }
                                        }}
                                    > 
                                    <Button variant="primary" 
                                        disabled={this.controlloData(prenotazione.start_date,prenotazione.end_date) || prenotazione.complete==="true"}>
                                    Ritira mezzo
                                    </Button>
                                    </Link>
                                
                            </Form.Group>

                            

                               <PopUpModificaPrenotazione modifica={true} start_date={prenotazione.start_date} end_date={prenotazione.end_date} complete={prenotazione.complete} code_prenotation={prenotazione.code_prenotation}/>
                               

                            <Form.Group as={Col} style={{alignSelf:"flex-end"}}>
                                <Button 
                                style={{padding:"18px"}}
                                disabled={this.controlloDataModifiche(prenotazione.start_date,prenotazione.end_date)}
                                onClick={
                                    clickEvent =>{
                                        clickEvent.preventDefault();

                                        this.eliminaPrenotazione(prenotazione.code_prenotation)
                                    }
                                }
                                variant="danger" > 
                                    Elimina
                                </Button>
                            </Form.Group>
                         </Form.Row>
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
                    <Card.Subtitle className="mb-2 text-muted">Prezzo: {prenotazione.price}€ </Card.Subtitle>
                    <Card.Text>
                        Veicolo targato: {prenotazione.ref_vehicle} <br/>
                        Partenza il {prenotazione.start_date.slice(0,10)} alle ore {prenotazione.start_date.slice(11,19)} da {prenotazione.start_address} <br/>
                        Arrivo il {prenotazione.end_date.slice(0,10)} alle ore {prenotazione.end_date.slice(11,19)} a {prenotazione.end_address} <br/> 
                       
                    </Card.Text>

                    <Form.Row >

                            <Form.Group as={Col} style={{alignSelf:"flex-end"}}>
                                <PopUpModificaPrenotazione modifica={true} start_date={prenotazione.start_date} end_date={prenotazione.end_date} complete={prenotazione.complete} code_prenotation={prenotazione.code_prenotation}/>
                            </Form.Group>
                            

                            <Form.Group as={Col} style={{alignSelf:"flex-end"}}>
                                <Button
                                style={{padding:"18px", marginBottom:"15px"}}
                                disabled={this.controlloDataModifiche(prenotazione.start_date,prenotazione.end_date)}
                                onClick={
                                    clickEvent =>{
                                        clickEvent.preventDefault();

                                        this.eliminaPrenotazione(prenotazione.code_prenotation)
                                    }
                                } 
                                variant="danger" > 
                                    Cancella
                                </Button>
                            </Form.Group>
                         </Form.Row>
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

            </div>
        );
    }
}