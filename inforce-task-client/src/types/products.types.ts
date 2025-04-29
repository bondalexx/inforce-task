import { ProductComment } from "./comments.types";
export interface Product {
    id: string;
    imageUrl: string;
    name: string;
    count: number;
    size: {
      width: number;
      height: number;
    };
    weight: string;
    comments: number[];
  }
  
export interface ProductsState {
    products: Product[];
    comments: ProductComment[];
    productsLoadingStatus: "idle" | "loading" | "error";
  }
  
  