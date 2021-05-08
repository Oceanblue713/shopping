import React, { useState, useEffect } from 'react';
import { storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
// Provider
// Consumer

const ProductProvider = (props) => {

  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState(detailProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(detailProduct);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

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
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = {...item};
      tempProducts = [...tempProducts, singleItem];
    })
    setProducts(tempProducts);
  } ,[]);

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
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    console.log(product);
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setProducts(tempProducts);
    setCart([...cart, product]);
    console.log(tempProducts);
    console.log(cart);
  }

  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const increment = (id) => {
    console.log('this is increment method');
  }

  const decrement = (id) => {
    console.log('this is decrement method');
  }

  const removeItem = (id) => {
    console.log('this is removeItem method');
  }

  const clearCart = () => {
    console.log('this is clearCart method');
  }

  const addTotals = () => {
    let subTotal = 0;
    cart.map(item => subTotal += item.total);
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartSubTotal(subTotal);
    setCartTax(tax);
    setCartTotal(total);
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
    <ProductContext.Provider value={{products, 
                                     detail, 
                                     cart,
                                     modalOpen,
                                     modalProduct,
                                     cartSubTotal,
                                     cartTax,
                                     cartTotal,
                                     handleDetail: handleDetail, 
                                     addToCart: addToCart,
                                     openModal: openModal,
                                     closeModal: closeModal,
                                     increment: increment,
                                     decrement: decrement,
                                     removeItem: removeItem,
                                     clearCart: clearCart,
                                     }} >
      {props.children}
    </ProductContext.Provider>
  )
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
