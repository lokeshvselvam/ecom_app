import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ServiceCallApi = createApi({
  reducerPath: "ServiceCallApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://unofficial-shein.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set( "x-rapidapi-key", "0168eb0050mshaa3dfd83343445bp1b5a1cjsn014dcfaeb75d" );
      headers.set("x-rapidapi-host", "unofficial-shein.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (pageNo) => ({
        url: "/products/search",
        method: "GET",
        params: {
          language: 'en',
          country: 'US',
          currency: 'INR',
          keywords: 'All Nike items for Men',
          sort: '7',
          limit: '20',
          page: pageNo
        },
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: "/products/v2/detail",
        method: "GET",
        params: {
          language: 'en',
          country: 'US',
          currency: 'INR',
          goods_id: id,
        },
      }),
    }),
    getProductByCategory: builder.query({
      query: () => ({
        url: "/products-by-category",
        method: "GET",
        params: {
          category_id: "2478868012",
          page: "1",
          country: "in",
        },
      }),
    }),
    getSimilarProducts: builder.query({
      query: (params) => ({
        url: "/products/list",
        method: "GET",
        params: {
          language: 'en',
          country: 'US',
          currency: 'INR',
          cat_id: params?.catid,
          adp: params?.goodsid,
          sort: '7',
          limit: '8',
          page: '1'
        },
      }),
    }),
    getProductsBySearch: builder.query({
      query: (search) => ({
        url: "/products/search",
        method: "GET",
        params: {
          language: 'en',
          country: 'US',
          currency: 'INR',
          keywords: search,
          sort: '7',
          limit: '20',
          page: '1',
        },
      }),
    })
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetProductByCategoryQuery, useGetProductsBySearchQuery, useGetSimilarProductsQuery } = ServiceCallApi;