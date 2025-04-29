import AddProductModal from "./Modals/AddProductModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
    addProduct,
    fetchProducts,
    fetchComments,
  } from "../features/products/productsThunks";

  import { Product } from "../types/products.types";
  import { Option } from "../types/filters.type";
  import { AppDispatch } from "../store";
  
  import plus from "../assets/img/plus.png";
  import "../assets/css/navbar.css";
import DropdownSelect from "./DropdownSelect";

const Navbar:React.FC<{ onFilterClick: (filter: Option) => void; activeFilter:Option }> = ({ onFilterClick,activeFilter }) => {
  const [addShowModal, setAddShowModal] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
  
  const handleAddProduct = (productData:Product) => {
    if (!productData.name || !productData.imageUrl || !productData.weight)
      return;
    dispatch(addProduct(productData))
      .unwrap()
      .then(() => {
        dispatch(fetchProducts());
        dispatch(fetchComments());
      })
      .catch((error:Error) => {
        console.error("Add product failed:", error);
      });
  };
  return (
    <div className="w-[1260px] mx-auto pt-[30px] flex justify-between items-center">
      <div className="flex  gap-[20px] h-[36px]">
        <Link to="/">
          <h1 className="text-[24px] font-semibold">Home.</h1>
        </Link>
        <DropdownSelect activeFilter={activeFilter} onChange={onFilterClick} />
      </div>
      <button onClick={() => setAddShowModal(true)} className="w-[36px] h-[36px] rounded-[50%] flex items-center justify-center cursor-pointer bg-[#3DD165] hover:bg-[#2FA74F] hover:scale-[1.05] duration-200 transition-all">
        <img src={plus} alt="add" className="w-[24px] h-[24px]" />
      </button>
       {addShowModal && (
        <AddProductModal
          setAddShowModal={setAddShowModal}
          onAddProduct={handleAddProduct}
          selectedProduct={null}
        />
      )}
    </div>
  );
};

export default Navbar;
