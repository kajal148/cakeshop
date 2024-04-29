import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { saveShippingAddress } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingScreen = () => {
    const cart = useSelector((state) =>  state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment');
    }

    return <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1> Shipping </h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label> Address </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label> City </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label> Postal Code </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label> Country </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant="primary" className='my-2'>
                Continue
            </Button>

        </Form>
    </FormContainer>
}

export default ShippingScreen;