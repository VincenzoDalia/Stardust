import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader'
import Button from 'react-bootstrap/Button';
import React from 'react';
import FormRimuoviImpiegato from './FormRimuoviImpiegato';
import FormAggiungiImpiegato from './FormAggiungiImpiegato';

function MyVerticallyCenteredModal(props) {

  return (


    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Aggiungi Impiegato
        </Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h5>Inserisci i dati dell'impiegato da aggiungere</h5>
        </div>

        <FormAggiungiImpiegato />


      </Modal.Body>

    </Modal>
  );
}
 function MyVerticallyCenteredModal2(props) {
   return (<Modal
     {...props}
     size="lg"
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <ModalHeader closeButton>
       <Modal.Title id="contained-modal-title-vcenter">
         Rimuovi Impiegato
       </Modal.Title>
     </ModalHeader>
     <Modal.Body>

        <FormRimuoviImpiegato />

     </Modal.Body> </Modal>)




}

function MyVerticallyCenteredModal3(props) {

  const state = {
    opzione: props.opzione,
    id_impiegato: props.id_impiegato,
    email: props.email
  }

  return (


    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modifica Impiegato
        </Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h5>Modifica i dati dell'impiegato ID: {props.id_impiegato}</h5>
        </div>

        <FormAggiungiImpiegato opzione={"modifica"} email={props.email} id_impiegato={props.id_impiegato}/>


      </Modal.Body>

    </Modal>
  );
}


export function PopUpAggiungiImpiegato(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <p align="center">
        <Button  variant="primary" style={{margin:"15px"}} onClick={() => setModalShow(true)}>
          Aggiungi Impiegato
        </Button>
      </p>


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

 export function PopUpRimuoviImpiegato(props) {
   const [modalShow, setModalShow] = React.useState(false);

   return (
     <>
       <p align="center">
         <Button variant="danger" style={{margin:"15px"}} onClick={() => setModalShow(true)}>
           Rimuovi Impiegato
         </Button>
       </p>


       <MyVerticallyCenteredModal2
         show={modalShow}
         onHide={() => setModalShow(false)}
       />
     </>
   );
 }

 export function PopUpModificaImpiegato(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <p align="center">
        <Button  variant="primary" style={{margin:"15px"}} onClick={() => setModalShow(true)}>
          Modifica Impiegato
        </Button>
        
      </p>


      <MyVerticallyCenteredModal3
        email={props.email}
        id_impiegato={props.id_impiegato}
        opzione={props.opzione}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}