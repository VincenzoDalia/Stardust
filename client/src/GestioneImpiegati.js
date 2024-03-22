import React, { Component } from "react";
import {JsonToTable} from "react-json-to-table";
import axios from "axios";
import { Button, Col, Row, Card, ListGroup, Form} from "react-bootstrap";
import { PopUpAggiungiImpiegato } from "./PopUpImpiegati";
import { PopUpRimuoviImpiegato } from "./PopUpImpiegati";
import { PopUpModificaImpiegato } from "./PopUpImpiegati";

export default class GestioneImpiegati extends React.Component{

    state = {
        object: []
    }

    componentDidMount() {
        axios.post("http://localhost:3000/Admin/AggiungiImpiegati_get", this.state)
            .then(result => {
                this.setState({
                    ...this.state,
                    object: result.data
                })
            })
            .catch(err => {
                console.log("Errore: " + err);
                alert("Qualcosa è andato storto: " + err)
            })

    

    }

    render(){

        let impiegati;

        impiegati = this.state.object.map(impiegato=>{
            return <div>
                <div align="center" style={{margin:"15px"}}>
                    <Card style={{ width: '30rem' }}>
                    <Card.Body>
                    <Card.Title>ID Impiegato: {impiegato.id_impiegato}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{impiegato.name} {impiegato.surname}</Card.Subtitle>
                    <Card.Text>
                        <p>Città Residenza: {impiegato.residence}    /  Indirizzo: {impiegato.address}</p>
                        <p>Codice Fiscale: {impiegato.cf}            /  Contatto: {impiegato.cellphone_number}</p>
                        <p>Sesso: {impiegato.gender}                 /  Data di nascita: {impiegato.birthdate.slice(0,10)}</p>
                        <p>Documento: {impiegato.personal_document}  /  Codice Documento: {impiegato.code_document}</p>
                        <p>Email: {impiegato.email}                  /  Ruolo: {impiegato.role}</p>
                    
                    </Card.Text>

                    <div>
                        <Form.Row >
                            <Form.Group as={Col}>
                                <PopUpModificaImpiegato opzione={"modifica"}  email={impiegato.email} id_impiegato={impiegato.id_impiegato}/>
                            </Form.Group>
                            
                        </Form.Row>

                    </div>
                    </Card.Body>
                    </Card>
                    
                </div>
            </div>
        })

        return(
            <div>
                    <div>
                        
                        <div className="container was-validated col-sm-8 mt-3 p-3  ">

                            <div className="form-group" >


                                <h1 style={{ textAlign: "center", margin: "auto"}}> Gestione Impiegati</h1>

                                <br/><br/>

                                <div style={{display: 'flex', justifyContent: 'center', margin: "20px"}}>
                                <a href="#"> <PopUpAggiungiImpiegato /> </a>
                                <a href="#"> <PopUpRimuoviImpiegato /> </a>
                                </div>

                                <div className="justify-content-center" style={{ width: "100%", borderRadius: "20px", marginTop: "20px" }}>
                                    <div>
                                        <Row className="justify-content-center">
                                            <div style={{ width: "200px", borderRadius: "20px", marginTop: "30px" }}>
                                               
                                            </div>

                                            <br />
                                            
                                            <div grid="center">
                                                {/* <Col md="auto" > <div style={{ background: "white" }}> <JsonToTable json={this.state.object} className="col-md-6 col-md-offset-3" /> </div></Col> */}
                                            {impiegati}
                                            </div>
                                        </Row>
                                    </div>
                                </div>

                                <br />
                                </div >
                                </div>

                            </div>
                </div>
        )
    }
}