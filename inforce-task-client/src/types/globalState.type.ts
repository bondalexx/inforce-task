import { Product } from "./products.types"
import { ProductComment } from "./comments.types"

export interface GlobalState {
    products: {
      products: Product[],
      comments: ProductComment[],
      productsLoadingStatus: "idle" | "loading" | "error",
      selectedProduct: Product | null
    }
  }