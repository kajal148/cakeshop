import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem("ck_ct") 
    ? JSON.parse(localStorage.getItem("ck_ct")) 
    : {cartItems : [], shippingAddress: {}, paymentMethod: 'Paypal'}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => {
                return x._id === item._id
            });

            if(existItem){
                state.cartItems = state.cartItems.map((x) => {
                    return x._id === existItem._id ? item : x
                })
            }else{
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart : (state, action) => {
            state.cartItems = state.cartItems.filter((x) => {
                return x._id !== action.payload
            })

            return updateCart(state);
        },
        saveShippingAddress : (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod : (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }
    }
})

//export for dispatch
export const { addToCart, 
            removeFromCart, 
            saveShippingAddress,
            savePaymentMethod, 
            clearCartItems} = cartSlice.actions;


//export for store  
export default cartSlice.reducer;