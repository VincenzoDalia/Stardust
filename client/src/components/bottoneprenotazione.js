import React from "react";
import "../bottoneprenotazione.css";


//viene usato nella pagina prenotazione per scegliere
//mezzo o autista

export default class BottonePrenotazione extends React.Component {

    render() {
        return (
            <div className="col"   >

                <a href={this.props.url} style={{ textDecoration: "none", color: "black" }}>

                    <div id="veicolo" className="p-3" style={{ borderRadius: "20px", marginBottom: "50px" }} >

                        <p align="center"><img src={this.props.img} alt="opzione_prenotazione" style={{ width: "150px", height: "150px" }} /> </p>
                        <p align="center" style={{ fontSize: "25px", fontStyle: "italic", fontWeight: "bold" }}>{this.props.vehicleType}</p>


                    </div>
                </a>
            </div>
        );
    }

}
