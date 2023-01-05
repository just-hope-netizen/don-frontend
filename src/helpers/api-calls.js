import axios from 'axios';

// const backendHost = 'http://localhost:2000/'
const backendHost = 'https://don-backend-production.up.railway.app/'

//auth and verify
export async function register(data) {
  try {
    const res = await axios.post(`${backendHost}auth/register`, data);
    return res
  } catch (err) {
    return err.response
  }
}
export async function verifyUser(userId, uniqueString) {
  try {
    const res = await axios.get(`${backendHost}auth/verify/${userId}/${uniqueString}`);
    return res
  } catch (err) {
    return err.response
  }
}

export async function login(email, password) {

  try {
    const res = await axios.post(`${backendHost}auth/login`, {
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
      `${backendHost}auth/token`,
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
    const res = await axios.get(`${backendHost}products`);
    return res;
  } catch (err) {
    return err.response
  }

}
export async function searchProduct(data) {
  try {
    const res = await axios.get(`${backendHost}products?product=${data}`);
    return res;
  } catch (err) {
    return err.response
  }

}

export async function findProduct(productId) {
  try {
    const res = await axios.get(`${backendHost}products/find/${productId}`);
    return res
  } catch (err) {
    return err.response
  }
}

export async function updateProduct(productId, data, config) {
  try {
    const res = await axios.put(`${backendHost}products/${productId}`, data, config);
    return res
  } catch (err) {
    return err.response
  }
}

export async function createProduct(data, config) {
  try {
    const res = await axios.post(
      `${backendHost}products`,
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
    const res = axios.get(`${backendHost}products?category=${productType}`);
    return res;
  } catch (err) {
    return err.response
  }
}

export async function deleteProduct(productId, config) {
  try {
    const res = await axios.delete(`${backendHost}products/${productId}`, config);
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
      `${backendHost}orders`,
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
      `${backendHost}orders`,
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
      `${backendHost}orders/find/${userId}`,
      config
    );
    return res
  } catch (err) {
    return err.response
  }
}
export async function deleteOrder(orderId, userId, config) {
  try {
    const res = await axios.delete(`${backendHost}orders/${orderId}/${userId}`, config);
    return res
  } catch (err) {
    return err.response
  }

}

//  ******** end

// user
export async function deleteUserAccount(userId, headers) {
  try {
    const res = await axios.delete(`${backendHost}users/${userId}`, headers);
    return res
  } catch (err) {
    return err.response;
  }

}

export async function editProfile(userId, data, config) {
  try {
    const res = await axios.put(`${backendHost}users/${userId}`, data, config);
    return res
  } catch (err) {
    return err.response
  }

}

