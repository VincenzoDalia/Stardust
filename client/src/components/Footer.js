import React, {Component} from "react";
import {Button} from "react-bootstrap"
import  facebookicon  from "../assets/facebookicon.png";
import  instagramicon  from "../assets/instagramicon.png";
import  twittericon  from "../assets/twittericon.png";
import "./Footer.css";

export class Footer extends Component {
  
  render() {
    return (
      <div className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>I nostri social</h4>
              <a href="http://www.facebook.com/Stardust-105617425198952" target="_blank"> <img src={facebookicon} /></a>   
              <a href="http://www.instagram.com/progetto_stardust/" target="_blank"> <img src={instagramicon}/></a>
              <a href="http://www.twitter.com/StardustSharing" target="_blank"> <img src={twittericon}/> </a>
      
            </div>
            <div className="col">
              <h4>Contattaci</h4>
              <ui className="list-unstyled">
                <li><Button variant="outline-light" href= "mailto:progettostardust@gmail.com">Invia Mail</Button>{' '}</li>
              </ui>
            </div>
          </div>
          <hr />
          <div className="row">
            <p className="col-sm">
              &copy;{new Date().getFullYear()} STARDUST | All rights reserved |
              Terms Of Service | Privacy
            </p>
          </div>
        </div>
      </div>
    );
  }

}

