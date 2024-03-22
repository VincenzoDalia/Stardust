import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import {Col} from "react-bootstrap"; 
import axios from "axios";

function checkpassword(password) {
    var strength = 0;

    if (password.length > 6) {
        strength += 1;
    }
    if (password.match(/[a-z]+/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
        strength += 1;
    }
    if (password.match(/[0-9]+/)) {
        strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
        strength += 1;
    }
    return strength;
}



export function calculate_age(x) {
    var today = new Date();
    var birthDate = new Date(x);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
    }
    console.log(age_now);
    return age_now;
}


export class Registrazione extends Component {

    constructor(props){
        super(props)
            this.state = {
                gender: "",
                name: "",
                surname: "",    
                birthdate: "",
                cellphone_number: "",
                address: "",
                city: "",
                region: "",
                cf: "",
                personal_document: "",
                code_document: "",                     
                code_cdc: "",
                cvv2:"",
                expiration_date: "",
                email: "",
                password: "",
                repassword: "",
                flag: false,
                text: ""
            };
        
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);
    }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        
    }

    maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }
    

    render(){

        return(

            <div>
                <br/>
                <h1>Registrazione</h1>
                <br/><br/>
    
                <Form onSubmit={this.handleSubmit}>
    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                maxlength="40"
                                onChange={ changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        name: changeEvent.target.value
                                    })
                                }} required
                            />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                maxlength="40"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        surname: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridGender">
                        <Form.Label>Genere</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." 
                                    autoFocus 
                                    type="text" 
                                    onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        gender: changeEvent.target.value
                                    })
                                }} required>
                            
                            <option value="" selected> Scegli</option>
                            <option value="m">Uomo</option>
                            <option value="f">Donna</option>
                       
                        
                        </Form.Control>
                            
                    </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridBirthDate">
                            <Form.Label>Data Di Nascita</Form.Label>
                            <Form.Control
                                placeholder="Inserisci data di nascita"
                                autoFocus
                                type="date"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        birthdate: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>
                        

                        <Form.Group as={Col} controlId="formGridPhoneNumber">
                            <Form.Label>Cellulare</Form.Label>
                            <Form.Control
                                placeholder="Inserisci cellulare"
                                autoFocus
                                type="text"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        cellphone_number: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCF">
                            <Form.Label>Codice Fiscale</Form.Label>
                            <Form.Control
                                placeholder="Inserisci Codice Fiscale"
                                autoFocus
                                type="text"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        cf: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridBirthDate">
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control
                                placeholder="Inserisci indirizzo"
                                autoFocus
                                type="text"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        address: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>
                        

                        <Form.Group as={Col} controlId="formGridPhoneNumber">
                            <Form.Label>Città</Form.Label>
                            <Form.Control
                                placeholder="Inserisci città"
                                autoFocus
                                type="text"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        city: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCF">
                            <Form.Label>Regione</Form.Label>
                            <Form.Control
                                placeholder="Inserisci regione"
                                autoFocus
                                type="text"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        region: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                    </Form.Row>
                    
                    <Form.Row>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Documento</Form.Label>

                            <Form.Control as="select" defaultValue="Choose..." 
                                autoFocus type="text" 
                                onChange={changeEvent => {

                                    this.setState({
                                        ...this.state,
                                        personal_document: changeEvent.target.value
                                    })
                                }} 
                                required>
                                    
                                    <option value="" selected> Scegli</option>
                                    <option value="cartaidentita" >Carta Identità</option>
                                    <option value="patente">Patente</option>
                                    <option value="passaporto">Passaporto</option>        
                        
                            
                            </Form.Control>

                            
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDocumentCode">
                            <Form.Label>Codice Documento</Form.Label>
                            <Form.Control
                                id="documents1" disabled={this.state.personal_document===""} type="text" class="form-control" aria-label="Text input with dropdown button"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        code_document: changeEvent.target.value.toUpperCase()
                                    })
                                }
                                }
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        

                        <Form.Group as={Col} controlId="formGridBirthDate">
                            <Form.Label>Carta di credito</Form.Label>
                            <Form.Control
                                placeholder="Inserisci codice"
                                autoFocus
                                type="number"
                                minLength="16"
                                maxLength="16"
                                onInput={this.maxLengthCheck}
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        code_cdc: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>
                        

                        <Form.Group as={Col} controlId="formGridPhoneNumber">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                placeholder="Inserisci cvv"
                                autoFocus
                                type="text"
                                minLength="3"
                                maxLength="3"
                                onInput={this.maxLengthCheck}
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        cvv2: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCF">
                            <Form.Label>Scadenza Carta</Form.Label>
                            <Form.Control
                                placeholder="Inserisci scadenza"
                                autoFocus
                                type="date"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        expiration_date: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                placeholder="Inserisci mail"
                                autoFocus
                                type="email"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        email: changeEvent.target.value.toLowerCase()
                                    })
                                }} required
                            />
                        </Form.Group>
                    </Form.Row>
    
                    <Form.Row>
                        
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                placeholder="Inserisci password"
                                id="pass"
                                autoFocus
                                type="password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title= "Deve contenere: almeno un numero, un carattere maiuscolo, un carattere minuscolo e almeno 8 o più caratteri"
                                onKeyUp={() => {
                                    if (checkpassword(this.state.password) <= 2) { this.state.text = "password debole" 
                                        document.getElementById("pass").style.backgroundColor = "#ff5c33"}
                                    else if (checkpassword(this.state.password) > 2 && checkpassword(this.state.password) < 4) { this.state.text = "password media" 
                                        document.getElementById("pass").style.backgroundColor = "#ffd699"}
                                    else { 
                                        this.state.text = "password Forte" 
                                        document.getElementById("pass").style.backgroundColor = "#adebad"}
                                        console.log(this.state.text)

                                }}
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        password: changeEvent.target.value
                                    })
                                }} required
                            />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Conferma Password</Form.Label>
                            <Form.Control
                                autoFocus
                                type="password"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        repassword: changeEvent.target.value
    
                                    })
    
                                }} required
                            />
                        </Form.Group>
                    </Form.Row>
    
                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Accetto termini e condizioni" required />            
                    </Form.Group>
    
                    <Button variant="primary" type="submit"
                        onClick={clickEvent => {
                            //Controllo se un campo è vuoto
                            clickEvent.preventDefault();
                            for (var element in this.state) {
                                console.log(element)
                                this.state.flag = false;
                                if (!this.state[element]) {
                                    if (element === "cf" || element === "personal_document" || element === "scadenza_documento" || element === "code_document" || element === "flag") { continue; }
                                    else { alert(element.toUpperCase() + " non è Inserito, Completare il campo"); }


                                    this.state.flag = true
                                    break;
                                }
                            }
                            //Controllo Password e Conferma Password                        
                            if (this.state.password !== this.state.repassword) {
                                alert("il Campo Conferma Password è diverso da Password, Riprova")
                                this.state.flag = true
                            }
                            //Controllo data di nascita e scadenza documento
                            if (this.state.flag === false) {
                                if (calculate_age(this.state.birthdate) < 0) {
                                    alert('Vieni dal Futuro?')
                                } else if (calculate_age(this.state.birthdate) <= 18 && this.state.personal_document === "patente") {
                                    alert('Se sei Minorenne allora non puoi avere la patente! Riprova!')
                                } else if (calculate_age(this.state.birthdate) < 14) {
                                    alert('Non è possibile effettuare la Registrazione se la tua età è inferiore a 14')
                                } 
                                // else if (calculate_age(this.state.scadenza_documento) > 0) {
                                //     alert('Non è possibile effettuare la Registrazione il documento è Scaduto')
                                    
                                // }
                                else if (this.state.password.length< 8 || this.state.password.length >20 ){alert ("La password inserita è inferiore a 8 o maggiore di 20 caratteri")}
                                else if(checkpassword(this.state.password) <= 2){alert("La password inserita è troppo debole")}
                                
                                else{
                                    
                                    axios.post("http://localhost:3000/Client/RecuperaPassword_exist", this.state)
                                        
                                        .then(result => {

                                            if(result.data.check===true){

                                                alert("Esiste già un account registrato con questo indirizzo mail.")
                                            
                                            }
                                        
                                        }).catch(error => {
                                            
                                            if(error.response.status==404){
                                                
                                                axios.post("http://localhost:3000/Client/Registrazione", this.state)
                                            
                                                    .then(result => {
                                                        
                                                            alert('Hai Completato la Registrazione!');
                                                            document.location.href = '/logincliente';
                                                        
                                                    }).catch(error => {
                                                        console.log(error);
                                                        alert('Si è verificato un errore imprevisto:' + error);
                                                    })

                                            }else{
                                                console.log(error);
                                                alert('Si è verificato un errore imprevisto:' + error);
                                            }
                                        })

                                    
                                }
                            }
                        }}
                    >
                        Registrati
                    </Button>
                </Form>
    
    
    
    
                <br/><br/>
            </div>
            
            
        );
    }
}
