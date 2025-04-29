import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/products.types";
import { ProductComment } from "../../types/comments.types";
import { fetchProductsApi, fetchCommentsApi, deleteProductApi, editProductApi, addProductApi,deleteCommentApi, addCommentApi } from "../../api/productsApi";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    return await fetchProductsApi();
  }
);

export const fetchComments = createAsyncThunk<ProductComment[]>(
  "products/fetchComments",
  async () => {
    return await fetchCommentsApi();
  }
);

export const deleteProduct = createAsyncThunk<string, string>(
  "products/deleteProduct",
  async (id) => {
    await deleteProductApi(id);
    return id;
  }
);

export const editProduct = createAsyncThunk<Product, Product>(
  "products/editProduct",
  async (product) => {
    return await editProductApi(product);
  }
);

export const addProduct = createAsyncThunk<Product, Product>(
  "products/addProduct",
  async (productData) => {
    return await addProductApi(productData);
  }
);

export const deleteProductComment = createAsyncThunk<string, string>(
  "products/deleteProductComment",
  async (id) => {
    await deleteCommentApi(id);
    return id;
  }
);

export const addComment = createAsyncThunk<ProductComment, ProductComment>(
  "products/addComment",
  async (commentData) => {
    return await addCommentApi(commentData);
  }
);