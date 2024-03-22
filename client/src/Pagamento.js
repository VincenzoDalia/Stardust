import React from "react";
import axios from "axios";
import {Form, FormGroup, Table} from "react-bootstrap";
import { DatePicker, DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {Button, Col} from "react-bootstrap"; 
import Cookie from "universal-cookie";
import 'react-datepicker/dist/react-datepicker.css';
import './datapicker.css';


export default class Pagamento extends React.Component{

    state={
        object: [],

        code_cdc:"",
        cvv2:"",
        expiration_date:"",
        name:"",
        surname:"",

        code_prenotation:"",
        price:0,
        prezzo_con_mancia:0,

        showPagamento:false,

        

        id_client: this.props.location.state.id_client,
        email: this.props.location.state.email,

        oraInizio: this.props.location.state.ora_Inizio,
        oraFine: this.props.location.state.oraFine,
        dataInizio: this.props.location.state.dataInizio,
        dataFine: this.props.location.state.dataFine,
        primary_opt: this.props.location.state.opzione,
        start_address: this.props.location.state.indirizzoPartenza,
        end_address: this.props.location.state.indirizzoArrivo,
        

        ref_vehicle: this.props.location.state.ref_vehicle,
        model: this.props.location.state.model,
        vehicle_type: this.props.location.state.type,

        ref_driver: this.props.location.state.ref_driver,
        autistaName: this.props.location.state.autistaName,
        autistaSurname: this.props.location.state.autistaSurname,
        autistaCellphone_number: this.props.location.state.autistaCellphone_number,

        start_date: this.props.location.state.dataInizio + " " + this.props.location.state.oraInizio,
        end_date: this.props.location.state.dataFine + " " + this.props.location.state.oraFine,


        ////////////////////////////////////////////////////////////
        modifica: this.props.location.state.modifica,
        code_prenotation: this.props.location.state.code_prenotation,   //  Servono solo per il caso di modifica prenotazione
        complete: this.props.location.state.complete
        ////////////////////////////////////////////////////////////

    }



    componentDidMount(){

        axios.post("http://localhost:3000/Client/Pagamento_get_data", this.state).
                then(result => {
                    
                        this.setState({
                            ...this.state,
                            code_cdc: result.data.code_cdc.toString(),
                            cvv2: result.data.cvv2,
                            expiration_date: result.data.expiration_date,
                            name: result.data.name,
                            surname: result.data.surname
                        })
                    
                }).catch(error => {
                    
                    alert('Si è verificato un errore imprevisto:' + error);
                })

        if(this.state.primary_opt=="mezzo"){
            
            axios.post("http://localhost:3000/Client/Pagamento_get_price", this.state)
            
            .then(result => {

                    this.setState({
                        ...this.state,
                        price: result.data.price
                    })
                
            }).catch(error => {
                
                alert('Si è verificato un errore imprevisto:' + error);
            })
        
        }else{

            var prezzo_standard=10;
            const start = new Date(this.state.start_date);
            const end = new Date(this.state.end_date);


            const prezzo = prezzo_standard*Math.round(((end-start)/1800000))

            this.setState({
                ...this.state,
                price: prezzo,
                prezzo_con_mancia: prezzo + 5
            })
        }

    }



    render(){

        const cookie = new Cookie();
        const now = new Date();


        if(this.state.showPagamento==false){

            if(this.state.primary_opt=="mezzo"){
            
                return(
                    <div>
                        <h3>Riepilogo prenotazione</h3> <br/>

                        <Table responsive="md" striped bordered hover>
                            <thead>
                                <tr>
                                    
                                    <th>Nome</th>
                                    <th>Cognome</th>
                                    <th>Data Inzio<br/>(M/G/A)</th>
                                    <th>Partenza</th>
                                    <th>Data Fine<br/>(M/G/A)</th>
                                    <th>Arrivo</th>
                                    <th>Veicolo</th>
                                    <th>Prezzo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    
                                    <td>{this.state.name}</td>
                                    <td>{this.state.surname}</td>
                                    <td>{this.state.dataInizio}</td>
                                    <td>{this.state.start_address}</td>
                                    <td>{this.state.dataFine}</td>
                                    <td>{this.state.end_address}</td>
                                    <td>{this.state.vehicle_type} {this.state.model}</td>
                                    <td>{this.state.price}€</td>
                                </tr>
                            </tbody>
                        </Table>
                        
                        <br/><br/>

                        <Button
                            onClick={
                                clickEvent => {
                                    clickEvent.preventDefault();
                                    
                                    this.setState({
                                        ...this.state,
                                        showPagamento:true
                                    })
                                }
                            }>
                            Procedi con il Pagamento
                        </Button>

                        <br/><br/><br/>
                    </div>
                );
            
            }else{


                return(
                    <div>
                        <h3>Riepilogo prenotazione</h3> <br/>
                        <Table responsive="md" striped bordered hover>
                            <thead>
                                <tr>
                                    
                                    <th>Nome</th>
                                    <th>Cognome</th>
                                    <th>Data Inzio<br/>(M/G/A)</th>
                                    <th>Partenza</th>
                                    <th>Data Fine<br/>(M/G/A)</th>
                                    <th>Arrivo</th>
                                    <th>Autista</th>
                                    <th>Contatto</th>
                                    <th>Prezzo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    
                                    <td>{this.state.name}</td>
                                    <td>{this.state.surname}</td>
                                    <td>{this.state.start_date}</td>
                                    <td>{this.state.start_address}</td>
                                    <td>{this.state.end_date}</td>
                                    <td>{this.state.end_address}</td>
                                    <td>{this.state.autistaName} {this.state.autistaSurname}</td>
                                    <td>{this.state.autistaCellphone_number}</td>
                                    <td>{this.state.price}€</td>
                                </tr>
                            </tbody>
                        </Table>
                        
                        <br/><br/>

                        <Form.Group align="center">
                            <Form.Label >Lascia 5€ di mancia all'autista</Form.Label>
                            <Form.Control
                            type="checkbox"
                            onChange={changeEvent => {

                                if(this.state.price != this.state.prezzo_con_mancia){
                                    
                                    this.setState({
                                        
                                        ...this.state,
                                        price: this.state.price + 5

                                    })
                                }else{

                                    this.setState({
                                        
                                        ...this.state,
                                        price: this.state.price -5

                                    })

                                }
                            

                            }}
                            />
                        </Form.Group>


                        <Form.Group align="center">
                            <Button
                                onClick={
                                    clickEvent => {
                                        clickEvent.preventDefault();
                                        
                                        this.setState({
                                            ...this.state,
                                            showPagamento:true
                                        })
                                    }
                                }>
                                Procedi con il Pagamento
                            </Button>
                        </Form.Group>

                        <br/><br/><br/>
                    </div>
                );



            }
        
        
        }else{

            if(this.state.primary_opt=="mezzo"){
                return(

                    
                    
                    <div>


                            <div align="center">
                        <h3>Completa pagamento</h3>

                        

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Nome Intestatario</Form.Label>
                                    <Form.Control
                                    type="text"
                                    value={this.state.name}
                                    maxlength="40"
                                    onChange={ changeEvent => {
                                        this.setState({
                                        ...this.state,
                                            name: changeEvent.target.value
                                        })
                                    }} required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Cognome Intestatario</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.surname}
                                    maxlength="40"
                                    onChange={changeEvent => {
                                        this.setState({
                                            ...this.state,
                                            surname: changeEvent.target.value
                                        })
                                    }}required
                                />                        
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridNumberCreditCard">
                                <Form.Label>Numero carta di credito</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.code_cdc}
                                    maxlength="16"
                                    onChange={changeEvent => {
                                        this.setState({
                                            ...this.state,
                                            code_cdc: changeEvent.target.value
                                        })
                                    }}required
                                />                        
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridNumberCreditCard">
                                <Form.Label>Data di scadenza</Form.Label>

                                <DatePickerComponent
                                        onChange={changeEvent => {
                                                
                                                    this.setState({
                                                        ...this.state,
                                                        expiration_date: changeEvent.target.value.toLocaleDateString("en-US"),
                                                    })

                                                
                                                

                                            
                                            
                                        }}
                                        value={this.state.expiration_date}
                                        selected={this.state.expiration_date}
                                        format="dd MM yy"
                                        required
                                        min={now}
                                        placeholder="inserisci data scadenza"
                                        >
                                    
                                    </DatePickerComponent>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridNumberCreditCard">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxlength="3"
                                    value={this.state.cvv2}
                                    onChange={changeEvent => {
                                        this.setState({
                                            ...this.state,
                                            cvv2: changeEvent.target.value
                                        })
                                    }}required
                                />                        
                            </Form.Group>
                            
                        </Form.Row>

                        <br/>

                        <Button variant="primary" type="submit"
                            onClick= {
                                clickEvent => {

                                    if(this.state.modifica==true){

                                        //   1) Effettuo un rimborso per prenotazione precedente
                                        //   2) Aggiorno la prenotazione
                                        //   3) Faccio partire il pagamento relativo alla nuova prenotazione

                                        axios.post("http://localhost:3000/Client/EliminaPrenotazione_refund", this.state)
                                        .then(result => {
                                            alert("Abbiamo avviato la procedura per effettuare il rimborso per la tua precedente prenotazione, riceverai una mail di conferma.")
                                            
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            alert('Si è verificato un errore imprevisto:' + error);
                                        })


                                        axios.post("http://localhost:3000/Client/ModificaPrenotazione", this.state).
                                        then(result => {

                                            alert("Prenotazione aggiornata");
                                        
                                        }).catch(error => {
                                            
                                            alert('Si è verificato un errore imprevisto:' + error);
                                        })

                                        axios.post("http://localhost:3000/Client/EliminaPrenotazione_refund_up", this.state).
                                            then(result => {
                                                
                                                
                                                alert("Pagamento effettuato con successo!")
                                                document.location.href = '/leMiePrenotazioni';
                                                
                                            }).catch(error => {
                                                
                                                alert('Si è verificato un errore imprevisto:' + error);
                                            })




                                    }else{
                                    
                                        axios.post("http://localhost:3000/Client/AggiungiPrenotazione_add", this.state).
                                        then(result => {

                                            this.setState({
                                                ...this.state,
                                                code_prenotation: result.data.code_prenotation
                                            })

                                            alert("Prenotazione completata");
                                            

                                            axios.post("http://localhost:3000/Client/Pagamento_pay", this.state).
                                            then(result => {
                                                
                                                
                                                alert("Pagamento effettuato con successo!")
                                                document.location.href = '/Home';
                                                
                                            }).catch(error => {
                                                
                                                alert('Si è verificato un errore imprevisto:' + error);
                                            })
                                            
                                                
                                            
                                        }).catch(error => {
                                            
                                            alert('Si è verificato un errore imprevisto:' + error);
                                        })

                                    }

                                }
                            }
                        
                        >Effettua pagamento</Button>
                        <br/>
                        <br/>
                    </div>
                    </div>
                    
                    );
            
            }else{

                return(
                    <div>


                                <div align="center">
                            <h3>Completa pagamento</h3>

                            

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Nome Intestatario</Form.Label>
                                        <Form.Control
                                        type="text"
                                        value={this.state.name}
                                        maxlength="40"
                                        onChange={ changeEvent => {
                                            this.setState({
                                            ...this.state,
                                                name: changeEvent.target.value
                                            })
                                        }} required
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridSurname">
                                    <Form.Label>Cognome Intestatario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.surname}
                                        maxlength="40"
                                        onChange={changeEvent => {
                                            this.setState({
                                                ...this.state,
                                                surname: changeEvent.target.value
                                            })
                                        }}required
                                    />                        
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridNumberCreditCard">
                                    <Form.Label>Numero carta di credito</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.code_cdc}
                                        maxlength="16"
                                        onChange={changeEvent => {
                                            this.setState({
                                                ...this.state,
                                                code_cdc: changeEvent.target.value
                                            })
                                        }}required
                                    />                        
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridNumberCreditCard">
                                    <Form.Label>Data di scadenza</Form.Label>
                                    <DatePickerComponent
                                            onChange={changeEvent => {
                                                    
                                                        this.setState({
                                                            ...this.state,
                                                            expiration_date: changeEvent.target.value.toLocaleDateString("en-US"),
                                                        })

                                                    
                                                 

                                                
                                                
                                            }}
                                            value={this.state.expiration_date}
                                            selected={this.state.expiration_date}
                                            format="dd MM yy"
                                            required
                                            min={now}
                                            placeholder="inserisci data scadenza"
                                            >
                                        
                                        </DatePickerComponent>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridNumberCreditCard">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control
                                        type="text"
                                        maxlength="3"
                                        value={this.state.cvv2}
                                        onChange={changeEvent => {
                                            this.setState({
                                                ...this.state,
                                                cvv2: changeEvent.target.value
                                            })
                                        }}required
                                    />                        
                                </Form.Group>
                                
                            </Form.Row>

                            <br/>

                            <Button variant="primary" type="submit"
                                onClick= {
                                    clickEvent => {


                                        if(this.state.modifica==true){

                                            //   1) Effettuo un rimborso per prenotazione precedente
                                            //   2) Aggiorno la prenotazione
                                            //   3) Faccio partire il pagamento relativo alla nuova prenotazione
    
                                            axios.post("http://localhost:3000/Client/EliminaPrenotazione_refund", this.state)
                                            .then(result => {
                                                alert("Abbiamo avviato la procedura per effettuare il rimborso per la tua precedente prenotazione, riceverai una mail di conferma.")
                                                
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                alert('Si è verificato un errore imprevisto:' + error);
                                            })
    
                                            axios.post("http://localhost:3000/Client/ModificaPrenotazione", this.state).
                                            then(result => {
    
                                                alert("Prenotazione aggiornata");       
                                                
                                            }).catch(error => {
                                                
                                                alert('Si è verificato un errore imprevisto:' + error);
                                            })

                                            axios.post("http://localhost:3000/Client/EliminaPrenotazione_refund_up", this.state).
                                            then(result => {
                                                
                                                
                                                alert("Pagamento effettuato con successo!")
                                                document.location.href = '/leMiePrenotazioni';
                                                
                                            }).catch(error => {
                                                
                                                alert('Si è verificato un errore imprevisto:' + error);
                                            })
    
    
    
    
                                        }else{

                                            axios.post("http://localhost:3000/Client/AggiungiPrenotazione_add_div", this.state).
                                            then(result => {

                                                this.setState({
                                                    ...this.state,
                                                    code_prenotation: result.data.code_prenotation
                                                })
                                                
                                                alert("Prenotazione completata");

                                                axios.post("http://localhost:3000/Client/Pagamento_pay", this.state).
                                                then(result => {
                                                    
                                                    
                                                    alert("Pagamento effettuato con successo!");

                                                    document.location.href = '/Home';
                                                    
                                                }).catch(error => {
                                                    
                                                    alert('Si è verificato un errore imprevisto:' + error);
                                                })
                                                
                                                    
                                                
                                            }).catch(error => {
                                                
                                                alert('Si è verificato un errore imprevisto:' + error);
                                            })
                                        }
                                    }
                                }
                            
                            >Effettua pagamento</Button>
                            <br/>
                            <br/>
                        </div>
                        </div>
                        
                        );

            }
        }


        }
        


}