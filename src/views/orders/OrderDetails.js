/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:19:40+00:00
 */
import React from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";

import moment from 'moment';

class OrderList extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      order: [],
      drinks: [],
      user: {}
    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/orders/' + this.props.match.params.id)
    .then(res => {
      this.setState({
        order: res.data,
        drinks: res.data.drinks,
        user: res.data.user
      })
    })
    .catch(err=> console.log(err))
  }

  render() {
    const order = this.state.order;
    let price = this.state.order.totalPrice;
    if(price !== undefined){
      price = price.toFixed(2)
    }
    const drinks = this.state.drinks;
    const user = this.state.user
    let time = this.state.order.time;
    if(time !== undefined){
      time = moment(time).format('HH:mm, DD/MM/YYYY');
    }
    return (
      <Card>
        <Card.Body>
          <h2>Table Number: {order.tableNumber}</h2>
          <Table>
            <thead>
              <tr>
                <th>Drink</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Sum</th>
              </tr>
            </thead>
            <tbody>
            {drinks.map(drink => {
              return(
                <tr key={drink._id}>
                  <td>{drink.drink.name}</td>
                  <td>{drink.quantity}</td>
                  <td>${drink.price.toFixed(2)}</td>
                  <td>${drink.sum.toFixed(2)}</td>
                </tr>
              )
            })}
            </tbody>
          </Table>
          <Card.Title>{'Ordered by: ' + user.firstName + ' ' + user.lastName}</Card.Title>
          <Card.Text>Date and Time: {time}</Card.Text>
          <Card.Title>Total: ${price}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}
export default OrderList;
