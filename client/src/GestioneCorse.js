import React, { Component } from "react";
import axios from "axios";
import { Button, Col, Row, Card, ListGroup, Form, Table} from "react-bootstrap";


export default class GestioneCorse extends React.Component{

    state = {
        object: [],
        id_client:"",
        id_ride:""
    }





    cercaCorse(){

        axios.post("http://localhost:3000/Admin/TerminaCorsa_get", this.state)
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

    eliminaCorse(){

        axios.post("http://localhost:3000/Admin/TerminaCorsa_del", this.state)
            .then(result => {
                
                alert("Corsa eliminata!")
                document.location.href = '/GestioneCorse'
            })
            .catch(err => {

                if(err.response.status==404){
                    alert("Non esiste una corsa con questo ID.")
                
                }else{
                    console.log("Errore: " + err);
                    alert("Qualcosa è andato storto: " + err)
                }
    
            })

    }

    render(){

        let corse;
        //////////

        corse = (
            
                <div>
                    <Table responsive="md" striped bordered hover>
                                <thead>
                                    <tr>
                                            
                                        <th>Codice Corsa</th>
                                        <th>Codice Prenotazione</th>
                                        <th>ID Cliente</th>
                                        <th>Autista</th>
                                        <th>Prezzo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                                {
                                                    this.state.object.map((item) => (
                                                        <tr>
                                                            <td>{item.id_ride}</td>
                                                            <td>{item.ref_pren}</td>
                                                            <td>{item.ref_client}</td>
                                                            <td>{item.ref_driver}</td>
                                                            <td>{item.price}€</td>
                                                            
                                                            
                                                            
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


                                <h1 style={{ textAlign: "center", margin: "auto"}}> Gestione corse</h1>

                                <br/><br/>

                                <h5>Inserisci ID del cliente del quale vuoi cercare le corse</h5>

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
                                                        this.cercaCorse()
                                                    }
                                                }>
                                                Cerca
                                            </Button>
                                        </Form.Group>

                                        
                                    </Form.Row>

                                </Form>

                                <br/> <br/> <br/>

                                {corse}
                                <br/><br/><br/>

                                <Form >
                                    <Form.Row >
                                        <Form.Group as={Col} >

                                            <Form.Label>Codice Corsa</Form.Label>

                                            <Form.Control
                                                autoFocus
                                                type="text"
                                                maxlength="5"
                                                onChange={changeEvent => {
                                                    this.setState({
                                                        ...this.state,
                                                        id_ride: changeEvent.target.value
                                                    })
                                                }}required
                                                placeholder="12345"
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} style={{alignSelf:"flex-end", marginLeft:"25px"}} >
                                            <Button type="submit"
                                                variant="danger"
                                                disabled={this.state.id_ride==="" || this.state.object.length==0} 
                                                onClick={
                                                    clickEvent => {
                                                        clickEvent.preventDefault();
                                                        this.eliminaCorse()
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