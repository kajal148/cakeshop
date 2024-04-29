import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url : PRODUCTS_URL
            }),
            keepUnusedDataFor: 5
        }),
        getProductById: builder.query({
            query: (id) => {
                return {
                    url : `${PRODUCTS_URL}/${id}`
                }
            }
        })
    }),
    overrideExisting: false
});


//its a convention
export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;