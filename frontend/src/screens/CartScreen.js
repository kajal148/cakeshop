import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Form, ListGroup, Button, Card, ListGroupItem} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(store => store.cart);
    const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice} = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}));
    }

    const removeFromCartHandler = async (item) => {
        dispatch(removeFromCart(item));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom : '20px' }}>
                    Shopping Cart
                </h1>
                {cartItems.length === 0 ? (
                    <Message> 
                        Your Cart is empty &nbsp;
                        <Link to="/">
                            Go Back
                        </Link>
                    </Message>)
                : (
                    <ListGroup variant="flush">
                        { cartItems.map((item) => {
                        return <ListGroupItem key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image}
                                            alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((q) => {
                                                return (<option key={q + 1} 
                                                value={q + 1}>
                                                    {q + 1}
                                                </option>)
                                            })}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button ttype="button" 
                                            variant="light" 
                                            onClick={() => removeFromCartHandler(item._id)}>
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        })}
                    </ListGroup>
                )}
            </Col>
            { cartItems.length > 0 && 
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush" className='p-3'>
                            <ListGroupItem>
                                <h2>
                                    Items ({ cartItems.reduce((a, i) => a + i.qty, 0)})
                                </h2>
                            </ListGroupItem>
                            <Row className='mt-2'>
                                <Col>
                                    Subtotal
                                </Col>
                                <Col>
                                    <strong>
                                    { itemsPrice }
                                    </strong>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    Shipping Price
                                </Col>
                                <Col>
                                    <strong>
                                        {shippingPrice}
                                    </strong>
                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    Tax Price
                                </Col>
                                <Col>
                                    <strong>
                                        {taxPrice}
                                    </strong>
                                </Col>
                            </Row>
                            <Row className='mt-2' style={{ fontWeight: '700', color: '#1a1a1a'}}>
                                <Col className='font-weight-bold'>
                                    Total Price
                                </Col>
                                <Col>
                                    {totalPrice}
                                </Col>
                            </Row>
                            <ListGroupItem className='d-grid gap-2 mt-2'>
                                <Button type="button" 
                                    className="btn-block" 
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}>
                                    Checkout
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            }
        </Row>
    )
}

export default CartScreen;