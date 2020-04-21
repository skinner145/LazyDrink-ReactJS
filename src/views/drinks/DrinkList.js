/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:19:40+00:00
 */
import React from "react";
import axios from "axios";
import { Form, ListGroup, Pagination } from "react-bootstrap";

import { Link } from "react-router-dom";

class DrinkList extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      drinks: [],
      types: [],
      refine: '',
      search: '',
      filteredArray: [],
      currentPage: 1,
      itemsPerPage: 15
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.interval = setInterval(() => {
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
    }, 1000)
  }

  handleClick(event){
  this.setState({
    currentPage: Number(event.target.id) //setting current page to number selected by user
  });
}

  updateSearch(e){
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const drinks = this.state.drinks
    let { currentPage, itemsPerPage } = this.state;
    let filteredDrinks = drinks.filter(
      drink => {
        return drink.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const currentItems = filteredDrinks.slice(indexOfFirstItem, indexOfLastItem)

    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(filteredDrinks.length/itemsPerPage); i++){
      pageNumbers.push(i)
    }
    let active;
    const renderPageNumbers = pageNumbers.map(number => {
      return(
        <Pagination.Item key={number} id={number} onClick={this.handleClick} active={number === active}>{number}</Pagination.Item>
      )
    })

    return(
      <>
        <Form>
          <Form.Control type="text" value={this.search} onChange={this.updateSearch.bind(this)} />
        </Form>
        <ListGroup>
          {currentItems.map(drink => {
            return(
              <ListGroup.Item key={drink._id}>
                <Link to={"/drinks/" + drink._id}>{drink.name}</Link>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
        <Pagination id="page-numbers">
          {renderPageNumbers}
        </Pagination>

      </>
    )
  }
}
export default DrinkList;
