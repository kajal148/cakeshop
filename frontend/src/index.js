import React from 'react';
import ReactDOM from 'react-dom/client';
import './assests/bootstrap.min.css';
import './assests/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import store from './store';
import ProductScreen from './screens/ProductScreen';
import Error from './components/Error';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<Error />}>
            <Route index={true} path="/" element={<HomeScreen />}/>
            <Route index={true} path="product/:id" element={<ProductScreen />} />
            <Route index={true} path="/cart" element={<CartScreen />} />
            <Route index={true} path="/login" element={<LoginScreen />} />
            <Route index={true} path="/register" element={<RegisterScreen />} />
            
            <Route path='' element={<PrivateRoute />}>
                <Route index={true} path="/shipping" element={<ShippingScreen />} />
                <Route index={true} path="/payment" element={<PaymentScreen />} />
                <Route index={true} path="/placeorder" element={<PlaceOrderScreen />} />
            </Route>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
