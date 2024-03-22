import React, { Component } from 'react';
import connessione_caduta from '../assets/connessione.png';
import Image from 'react-bootstrap/Image';
import Button from "react-bootstrap/Button";
import connessione from '../assets/connessione.png'

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
              })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                return clearInterval(webPing)
              });
            }).catch(() => this.setState({ isDisconnected: true }) )
          }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <div >
          { isDisconnected && (<div style={{ height:"100%", textAlign:"center"}} className="internet-error">
              <h1>Errore di connessione</h1>
              <br/>
              <Image style={{width:"auto"}} src={connessione_caduta} fluid />
              <h3>Prova a riconetterti</h3>
              <br/>
              <Button href="/Home">Aggiorna</Button>
              <br/><br/>
              <h3>Se il problema dovesse persistere prova a contattare un amministratore al seguente numero:</h3>
              <br/>
              <h2>+39 333112233</h2>

            </div>)
          }

          {!isDisconnected &&(<div>
              <img style={{display:"none"}} src={connessione}/>
              <ComposedComponent {...this.props} />
              </div>)}
          
        </div>
      );
    }
  }

  return NetworkDetector;
}