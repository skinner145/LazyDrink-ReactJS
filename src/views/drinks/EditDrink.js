import React from 'react'
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

class EditDrink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: "",
      price: "",
      types: []
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName(e){
    this.setState({
      name: e.target.value
    })
  }
  onChangeType(e){
    this.setState({
      type: e.target.value
    })
  }
  onChangePrice(e){
    this.setState({
      price: e.target.value
    })
  }

  componentDidMount(){
    axios.get('http://localhost:4000/drinks/' + this.props.match.params.id)
    .then(res => {
      this.setState({
        name: res.data.name,
        price: res.data.price,
        type: res.data.type
      })
    })
    .catch(err => {
      console.log(err);
    })
    axios.get('http://localhost:4000/types')
    .then(res => {
      this.setState({
        types: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  onSubmit(e){
    e.preventDefault();
    const obj = {
      name: this.state.name,
      type: this.state.type,
      price: this.state.price
    };

    axios.put('http://localhost:4000/drinks/' +this.props.match.params.id + '/edit', obj)
    .then(res => console.log(res.data));
    this.props.history.push("/drinks")
  }
  render(){
    const types = this.state.types;

    return(
      <Card>
        <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              value={this.state.type}
              onChange={this.onChangeType}
            >
            {types.map(type => {
              return(
                <option key={type._id} id={type._id}>
                  {type.name}
                </option>
              )
            })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={this.state.price}
            onChange={this.onChangePrice}
          />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default EditDrink;
