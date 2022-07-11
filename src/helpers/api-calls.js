import axios from 'axios';

// const developmentUrl = 'http://localhost:2000/'
const productionUrl = 'https://don-remolo-server.herokuapp.com/'

//auth and verify
export async function register(data) {
  try {
    const res = await axios.post(`${productionUrl}auth/register`, data);
    return res
  } catch (err) {
    return err.response
  }
}
export async function verifyUser(userId, uniqueString) {
  try {
    const res = await axios.get(`${productionUrl}auth/verify/${userId}/${uniqueString}`);
    return res
  } catch (err) {
    return err.response
  }
}

export async function login(email, password) {

  try {
    const res = await axios.post(`${productionUrl}auth/login`, {
      email,
      password,
    });
  
    return res;
  } catch (err) {
    return err.response
  }
}

export async function verifyToken(user, config) {
  try {
    const res = await axios.post(
      `${productionUrl}auth/token`,
      user,
      config
    );
    return res

  } catch (err) {
    return err.response;
  }

}
// *********** end

//products
export async function getProducts() {
    try {
      const res = await axios.get(`${productionUrl}products`);
      return res;
    } catch (err) {
      return err.response
    }
  
}
export async function searchProduct(data) {
    try {
      const res = await axios.get(`${productionUrl}products?product=${data}`);
      return res;
    } catch (err) {
      return err.response
    }
  
}

export async function findProduct(productId) {
  try {
    const res = await axios.get(`${productionUrl}products/find/${productId}`);
    return res
  } catch (err) {
    return err.response
  }
}

export async function updateProduct(productId, data, config) {
  try {
    const res = await axios.put(`${productionUrl}products/${productId}`, data , config);
    return res
  } catch (err) {
    return err.response
  }
}

export async function createProduct(data, config) {
  try {
    const res = await axios.post(
      `${productionUrl}products`,
      data,
      config
    );
    return res
  } catch (err) {
    return err.response
  }
}

export async function getProductByCategory(productType) {
  try {
    const res = axios.get(`${productionUrl}products?category=${productType}`);
    return res;
  } catch (err) {
    return err.response
  }
}

export async function deleteProduct(productId, config) {
  try {
    const res = await axios.delete(`${productionUrl}products/${productId}`, config);
    return res
  } catch (err) {
    return err.response
  }

}
//  ******** end

//orders
export async function createOrder(data, config) {
  try {
    const res = await axios.post(
      `${productionUrl}orders`,
      data,
      config
    );
    return res
  } catch (err) {
    return err.response
  }
}

export async function getOrders(config) {
  try {
    const res = await axios.get(
      `${productionUrl}orders`,
      config
    );
    return res
  } catch (err) {
    return err.response
  }
}
export async function getOrder(userId, config) {
  try {
    const res = await axios.get(
      `${productionUrl}orders/find/${userId}`,
      config
    );
    return res
  } catch (err) {
    return err.response
  }
}
export async function deleteOrder(orderId, userId, config) {
  try {
    const res = await axios.delete(`${productionUrl}orders/${orderId}/${userId}`, config);
    return res
  } catch (err) {
    return err.response
  }

}

//  ******** end

// user
export async function deleteUserAccount(userId, headers) {
    try {
    const res =  await axios.delete(`${productionUrl}users/${userId}`, headers);
    return res
    } catch (err) {
      return err.response;
    }
  
}

export async function editProfile(userId, data, config) {
    try {
    const res =  await axios.put(`${productionUrl}users/${userId}`, data, config);
    return res
    } catch (err) {
      return err.response
    }
  
}

