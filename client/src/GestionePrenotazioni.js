import React, { Component } from "react";
import axios from "axios";
import { Button, Col, Row, Card, ListGroup, Form, Table} from "react-bootstrap";


export default class GestionePrenotazioni extends React.Component{

    state = {
        object: [],
        id_client:"",
        code_prenotation:"",
        on:true
    }





    cercaPrenotazioni(){

        axios.post("http://localhost:3000/Admin/EliminaPrenotazione_get", this.state)
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


    eliminaPrenotazione(){

        axios.post("http://localhost:3000/Admin/EliminaPrenotazione_del", this.state)
            .then(result => {
                
                alert("Prenotazione eliminata!")
                

                document.location.href = '/GestionePrenotazioni'
            })
            .catch(err => {
                if(err.response.status==404){
                    alert("Non esiste una prenotazione con questo ID")
                
                }else{
                    console.log("Errore: " + err);
                    alert("Qualcosa è andato storto: " + err)
                }
            })

    }

    render(){

        let prenotazioni;
        //////////


            prenotazioni = (
            
                <div >
                    <Table responsive="md" striped bordered hover>
                                <thead>
                                    <tr>
                                        
                                        <th>Codice Prenotazione</th>
                                        <th>ID Cliente</th>
                                        <th>Data Inzio<br/>(A/M/G)</th>
                                        <th>Data Fine<br/>(A/M/G)</th>
                                        <th>Tipo Prenotazione</th>
                                        <th>Prezzo</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                                {
                                                    this.state.object.map((item) => (
                                                        <tr>
                                                            <td>{item.code_prenotation}</td>
                                                            <td>{item.ref_client}</td>
                                                            <td>{item.start_date.slice(0,10)} <br/> {item.start_date.slice(11,19)}</td>
                                                            <td>{item.end_date.slice(0,10)} <br/> {item.end_date.slice(11,19)}</td>
                                                            <td>{item.primary_opt}</td>
                                                            <td>{item.price} €</td>
                                                            
                                                            
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                            </Table>
                </div>
            )

        

        
        //////////
        return(
            <div>
                    <div>
                        
                        <div className="container was-validated col-sm-8 mt-3 p-3  ">

                            <div className="form-group" >


                                <h1 style={{ textAlign: "center", margin: "auto"}}> Gestione Prenotazioni</h1>

                                <br/><br/>

                                <h5>Inserisci ID del cliente del quale vuoi cercare le prenotazioni</h5>

                                <br/><br/>
                                
                                <Form >
                                    <Form.Row >
                                        <Form.Group as={Col} >

                                            <Form.Label>ID cliente</Form.Label>

                                            <Form.Control
                                                autoFocus
                                                type="text"
                                                maxlength="5"
                                                onChange={changeEvent => {
                                                    this.setState({
                                                        ...this.state,
                                                        id_client: changeEvent.target.value
                                                    })
                                                }}required
                                                placeholder="12345"
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} style={{alignSelf:"flex-end", marginLeft:"25px"}} >
                                            <Button type="submit"
                                                disabled={this.state.id_client===""} 
                                                onClick={
                                                    clickEvent => {
                                                        clickEvent.preventDefault();
                                                        this.cercaPrenotazioni()
                                                    }
                                                }>
                                                Cerca
                                            </Button>
                                        </Form.Group>

                                        
                                    </Form.Row>

                                </Form>

                                <br/> <br/> <br/>

                                {prenotazioni}

                                <br/> <br/> <br/>


                                <Form >
                                    <Form.Row >
                                        <Form.Group as={Col} >

                                            <Form.Label>Codice Prenotazione</Form.Label>

                                            <Form.Control
                                                autoFocus
                                                type="text"
                                                maxlength="5"
                                                onChange={changeEvent => {
                                                    this.setState({
                                                        ...this.state,
                                                        code_prenotation: changeEvent.target.value
                                                    })
                                                }}required
                                                placeholder="12345"
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} style={{alignSelf:"flex-end", marginLeft:"25px"}} >
                                            <Button type="submit"
                                                variant="danger"
                                                disabled={this.state.code_prenotation==="" || this.state.object.length==0} 
                                                onClick={
                                                    clickEvent => {
                                                        clickEvent.preventDefault();
                                                        this.eliminaPrenotazione()
                                                    }
                                                }>
                                                Elimina
                                            </Button>
                                        </Form.Group>

                                        
                                    </Form.Row>

                                </Form>

                                

                                <br />

                            </div >

                        </div>

                    </div>
            </div>
        )
    }
}