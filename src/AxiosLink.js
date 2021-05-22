import axios from 'axios';
const port = process.env.REACT_APP_PORT

/////////////////// TO DISPLAY ALL PRODUCTS /////////////////
export let displayProducts = async () => {
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/products/`
    console.log(url)
    let promise = axios.get(url);
    let response = await promise;
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

//////////////////// TO FIND ONE PRODUCT ////////////////////
export let findOneProduct = async (input, token) => {
  try {
    console.log("find products")
    let url = `https://nb-ecommerce-web-app.herokuapp.com/products/find/${input}`
    let promise = axios.get(url, {
      headers: {
        authorization: token
      }
    });
    let response = await promise;
    console.log("from axios", response)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

/////////////////// TO ADD ONE PRODUCT /////////////////////
export let addProduct = async (name, price, category, inputOnSale, quantity, inputAddImage, inputStock, token) => {
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/products/add/`
    let promise = axios.post(url, {
      name: name,
      price: price,
      category: category,
      onSale: inputOnSale,
      quantity: quantity,
      image: inputAddImage,
      stock: inputStock
    }, {
      headers: {
        authorization: token
      }
    });
    let response = await promise;
    console.log("from axios page", response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

/////////////////////// TO DELETE ONE PRODUCT //////////////////////
export let deleteProduct = async (id, token) => {
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/products/delete`
    let promise = axios.post(url, {
      id: id,
    }, {
      headers: {
        authorization: token
      }
    });
    let response = await promise;
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

//////////////////// TO UPDATE ONE PRODUCT /////////////////////////
export let updateProduct = async (id, newName, newPrice, newCategory, newOnSale, newStock, newImage, token) => {
  try {
    console.log("update products")
    let url = `https://nb-ecommerce-web-app.herokuapp.com/products/update`
    let promise = axios.post(url, {
      id: id,
      name: newName,
      price: newPrice,
      category: newCategory,
      onSale: newOnSale,
      stock: newStock,
      image: newImage
    }, {
      headers: {
        authorization: token
      }
    });
    let response = await promise;
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}


/////////////////// SHOW ALL USERS /////////////////////
export let displayUsers = async () => {
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/user/`
    let promise = axios.get(url);
    let response = await promise;
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

/////////////////// TO REGISTER ONE USER /////////////////////
export let addUser = async (name, lastName, email, password, isAdmin) => {
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/user/register`
    let promise = axios.post(url, {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      isAdmin: isAdmin
    });
    let response = await promise;
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

/////////////////// SIGN IN USER /////////////////////

export let signinUser = async (email, password) => {
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/user/signin`
    let promise = axios.post(url,
      {
        email: email,
        password: password,
      });
    let response = await promise;
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

/////////////////// FIND USER /////////////////////

export let findUser = async (email, token) => {
  console.log("from axios before try", email)
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/user/find`
    let promise = axios.post(url,
      {
        email: email
      }
      , {
        headers: {
          authorization: token
        }
      });

    let response = await promise;
    console.log("from axios once response recieved", response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

/////////////////////// TO DELETE USER //////////////////////
export let deleteUser = async (id, token) => {
  try {
    console.log("from axios id:", id)
    let url = `https://nb-ecommerce-web-app.herokuapp.com/user/delete`
    let promise = axios.post(url, {
      id: id,
    }, {
      headers: {
        authorization: token
      }
    });
    let response = await promise;
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

//////////////////// TO UPDATE ONE USER/////////////////////////
export let updateUser = async (id, userisAdmin, token) => {
  console.log("from axios update products", id, userisAdmin)
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/user/update`
    let promise = axios.post(url, {
      id: id,
      isAdmin: userisAdmin,
    }, {
      headers: {
        authorization: token
      }
    });
    let response = await promise;
    console.log("from axios update", response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

//////////////////// CHECKOUT FIND AND UPDATE STOCK/////////////////////////
export let updateStockProduct = async (cartListBeforePay) => {
  console.log("update products", cartListBeforePay)
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/products/update/stock`
    let promise = axios.post(url, cartListBeforePay);
    let response = await promise;
    console.log(response)
    return response;
  }
  catch (error) {
    console.log(error.message)
  }
}

//////////////////// RESET STOCK DUE TOO CARD FAILURE/////////////////////////
export let resetStockProductdueCardFailure = async (cartListBeforePay) => {
  console.log("to reset products", cartListBeforePay)
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/products/reset/stock`
    let promise = axios.post(url, cartListBeforePay);
    let response = await promise;
    console.log(response)
  }
  catch (error) {
    console.log(error.message)
  }
}

/////////////////// TO ADD ONE ORDER /////////////////////
export let addOrder = async (email, name, lastName, address, postCode, city, country, OrderProdQuantity) => {
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/orders/add`
    let promise = axios.post(url, {
      email: email,
      name: name,
      lastName: lastName,
      address: address,
      postCode: postCode,
      city: city,
      country: country,
      OrderProdQuantity: OrderProdQuantity

    });
    let response = await promise;
    console.log("from axios page order", response.data)
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}

/////////////////// SHOW ALL ORDERS /////////////////////
export let displayOrders = async () => {
  try {
    let url = `https://nb-ecommerce-web-app.herokuapp.com/orders/`
    let promise = axios.get(url);
    let response = await promise;
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}