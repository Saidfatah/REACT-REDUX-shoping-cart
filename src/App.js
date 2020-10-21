import React from 'react';
import './Style/App.css';
import Footer from './Components/layout/Footer'
import Header from './Components/layout/Header'
import Shop from './Components/Routes/Shop'
import About from './Components/Routes/About'
import Modal from 'react-modal';
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import store from './Redux/store'
import {Provider} from 'react-redux'

const App=()=> {
  return (
    <div className="App">
      <Provider store={store}>
           <Router>
               <Header />
                   <Switch>
                        <Route exact path="/"><Shop /> </Route>
                        <Route path="/about"><About /> </Route>
                   </Switch>
               <Footer />
           </Router>
      </Provider>
    </div>
  );
}

Modal.setAppElement('#root');

export default App;
