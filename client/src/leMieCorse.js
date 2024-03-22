import React, {Component} from "react";
import { Button} from 'react-bootstrap';
import axios from "axios"; 
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookie from "universal-cookie";
import { object } from "prop-types";

export default class LeMieCorse extends Component{

    state={
        object:[],

        id_client:"",
        email:"",
        id_ride:"",
    }


    componentWillMount(){
        const cookie = new Cookie();
        this.setState({
            ...this.state.id_client=cookie.get("cookieUserid"),
            ...this.state.email=cookie.get("cookieEmail")
        })
        axios.post("http://localhost:3000/Client/TerminaCorsa_get", this.state).
            then(result => {
                
                    this.setState({
                        ...this.state,
                        object: result.data,
                    })
                
            }).catch(error => {
                console.log(error);
                alert('Si è verificato un errore imprevisto:' + error);
            })
    }

    render(){
        let corse;

        corse =this.state.object.map(corsa=>{
            if(corsa.ref_driver!== null){
               

                return <div>
                <div align="center" style={{margin:"15px"}}>
                    <Card border="dark" style={{width: '80%', alignItems:"center", backgroundColor:"#e3e3e3"}}>
                    <Card.Body>
                    <Card.Title>Codice corsa: {corsa.id_ride}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Codice prenotazione: {corsa.ref_pren} </Card.Subtitle>
                    <Card.Text>
                        Prezzo della corsa: {corsa.price} €<br/>
                        Codice Autista: {corsa.ref_driver} <br/>

                        
                            

                            <Button variant="dark" style={{margin:"10px"}}
                                onClick={
                                    clickEvent =>{              
                                        const oggetto={
                                            id_ride:corsa.id_ride
                                        }
                                        axios.post("http://localhost:3000/Client/TerminaCorsa_del", oggetto).
                                        then(result => {
                                            alert("Corsa terminata con successo, grazie per aver scelto Stardust!")
                                            document.location.href = '/Home';
                                        }).catch(error => {
                                            console.log(error);
                                            alert('Si è verificato un errore imprevisto:' + error);
                                        })

                                    }
                                }
                            >Termina Corsa
                            </Button>
                         
                       
                    </Card.Text>
                    </Card.Body>
                    </Card>
                    
                </div>
            </div>

            }else{
                return <div>
                <div align="center" style={{margin:"15px"}}>
                    <Card border="dark" style={{width: '80%', alignItems:"center", backgroundColor:"#e3e3e3"}}>
                    <Card.Body>
                    <Card.Title>Codice corsa: {corsa.id_ride}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Codice prenotazione: {corsa.ref_pren} </Card.Subtitle>
                    <Card.Text>
                        Prezzo della corsa: {corsa.price} €<br/><br/>

                        

                        
                            <Link 
                                style={{color:"white"}}
                                to ={{
                                    pathname:"/SegnalaRitardo",

                                    state:{
                                        code_prenotation: corsa.ref_pren,
                                        id_ride: corsa.id_ride
                                    }
                                }}
                            > 
                                <Button variant="danger" style={{margin:"10px"}}>
                                    Segnala Ritardo
                                </Button>
                            </Link>
                         

                         

                            <Link 
                                style={{color:"white"}}
                                to ={{
                                    pathname:"/SegnalaGuastoIncidente",

                                    state:{
                                        code_prenotation: corsa.ref_pren,
                                    }
                                }}
                            >  
                                <Button variant="danger">
                                    Segnala Guasto o Incidente
                                </Button>
                            </Link>
                         

                         <Button variant="dark" style={{margin:"10px"}}
                            onClick={
                                clickEvent =>{              
                                    const oggetto={
                                        id_ride:corsa.id_ride
                                    }
                                    axios.post("http://localhost:3000/Client/TerminaCorsa_del", oggetto).
                                    then(result => {
                                        alert("Corsa terminata con successo, grazie per aver scelto Stardust!")
                                        document.location.href = '/Home';
                                    }).catch(error => {
                                        console.log(error);
                                        alert('Si è verificato un errore imprevisto:' + error);
                                    })

                                }
                            }
                         >Termina Corsa</Button>
                         
                       
                    </Card.Text>
                    </Card.Body>
                    </Card>
                    
                </div>
            </div>
            }
            
        })
        return(
            
            <div align="center">
                <h1>Le Mie Corse</h1> <br/>
                {corse}

            </div>
        );
    }
}