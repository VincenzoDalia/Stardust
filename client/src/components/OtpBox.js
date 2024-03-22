import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import Form from "react-bootstrap/Form";
import { Button, Container } from 'react-bootstrap';
import axios from "axios";
import Cookie from "universal-cookie";
import { object } from 'prop-types';
import { Row, Col } from 'react-bootstrap';

export default class OtpBox extends Component{

    state = {
        otp:"",
        id_client: "",
        mobile_device:false
    }

    
    handleChange = (otp) => {
        this.setState({ otp});
    };

    componentWillMount(){

        const cookie = new Cookie();
        this.setState({
            ...this.state.id_client=cookie.get("cookieUserid"),
            ...this.state.email=cookie.get("cookieEmail")
        })
        

    }




    render(){

        if(this.state.mobile_device==false){
            return(
                <div align="center">

                    <Form>
                        <h3>Dispositivo mobile</h3>
                        <Form.Label>Possiedi un dispositivo mobile per ricevere un codice OTP?<br/>(In realtà lo riceverai via mail)</Form.Label>
                        <br/><br/><br/>
                        <Form.Row align="center">

                            <Form.Group as={Col}>
                                <Button style={{padding:"30px"}} variant="danger" href="/Home"
                                    onClick={ clickEvent => {

                                        alert("Siamo spiacenti, ma è necessario un dispositivo mobile per verificare il codice OTP. Verrai reindirizzato alla Home.")
                                    }

                                    }>
                                    No
                                </Button>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Button style={{padding:"30px",paddingRight:"35px"}}
                                    onClick={ clickEvent => {

                                        alert("Ottimo, ti verrà inviato un codice OTP.")

                                        this.setState({
                                            ...this.state,
                                            mobile_device:true
                                        })

                                        axios.post("http://localhost:3000/Client/AggiungiPrenotazione_OTP", this.state)
                                        .then(result => {
                                            alert(result.data.message);
                                        })
                                        .catch(error => {
                                            console.log("Errore: " + error);
                                            alert("Qualcosa è andato storto: " + error)
                                        })
                                    }

                                    

                                    }>
                                    Si
                                </Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>


                </div>
            );
        
        }else{

        return(

            <div className="block border rounded mb-0 border-primary">

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
                                        if(result.data.flag==false){
                                            alert("Il codice otp inserito non è corretto, riprova.");
                                        
                                        }else{
                                            alert("Codice otp corretto.")
                                           

                                            {this.props.handler()}

                                            
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
        );

        }
    
    }
    

}