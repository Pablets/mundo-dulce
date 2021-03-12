import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="d-flex justify-content-center mb-4 px-0 w-100">
      <Nav.Item className="mx-0 px-0">
        {step1 ? (
          <LinkContainer className="mx-0 px-0" to="/login">
            <Nav.Link className="h6 mx-0 px-2">Sign in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="h6 mx-0 px-2">
            Sign in
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="mx-0 px-0">
        {step2 ? (
          <LinkContainer className="mx-0 px-0" to="/shipping">
            <Nav.Link className="h6 mx-0 px-2">Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="h6 mx-0 px-2">
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="mx-0 px-0">
        {step3 ? (
          <LinkContainer className="mx-0 px-0" to="/payment">
            <Nav.Link className="h6 mx-0 px-2">Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="h6 mx-0 px-2">
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="mx-0 px-0">
        {step4 ? (
          <LinkContainer className="mx-0 px-0" to="/placeorder">
            <Nav.Link className="h6 mx-0 px-2">Place order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="h6 mx-0 px-2">
            Place order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
