import { createSlice,PayloadAction  } from "@reduxjs/toolkit";

import { Product } from "../../types/products.types";
import { ProductComment } from "../../types/comments.types";

import { fetchProducts, fetchComments, deleteProduct, editProduct, addProduct, } from "./productsThunks";

interface ProductsState {
  products: Product[];
  comments: ProductComment[];
  productsLoadingStatus: "idle" | "loading" | "error";
  error: string | null;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  comments: [],
  productsLoadingStatus: "idle",
  error: null,  
  selectedProduct: null,
};
  
  
  const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      setSelectedProduct: (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.productsLoadingStatus = "loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
          state.productsLoadingStatus = "idle";
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state) => {
          state.productsLoadingStatus = "error";
        })
        .addCase(fetchComments.fulfilled, (state, action: PayloadAction<ProductComment[]>) => {
          state.comments = action.payload;
        })
        .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
          state.products = state.products.filter((product: Product) => product.id !== action.payload);
        })
        .addCase(editProduct.fulfilled, (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex((product : Product) => product.id === action.payload.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        })
        .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
        });
    },
  });

  export const { setSelectedProduct } = productsSlice.actions;
  export default productsSlice.reducer;