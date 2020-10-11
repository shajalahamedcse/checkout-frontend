import React, { Component } from 'react';
import {Container,Row,Col,Card,ListGroup} from 'react-bootstrap';
import {Products} from './products'; 
import { ToastContainer, toast } from 'react-toastify';
export class CheckOut extends Component {
    render() {
        return (
            <div>
            <Container fluid>
                <ToastContainer/>
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
