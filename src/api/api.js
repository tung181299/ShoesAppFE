import axios from 'axios';
import Storage from '@react-native-async-storage/async-storage'

export const SERVER = 'https://t-shoes-app.herokuapp.com/api/';

const defaultOptions = {
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const mainAxios = axios.create(defaultOptions);
mainAxios.defaults.timeout = 15000;

mainAxios.interceptors.request.use(async config => {
  await Storage.getItem('currentUser')
    .then(value => {
      if (value) {
        let token = JSON.parse(value).token;
        config.headers.Authorization = `Bearer ${token}`;
        // console.log('Bear token', token);
      }
    })
    .catch(error => {
      config.headers.Authorization = '';
      console.log('Can not get token', error);
    });
  return config;
});


// GET PRODUCT
export const API_GET_PRODUCTS = "getProducts";

//GET PRODUCTS IN CART
export const API_GET_PRODUCTS_IN_CART = "getProductsByUserId";
export const API_EDIT_PRODUCT_IN_CART = "editProductIdInCart";
