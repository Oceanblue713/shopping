import React, { useState } from 'react';
import { storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
// Provider
// Consumer

const ProductProvider = (props) => {

  const [products, setProducts] = useState({storeProducts});
  //const [detailProduct, setDetailProduct] = useState(detailProduct);

  const handleDetail = () => {
    console.log('hello from detail');
  }

  const addToCart = () => {
    console.log('hello from add to cart');
  }

  return(
    <ProductContext.Provider value={{
      ...products
    }}>
      {props.children}
    </ProductContext.Provider>
  )
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
