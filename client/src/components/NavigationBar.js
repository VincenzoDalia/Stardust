import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

//import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Cookie from "universal-cookie";

const Styles = styled.div`

    .navbar{
        background-color: #222;
    }

    .navbar-brand, .navbar-nav, .nav-link{
        color: #ccc;

        &:hover{
            color: white;
        }
    }
`;

export class NavigationBar extends Component  {

    logout(){

 
        const cookies = new Cookie();
        cookies.remove("cookieRole");
        cookies.remove("cookieEmail");
        cookies.remove("cookieUserid");
        document.location.href = '/Home.js'
    }


    render(){

        const cookies = new Cookie();
        const isAuthenticated = cookies.get("cookieRole");
    
              //NAVBAR PER VISITATORI
            return(

                <div>
                {!isAuthenticated ? 

                <>
                <Styles>
                <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">STARDUST</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
 

                    <Nav className="mr-auto">
                        <Nav.Link href="/about">Chi Siamo</Nav.Link>
                   </Nav>
        
                    <Nav> 
                        <Nav.Link href="/logincliente">Log in</Nav.Link>
                        <Nav.Link eventKey={2} href="/registrati"> Registrati </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                </Styles>
                </>
                
                :

                null
            
                }

                {isAuthenticated==="client"?                             //NAVBAR PER UTENTI LOGGATI


                <Styles>
                <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">STARDUST</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
 

                    <Nav className="mr-auto">

                        <Nav.Link href="/about">Chi Siamo</Nav.Link>
                        <Nav.Link href="/prenota">Prenota</Nav.Link>
                        <Nav.Link href="/myProfile">Il mio Profilo</Nav.Link>
                        <Nav.Link href="/leMieCorse">Le mie Corse</Nav.Link>
                        <Nav.Link href="/leMiePrenotazioni">Le mie Prenotazioni</Nav.Link>

                    </Nav>
                    <Nav>
                        <Nav.Link onClick={clickEvent => {
                                  clickEvent.preventDefault();
                                  this.logout()
                                  }} > 
                                  Log Out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                </Styles>

                :

                null


                } 
                
        
        
        
                {isAuthenticated==="admin"?     //NAVBAR PER AMMINISTRATORI 


                        <Styles>
                        <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="/home">STARDUST</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
        

                            <Nav className="mr-auto">

                                <Nav.Link href="/GestioneImpiegati"> Gestione Impiegati</Nav.Link>
                                <Nav.Link href="/GestionePrenotazioni"> Gestione Prenotazioni</Nav.Link>
                                <Nav.Link href="/GestioneCorse"> Gestione Corse</Nav.Link>
                                <Nav.Link href="/myProfile">Il mio Profilo</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={clickEvent => {
                                        clickEvent.preventDefault();
                                        this.logout()
                                        }} > 
                                        Log Out
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                        </Styles>

                        :

                        null
                }
        
                {isAuthenticated==="driver" ?                               //NAVBAR PER AUTISTI


                        <Styles>
                        <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="/home">STARDUST</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
        

                            <Nav className="mr-auto">

                                <Nav.Link href="/myProfile">Il mio Profilo</Nav.Link>
                                <Nav.Link href="/NotificheAutista">Notifiche Prenotazioni</Nav.Link>
                                <Nav.Link href="/GestioneCorseAutista"> Termina Corse</Nav.Link>
                                
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={clickEvent => {
                                        clickEvent.preventDefault();
                                        this.logout()
                                        }} > 
                                        Log Out
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        </Navbar>
                        </Styles>

                        :

                        null
                    }

                    {isAuthenticated==="parker"?     //NAVBAR PER PARCHEGGIATORI 


                    <Styles>
                    <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/home">STARDUST</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">


                        <Nav className="mr-auto">

                            <Nav.Link href="/myProfile">Il mio Profilo</Nav.Link>
                            <Nav.Link href="/GestioneCorseParcheggiatore">Parcheggia</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={clickEvent => {
                                    clickEvent.preventDefault();
                                    this.logout()
                                    }} > 
                                    Log Out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                    </Styles>

                    :

                    null
                    }

            </div>
            );

    }
}