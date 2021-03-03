import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {ProductConsumer} from '../context';

const Product = (props) => {

  const {id, title, img, price, inCart} = props.product;

  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div className="img-container p-5" onClick={() => console.log('clicked on img')}>
          <Link to="/details">
            <img src={img} alt="product" className='card-img-top' />
          </Link>
          <button className="cart-btn" 
                  disabled={inCart ? true : false} 
                  onClick={() => {console.log('add to the cart')}}>
          {inCart ? (<p className="text-capitalize mb-0" disabled>{" "}in Cart</p>) : <i className="fas fa-cart-plus" />}
          </button>
        </div>
        {/* Card footer */}
      </div>
    </ProductWrapper>
  );
}


const ProductWrapper = styled.div` `
export default Product;