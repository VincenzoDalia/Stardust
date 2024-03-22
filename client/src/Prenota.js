import React, { Component, Select, Alert,} from "react";
// import BottonePrenotazione from './components/bottoneprenotazione';
import { Button, Container,Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from "axios";        
import 'react-datepicker/dist/react-datepicker.css';
import './datapicker.css';
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import  OtpBox from "./components/OtpBox";
import { Link } from "react-router-dom";
import OtpInput from 'react-otp-input';
import Cookie from "universal-cookie";



/*
    BISOGNA CONTROLLARE BENE GLI INPUT NEGLI STATE
    DELLE DATE
*/ 


export default class Prenota extends Component {

    


    constructor(props){
        super(props);

        this.handler = this.handler.bind(this);

        this.state = {

            object: {},
    
            id_client: "",
            email:"",
            otp_check:false,
            otp:"",  
    
            dataInizio: "",
            flagDataInizio: "",
            flagDataFine:"",
            flagOraInizio: "",
            flagPatente: false,     //verrà prima prelevato dal DB in base all'utente e poi inoltrato al BE per filtrare i veicoli che potrà guidare
            indirizzoPartenza: "",
            indirizzoArrivo: "",
            flagArrivo: "",
            dataFine: "",
            oraInizio: "",
            oraFine: "",
            flag2: "",
            flag3: "",
            opzione:"",
            mostraVeicoli: false,

            /////////////////////////////////////////////   servono solo per il caso modifica prenotazione
            modifica: this.props.modifica,                    
            code_prenotation: this.props.code_prenotation ,
            complete: this.props.complete  
            /////////////////////////////////////////////
        }
    }

    handler() {
        this.setState({
          otp_check: "true"
        })

        const cookie = new Cookie();

        cookie.set("cookieOTP",true, {path:"/", maxAge:900});
        alert("Sessione codice OTP valida per 15 minuti.");
        document.location.href = '/Prenota';

        
    }

    handleChange = (otp) => {
        this.setState({ otp});
    };


    componentWillMount(){
        
        const cookie = new Cookie();
        this.setState({
            ...this.state.id_client=cookie.get("cookieUserid"),
            ...this.state.email=cookie.get("cookieEmail")
        })

    }

    //serve per far si che l'orario di arrivo sia uno qualsiasi se il giorno
    //di arrivo è successivo a quello di partenza

    minCondizionale1(){
        if(this.state.flagDataInizio < this.state.flagDataFine){
            return 0;
        }else{
            return this.state.flag2;
        }
    }

    minCondizionale2(){

        
        //if(this.state.dataInizio > this.state.flag3.toLocaleDateString("it-IT")){
        if(this.state.flagDataInizio > this.state.flag3){
            return 0;
        }else{
            return this.state.flag3;
        }
    }

    disableSubmit(){

        if(this.state.opzione=="autista"){
            
            if(this.state.dataInizio=="" || this.state.oraInizio=="" || this.state.dataFine=="" || this.state.oraFine=="" || this.state.opzione=="" || this.state.indirizzoPartenza=="" || this.state.indirizzoArrivo==""){
                return true;
            }
            else{
                return false;
            }
        
        }else{

            if(this.state.dataInizio=="" || this.state.oraInizio=="" || this.state.dataFine=="" || this.state.oraFine=="" || this.state.opzione=="" || this.state.indirizzoArrivo==""){
                return true;
            }
            else{
                return false;
            } 
        }
    }
  
    render(){

        const now = new Date();
        this.state.flag3 = now;
        now.setMinutes(now.getMinutes()+5);

        const cookie = new Cookie();
        
        let flag1 = new Date();

        let inputIndirizzoPartenza;
        let inputIndirizzoArrivo;
        let sceltaArrivo;


        if(this.state.opzione ==="mezzo"){

            inputIndirizzoPartenza = (

                <div>
                </div>
            );

            sceltaArrivo = (

                <div>
                    <Form.Label>Scegli punto di arrivo</Form.Label>                         
                    <Form.Control as="select" defaultValue="Choose..." 
                        type="text" 
                        onChange={changeEvent => {
                            this.setState({
                                ...this.state,
                                flagArrivo: changeEvent.target.value
                            })
                        }} 
                        required>
                            
                            <option value="" selected> Scegli</option>
                            <option value="stallo" >Stallo</option>
                            <option value="indirizzo">Specifica un indirizzo..</option>       
                    </Form.Control>
                </div>
            );

        }else if(this.state.opzione==="autista"){

            inputIndirizzoPartenza = (

                <div>

                    <Form.Label>Inserisci l'indirizzo di partenza</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={changeEvent => {
                            this.setState({
                                ...this.state,
                                indirizzoPartenza: changeEvent.target.value
                            })
                        }} 
                        required
                    />

                </div>

            );

            sceltaArrivo = (
                <div>

                </div>
            );

            inputIndirizzoArrivo = (

                <div>

                    <Form.Label>Inserisci l'indirizzo di arrivo</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={changeEvent => {
                            this.setState({
                                ...this.state,
                                indirizzoArrivo: changeEvent.target.value
                            })
                        }} 
                        required
                    />
                    
                </div>
            );

        }

        if(this.state.flagArrivo==="stallo"){

            inputIndirizzoArrivo = (

                <div>
                    <Form.Label>Inserisci stallo</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." 
                                    type="text" 
                                    onChange={changeEvent => {
                                        this.setState({
                                            ...this.state,
                                            indirizzoArrivo: changeEvent.target.value
                                        })
                                    }} 
                                    required>
                                        
                                        <option value="" selected> Scegli</option>
                                        <option value="Corso Calatafimi, 22" >Corso Calatafimi, 22</option>
                                        <option value="Via Ernesto Basile, 120" >Via Ernesto Basile, 120</option>
                                        <option value="Corso dei Mille, 10" >Corso dei Mille, 10</option>
                                        <option value="Via Oreto, 43" >Via Oreto, 43</option>
                                        <option value="Viale della Libertà, 28" >Viale della Libertà, 28</option>       
                            
                                
                    </Form.Control>

                </div>
            );

        }else if(this.state.flagArrivo==="indirizzo"){

            inputIndirizzoArrivo = (

                <div>

                    <Form.Label>Inserisci l'indirizzo di arrivo</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={changeEvent => {
                            this.setState({
                                ...this.state,
                                indirizzoArrivo: changeEvent.target.value
                            })
                        }} 
                        required
                    />
                    
                </div>
            );
        }

        //if(this.state.otp_check==false){
        if(!cookie.get("cookieOTP")){
            return(
                <div>
                <div align="center">
                <OtpBox handler = {this.handler}/> 
                </div>
                <br/><br/><br/>
                </div>
            );
        }else{

        
        return(

            <div >

                <h4 align="center"> Seleziona con quale opzione vuoi viaggiare.<br/>Hai bisogno di un mezzo o di un autista? </h4> <br/><br/>
              
                        <p align="center">

                        

                        <Form>   

                           
                
                        <Form.Group as={Col} controlId="formGridState">
                        <br/><br/><br/>
                            <Form.Label>Scegli l'opzione desiderata</Form.Label>

                            <Form.Control as="select" defaultValue="Choose..." 
                                type="text" 
                                onChange={changeEvent => {
                                    this.setState({
                                        ...this.state,
                                        opzione: changeEvent.target.value
                                    })
                                }} 
                                required>
                                    
                                    <option value="" selected> Scegli</option>
                                    <option value="mezzo" >Mezzo</option>
                                    <option value="autista">Autista</option>       
                        
                            
                            </Form.Control>

                            <br/><br/>

                            <h4 align="center"> Inserisci i dati relativi alla partenza</h4>
                            <br/><br/>


                            <Form.Label>Seleziona la data di partenza</Form.Label>    
                            <DatePickerComponent
                                onChange={changeEvent => {
                                        if(changeEvent.target.value != null){
                                            this.setState({
                                                ...this.state,
                                                dataInizio: changeEvent.target.value.toLocaleDateString("en-US"),
                                                flagDataInizio: changeEvent.target.value
                                            })

                                        }else{
                                            this.setState({
                                                ...this.state,
                                                dataInizio: null
                                                
                                            })
                                            
                                        }

                                        this.setState({
                                            ...this.state,            //Serve per resettare gli altri campi se modifichi la data di partenza
                                            oraInizio: "",
                                            oraFine: "",
                                            dataFine: ""
                                        })

                                    
                                    
                                }}
                                format="dd-MM-yy"
                                required
                                min={now}
                                placeholder="inserisci data"
                                >
                            
                            </DatePickerComponent>

                            <br/><br/>

                            <Form.Label>Seleziona l'orario di partenza</Form.Label>

                            <TimePickerComponent
                                placeholder="Inserisci orario"
                                min={this.minCondizionale2()}
                                onChange={changeEvent => {

                                if(changeEvent.target.value != null){
                                    this.setState({
                                        ...this.state,
                                        oraInizio: changeEvent.target.value.toLocaleTimeString("it-IT"),
                                        flagOraInizio: changeEvent.target.value
                                    })

                                    flag1 = this.state.flagOraInizio
                                    flag1.setMinutes(flag1.getMinutes()+30)

                                    this.setState({
                                        ...this.state,
                                        flag2: flag1
                                    })


 
                                }else{

                                    this.setState({
                                        ...this.state,
                                        oraInizio: null
                                        
                                    })

                                }
                            }}
                            required>

                            </TimePickerComponent>

                            <br/><br/>


                            <div>
                                {inputIndirizzoPartenza}
                            </div>

                            <br/><br/>

                            <h4 align="center"> Inserisci i dati relativi all' arrivo</h4>
                            <br/><br/>

                            <Form.Label>Seleziona la data di arrivo</Form.Label>    
                            <DatePickerComponent
                                onChange={changeEvent => {
                                        if(changeEvent.target.value != null){
                                            this.setState({
                                                ...this.state,
                                                dataFine: changeEvent.target.value.toLocaleDateString("en-US"),
                                                flagDataFine: changeEvent.target.value
                                            })

                                        }else{
                                            this.setState({
                                                ...this.state,
                                                dataFine: null
                                                
                                            })
                                            
                                        }

                                }}
                                format="dd-MM-yy"
                                required
                                min={this.state.flagDataInizio}
                                placeholder="inserisci data"
                                >
                            
                            </DatePickerComponent>


                            <br/><br/>

                            <Form.Label>Seleziona l'orario di arrivo</Form.Label>

                            <TimePickerComponent
                            placeholder="Inserisci orario"
                            min={this.minCondizionale1()}
                            onChange={changeEvent => {
                                if(changeEvent.target.value != null){
                                    this.setState({
                                        ...this.state,
                                        oraFine: changeEvent.target.value.toLocaleTimeString("it-IT")
                                    })

                                }else{

                                    this.setState({
                                        ...this.state,
                                        oraFine: null
                                        
                                    })

                                }
                            }}
                            required>

                            </TimePickerComponent>

                            <br/><br/>


                            <div>
                                {sceltaArrivo}
                            </div>
                            
                            
                            <br/><br/>

                            <div>
                                {inputIndirizzoArrivo}
                            </div>

                            <br/>

                            <Link 
                            to={{
                                pathname: '/Disponibili',
                                
                                state:{
                                    oraInizio:this.state.oraInizio,
                                    oraFine: this.state.oraFine,
                                    dataInizio: this.state.dataInizio,
                                    dataFine: this.state.dataFine,
                                    opzione: this.state.opzione,
                                    indirizzoArrivo: this.state.indirizzoArrivo,
                                    indirizzoPartenza: this.state.indirizzoPartenza,
                                    id_client: this.state.id_client,
                                    email: this.state.email,

                                    code_prenotation: this.state.code_prenotation,
                                    modifica: this.state.modifica,
                                    complete: this.state.complete

                                }
                            }}
                            >
                                <Button onClick={ 
                                    clickEvent => {
                                        const cookie = new Cookie()
                                        cookie.set('cookiePrenotazione', true, {path:'/', maxAge:300})
                                        
                                        alert("Avrai a disposizione 5 minuti per completare la tua prenotazione");
                                    }
                                   
                                } disabled={this.disableSubmit()}>Controlla Disponibilità</Button>
                            </Link>

                            </Form.Group>
                        </Form>
                        </p>

                        <br/><br/>


            </div>

        );
        }
    }    
}

