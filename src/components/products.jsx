import React, { Component } from 'react'
import axios from 'axios';
import BASE_URL from '../utils';
import {Card,ListGroup,Button,Row,Col,ButtonGroup} from 'react-bootstrap';


export class Products extends Component {
    
    state ={
        products: [],
        cart: []
    }

    addProduct=(event)=>{
        const data = this.state.cart
        // console.log(event)
        data.forEach(item=>{
            console.log(item)
        })
        this.setState({cart: data})
        
    }

    deductProduct=(event)=>{
        const data = this.state.cart
        const temp = Object.keys(data).filter((key)=>{return data[key]===event})
        data.splice(temp[0],1)
        console.log(data)
    }
    componentDidMount(){

        axios.get(BASE_URL+'/api/v1/products/getall')
        .then(data=>{
            const productData = data.data.data;
            const filteredData = []
            productData.forEach(element => {
                filteredData.push({...element,quantity: 0})
            });
            console.log(filteredData)
            this.setState({products: filteredData})
        })
      
    }
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Header>Products</Card.Header>
                        <ListGroup variant="flush">
                            {this.state.products.map(item=>{
                                return <ListGroup.Item key={item.id}>
                                    <Row>
                                        <Col>{item.name}</Col>
                                        <Col>{item.price}</Col>
                                <Col>
                                <ButtonGroup >
                                <Button variant="primary" onClick={()=>this.addProduct(item)}>+</Button>
                                <Button variant="secondary"  onClick={()=>this.deductProduct(item)}>-</Button>
                                </ButtonGroup>
                                </Col>
                                </Row>
                                </ListGroup.Item>
                                
                            })}
                        </ListGroup>
                    </Card>
            </div>
        )
    }
}

export default Products;
