import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import { Button, Col, Row, Card, ListGroup, Form, Alert} from "react-bootstrap";
import React from 'react';
import Prenota from './Prenota';


function MyVerticallyCenteredModal3(props) {

  const state = {
    complete: props.complete,
    code_prenotation: props.code_prenotation,
    opzione: props.opzione,
    modifica: props.modifica
    // id_impiegato: props.id_impiegato,
    // email: props.email
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
          Modifica Prenotazione
        </Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h5>Modifica i dati della prenotazione numero: {props.code_prenotation}</h5>
        </div>

        <Prenota modifica={props.modifica} complete={props.complete} opzione={props.opzione} code_prenotation={props.code_prenotation} />


      </Modal.Body>

    </Modal>
  );
}





 export function PopUpModificaPrenotazione(props) {
  const [modalShow, setModalShow] = React.useState(false);


      function controlloDataModifiche(dataInizio, dataFine){
        const now = new Date();

        const data_inizio = new Date(dataInizio)
        data_inizio.setHours(data_inizio.getHours() - 2)

        
        if(now<data_inizio){
            return false
        }else{
            return true;
        }
      }
      

      return (
        <>
          
            <Button 
            
            disabled={controlloDataModifiche(props.start_date,props.end_date)}
            variant="secondary" style={{margin:"15px", padding:"18px"}} onClick={() => setModalShow(true)}>
              Modifica
            </Button>
            
          


          <MyVerticallyCenteredModal3
            complete={props.complete}
            code_prenotation={props.code_prenotation}
            modifica={props.modifica}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      );
}