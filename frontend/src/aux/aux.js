import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/CheckoutSteps';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import { PRODUCT_UPDATE_STOCK_RESET } from '../constants/productConstants';
import { removeFromCart } from '../actions/cartActions';
import { updateProductStock } from '../actions/productActions';

//

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  //asdasd

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // console.log(cartItems);

  const [countInStock, setCountInStock] = useState(0);

  const productUpdateStock = useSelector((state) => state.productUpdateStock);
  const { success: successStockUpdate } = productUpdateStock;

  //asdasdasd

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
        // filtrar de entre todos los PRODUCTS solo los que aparecen en la ORDEN
        // forEach de cada uno restando el QTY de la orden con el de countInStock de cada producto
        // actualizar en la BD
        //Resting the bougth products from the stock
      }

      console.log('sale del loop')
      // (order && successPay && !successUpdate)
    } else if (order && successPay && !successStockUpdate) {
      order.orderItems.forEach((item, i) => {
        setCountInStock(cartItems[i].countInStock - item.qty);
        console.log('countinstock: ', countInStock);
        dispatch(
          updateProductStock({
            _id: item.product,
            countInStock,
          })
        );
        dispatch(removeFromCart(item.product));
      });
      dispatch({ type: PRODUCT_UPDATE_STOCK_RESET });
      console.log('products updated');
    }
  }, [
    dispatch,
    userInfo,
    history,
    orderId,
    successPay,
    successDeliver,
    order,
    cartItems,
    countInStock,
    successStockUpdate,
  ]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <h1 className="pl-3">Shipping</h1>
            <ListGroup.Item>
              <h5>Order {order._id}</h5>
              <div>
                <strong>Name: </strong>
                {order.user.name}
              </div>
              <div>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </div>
              <div>
                <strong>Address: </strong>
                {order.shippingAddress.address} ,{order.shippingAddress.city} ,
                {order.shippingAddress.postalCode} ,
                {order.shippingAddress.country}
              </div>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className=" mt-4 ">
              <div>
                <h2>Payment method</h2>
                <strong>Method: </strong>
                {order.paymentMethod}
              </div>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item className=" mt-4 ">
              <h2 className="sm-1">Order items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col sm={1} md={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col sm={1} md={3} className="pt-3 py-md-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={3} className="py-3">
                          Subtotal: {item.qty} x ${item.price} = $
                          {item.qty * item.price}
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
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="d-flex align-items-center  p-0">
                  <Col>
                    <h3 className="mb-0 font-weight-bold">Total</h3>
                  </Col>
                  <Col>
                    <h3 className="mb-0 font-weight-bold">
                      ${order.totalPrice}
                    </h3>
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && order.paymentMethod === 'PayPal' && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              ,
              {!order.isPaid && order.paymentMethod === 'MercadoPago' && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? <Loader /> : <h2>MercadoPago</h2>}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
