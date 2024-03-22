import axios from "axios";
import React from "react";
import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap"; 


export default class FormRimuoviImpiegato extends React.Component {

    state = {
        id_impiegati:""
    }

    render() {
        return (
            <div style={{ padding: "10px" }}>

                <div style={{ textAlign: "center" }}>
                    <h5>Inserisci il codice ID univoco dell'impiegato che vuoi rimuovere. </h5>
                </div>

                <div className="form-group">
                    <Form>
                    <Form.Group as={Col} controlId="formGridID">
                            <Form.Label>ID Impiegato</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                maxlength="40"
                                onChange={ changeEvent => {
                                    this.setState({
                                    ...this.state,
                                        id_impiegati: changeEvent.target.value
                                    })
                                }} required
                            />
                        </Form.Group>
                    </Form>
                    <br />
                    <p align="center">
                    <button type="submit" className="btn btn-danger"
                        onClick={clickEvent => {

                            axios.post("http://localhost:3000/Admin/EliminaImpiegati_del", this.state)
                                .then(result => {

                                    
                                        alert('Impiegato Rimosso!');
                                        document.location.href = '/GestioneImpiegati'
                                    
                                })
                                .catch(error => {
                                    alert("Errore nella rimozione dell'impiegato: " + error)
                                })


                        }}>Rimuovi</button>
                    </p>

                </div>
            </div >
        );
    }
}
