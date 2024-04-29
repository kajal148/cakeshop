import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const cart = useSelector((state) =>  state.cart);
    const { shippingAddress, paymentMethod } = cart;
    const [createOrder, { isLoading, error}] = useCreateOrderMutation();

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.orderItems,
                shippingAddress : cart.shippingAddress,
                paymentMethod : cart.paymentMethod,
                itemsPrice : cart.itemsPrice, 
                taxPrice : cart.taxPrice,
                shippingPrice : cart.shippingPrice,
                totalPrice : cart.totalPrice
            }).unwrap(); // returns  a promise thats why unwrap

            console.log(res, "RES");
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping');
        }else if(!paymentMethod){
            navigate('/payment');
        }
    }, [shippingAddress, paymentMethod, navigate]);

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> Shipping </h2>
                            <p>
                                <strong> Address </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {cart.shippingAddress.postalCode}, {' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2> Payment Method </h2>
                            <p>
                                <strong> Method </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2> Order Items </h2>
                            <strong> Method: </strong>
                            {cart.cartItems.length === 0 ? (
                                <Message> Your Cart is Empty </Message>
                            ): (
                                <ListGroup variant='flush'>
                                    { cart.cartItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row>
                                                <Col md={1}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                                </Col>
                                                <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2> Order Summary </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col> ${cart.itemsPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Shipping: </Col>
                                    <Col> ${cart.shippingPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Tax: </Col>
                                    <Col> ${cart.taxPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Total: </Col>
                                    <Col> ${cart.totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Button type="button"
                                        className='btn-block'
                                        disabled={cart.cartItems.length === 0}
                                        onClick={placeOrderHandler}>
                                    Place Order
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen;
