import React, { useState } from 'react';
import Product from './Product';
import Title from './Title';
import { storeProducts } from '../data';
const ProductList = () => {

  const [products, setProducts] = useState([storeProducts]);

  console.log(storeProducts);

  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <div className="row">
            <Title name="our" title="products" />

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductList;