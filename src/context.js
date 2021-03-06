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
    setCart(cart);
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
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setProducts(tempProducts);
    setCart([...cart, product]);
    addTotals();
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
    let tempCart = cart;
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price
    setCart(tempCart);
    addTotals();
  }

  const decrement = (id) => {
    let tempCart = cart;
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count -= 1;
    if(product.count === 0){
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      setCart(tempCart);
      addTotals();
    }
  }

  const removeItem = (id) => {
    let tempProducts = [...products];
    let tempCart = [...cart];
    tempCart = tempCart.filter(item => item.id !== id );
    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    setCart([...tempCart]);
    setProducts([...tempProducts], () => {addTotals()});
  }

  const clearCart = () => {
    setCart([], () => { setProducts()}, () => { addTotals()});
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
