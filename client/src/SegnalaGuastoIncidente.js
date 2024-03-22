import React, {Component} from "react";
import { Button, Form, Col} from 'react-bootstrap';
import axios from "axios"; 
import Cookie from "universal-cookie";

export default class SegnalaGuastoIncidente extends Component{

    state={
        object:{},

        id_client:"",
        start_address:"",
        code_prenotation: this.props.location.state.code_prenotation,
        motivation:""
    }

    componentDidMount(){
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

    render(){
        return(

            <div align="center">
                <h3>Effettua una segnalazione per un guasto o un incidente</h3>
                <h4>Se disponibile ti sarà inviato un autista</h4> <br/>

                <Form>
                    <Form.Group as={Col} controlId="formGridSegnalazione">
                        <Form.Label>Cosa vuoi segnalare?</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..."
                                    type="text" 
                                    onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        motivation: changeEvent.target.value
                                    })
                                }} required>
                            
                            <option value="" selected> Scegli</option>
                            <option value="guasto">Guasto</option>
                            <option value="incidente">Incidente</option>
                       
                        
                        </Form.Control>
                            
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStartAddress">
                            <Form.Label>Inserisci l'indirizzo in cui ti trovi</Form.Label>
                            <Form.Control
                                type="text"
                                maxlength="40"
                                onChange={ changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        start_address: changeEvent.target.value
                                    })
                                }} required
                            />
                        </Form.Group>
                </Form>
                <br/>
                <Button 
                    onClick={clickEvent => {
                        clickEvent.preventDefault();
                        axios.post("http://localhost:3000/Client/Segnalazione", this.state).
                            then(result => {
                            
                            alert("Ti è stato assegnato un autista di emergenza ma verrà applicato un sovrapprezzo")
                            document.location.href = '/';
                                    
                            }).catch(error => {
                                console.log(error);
                                alert('Si è verificato un errore imprevisto:' + error);
                            })
                    }}
                >Invia Segnalazione</Button>
                <br/><br/>
            </div>
        );
    }
}