import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ login, {isLoading}] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);
    
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);


    const submitHandle = async (event) => {
        event.preventDefault();
        try{
            const res = await login({ email, password}).unwrap();
            dispatch(setCredentials({...res }));
            navigate(redirect);
        }catch(err){
            toast.error(err?.data?.message || err?.error);
        }
    }

    return (
        <FormContainer>
            <h1> Sign in </h1>
            <Form onSubmit={(e) => submitHandle(e)}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label> Password Address </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="aubmit"
                    variant="primary"
                    className='mt-2'
                    disabled={isLoading}>
                    Sign In
                </Button>

                {isLoading && <Loader />}

                <Row className='py-3'>
                    <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen;