import React, { useState, useEffect } from 'react';
import { storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
// Provider
// Consumer

const ProductProvider = (props) => {

  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState();

  // setProducts( () => {
  //   let tempProducts = [];
  //   console.log(tempProducts);
  //   storeProducts.forEach( item => {
  //     const singleItem = { item };
  //     tempProducts = [ ...tempProducts, singleItem];
  //     console.log(item);
  //   });
  //   setProducts(() => {
  //     return { products: tempProducts};
  //   })
  // });

  useEffect(() => {
    setProducts(storeProducts);
  });

  const getItem = (id) => {
    const product = products.find(item => item.id === id);
    return product;
  }

  const handleDetail = (id) => {
    const product = getItem(id);
    setDetail(product);
  };

  const addToCart = (id) => {
    let tempProducts = [...products];
    const index = products.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
  }

  // const tester =() => {
  //   console.log('State Products :', products[0].inCart);
  //   console.log('Data Products: ', storeProducts[0].inCart);

  //   const tempProducts = products;
  //   tempProducts[0].inCart = true
  //   return (setProducts(tempProducts), () => {
  //     console.log('State Products :', products[0].inCart);
  //     console.log('Data Products :', storeProducts[0].inCart);
  //   });
  // }

  return(
    <ProductContext.Provider value={{products, detail, handleDetail: handleDetail, addToCart: addToCart}}>
      {props.children}
    </ProductContext.Provider>
  )
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
