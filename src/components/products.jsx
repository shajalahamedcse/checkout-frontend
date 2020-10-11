import React, { Component } from 'react'
import axios from 'axios';
import BASE_URL from '../utils';
import {Card,ListGroup,Button,Row,Col,ButtonGroup,InputGroup,FormControl} from 'react-bootstrap';


export class Products extends Component {
    
    state ={
        products: [],
        cart: [],
        subtotal: 0 ,
        promo:''
    }

    handleChange = (e) => {
        this.setState({promo: e.target.value})
    }

    addProduct=(event)=>{
        const data = this.state.cart
        if(data.length!==0){
            let flag = false;
            data.forEach(item=>{
                if(item.id===event.id){
                    event.quantity+=1
                    flag=true;
                }
            })
            if(flag===false){
                data.push(event)
            }
        }
        else{
            event.quantity+=1
            data.push(event)
        }
         
        
        this.setState({cart: data,subtotal: parseFloat(this.state.subtotal)+parseFloat(event.price)})
        
        

        
    }

    deductProduct=(event)=>{
        const data = this.state.cart
        let s = this.state.subtotal;
        if(data.length!==0){
            data.forEach(item=>{
                if(item.id===event.id && item.quantity>0){
                    s=parseFloat(this.state.subtotal)-parseFloat(event.price)
                    item.quantity-=1
                }
            })
        }
        console.log(data)

        this.setState({cart: data,subtotal:s })
       
    }


    checkPromo=()=>{
        const payload = {
            promo_code: this.state.promo,
            cart: this.state.cart,
            subtotal: this.state.subtotal
        }

        axios.post(BASE_URL + '/api/v1/apply-promo', payload).then(res => {
            console.log(res.data)
        }).catch(err=> {
            console.log(err)
        })


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
                <Card style={{ width: '25rem' }}>
                    <Card.Header >Products</Card.Header>
                    <Row>
                        <Col xs={6}>Name</Col>
                        <Col xs={3}>Price</Col>
                        <Col xs={3}>Count</Col>
                    </Row>
                        <ListGroup variant="flush">
                            {this.state.products.map(item=>{
                                return <ListGroup.Item key={item.id}>
                                    <Row>
                                        <Col xs={6}>{item.name}</Col>
                                        <Col xs={3}>{item.price}</Col>
                                        <Col xs={3}>{item.quantity}</Col>
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
                    <br/>
                    <Card style={{ width: '25rem' }}>
                    <Card.Header >Chekouts</Card.Header>
                        <ListGroup variant="flush">
                        <h3 align="center">Subtotal: {this.state.subtotal}</h3>
                        <InputGroup className="mb-3">
                            <FormControl
                            onChange={this.handleChange}
                            placeholder="Enter Promo"
                            aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.checkPromo}>Apply Promo</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        </ListGroup>
                        
                    </Card>
                    
            </div>
        )
    }
}

export default Products;
