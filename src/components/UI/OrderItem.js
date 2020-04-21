/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-04T17:42:32+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:33:47+00:00
 */
import React from "react";
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
import moment from 'moment';

class OrderItem extends React.Component {
  render() {
    const styles = {
      container: {
        backgroundColour: 'pink'
      },
      firstRow:{
        fontSize: 30,
        fontFamily: 'Roboto',
        color: '#333333'
      },
      secondRow: {
        fontSize: 20
      }
    }

    let time = moment(this.props.date).format('HH:mm, DD/MM')
    return(
      <Container fluid>
        <Row>
          <Col xs={8}>
            <div style={styles.firstRow}>
              Table: {this.props.table}
            </div>
          </Col>
          <Col>
            <div style={styles.firstRow}>
              {time}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <div color={'#969696'}style={styles.secondRow}>
              Total: ${this.props.price.toFixed(2)}
            </div>
          </Col>
          <Col>
            <div style={styles.secondRow}>
              <Link to={'/orders/' + this.props.id}>View full order</Link>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default OrderItem;
