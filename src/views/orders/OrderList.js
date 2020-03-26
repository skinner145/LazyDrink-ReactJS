/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:19:40+00:00
 */
import React from "react";
import axios from "axios";
import { Card, Form } from "react-bootstrap";

import { Link } from "react-router-dom";

class OrderList extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      orders: [],
      search: ''
    }
  }

  updateSearch(e){
    this.setState({search: e.target.value});
  }

  componentDidMount(){
    axios.get('http://localhost:4000/orders')
    .then(res => {
      this.setState({
        orders: res.data
      })
    })
    .catch(err=> console.log(err))
  }

  render() {
    const orders = this.state.orders
    let filteredOrders = orders.filter(
      (order) => {
        if(order.tableNumber === this.state.search){
            return order;
        }
        else if(this.state.search === ''){
            return order
        }
      }
    )
    return (
      <>
      <Form>
        <Form.Control
        type="text" placeholder="Search by table number..." value={this.state.search} onChange={this.updateSearch.bind(this)}/>
      </Form>
      {filteredOrders.map(order => {
        return (
          <Card key={order._id}>
          <Card.Body>
            <Card.Title>Table: {order.tableNumber}</Card.Title>
            <Card.Text>Total Price: ${order.totalPrice.toFixed(2)}</Card.Text>
            <Link to={'/orders/' + order._id}>View Details</Link>
          </Card.Body>
          </Card>
        )
      })}
</>
    );
  }
}
export default OrderList;
