//si accede a questa pagina a partire da Prenota

import React, { Component} from "react";
import axios from "axios"; 
import { Button, Card } from "react-bootstrap";
import  Cookie  from "universal-cookie";
import { Link } from "react-router-dom";


export default class Disponibili extends Component{

    state={
        object: [],

        id_client: this.props.location.state.id_client,
        email: this.props.location.state.email,

        oraInizio: this.props.location.state.oraInizio,
        oraFine: this.props.location.state.oraFine,
        dataInizio: this.props.location.state.dataInizio,
        dataFine: this.props.location.state.dataFine,
        opzione: this.props.location.state.opzione,
        indirizzoArrivo: this.props.location.state.indirizzoArrivo,
        indirizzoPartenza: this.props.location.state.indirizzoPartenza,
        
        start_date: this.props.location.state.dataInizio + " " + this.props.location.state.oraInizio,
        end_date: this.props.location.state.dataFine + " " + this.props.location.state.oraFine,

        ////////////////////////////////////////////////////////////
        modifica: this.props.location.state.modifica,
        code_prenotation: this.props.location.state.code_prenotation,   //  Servono solo per il caso di modifica prenotazione
        complete: this.props.location.state.complete
        ////////////////////////////////////////////////////////////

        
    }


    componentDidMount(){
        if(this.state.opzione==="mezzo"){

            axios.post("http://localhost:3000/Client/AggiungiPrenotazione_vehicles", this.state).
            then(result => {
                
                    alert('Seleziona il tuo veicolo');
                    this.setState({
                        ...this.state,
                        object: result.data
                    })
                
            }).catch(error => {
                console.log(error);
                alert('Si è verificato un errore imprevisto:' + error);
           
                if(error.response.status==404){
                    alert("Siamo spiacenti, ma non ci sono mezzi disponibili per le date da te selezionate.\nVerrai reindirizzato alla pagina di prenotazione.");
                    document.location.href = '/Prenota';
                }
            })

            }else if(this.state.opzione==="autista"){

                axios.post("http://localhost:3000/Client/AggiungiPrenotazione_drivers", this.state).
                then(result => {
                    
                        alert('Seleziona il tuo autista');
                        this.setState({
                            ...this.state,
                            object: result.data
                        })

                        
                    
                }).catch(error => {
                    console.log(error);
                    alert('Si è verificato un errore imprevisto:' + error);
                    
                    if(error.response.status==404){
                        alert("Siamo spiacenti, ma non ci sono autisti disponibili per le date da te selezionate.\nVerrai reindirizzato alla pagina di prenotazione.");
                        document.location.href = '/Prenota';
                    }
                }) 
            }

    }



    render(){
            
        let mezzi; 
        let autisti;

        if(this.state.opzione==='mezzo'){
            mezzi =this.state.object.map(mezzo=>{
                return <div>
                    <div align="center" style={{margin:"15px"}}>
                        <Card style={{width: '60%', alignItems:"center"}}>
                        <Card.Img style={{width:"60%", height:"60%", borderRadius:"6px", boxShadow:"2px 2px 2px 2px grey"}} variant="top" src={mezzo.image} />
                        <Card.Body>
                        <Card.Title>{mezzo.type} - {mezzo.model}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Prezzo: {mezzo.price} €/30min </Card.Subtitle>
                        <Card.Text>
                         
                        {mezzo.description}
                        <br/><br/>
                        Si trova in: {mezzo.ref_stallo}
                        <br/>
                        Targa: {mezzo.id_vehicle}
                        </Card.Text>
                        <Link 
                            to={{
                                pathname: '/Pagamento',
                                state:{
                                    type: mezzo.type,
                                    model: mezzo.model,
                                    ref_vehicle: mezzo.id_vehicle,
                                    oraInizio:this.state.oraInizio,
                                    oraFine: this.state.oraFine,
                                    dataInizio: this.state.dataInizio,
                                    dataFine: this.state.dataFine,
                                    opzione: this.state.opzione,
                                    indirizzoArrivo: this.state.indirizzoArrivo,
                                    indirizzoPartenza: mezzo.ref_stallo,
                                    id_client: this.state.id_client,
                                    email: this.state.email,


                                    modifica: this.state.modifica,
                                    code_prenotation: this.state.code_prenotation,
                                    complete: this.state.complete

                                }
                            }}
                            >
                                <Button>
                                Prenota
                                </Button>
                                
                        </Link>
                        </Card.Body>
                        </Card>
                        
                    </div>
                </div>
            })
             autisti = <div></div>
        }else{
            autisti =this.state.object.map(autista=>{
                return <div>
                    <div align="center" style={{margin:"15px"}}>
                        <Card style={{ width: '60%', alignItems:"center"}}>
                        <Card.Body>
                        <Card.Title>{autista.name} {autista.surname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Prezzo: 10 €/30min </Card.Subtitle>
                        <Card.Text>
                            Contatto: 
                            {autista.cellphone_number}
                            <br/>
                            ID Autista:
                            {autista.id_impiegato}
                        </Card.Text>
                        <Link 
                            to={{
                                pathname: '/Pagamento',
                                state:{
                                    
                                    autistaName: autista.name,
                                    autistaSurname: autista.surname,
                                    autistaCellphone_number: autista.cellphone_number,
                                    ref_driver: autista.id_impiegato,

                                    oraInizio:this.state.oraInizio,
                                    oraFine: this.state.oraFine,
                                    dataInizio: this.state.dataInizio,
                                    dataFine: this.state.dataFine,
                                    opzione: this.state.opzione,
                                    indirizzoArrivo: this.state.indirizzoArrivo,
                                    indirizzoPartenza: this.state.indirizzoPartenza,
                                    id_client: this.state.id_client,
                                    email: this.state.email,


                                    modifica: this.state.modifica,
                                    code_prenotation: this.state.code_prenotation,
                                    complete: this.state.complete

                                }
                            }}
                            >
                                <Button>
                                Prenota
                                </Button>
                                
                        </Link>
                        </Card.Body>
                        </Card>
                        
                    </div>
                </div>
            })
            mezzi=<div></div>
        }
            
        
    

    return(

            <div grid="center">

                {/* <div grid="center">
                    <Col md="auto" > <div style={{ background: "white" }}> <JsonToTable json={this.state.object} className="col-md-6 col-md-offset-3" /> </div></Col>
                </div>  */}

                <div align="center">
                    <div style={{justifyContent:"space-between"}}>
                        {mezzi}
                        {autisti}
                        <br/>
                    </div>
                </div>
                <br/><br/>
            </div>

        

            
        );
    }
}