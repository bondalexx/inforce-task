import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts,deleteProduct,fetchComments } from "../features/products/productsThunks.ts";
import { Product as ProductType } from "../types/products.types";
import { GlobalState } from "../types/globalState.type.ts";
import { Option } from "../types/filters.type";
import { AppDispatch } from "../store/index.ts";
import Product from "./Product.tsx";
import DeleteModal from "./Modals/DeleteModal.tsx";
import "../assets/css/productList.css";

const ProductList: React.FC<{ activeFilter: Option }> = ({ activeFilter }) => {
  const { products } = useSelector((state: GlobalState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter.option === "all") {
      return products;
    }
    const alphabeticalSort = (a:ProductType, b:ProductType) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };
    const sortFunctions = {
      alphabetical: (a:ProductType, b:ProductType,) => alphabeticalSort(a, b),
      count: (a:ProductType, b:ProductType) => b.count - a.count,
    };
    const sortFn = sortFunctions[activeFilter.option];
    return sortFn ? [...products].sort(sortFn) : products;
  }, [activeFilter, products]);


  const handleDelete = () => {
    if (itemToDelete === null) return;
  
    dispatch(deleteProduct(itemToDelete))
      .unwrap()
      .catch((error: Error) => {
        console.error("Delete failed:", error);
      });
  
    setShowDeleteModal(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-[32px] w-[1260px] mx-auto font-[400] ">Product List</h1>
      <div className="product-list">
        {showDeleteModal && (
          <DeleteModal
            cancel={() => setShowDeleteModal(false)}
            deleteProduct={handleDelete}
            label={"product"}
          />
        )}
        {filtered?.map((product:ProductType) => (
            <div key={product.id}>
              <Product
                product={product}
                setItemToDelete={setItemToDelete}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
          )) }
      </div>
    </div>
  );
};

export default ProductList;
