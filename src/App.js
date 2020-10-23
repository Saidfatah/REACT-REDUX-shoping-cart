import React,{useEffect} from 'react';
import './Style/App.css';
import Footer from './Components/layout/Footer'
import Header from './Components/layout/Header'
import Shop from './Components/Routes/Shop'
import Auth from './Components/Routes/Auth'
import About from './Components/Routes/About'
import Modal from 'react-modal';
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import store from './Redux/store'
import {Provider} from 'react-redux'
import { loadUser } from "./Redux/actions/AuthActions";
import {  fetchProducts } from "./Redux/actions/ProductActions";
const App=()=> {
   useEffect(() => {
     store.dispatch(loadUser())
     store.dispatch(fetchProducts())
   }, [])

  return (
    <div className="App">
      <Provider store={store}>
           <Router>
               <Header />
                   <Switch>
                        <Route exact path="/"><Shop /> </Route>
                        <Route path="/about"><About /> </Route>
                        <Route path="/auth"><Auth /> </Route>
                   </Switch>
               <Footer />
           </Router>
      </Provider>
    </div>
  );
}

Modal.setAppElement('#root');

export default App;
