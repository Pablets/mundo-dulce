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

const Header = () => {
  const dispatch = useDispatch()

  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  })

  const [dropDown, setDropDown] = useState(false)

  const ref = useRef()
  const [show, setShow] = useState(false)
  const handleRootClose = () => setShow(false)

  useRootClose(ref, handleRootClose, {
    disabled: !show,
  })

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    setShow(false)
  }

  const handleDropDown = (event) => {
    console.log(event.target.id)
  }

  return (
    <>
      {!isDesktop ? (
        <header style={{ marginTop: '69px' }}>
          <div
            className='d-flex align-items-center py-3 acenter fixed-top bg-yellow-600'
            expand='lg'
          >
            <div>
              <NavLink
                to='/'
                className='text-gray-100'
                activeClassName='text-white'
              >
                Mundo Dulce
              </NavLink>
              <button
                className='text-black bg-red-400 active: border-transparent'
                onClick={() => setShow(true)}
              >
                Menu
              </button>
              <div className='xs-px-0 xs-mx-0' id='basic-navbar-nav'>
                {show && (
                  <div
                    className='p-relative'
                    style={{ height: '100vh', background: 'rgba(0,0,0,.0)' }}
                  >
                    <div ref={ref}>
                      <div className='w-100 px-0 px-md-2 px-lg-2 p-absolute background-transparent'>
                        <Route
                          render={({ history }) => (
                            <SearchBox history={history} />
                          )}
                        />
                      </div>
                      <div>
                        <NavLink to='/cart' onClick={() => setShow(false)}>
                          <i className='fas fa-shopping-cart' />
                          Carrito
                        </NavLink>
                        <div>
                          {userInfo ? (
                            <div>
                              <div className='flex flex-row'>
                                <i className='fas fa-user'></i>
                                <button
                                  id='userdropdown'
                                  // onClick={()=>setDropDown(!dropDown)}
                                  onClick={()=>handleDropDown(!dropDown)}
                                >
                                  {userInfo.name && userInfo.name}
                                </button>
                              </div>
                              {dropDown && (
                                <div title={userInfo.name} id='username'>
                                  <NavLink
                                    to='/profile'
                                    onClick={() => setShow(false)}
                                  >
                                    <button>
                                      <h1>Perfil</h1>
                                    </button>
                                  </NavLink>
                                  <div>
                                    <button onClick={logoutHandler}>
                                      <h1>Salir</h1>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <NavLink to='/login' onClick={() => setShow(false)}>
                              <h5>Ingresar</h5>
                            </NavLink>
                          )}
                        </div>
                        {userInfo && userInfo.isAdmin && (
                          <option title='Admin' id='adminmenu'>
                            <div>
                              <NavLink
                                to='/admin/userlist'
                                onClick={() => setShow(false)}
                              >
                                <h1>Users</h1>
                              </NavLink>
                            </div>
                            <NavLink
                              to='/admin/productlist'
                              onClick={() => setShow(false)}
                            >
                              <h1>Productos</h1>
                            </NavLink>
                            <NavLink
                              to='/admin/orderlist'
                              onClick={() => setShow(false)}
                            >
                              <h1>Ordenes</h1>
                            </NavLink>
                          </option>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
            collapseOnSelect
          >
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand href='/'>Mundo Dulce</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse
                className='xs-px-0 xs-mx-0'
                id='basic-navbar-nav'
              >
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
                          id='username'
                        >
                          <LinkContainer
                            className='bg-dark pt-3 mt-n3 text-light'
                            to='/profile'
                          >
                            <NavDropdown.Item className='bg-dark text-light'>
                              <h6 className=' bg-dark text-light mt-0 pt-0'>
                                Perfil
                              </h6>
                            </NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item
                            className='bg-dark pb-3 mb-n3'
                            onClick={logoutHandler}
                          >
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
