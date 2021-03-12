import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import {
  listFeaturedProducts,
  listFeaturedMobileProducts,
} from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });

  // const productTopRated = useSelector((state) => state.productTopRated);
  // const { loading, error, products } = productTopRated;

  const productFeatured = useSelector((state) => state.productFeatured);
  const {
    loading: desktopLoading,
    error: desktopError,
    products: desktopProducts,
  } = productFeatured;

  // const productFeaturedMobile = useSelector(
  //   (state) => state.productFeaturedMobile
  // );
  // const {
  //   loading: mobileLoading,
  //   error: mobileError,
  //   products: mobileProducts,
  // } = productFeaturedMobile;

  useEffect(() => {
    if (isDesktop) {
      dispatch(listFeaturedProducts());
    } else {
      dispatch(listFeaturedMobileProducts());
    }
  }, [dispatch, isDesktop]);

  
  return desktopLoading ? (
    <Loader />
  ) : desktopError ? (
    <Message variant="danger">{desktopError}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {desktopProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            {isDesktop && (
              <Image src={product.featuredImage} alt={product.name} fluid />
            )}
            {!isDesktop && (
              <Image
                src={product.featuredImageMobile}
                alt={product.name}
                fluid
              />
            )}
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
