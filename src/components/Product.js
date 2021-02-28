import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {ProductConsumer} from '../context';

const Product = (props) => {

  const {id, title, img, price, inCart} = props.product;

  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div className="img-container p-5" onClick={console.log('clicked on img')}>

        </div>
      </div>
    </ProductWrapper>
  );
}


const ProductWrapper = styled.div` `
export default Product;