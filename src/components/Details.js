import React from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

const Details= () => {
  return (
    <ProductConsumer>
      {value => {
        const {id, company, img, info, price, title, inCart} = value.detail;
        return (
          <div className="container">

          </div>
        )
      }}
    </ProductConsumer>
  );
}

export default Details;
