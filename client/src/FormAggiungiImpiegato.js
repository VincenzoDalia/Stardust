import axios from "axios";
import React from "react";
import { calculate_age } from "./Registrazione"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col} from "react-bootstrap"; 


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


export default class FormAggiungiImpiegato extends React.Component {



    state = {
       
        name: "",
        surname: "",
        gender: "",
        birthdate: "",
        cellphone_number: "",
        cf: "",
        personal_document:"",
        code_document: "",
        role:"",
        residence:"",
        address:"",
        password: "",
        repassword: "",

        
        email: this.props.email,  ///cambiato da poco, se non va metti stringa vuota
        id_impiegato:this.props.id_impiegato,
        opzione:this.props.opzione
    }

    
    componentDidMount(){
        
        if(this.state.opzione=="modifica"){

            axios.post('http://localhost:3000/Employer/ModificaDati_get' , this.state)
            .then(res => {
                this.setState ({  
                    ...this.state,
                    name: res.data.name,
                    surname: res.data.surname,
                    gender: res.data.gender,
                    birthdate: new Date(res.data.birthdate),
                    cellphone_number: res.data.cellphone_number,
                    cf: res.data.cf,
                    address: res.data.address,
                    residence: res.data.residence,
                    role: res.data.role,
                    personal_document: res.data.personal_document,
                    code_document: res.data.code_document,
                    email: res.data.email
                });

                console.log("ok")
                
            })
            .catch(err => {
                console.log("Errore: " + err);
                alert("Qualcosa è andato storto: " + err)
            })
        }
    }

    render() {
        return (

            <div className="container was-validated col-sm-8 mt-3 p-4  ">
                <p className="lead text-uppercase"></p>

                <Form>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Nome</Form.Label>

                            <Form.Control
                                value={this.state.name}
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

                                
                        <Form.Group as={Col} >
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                value={this.state.surname}
                                type="text"
                                maxlength="40"
                                onChange={ changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        surname: changeEvent.target.value
                                    })
                                }} required
                            />
                        </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Genere</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." 
                                    value={this.state.gender}
                                    type="text" 
                                    onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        gender: changeEvent.target.value
                                    })
                                }} required>

                            <option selected value="">Scegli..</option>    
                            <option value="m" >Uomo</option>
                            <option value="f" >Donna</option>        
                                
                       
                        
                        </Form.Control>
                            
                    </Form.Group>

                    </Form.Row>

                    <Form.Row>

                    <Form.Group as={Col} >
                            <Form.Label>Data Di Nascita</Form.Label>
                            <Form.Control
                                value={this.state.birthdate}
                                placeholder="Inserisci data di nascita"
                                type="date"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        birthdate: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Cellulare</Form.Label>
                            <Form.Control
                                value={this.state.cellphone_number}
                                placeholder="Inserisci cellulare"
                                type="text"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        cellphone_number: changeEvent.target.value
                                    })
                                }}required
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Codice Fiscale</Form.Label>
                            <Form.Control
                                value={this.state.cf}
                                placeholder="Inserisci Codice Fiscale"
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
                        <Form.Group as={Col} >
                                <Form.Label>Città di residenza</Form.Label>
                                <Form.Control
                                    value={this.state.residence}
                                    type="text"
                                    maxlength="40"
                                    onChange={ changeEvent => {
                                        this.setState({
                                        ...this.state,
                                            residence: changeEvent.target.value
                                        })
                                    }} required
                                />
                            </Form.Group>

                                    
                            <Form.Group as={Col} >
                                <Form.Label>Indirizzo residenza</Form.Label>
                                <Form.Control
                                    value={this.state.address}
                                    type="text"
                                    maxlength="40"
                                    onChange={ changeEvent => {
                                        this.setState({
                                            ...this.state,
                                            address: changeEvent.target.value
                                        })
                                    }} required
                                />
                            </Form.Group>
                    </Form.Row>

                    <Form.Row>

                        <Form.Group as={Col} >
                            <Form.Label>Documento</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." 
                                        value={this.state.personal_document}
                                        type="text" 
                                        onChange={changeEvent => {
                                        this.setState({
                                            ...this.state,
                                            personal_document: changeEvent.target.value
                                        })
                                    }} required>

                                <option selected value="">Scegli..</option>    
                                <option value="patente" >Patente</option>
                                <option value="cartaidentita" >Carta d'Identità</option>   
                                <option value="passaporto" >Passaporto</option>      
                                    
                            
                            </Form.Control>
                                
                        </Form.Group>


                        <Form.Group as={Col} >
                            <Form.Label>Codice documento</Form.Label>
                            <Form.Control
                                value={this.state.code_document}
                                disabled={!this.state.personal_document}
                                id="patente" required type="text" class="form-control" aria-label="Text input with dropdown button"
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
                        <Form.Group as={Col} >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={this.state.email}
                                placeholder="Inserisci mail"
                                type="email"
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        email: changeEvent.target.value.toLowerCase()
                                    })
                                }} required
                            />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Ruolo</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." 
                                        value={this.state.role}
                                        type="text" 
                                        onChange={changeEvent => {
                                        this.setState({
                                            ...this.state,
                                            role: changeEvent.target.value
                                        })
                                    }} required>

                                <option selected value="">Scegli..</option>    
                                <option value="admin" >Amministratore</option>
                                <option hidden={this.state.personal_document!="patente"} disabled={this.state.personal_document!="patente"} value="driver" >Autista</option>     
                                <option hidden={this.state.personal_document!="patente"} disabled={this.state.personal_document!="patente"} value="parker" >Parcheggiatore</option>     
                                   
                            
                            </Form.Control>
                                
                        </Form.Group>
                    </Form.Row>
    
                    <Form.Row>
                        
                        <Form.Group as={Col} >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                placeholder="Inserisci password"
                                id="pass"
                                
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
    
                        <Form.Group as={Col} >
                            <Form.Label>Conferma Password</Form.Label>
                            <Form.Control
                                
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

                    <br/>

                    <p align="center">
                        <Button variant="primary" type="submit"
                        onClick={clickEvent => {
                            if (calculate_age(this.state.data_nascita) < 18) { alert('Per registrare un impiegato deve essere maggiorenne!') }
                            else if(checkpassword(this.state.password) <= 2){alert("La password inserita è troppo debole")}
                            else if(this.state.password!== this.state.repassword){alert("Non hai reinserito la password correttamente")}
                            else if (this.state.password.length< 8 || this.state.password.length >20 ){alert ("La password inserita è inferiore a 8 o maggiore di 20 caratteri")}
                            else {

                                if(this.state.opzione=="modifica"){

                                    axios.post("http://localhost:3000/Admin/ModificaImpiegati_mod", this.state)
                                        .then(result => {
                                            
                                                alert('Dati impiegato modificati!');
                                                document.location.href = '/GestioneImpiegati'
                                            
                                        }).catch(error => {
                                            console.log("Qualcosa è andato storto: " + error);
                                        })


                                }else{
 
                                    axios.post("http://localhost:3000/Admin/AggiungiImpiegati_add", this.state)
                                        .then(result => {
                                            
                                                alert('Impiegato Aggiunto!');
                                                document.location.href = '/GestioneImpiegati'
                                            
                                        }).catch(error => {
                                            console.log("Qualcosa è andato storto: " + error);
                                        })
                                }
                            }
                        }}>
                            Aggiungi/Modifica Impiegato
                        </Button>
                    </p>

                </Form>

            </div>



        );
    }
}
