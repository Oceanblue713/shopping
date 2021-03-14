import React, { useState } from 'react';
import { storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
// Provider
// Consumer

const ProductProvider = (props) => {

  const [products, setProducts] = useState(storeProducts);
  const [detail, setDetail] = useState(detailProduct);

  const handleDetail = () => {
    console.log('hello from detail');
  }

  const addToCart = () => {
    console.log('hello from add to cart');
  }

  const tester =() => {
    console.log('State Products :', products[0].inCart);
    console.log('Data Products: ', storeProducts[0].inCart);

    const tempProducts = products;
    tempProducts[0].inCart = true
    return (setProducts(tempProducts), () => {
      console.log('State Products :', products[0].inCart);
      console.log('Data Products :', storeProducts[0].inCart);
    });
  }

  return(
    <ProductContext.Provider value={{products, detail, handleDetail: handleDetail, addToCart: addToCart}}>
      <button onClick={tester}>tester</button>
      {props.children}
    </ProductContext.Provider>
  )
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
