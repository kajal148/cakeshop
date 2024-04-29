//Parent to all the apis

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl : BASE_URL}),
    tagTypes: ['Products', 'Order', 'User'],
    endpoints: (builder) => ({

    })
});