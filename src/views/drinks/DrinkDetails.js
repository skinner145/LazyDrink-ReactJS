/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:19:40+00:00
 */
import React from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";

import { Link } from "react-router-dom";

class DrinkDetails extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      drink: [],
      type: '',
      price: ''
    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/drinks/' + this.props.match.params.id)
    .then(res => {
      this.setState({
        drink: res.data,
        type: res.data.type.name,
        price: res.data.price.toFixed(2)
      })
    })
    .catch(err=> console.log(err))
  }

  render() {
    const drink = this.state.drink;
    const type = this.state.type
    const price = this.state.price
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>{drink.name}</Card.Title>
            <Card.Text>{type}</Card.Text>
            <Card.Text>${price}</Card.Text>
            <Card.Text>
              <Link to={"/drinks/" + drink._id + "/edit"}>Edit</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default DrinkDetails;
