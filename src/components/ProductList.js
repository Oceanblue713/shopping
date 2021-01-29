import React, { Fragment, useState } from 'react';
import Product from './Product';
import Title from './Title';
import { storeProducts } from '../data';

const ProductList = () => {

  const [products, setProducts] = useState([storeProducts]);

  return (
    <Fragment>
      <div className="py-5">
        <div className="container">
          <div className="row">
            <Title name="our" title="products" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductList;