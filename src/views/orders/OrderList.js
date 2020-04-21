/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:19:40+00:00
 */
import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import OrderItem from '../../components/UI/OrderItem'


class OrderList extends React.Component {
  constructor(props){
    super(props);


    this.state ={
      orders: [],
      search: '',
    }
  }

  updateSearch(e){
    this.setState({search: e.target.value});
  }


  componentDidMount(){
    this.interval = setInterval(() => {
      axios.get('http://localhost:4000/orders')
      .then(res => {
        this.setState({
          orders: res.data
        })
      })
      .catch(err=> console.log(err))
    }, 1000)
  }

  render() {
    const orders = this.state.orders
    console.log(orders);
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

    const styles={
      container: {
        border: "1px solid #333334",
        marginBottom: 5
      }
    }

    return (
      <>
      <Form>
        <Form.Control
        type="text" placeholder="Search by table number..." value={this.state.search} onChange={this.updateSearch.bind(this)}/>
      </Form>
      {filteredOrders.map(order => {

        return (
          <div key={order._id} style={styles.container}>
            <OrderItem
              id={order._id}
              table={order.tableNumber}
              date={order.time}
              price={order.totalPrice}
              />
            </div>
        )
      })}
</>
    );
  }
}
export default OrderList;
