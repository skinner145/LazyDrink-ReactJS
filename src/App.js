/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-03T14:22:36+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T13:06:37+00:00
 */
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import OrderList from './views/orders/OrderList';
import OrderDetails from './views/orders/OrderDetails';

import DrinkList from './views/drinks/DrinkList';
import DrinkDetails from './views/drinks/DrinkDetails';
import CreateDrink from './views/drinks/CreateDrink';
import EditDrink from './views/drinks/EditDrink';

import Login from './views/auth/Login';
import Register from './views/auth/Register';
import NavigationBar from './components/navigation/NavigationBar';

import { Container, Row, Col } from 'react-bootstrap';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null,
    };
  }

  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false : true
    }))
  }

  render(){
    const loggedIn = this.state.loggedIn
    return(
      <Router>
        <NavigationBar loggedIn={loggedIn} onLogout={this.authHandler}/>
        <br />
        <Container>
          <Row>
            <Col sm={2}>
            </Col>
            <Col sm={8}>
              <Switch>
                <Route exact path="/" component={loggedIn ? OrderList : Login} />
                <Route exact path="/orders/:id" component={loggedIn ? OrderDetails : Login} />

                <Route exact path="/drinks" component={loggedIn ? DrinkList : Login} />
                <Route exact path="/drinks/create" component={loggedIn? CreateDrink : Login} />
                <Route exact path="/drinks/:id" component={loggedIn ? DrinkDetails : Login} />
                <Route exact path="/drinks/:id/edit" component={loggedIn ? EditDrink : Login} />


                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
            </Col>
            <Col sm={2}>
            </Col>
          </Row>
        </Container>

      </Router>
    )
  }
}

export default App;
