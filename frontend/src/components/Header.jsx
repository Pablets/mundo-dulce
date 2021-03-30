import React, { useRef, useState, useEffect } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import useRootClose from 'react-overlays/useRootClose'
import Dropdown from './Dropdown'
import { motion } from 'framer-motion'

const Header = () => {
  const dispatch = useDispatch()

  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  })

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const ref = useRef()
  const [show, setShow] = useState(false)
  const [showItemCount, setShowItemCount] = useState(false)
  const handleRootClose = () => setShow(false)

  useEffect(() => {
    cartItems.length !== 0 ? setShowItemCount(true) : setShowItemCount(false)
  }, [cartItems, showItemCount])

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
        //
        // Mobile version --------->
        //
        <header style={{ marginTop: '63px' }}>
          <div
            className='d-flex fixed top-0 w-screen bg-yellow-600 overflow-visible z-50'
            expand='lg'>
            <div className='mx-0 d-flex'>
              <div className='mx-0 d-flex justify-content-end items-center w-screen pl-1 pr-2 py-3 overflow-visible'>
                <div className='w-4/6 pl-2 mr-4'>
                  <Route
                    render={({ history }) => <SearchBox history={history} />}
                  />
                </div>
                <NavLink
                  to='/cart'
                  onClick={() => setShow(false)}
                  activeClassName='text-decoration-none'
                  className='mr-2'>
                  <i className='text-xl fas fa-shopping-cart ml-2 text-gray-600 relative'>
                    <div className='absolute top-3 left-3 d-flex justify-content-center items-center'>
                      {showItemCount && (
                        <span className='w-5 max-w-6 h-auto p-0 bg-red-600 text-center rounded-full text-white text-sm font-sans font-light'>
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                      )}
                    </div>
                  </i>
                </NavLink>
              </div>
              <button
                className='absolute text-black focus:outline-none top-3 left-3 p-1 h-10 '
                onClick={() => setShow(true)}>
                <i className='fas fa-bars text-xl text-gray-600'></i>
              </button>
              {/* Hacer esto responsivo */}
              <motion.div
                className='full-width absolute'
                animate={show ? { x: 0 } : { x: -290 }}
                transition={{ duration: 0.5 }}>
                <motion.div
                  animate={show ? { x: 0 } : { x: -300 }}
                  transition={{ duration: 0.1 }}
                  className='absolute z-10 w-screen h-screen'></motion.div>
                <div className='bg-gray-800 text-white w-72 h-16 pl-3 d-flex items-center'>
                  {userInfo ? (
                    <span>Bienvenido {userInfo.name}</span>
                  ) : (
                    <span>Bienvenid@</span>
                  )}
                </div>
                <div
                  ref={ref}
                  className='bg-yellow-600 h-screen z-50 absolute w-72 pt-4 pl-2'>
                  <div>
                    {userInfo && (
                      <div className='pb-2 focus:outline-none'>
                        <NavLink
                          to='/'
                          onClick={() => setShow(false)}
                          activeClassName='text-decoration-none text-white focus:text-decoration-none'>
                          <i className='fas fa-home ml-1 text-base text-gray-600' />
                          <span className='ml-2 text-xl font-normal'>
                            Inicio
                          </span>
                        </NavLink>
                      </div>
                    )}
                    <div>
                      {userInfo ? (
                        <div>
                          <Dropdown icon={'fas fa-user'} label={userInfo.name}>
                            <NavLink
                              to='/profile'
                              onClick={() => setShow(false)}
                              activeClassName='text-white'>
                              <button className='ml-7 focus:outline-none'>
                                <span className='font-sans font-normal text-base'>
                                  Perfil
                                </span>
                              </button>
                            </NavLink>
                            <div>
                              <button
                                className='ml-7 focus:outline-none'
                                onClick={logoutHandler}>
                                <span className='font-sans font-normal text-base'>
                                  Salir
                                </span>
                              </button>
                            </div>
                          </Dropdown>
                        </div>
                      ) : (
                        <NavLink to='/login' onClick={() => setShow(false)}>
                          <button className='ml-7 bg-green-500 rounded-md p-2 focus:outline-none'>
                            <span className='font-sans font-normal text-base text-white'>
                              Ingresar
                            </span>
                          </button>
                        </NavLink>
                      )}
                    </div>
                    {userInfo && userInfo.isAdmin && (
                      <Dropdown icon={'fas fa-lock'} label={'Admin'}>
                        <div>
                          <NavLink
                            to='/admin/userlist'
                            onClick={() => setShow(false)}
                            activeClassName='text-white'>
                            <button className='ml-7 focus:outline-none'>
                              <span className='font-sans font-normal text-base'>
                                Usuarios
                              </span>
                            </button>
                          </NavLink>
                        </div>
                        <div>
                          <NavLink
                            to='/admin/productlist'
                            onClick={() => setShow(false)}
                            activeClassName='text-white'>
                            <button className='ml-7 focus:outline-none'>
                              <span className='font-sans font-normal text-base'>
                                Productos
                              </span>
                            </button>
                          </NavLink>
                        </div>
                        <div>
                          <NavLink
                            to='/admin/orderlist'
                            onClick={() => setShow(false)}
                            activeClassName='text-white'>
                            <button className='ml-7 focus:outline-none'>
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
        //
        // desktop version --------->
        //
        <header style={{ marginTop: '63px' }}>
          <div className='d-flex items-center fixed justify-evenly top-0 w-screen h-16 bg-yellow-600 z-50'>
            <div className='focus:outline-none'>
              <NavLink
                to='/page/1'
                activeClassName='text-decoration-none text-white focus:text-decoration-none'>
                {/* <i className='fas fa-home ml-1 text-base text-gray-600' /> */}
                <span className='ml-2 text-xl font-normal hover: text-gray-600 hover: text-decoration-none '>
                  Mundo Dulce
                </span>
              </NavLink>
            </div>
            <div className='w-2/6'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
            <div className='d-flex items-center'>
              <div className='px-2'>
                <NavLink
                  to='/cart'
                  activeClassName='text-decoration-none'
                  className=''>
                  <i className='text-lg fas fa-shopping-cart pb-1 text-gray-600 relative'>
                    <div className='absolute top-3 left-3 d-flex justify-content-center items-center'>
                      {showItemCount && (
                        <span className='w-5 max-w-6 h-auto p-0 bg-red-600 text-center rounded-full text-white text-sm font-sans font-light'>
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                      )}
                    </div>
                  </i>
                </NavLink>
              </div>
              {/* Hacer esto responsivo */}
              <div className='d-flex px-2'>
                {userInfo ? (
                  <div>
                    <Dropdown icon={'fas fa-user'} label={userInfo.name}>
                      <NavLink to='/profile' activeClassName='text-white'>
                        <button className='ml-7 focus:outline-none'>
                          <span className='font-sans font-normal text-base'>
                            Perfil
                          </span>
                        </button>
                      </NavLink>
                      <div>
                        <button
                          className='ml-7 focus:outline-none'
                          onClick={logoutHandler}>
                          <span className='font-sans font-normal text-base'>
                            Salir
                          </span>
                        </button>
                      </div>
                    </Dropdown>
                  </div>
                ) : (
                  <NavLink to='/login' onClick={() => setShow(false)}>
                    <button className='ml-7 bg-green-500 rounded-md p-2 focus:outline-none'>
                      <span className='font-sans font-normal text-base text-white'>
                        Ingresar
                      </span>
                    </button>
                  </NavLink>
                )}
              </div>
              {userInfo && userInfo.isAdmin && (
                <div className='px-2'>
                  <Dropdown icon={'fas fa-lock'} label={'Admin'}>
                    <div>
                      <NavLink
                        to='/admin/userlist'
                        onClick={() => setShow(false)}
                        activeClassName='text-white'>
                        <button className='ml-7 focus:outline-none'>
                          <span className='font-sans font-normal text-base'>
                            Usuarios
                          </span>
                        </button>
                      </NavLink>
                    </div>
                    <div>
                      <NavLink
                        to='/admin/productlist'
                        onClick={() => setShow(false)}
                        activeClassName='text-white'>
                        <button className='ml-7 focus:outline-none'>
                          <span className='font-sans font-normal text-base'>
                            Productos
                          </span>
                        </button>
                      </NavLink>
                    </div>
                    <div>
                      <NavLink
                        to='/admin/orderlist'
                        onClick={() => setShow(false)}
                        activeClassName='text-white'>
                        <button className='ml-7 focus:outline-none'>
                          <span className='font-sans font-normal text-base'>
                            Ordenes
                          </span>
                        </button>
                      </NavLink>
                    </div>
                  </Dropdown>
                </div>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  )
}

export default Header
