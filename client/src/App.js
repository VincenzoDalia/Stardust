import React, {render} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import NetworkDetector from './Hoc/NetworkDetector';

import { Home } from './Home';
import  About  from './About';
import  Prenota  from './Prenota';
import  LoginCliente  from './LoginCliente';
import  LoginAziendale  from './LoginAziendale';
import { Registrazione } from './Registrazione';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import { Footer } from './components/Footer';
import { MyProfile } from './myProfile';
import GestioneImpiegati from './GestioneImpiegati';
import GestionePrenotazioni from './GestionePrenotazioni';
import GestioneCorse from './GestioneCorse';
import Disponibili from './Disponibili';
import Pagamento from './Pagamento';
import ModificaProfilo from './ModificaProfilo';

import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import ProtectedRouteDriver from './components/ProtectedRouteDriver';
import ProtectedRouteParker from './components/ProtectedRouteParker';

import leMiePrenotazioni from './leMiePrenotazioni';
import SbloccaVeicolo from './SbloccaVeicolo';
import ProtectedRoutePrenotazione from './components/ProtectedRoutePrenotazione';
import leMieCorse from './leMieCorse';
import SegnalaGuastoIncidente from './SegnalaGuastoIncidente';
import SegnalaRitardo from './SegnalaRitardo';

import NotificheAutista from './NotificheAutista';


function App() {
  return (

    <React.Fragment>
      <NavigationBar />
       <Jumbotron/>
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/Home" component={ Home } />
              <Route  path="/about" component={ About } />
              <ProtectedRoute  path="/prenota" component={ Prenota } />
              <Route  exact path="/logincliente" component={ LoginCliente } />
              <Route  exact path="/loginaziendale" component={ LoginAziendale } />
              <Route  path="/registrati" component={ Registrazione } />
              <ProtectedRoute  path="/myProfile" component={ MyProfile } />
              <ProtectedRoute  exact path="/modificaProfilo" component={ ModificaProfilo } />
              <ProtectedRoute  exact path="/leMieCorse" component={ leMieCorse } />
              <ProtectedRoute  exact path="/SegnalaGuastoIncidente" component={ SegnalaGuastoIncidente } />
              <ProtectedRoute  exact path="/SegnalaRitardo" component={ SegnalaRitardo } />
              <ProtectedRoute  exact path="/leMiePrenotazioni" component={ leMiePrenotazioni } />
              <ProtectedRoute  exact path="/SbloccaVeicolo" component={ SbloccaVeicolo } />

              <ProtectedRouteDriver exact path="/NotificheAutista" component={ NotificheAutista }/>
              <ProtectedRouteDriver exact path="/GestioneCorseAutista" component={ GestioneCorse }/>

              <ProtectedRouteParker exact path="/GestioneCorseParcheggiatore" component={ GestioneCorse }/>

              <ProtectedRouteAdmin  exact path="/GestioneImpiegati" component={ GestioneImpiegati } />
              <ProtectedRouteAdmin  exact path="/GestioneCorse" component={ GestioneCorse } />
              <ProtectedRouteAdmin  exact path="/GestionePrenotazioni" component={ GestionePrenotazioni } />

              <ProtectedRoutePrenotazione  exact path="/Pagamento" component={ Pagamento } />
              <ProtectedRoutePrenotazione  exact path="/Disponibili" component={ Disponibili } /> 

              <Route  path="/" component={Home}/>
              <Route component={NoMatch}/>
            </Switch>
          </Router>
        </Layout>
      <Footer />

    </React.Fragment>

  );
}

export default NetworkDetector(App);
