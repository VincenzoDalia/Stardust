import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import Form from "react-bootstrap/Form";
import { Button } from 'react-bootstrap';
import axios from "axios";
import Cookie from "universal-cookie";
import { Col } from 'react-bootstrap';

export default class SbloccaVeicolo extends Component{

        state={
            otp:"",
            ref_client: "",
            email:"",
            code_prenotation: this.props.location.state.code_prenotation,
            price:this.props.location.state.price
        }
    
    

    
    handleChange = (otp) => {
        this.setState({ otp});
    };

    componentDidMount(){
        
        const cookie = new Cookie();
        this.setState({
            ...this.state.ref_client=cookie.get("cookieUserid"),
            ...this.state.email=cookie.get("cookieEmail")
        })

        //GENERO L'OTP DA MANDARE ALL'UTENTE
        axios.post('http://localhost:3000/Client/AggiungiPrenotazione_OTP' , this.state).
            then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                console.log("Errore: " + err);
                alert("Qualcosa è andato storto: " + err)
            })

        
        

    }

    handler() {
        //Cosa deve succedere se l'otp è giusto

        //SBLOCCO IL VEICOLO
        axios.post('http://localhost:3000/Client/RitiroMezzo_open' , this.state)
            
        .then(res => {
                
            })
        .catch(err => {
                console.log("Errore: " + err);
                alert("Qualcosa è andato storto: " + err)
            }) 
        alert("Veicolo sbloccato!")

        //Aggiungo la corsa

        axios.post('http://localhost:3000/Client/RitiroMezzo_ride' , this.state).
            then(res => {
                alert("Corsa sbloccata con successo");
                document.location.href = '/Home';
            })
            .catch(err => {
                console.log("Errore: " + err);
                alert("Qualcosa è andato storto: " + err)
            }) 
        }
      




    render(){

        return(

            <div>

            <div align="center" className="block border rounded mb-0 border-primary">

            <Form >
                
                 <Form.Row>  
                    <Form.Group as={Col} >
                    <br/><h3>Verifica la tua identità</h3><br/>
                        <Form.Label>Inserisci il codice OTP ricevuto tramite mail</Form.Label>
                    <OtpInput
                        containerStyle={{justifyContent:"center"}}
                        value={this.state.otp}
                        onChange={this.handleChange}
                        numInputs={6}
                        isInputNum={true}
                        separator={<span>--</span>}
                    />

                    </Form.Group>
                </Form.Row>

                <div >
                    <Form.Group as={Col} >
                        <Button  style={{margin:"20px"}} variant="secondary" onClick={
                            clickEvent => {
                                clickEvent.preventDefault();
                                
                                this.setState({
                                    ...this.state,
                                    otp: ""
                                })


                            }
                        }>
                            Cancella
                        </Button>

                        <Button style={{margin:"20px"}}
                            onClick={
                                clickEvent => {
                                    clickEvent.preventDefault();
                                    
                                    axios.post("http://localhost:3000/Client//AggiungiPrenotazione_check_otp", this.state)
                                    .then( result => {
                                        if(result.data.flag===false){
                                            alert("Il codice otp inserito non è corretto, riprova.");
                                        
                                        }else{
                                            alert("Codice otp corretto.")
                                           

                                            {this.handler()}

                                            
                                        }
                                    })
                                    .catch( error => {

                                    })
                                }
                            }
                        >
                            Verifica
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col}>
                        
                    </Form.Group>
                </div> 
                
            </Form>
        
            
            
            </div>
            
            <div>
                 <br/><br/>
            </div>

            </div>

        );

        
    
    }
    

}