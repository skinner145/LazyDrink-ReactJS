/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T16:25:34+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:12:46+00:00
 */
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
  logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("pubId");
    this.props.onLogout();
  }
  render() {
    const loggedIn = this.props.loggedIn;

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          LazyDrink
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          {loggedIn && (
            <Nav.Link as={Link} to="/">
              Orders
            </Nav.Link>
          )}
          {loggedIn && (
            <Nav.Link as={Link} to="/drinks">
              Drinks
            </Nav.Link>
          )}
          {loggedIn && (
            <Nav.Link as={Link} to="/drinks/create">
              Add Drinks
            </Nav.Link>
          )}
            {loggedIn ? (
              <Nav.Link onClick={this.logout}>Logout</Nav.Link>
            ) : (
              <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              </>
            )
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
