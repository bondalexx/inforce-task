import { Product as ProductType } from "../types/products.types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../features/products/productsSlice";
import { AppDispatch } from "../store";

import deleteicon from "../assets/img/delete.png";
import "../assets/css/product.css";

const Product:React.FC<{product:ProductType, setItemToDelete: (value: string | null) => void, setShowDeleteModal: (value: boolean) => void}> = ({
  product,
  setItemToDelete,
  setShowDeleteModal,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className="product bg-white"
      onClick={() => {
        dispatch(setSelectedProduct(product))
        navigate(`/product/${product.id}`);
      }}
    >
      <div className="flex flex-col gap-[10px] ">
        <div className="flex justify-center">
          <img
            style={{
              width: product?.size?.width + "px",
              height: product?.size?.height + "px",
            }}
            src={product.imageUrl}
            alt="Product 1"
            className="object-cover"
          />
        </div>
        <div className="cont">
          <h2 className="text-2xl font-medium text-center">{product.name}</h2>
        </div>
      </div>

      <button
        className="delete cursor-pointer hover:bg-[#B03131] duration-200 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setItemToDelete(product.id);
          setShowDeleteModal(true);
        }}
      >
        <img src={deleteicon} className="w-[30px] h-[30px]" alt="delete" />
      </button>
    </div>
  );
};

export default Product;
