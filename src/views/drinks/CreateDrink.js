/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-04T17:42:32+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:33:47+00:00
 */
import React from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";

class CreateDrink extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: "",
      price: '',
      type: "",
      types: []
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const drink = {
      name: this.state.name,
      price: this.state.price,
      type: this.state.type,
    };
    console.log(drink);

    axios
      .post("http://localhost:4000/drinks/create", drink)
      .then(res => console.log(res.data));
    this.setState({
      name: "",
      price: "",
      type: ''
    });
    this.props.history.push("/drinks");
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/types")
      .then(res => {
        this.setState({
          types: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const types = this.state.types

    return (
      <Card>
        <Card.Body>
        <Form>
          <h1>Create an exercise</h1>
          <Form.Group>
            <Form.Label>Drink name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              onChange={this.onChangeType}
              >
              <option>Select...</option>
              {types.map(type => {
                return (
                  <option key={type._id} value={type._id}>
                  {type.name}
                  </option>
                )
              })}
              </Form.Control>
              </Form.Group>

          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateDrink;
