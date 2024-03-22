import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader'
import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useState } from 'react';

function MyVerticallyCenteredModal(props) {

  const [email, setEmail] = useState('');

  const state = {
    email,
    role: props.role
  }
  const onChange = (event) => {
    setEmail(event.target.value);
  };

  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton>

        <Modal.Title id="contained-modal-title-vcenter" >
          Recupera Password
        </Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h5>Inserisci l'indirizzo mail collegato al tuo account, ti verrà inviata una mail contenente una nuova password.<br/>Potrai modificare la tua password quando vuoi dalla sezione Il mio profilo.</h5>
        </div>


        <div className="Login text-center">
            
              
            <Form >
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  onChange={onChange}
                />

              </Form.Group>
      
              <br/>
              <Button block size="lg" value="Submit" type="submit"
               onClick={clickEvent => {

                //Recupero Password Cliente

                if(props.role==="cliente"){
                  axios.post("http://localhost:3000/Client/RecuperaPassword_exist", state )
                      .then(result => {
                          
                          alert("La mail che hai inserito esiste!");
                          

                          axios.post("http://localhost:3000/Client/RecuperaPassword_pass", state)
                            .then( result => {
                                
                              alert("Abbiamo inviato una password provvisoria al tuo indirizzo mail con la quale potrai accedere al tuo account.")
                              document.location.href = "/login"

                            }).catch( error =>{

                              alert('Si è verificato un errore imprevisto:' + error);
                            })
                          
                      }).catch(error => {
                          
                          if(error.response.status==404){
                            
                            alert("Non esiste un account cliente associato a questa mail.")
                          
                          }else{
                            alert('Si è verificato un errore imprevisto:' + error);
                          }
                      })
                
                
                }else{

                  //Recupero Password Impiegato

                  axios.post("http://localhost:3000/Employer/RecuperaPass_ex", state)
                    .then(result => {
                          
                        alert("La mail che hai inserito esiste!");
                        

                        axios.post("http://localhost:3000/Employer/RecuperaPass_gen", state)
                            .then( result => {
                                
                              alert("Abbiamo inviato una password provvisoria al tuo indirizzo mail con la quale potrai accedere al tuo account.")
                              document.location.href = "/login"
                            }).catch( error =>{

                              alert('Si è verificato un errore imprevisto:' + error);
                            })
                        
                    }).catch(error => {
                        if(error.response.status==404){
                          alert("Non esiste un account aziendale associato a questa mail.")
                          
                        }else{
                          alert('Si è verificato un errore imprevisto:' + error);
                        }
                    })
                  
                }
              
                }}>
                Resetta password
              </Button>
      
            </Form>
          </div>
      </Modal.Body>
    </Modal>
  );
}

export default function PopUpRecoverPassword(props) {
  const [modalShow, setModalShow] = React.useState(false);


  return (
    <>
      <div onClick={() => setModalShow(true)}>
        Recuperala
      </div>
      <MyVerticallyCenteredModal 
        role={props.role}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}