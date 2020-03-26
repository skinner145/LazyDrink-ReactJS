/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T15:53:24+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T15:06:45+00:00
 */
import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeTables = this.onChangeTables.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //variables will be set later
    this.state = {
      name: "",
      address: "",
      tables: '',
      email: "",
      password: ""
    };
  }
  //when first name changes set to firstName state
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  //when last name changes set to lastName state
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeTables(e) {
    this.setState({
      tables: e.target.value
    });
  }
  //when email changes set to email state
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  //when password changes set to Password
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  //when form submitted
  onSubmit(e) {
    e.preventDefault();
    //object made up of firstName, lastName, email, password
    const user = {
      name: this.state.name,
      adress: this.state.address,
      tables: this.state.tables,
      email: this.state.email,
      password: this.state.password
    };
    //axios post with user object passed
    axios
      .post("http://localhost:4000/pub/register", user)
      .then(res => {
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem('pubId', res.data.pubId);
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({
            message: "Login failed. Username or password not match"
          });
        }
      });
    window.location = "/";
  }

  render() {
    //form for register
    return (
      <div>
        <h3>
          Register/<Link to="/login">Login</Link>
        </h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId="formHorizontalIMDB">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalIMDB">
            <Form.Label column sm={2}>
              Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={this.state.address}
                onChange={this.onChangeAddress}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalIMDB">
            <Form.Label column sm={2}>
              Tables
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                placeholder="tables"
                name="tables"
                value={this.state.tables}
                onChange={this.onChangeTables}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalIMDB">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Register</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
