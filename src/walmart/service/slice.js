import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: null,
    cart: [],
    wishList: [],
    searchText: null,
    successToast:null,
};

const actionReducer = createSlice({
    name: 'actionReducer',
    initialState,
    reducers: {
        addToCart: (state, action) => {
           const existingProduct = state?.cart?.find((value) => ((value?.goods_id || value?.info?.goods_id) === (action?.payload?.goods_id || action?.payload?.info?.goods_id)));
           if(existingProduct){
                action.payload += existingProduct;
           }else{
                state.cart.push(action.payload)
           }
        },
        removeFromCart: (state, action) => {
            state.cart = state?.cart?.filter((remove) => ((remove?.goods_id || remove?.info?.goods_id) !== (action?.payload?.goods_id || action?.payload?.info?.goods_id)));
        },
        // productIncreament: (state, action) => {
        //     const existingProduct = state.cart.find((value) => {
        //         if(value.asin === action.payload.asin){
        //             return {...value, product_num_offers: value.product_num_offers++}
        //         }else{
        //             return value
        //         }
        //     });
        //     return existingProduct;
        // },
        // productDecreament: (state, action) => {
        //     const existingProduct = state.cart.find((value) => {
        //         if(value.asin === action.payload.asin){
        //             return {...value, product_num_offers: value.product_num_offers--}
        //         }else{
        //             return value
        //         }
        //     });
        //     return existingProduct;
        // },
        addToWishList: (state, action) => {
            const existingProduct = state?.wishList?.find((value) => ((value?.goods_id || value?.info?.goods_id) === (action?.payload?.goods_id || action?.payload?.info?.goods_id)));
           if(existingProduct){
                action.payload += existingProduct;
           }else{
                state.wishList.push(action.payload)
           }
        },
        removeFromWishList: (state, action) => {
            state.wishList = state.wishList.filter((item) => ((item?.goods_id || item?.info?.goods_id) !== (action?.payload?.goods_id || action?.payload?.info?.goods_id)))
        },
        qntIncrease: (state, action) => {
            const { id, items } = action.payload;
            const existingProduct = state?.cart?.find((value) => (value?.goods_id || value?.info?.goods_id) === id);
            const stock = existingProduct?.goods_id?.slice(0, 2) || existingProduct?.info?.goods_id?.slice(0, 2);
            if(existingProduct && items <= stock){
                if(existingProduct?.is_on_sale){
                    existingProduct.is_on_sale = items;
                }else if(existingProduct?.info?.is_on_sale){
                    existingProduct.info.is_on_sale = items;
                }
            }
        },
        emptyCart: (state, action) => {
            state.cart = [];
        },
        productSuccessToast: (state, action) => {
            state.successToast = action.payload;
        }
    },
});

export default actionReducer.reducer;
export const { 
                addToCart, 
                removeFromCart, 
                productIncreament, 
                productDecreament, 
                addToWishList, 
                removeFromWishList, 
                qntIncrease, 
                searchProText,
                emptyCart,
                productSuccessToast
            } = actionReducer.actions;