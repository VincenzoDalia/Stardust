import React, {Component} from 'react';
import { Card, Button} from 'react-bootstrap';
import auto1 from "./assets/auto1.png";
import moto1 from "./assets/moto1.png";
import bici1 from "./assets/bici1.png";
import monopattino1 from "./assets/monopattino1.png";
import Form from "react-bootstrap/Form";
import {Col} from "react-bootstrap";

export class Home extends Component{

    

    render(){

        

        return(
            
            
            <div className="container text-center justify-content-center">
                <h1>Cos'è Stardust?</h1>

                <br/><br/>

                <Card body style={{alignItems:"center", backgroundColor:'#eeeeee'}}> <br/><strong>Stardust</strong> è un servizio di sharing,
                    intelligente, economico e rispettoso dell’ambiente.<br/>
                    Con pochi e semplici passaggi potrai prenotare il mezzo più adatto alle tue esigenze 
                    scegliendo tra un'ampia gamma di veicoli: <br/>Auto, Bici, Monopattini e Moto.
                    <br/> <br/>
                </Card>
                <br/><br/><br/>

                <Form>
                    <Form.Row style={{alignItems:"flex-end"}}>
                        <Form.Group as={Col} style={{height:"auto"}}>

                        <Card style={{height:"auto", alignItems:"center", backgroundColor:'#eeeeee'}}><br/>
                            <Card.Img  variant="top" src={auto1} style={{ width:'60%', height:'60%', marginLeft:'10px'}}/> 
                            <Card.Body>
                                <Card.Title>Automobili</Card.Title>
                                <Card.Text>
                                Le migliori auto per muoversi in città, semplici e convenienti da prenotare!
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        </Form.Group>

                        <Form.Group as={Col}>

                             <Card style={{alignItems:"center", backgroundColor:'#eeeeee'}}><br/>
                            <Card.Img  variant="top" src={moto1} style={{ width:'60%', height:'40%', marginLeft:'10px', backgroundColor:'#eeeeee'}}/>
                            <Card.Body>
                                <Card.Title>Moto</Card.Title>
                                <Card.Text>
                                Usa le nostre moto per spostarti velocemente <br/>in mezzo al traffico urbano!
                                </Card.Text>
                            </Card.Body>
                            </Card>

                        </Form.Group>

                    </Form.Row>

                    <Form.Row style={{alignItems:"flex-end"}}>
                        <Form.Group as={Col}>

                        <Card style={{alignItems:"center", backgroundColor:'#eeeeee'}}>
                            <Card.Img  variant="top" src={bici1} style={{ width:'60%', height:'40%', marginLeft:'10px'}}/>
                            <Card.Body>
                                <Card.Title>Biciclette</Card.Title>
                                <Card.Text>
                                Noleggia le nostre bici per un rilassante giro al parco o per una pedalata!
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        </Form.Group>

                        <Form.Group as={Col}>
                            
                        <Card style={{alignItems:"center", backgroundColor:'#eeeeee'}}><br/>
                            <Card.Img  variant="top" src={monopattino1} style={{ width:'60%', height:'40%', marginLeft:'10px'}}/>
                            <Card.Body>
                                <Card.Title>Monopattini</Card.Title>
                                <Card.Text>
                                    Il meglio dei monopattini elettrici, per spostarsi velocemente e con agilità!<br/><br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Form.Group>
                        
                    </Form.Row>


                </Form>


                <br/><br/>
                <p> <strong>Accedi e Prenota!</strong></p>
                <Button variant="outline-secondary" href="/LoginCliente"><strong>Login</strong></Button>

                <br/><br/><br/><br/>

        
            </div>
        )
     }
    
}
