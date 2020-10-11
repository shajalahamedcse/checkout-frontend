import React, { Component } from 'react';
import {Container,Row,Col,Card,ListGroup} from 'react-bootstrap';
import {Products} from './products'; 

export class CheckOut extends Component {
    render() {
        return (
            <div>
            <Container fluid>
                <Row>
                <Col>
                    <Products/>
                    
                </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default CheckOut
