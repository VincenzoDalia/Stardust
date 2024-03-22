import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { Nav } from 'react-bootstrap';
import axios from "axios";
import PopUpRecoverPassword from './popuprecoverpassword';
import Cookie from "universal-cookie";
import { Link } from "react-router-dom";



export default class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: false,
      object: {}
    };

  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value})
    
  }



  axiosPost = () => {

    axios.post("http://localhost:3000/Admin/AccessoAziendale", this.state)
        .then(result => {
            
                var role = result.data.role;      
                var userid = result.data.id_impiegato;
                var email = this.state.email


                const cookies = new Cookie();
                /* --Inserisci role dentro il cookie appena creato sopra */
                cookies.set('cookieEmail', email, {path:'/'});
                cookies.set('cookieRole', role, {path:'/'});
                cookies.set('cookieUserid', userid, {path:'/'});

                axios.post("http://localhost:3000/Admin/AggiungiImpiegati_get", this.state)
                .then(response => {
                    this.setState({
                        ...this.state,
                        object: response.data
                    })
                })
                .catch(err => {
                    console.log("Errore: " + err);
                    alert("Qualcosa è andato storto: " + err)
                })

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
        
        <h1>Login Aziendale</h1>
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
          <Link to="/LoginCliente">
                  <Button>
                      Non sei un Dipendente?<br/>Effettua il Login come Cliente
                  </Button>
          </Link>
          </p>
          <br/>
          <p>Hai dimenticato la password?</p>
            <a href="#"><PopUpRecoverPassword role={"employer"}/></a>
                
  
          <br/>           
          <p>Non hai ancora un account?
              <Nav.Link href="/registrati"> Registrati</Nav.Link>
          </p>
  
  
  
        </Form>
      </div>
    );

  }
}


