
import axios from "axios";
import { Product } from "../types/products.types";
import { ProductComment } from "../types/comments.types";
import { BASE_URL } from "../config/apiConfig";


export const fetchProductsApi = async (): Promise<Product[]> => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const fetchProductByIdApi = async (id: string): Promise<Product> => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
}

export const fetchCommentsApi = async (): Promise<ProductComment[]> => {
  const response = await axios.get(`${BASE_URL}/comments`);
  return response.data;
};

export const deleteProductApi = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/products/${id}`);
};

export const editProductApi = async (product: Product): Promise<Product> => {
  const response = await axios.put(`${BASE_URL}/products/${product.id}`, product);
  return response.data;
};

export const addProductApi = async (product: Product): Promise<Product> => {
  const { id, ...newProduct } = product;
  const response = await axios.post(`${BASE_URL}/products`, newProduct);
  return response.data;
};

export const deleteCommentApi = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/comments/${id}`);
};

export const addCommentApi = async (comment: ProductComment): Promise<ProductComment> => {
  const response = await axios.post(`${BASE_URL}/comments`, comment);
  return response.data;
};