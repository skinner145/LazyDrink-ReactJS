/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:19:40+00:00
 */
import React from "react";
import axios from "axios";
import { Card, Form, ListGroup } from "react-bootstrap";

import { Link } from "react-router-dom";

class DrinkList extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      drinks: [],
      types: [],
      refine: '',
      search: '',
      filteredArray: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/drinks')
    .then(res => {
      this.setState({
        drinks: res.data
      })
    })
    .catch(err=> console.log(err))
    axios.get('http://localhost:4000/types')
    .then(res => {
      this.setState({
        types: res.data
      })
    })
    .catch(err => console.log(err))
  }

  updateSearch(e){
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const drinks = this.state.drinks

    let filteredDrinks = drinks.filter(
      drink => {
        return drink.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )

    return(
      <>
        <Form>
          <Form.Control type="text" value={this.search} onChange={this.updateSearch.bind(this)} />
        </Form>
        <ListGroup>
          {filteredDrinks.map(drink => {
            return(
              <ListGroup.Item key={drink._id}>
                <Link to={"/drinks/" + drink._id}>{drink.name}</Link>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </>
    )
  }
}
export default DrinkList;
