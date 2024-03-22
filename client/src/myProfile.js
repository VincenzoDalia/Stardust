import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from "axios";
import Cookie from "universal-cookie";
import { object } from 'prop-types';
import { Row } from 'react-bootstrap';

export class MyProfile extends Component{
    

    state = {
        object: {},
        id_client: "",
        id_impiegato:"",
        email:"",
        role:""
    }

    componentDidMount(){
        
        const cookie = new Cookie();
        this.setState({
            ...this.state.id_client=cookie.get("cookieUserid"),
            ...this.state.id_impiegato=cookie.get("cookieUserid"),
            ...this.state.email=cookie.get("cookieEmail"),
            ...this.state.role=cookie.get("cookieRole")
        })

        const role = cookie.get("cookieRole")

        if(role=="client"){
            
            axios.post('http://localhost:3000/Client/ModificaDati_get' , this.state)
            .then(res => {
                this.setState ({  
                    ...this.state,
                    object: res.data
                });
                
            })
            .catch(err => {
                console.log("Errore: " + err);
                alert("Qualcosa è andato storto: " + err)
            })

        }else{

            axios.post('http://localhost:3000/Employer/ModificaDati_get' , this.state)
            .then(res => {
                this.setState ({  
                    ...this.state,
                    object: res.data
                });
                
            })
            .catch(err => {
                console.log("Errore: " + err);
                alert("Qualcosa è andato storto: " + err)
            })

        }
        
    }

    

    render(){

        if(this.state.role=="client"){

            return(
                <Container>
                    <h2>Il mio profilo</h2><br/><br/><br/>
                    <strong>Nome: </strong>{this.state.object.name} <br/><br/>
                    <strong>Cognome: </strong>{this.state.object.surname} <br/><br/>
                    <strong>Sesso: </strong>{this.state.object.gender} <br/><br/>
                    <strong>Email: </strong>{this.state.object.email} <br/><br/>
                    <strong>Data di nascita: </strong>{this.state.object.birthdate} <br/><br/>
                    <strong>Tipo documento: </strong>{this.state.object.personal_document} <br/><br/>
                    <strong>Codice documento: </strong>{this.state.object.code_document} <br/><br/>
                    <strong>Regione: </strong>{this.state.object.region} <br/><br/>
                    <strong>Città: </strong>{this.state.object.city} <br/><br/>
                    <strong>Indirizzo: </strong>{this.state.object.address} <br/><br/>
                    <strong>Codice fiscale: </strong>{this.state.object.cf} <br/><br/>
                    <strong>Numero di telefono: </strong>{this.state.object.cellphone_number} <br/><br/>
                    <strong>Numero carta di credito: </strong>{this.state.object.code_cdc} <br/><br/>
                    <strong>CVV: </strong>{this.state.object.cvv2} <br/><br/>
                    <strong>Scadenza carta: </strong>{this.state.object.expiration_date} <br/><br/>
                    <br/>
                    
                    
                    <Button style={{marginRight:"15px"}} href='/leMiePrenotazioni'>Le mie prenotazioni</Button>
                    <Button href='/modificaprofilo'>Modifica Profilo</Button><br/><br/>
                
    
                    <br/><br/><br/>
                </Container>
                
            );

        }else{

        
            return(
                <Container>
                    <h2>Il mio profilo</h2><br/><br/><br/>
                    <strong>Nome: </strong>{this.state.object.name} <br/><br/>
                    <strong>Cognome: </strong>{this.state.object.surname} <br/><br/>
                    <strong>Sesso: </strong>{this.state.object.gender} <br/><br/>
                    <strong>Email: </strong>{this.state.object.email} <br/><br/>
                    <strong>Data di nascita: </strong>{this.state.object.birthdate} <br/><br/>
                    <strong>Tipo documento: </strong>{this.state.object.personal_document} <br/><br/>
                    <strong>Codice documento: </strong>{this.state.object.code_document} <br/><br/>
                    <strong>Città: </strong>{this.state.object.residence} <br/><br/>
                    <strong>Indirizzo: </strong>{this.state.object.address} <br/><br/>
                    <strong>Codice fiscale: </strong>{this.state.object.cf} <br/><br/>
                    <strong>Numero di telefono: </strong>{this.state.object.cellphone_number} <br/><br/>
                    
                    <br/>
                    
                    <Button href='/modificaprofilo'>Modifica Profilo</Button><br/><br/>
                
    
                    <br/><br/><br/>
                </Container>
            )
            
        }

        
    }
    
}