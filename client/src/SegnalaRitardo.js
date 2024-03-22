import React, {Component} from "react";
import { Button, Form, Col} from 'react-bootstrap';
import axios from "axios";
import Cookie from "universal-cookie";
import 'react-datepicker/dist/react-datepicker.css';
import './datapicker.css';
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";

export default class SegnalaRitardo extends Component{

    state={
        object:{},

        flagArrivo:"",

        id_client:"",
        email:"",
        motivation:"ritardo",
        end_date:"",
        end_time:"",
        end_address:"",
        code_prenotation: this.props.location.state.code_prenotation,
        id_ride:this.props.location.state.id_ride
    }

    componentDidMount(){
        const cookie = new Cookie();
        this.setState({
            ...this.state.id_client=cookie.get("cookieUserid"),
            ...this.state.email=cookie.get("cookieEmail")
        })


        axios.post("http://localhost:3000/Client/Segnalazione_pren", this.state).
            then(result => {
                this.setState({
                    ...this.state,
                    object: result.data
                })
                console.log(this.state.object)
            }).catch(error => {
                console.log(error);
                alert('Si è verificato un errore imprevisto:' + error);
            })

    }



    minOrario(dataSelezionata){

        let dataFinale = new Date(this.state.object.end_date)

        if(dataSelezionata>dataFinale){
            return 0;
        }else{
            dataFinale.setMinutes(dataFinale.getMinutes() + 10)
            return dataFinale
        }
    }

    render(){
        const now = new Date();

        let sceltaArrivo;
        let inputIndirizzoArrivo;


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


        if(this.state.flagArrivo==="stallo"){

            inputIndirizzoArrivo = (

                <div>
                    <Form.Label>Inserisci stallo</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." 
                                    type="text" 
                                    onChange={changeEvent => {
                                        this.setState({
                                            ...this.state,
                                            end_address: changeEvent.target.value
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
                                end_address: changeEvent.target.value
                            })
                        }} 
                        required
                    />
                    
                </div>
            );
        }


        return(
            <div align="center">
                <h3>Effettua una segnalazione per un ritardo</h3> <br/>

                <br/><br/><br/>

                <h5>Inserisci i dati del tuo nuovo arrivo. <br/> Verrà calcolata una mora in base alla differenza tra il nuovo orario e quello precedentemente inserito</h5>
                
                <br/><br/><br/>
                
                <Form>

                    <div>
                        {sceltaArrivo}
                    </div>
                    
                    
                    <br/><br/>

                    <div>
                        {inputIndirizzoArrivo}
                    </div>      

                    <br/><br/>

                    <DatePickerComponent
                        onChange={changeEvent => {
                            if(changeEvent.target.value != null){
                                this.setState({
                                    ...this.state,
                                    end_date: changeEvent.target.value
                                })
                            }else{
                                this.setState({
                                    ...this.state,
                                    end_date: null                                        
                                })
                                            
                            }
                        }}
                        format="dd-MM-yy"
                        required
                        min={this.state.object.end_date}
                        placeholder="inserisci data"
                        >
                        </DatePickerComponent>

                        <br/><br/><br/><br/>

                        <TimePickerComponent
                            placeholder="Inserisci orario"
                            step={5}
                            min={this.minOrario(this.state.end_date)}
                            onChange={changeEvent => {
                                if(changeEvent.target.value != null){
                                    this.setState({
                                        ...this.state,
                                        end_time: changeEvent.target.value.toLocaleTimeString("it-IT")
                                    })

                                }else{

                                    this.setState({
                                        ...this.state,
                                        end_time: null
                                        
                                    })

                                }
                            }}
                            required>

                        </TimePickerComponent>

                </Form>
                <br/>
                <Button 
                    onClick={clickEvent => {
                        clickEvent.preventDefault();
                        axios.post("http://localhost:3000/Client/Segnalazione", this.state).
                            then(result => {
                            alert("Il ritardo è stato segnalato")
                            document.location.href = '/';
                                    
                            }).catch(error => {
                                console.log(error);
                                alert('Si è verificato un errore imprevisto:' + error);
                            })
                    }}
                >Invia Segnalazione</Button>
                <br/><br/>
            </div>
        );
    }

}