import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Row, Col } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        className="d-flex align-items-center py-3 acenter"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">Mundo Dulce</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="xs-px-0 xs-mx-0" id="basic-navbar-nav">
            <Col className="w-100 px-0 px-md-2 px-lg-2">
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Col>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="d-flex align-items-center">
                  <h5 className="text-light mr-md-2">
                    <i className="fas fa-shopping-cart pr-3 " />
                    Cart
                  </h5>
                </Nav.Link>
              </LinkContainer>
              <Row>
                <h5 className=" inline bg-dark text-light">
                  <i className="fas fa-user ml-3 py-2 pl-1 pr-3 pr-md-1 ml-lg-4 mr-md-1 mt-md-1 pt-md-2 "></i>
                </h5>
                {userInfo ? (
                  <h5 className="bg-dark text-light">
                    <NavDropdown
                      className="bg-dark mb-0 pb-0 text-light"
                      title={userInfo.name}
                      id="username"
                    >
                      <LinkContainer
                        className="bg-dark pt-3 mt-n3 text-light"
                        to="/profile"
                      >
                        <NavDropdown.Item className="bg-dark text-light">
                          <h6 className=" bg-dark text-light mt-0 pt-0">
                            Profile
                          </h6>
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item
                        className="bg-dark pb-3 mb-n3"
                        onClick={logoutHandler}
                      >
                        <h6 className="text-light">
                          Logout
                        </h6>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </h5>
                ) : (
                  <LinkContainer className="text-light" to="/login">
                    <Nav.Link>
                      <h5 className="text-light">Sign In</h5>
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Row>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
