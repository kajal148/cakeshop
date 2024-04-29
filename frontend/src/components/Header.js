import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { Container, Navbar, Nav, Badge, NavDropdown} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ logoutApiCall ] = useLogoutMutation();

  const logoutHandler = async () => {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err?.error);
      }
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                  <Navbar.Brand href="/">Cake Shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <LinkContainer to="/cart">
                          <Nav.Link href="/cart">
                            <i className='fa fa-shopping-cart'></i>
                          Cart {cartItems.length > 0 && 
                          <Badge pill bg="success" style={{
                            marginLeft : '5px'
                          }}
                          > 
                            {cartItems.length}
                          </Badge>}
                          </Nav.Link>
                      </LinkContainer>
                      { userInfo ? (
                        <NavDropdown
                          title={userInfo.name} id="username">
                            <LinkContainer to="/profile" >
                              <NavDropdown.Item>
                                Profile
                              </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>
                              Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                      ) 
                      : (
                        <LinkContainer to="/login">
                          <Nav.Link href="/login">
                            <i className='fa fa-user'></i>
                            Sign In   
                          </Nav.Link>
                        </LinkContainer>
                      ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header;
