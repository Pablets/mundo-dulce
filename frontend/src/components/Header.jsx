import React, { useRef, useState } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Row, Col } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
// import Dropdown from 'react-overlays/Dropdown';
import useRootClose from 'react-overlays/useRootClose'
import Dropdown from './Dropdown'
import { motion } from 'framer-motion'

const Header = () => {
  const dispatch = useDispatch()

  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  })

  // const [dropDown, setDropDown] = useState(false)

  const ref = useRef()
  const [show, setShow] = useState(false)
  const handleRootClose = () => setShow(false)

  useRootClose(ref, handleRootClose, {
    disabled: !show,
  })

  const userLogin = useSelector(state => state.userLogin)

  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    setShow(false)
  }

  return (
    <>
      {!isDesktop ? (
        <header style={{ marginTop: '58px' }}>
          <div
            className='d-flex fixed top-0 w-screen bg-yellow-600 overflow-visible z-50'
            expand='lg'>
            <div className='mx-0 d-flex'>
              <div className='mx-0 d-flex justify-content-between items-center w-screen px-2 py-2 overflow-visible'>
                <NavLink
                  to='/'
                  className='text-gray-100 d-flex text-decoration-none w-12 justify-self-left'
                  activeClassName='text-white'>
                  Mundo Dulce
                </NavLink>
                <div className='mr-20 pl-2'>
                  <SearchBox />
                </div>
              </div>
              <button
                className='absolute text-black bg-red-400 active: border-transparent focus:outline-none p-2 top-2 right-2 h-10 w-14'
                onClick={() => setShow(true)}>
                Menu
              </button>
              <motion.div
                animate={show ? { x: -360 } : { x: -649 }}
                transition={{ duration: 0.5 }}>
                <div
                  ref={ref}
                  className='bg-yellow-600 h-screen z-50 absolute w-72 pt-4 pl-2'>
                  <div>
                    <div className='pb-2'>
                      <NavLink
                        to='/cart'
                        onClick={() => setShow(false)}
                        activeClassName='text-decoration-none'>
                        <i className='fas fa-shopping-cart ml-1 text-base text-gray-700' />
                        <span className='ml-2 text-xl font-normal text-gray-700'>
                          Carrito
                        </span>
                      </NavLink>
                    </div>
                    <div>
                      {userInfo ? (
                        <div>
                          <Dropdown icon={'fas fa-user'} label={userInfo.name}>
                            <NavLink
                              to='/profile'
                              onClick={() => setShow(false)}>
                              <button className='ml-7'>
                                <span className='font-sans font-normal text-base'>
                                  Perfil
                                </span>
                              </button>
                            </NavLink>
                            <div>
                              <button className='ml-7' onClick={logoutHandler}>
                                <span className='font-sans font-normal text-base'>
                                  Salir
                                </span>
                              </button>
                            </div>
                          </Dropdown>
                        </div>
                      ) : (
                        <NavLink to='/login' onClick={() => setShow(false)}>
                          <h5>Ingresar</h5>
                        </NavLink>
                      )}
                    </div>
                    {userInfo && userInfo.isAdmin && (
                      <Dropdown icon={'fas fa-lock'} label={'Admin'}>
                        <div>
                          <NavLink
                            to='/admin/userlist'
                            onClick={() => setShow(false)}>
                            <button className='ml-7'>
                              <span className='font-sans font-normal text-base'>
                                Users
                              </span>
                            </button>
                          </NavLink>
                        </div>
                        <div>
                          <NavLink
                            to='/admin/productlist'
                            onClick={() => setShow(false)}>
                            <button className='ml-7'>
                              <span className='font-sans font-normal text-base'>
                                Productos
                              </span>
                            </button>
                          </NavLink>
                        </div>
                        <div>
                          <NavLink
                            to='/admin/orderlist'
                            onClick={() => setShow(false)}>
                            <button className='ml-7'>
                              <span className='font-sans font-normal text-base'>
                                Ordenes
                              </span>
                            </button>
                          </NavLink>
                        </div>
                      </Dropdown>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>
      ) : (
        <header>
          <Navbar
            className='d-flex align-items-center py-3 acenter'
            bg='dark'
            variant='dark'
            expand='lg'
            collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand href='/'>Mundo Dulce</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse
                className='xs-px-0 xs-mx-0'
                id='basic-navbar-nav'>
                <Col className='w-100 px-0 px-md-2 px-lg-2'>
                  <Route
                    render={({ history }) => <SearchBox history={history} />}
                  />
                </Col>
                <Nav className='ml-auto'>
                  <LinkContainer to='/cart'>
                    <Nav.Link className='d-flex align-items-center'>
                      <h5 className='text-light mr-md-2'>
                        <i className='fas fa-shopping-cart pr-3 ' />
                        Carrito
                      </h5>
                    </Nav.Link>
                  </LinkContainer>
                  <Row>
                    <h5 className=' inline bg-dark text-light'>
                      <i className='fas fa-user ml-3 py-2 pl-1 pr-3 pr-md-1 ml-lg-4 mr-md-1 mt-md-1 pt-md-2 '></i>
                    </h5>
                    {userInfo ? (
                      <h5 className='bg-dark text-light'>
                        <NavDropdown
                          className='bg-dark mb-0 pb-0 text-light'
                          title={userInfo.name}
                          id='username'>
                          <LinkContainer
                            className='bg-dark pt-3 mt-n3 text-light'
                            to='/profile'>
                            <NavDropdown.Item className='bg-dark text-light'>
                              <h6 className=' bg-dark text-light mt-0 pt-0'>
                                Perfil
                              </h6>
                            </NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item
                            className='bg-dark pb-3 mb-n3'
                            onClick={logoutHandler}>
                            <h6 className='text-light'>Salir</h6>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </h5>
                    ) : (
                      <LinkContainer className='text-light' to='/login'>
                        <Nav.Link>
                          <h5 className='text-light'>Ingresar</h5>
                        </Nav.Link>
                      </LinkContainer>
                    )}
                  </Row>
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Usuarios</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Productos</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Ordenes</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      )}
    </>
  )
}

export default Header
