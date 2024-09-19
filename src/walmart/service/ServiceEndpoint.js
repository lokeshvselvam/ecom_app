import { ServiceCallApi } from "./ServiceCall";

const ServiceEndpoint = ServiceCallApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductByName: builder.query({
            query: (body) => ({
                url: '/search',
                method: 'GET',
                params: {
                    query: 'Shirt',
                    country: 'IN',
                    page: 2
                },
                body: body
            })
        }),
    })
});

export const { useGetProductByNameQuery } = ServiceEndpoint;