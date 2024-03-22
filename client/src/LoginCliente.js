import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { Nav } from 'react-bootstrap';
import axios from "axios";
import PopUpRecoverPassword from './popuprecoverpassword';
import Cookie from "universal-cookie";
import { Link } from "react-router-dom";



export default class LoginCliente extends Component{

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: false
    };

  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value})
    
  }



  axiosPost = () => {

    axios.post("http://localhost:3000/Client/AccessoCliente", this.state)
        .then(result => {
            
               
                var userid = result.data.id_client;
                var email = this.state.email


                const cookies = new Cookie();
                cookies.set('cookieEmail', email, {path:'/'});
                //cookies.set('cookieRole', role, {path:'/'});      dato che nel Back-end non c'è il ruolo per i clienti, lo imposto da qua
                cookies.set('cookieRole', "client", {path:'/'});
                cookies.set('cookieUserid', userid, {path:'/'});
                
                document.location.href = '/Home'
              

        })
        .catch(error => {
            

            if(error.response.status==404){
              alert("Non esiste un account con queste credenziali");
              
            }else if(error.response.status==500){
                alert("Password non coincidenti...")
            
            }else{
                alert('Si è verificato un errore:' + error);
            }
        })

  }

 

  render(){

    return (
      <div className="Login text-center">
        
        <h1>Login Cliente</h1>
        <br/><br/><br/>
        <Form>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              onChange={changeEvent => {
                this.setState({
                    ...this.state,
                    email: changeEvent.target.value.toLowerCase()
                })
                if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/.test(this.state.email)){
                  this.setState({validate:true})
                }else{
                  this.setState({validate:false})
                }
            }}
             />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={changeEvent => {
                this.setState({
                    ...this.state,
                    password: changeEvent.target.value
                })
              }}  
              required
              
            />
          </Form.Group>
          <br/>
          <p align="center">
          <Button block size="lg" value="Submit" type="submit" disabled={!this.state.validate}
                  onClick={clickEvent => {
                    clickEvent.preventDefault();
                   this.axiosPost()
                  }}
                  >
                  Login
          </Button>

          <br/><br/>
          <Link to="/LoginAziendale">
                  <Button>
                      Sei un Dipendente?<br/>Effettua il Login come Dipendente
                  </Button>
          </Link>
          </p>
          <br/>
          <p>Hai dimenticato la password?</p>
            <a href="#"><PopUpRecoverPassword role={"cliente"}/></a>
                
  
          <br/>           
          <p>Non hai ancora un account?
              <Nav.Link href="/registrati"> Registrati</Nav.Link>
          </p>
  
  
  
        </Form>
      </div>
    );

  }
}


