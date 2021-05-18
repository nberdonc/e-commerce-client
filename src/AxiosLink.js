import axios from 'axios';

/////////////////// TO DISPLAY ALL PRODUCTS /////////////////
export let displayProducts = async () => {
  try {
    let url = `http://localhost:3000/products/` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
    let promise = axios.get(url);
    let response = await promise;
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
    let url = `http://localhost:3000/products/find/${input}`  //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/products/add/` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/products/delete` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/products/update` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/user/` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/user/register` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/user/signin` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/user/find` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/user/delete` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/user/update` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/products/update/stock` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/products/reset/stock` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/orders/add` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
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
    let url = `http://localhost:3000/orders/` //"https://sleepy-hamlet-65384.herokuapp.com/checkout"
    let promise = axios.get(url);
    let response = await promise;
    return response.data;
  }
  catch (error) {
    console.log(error.message)
  }
}