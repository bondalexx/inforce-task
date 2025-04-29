import { useEffect, useState } from "react";
import Modal from "./Modal.tsx";
import { Product } from "../../types/products.types.ts";

import "../../assets/css/productAddModal.css";

const AddProductModal: React.FC<{setAddShowModal: React.Dispatch<React.SetStateAction<boolean>>, onAddProduct: (productData: Product) => void, selectedProduct: Product | null}> = ({ setAddShowModal, onAddProduct, selectedProduct }) => {
  const [newProduct, setNewProduct] = useState<Product>({
    id: "0",
    name: "",
    imageUrl: "",
    count: 1,
    size: { width: 200, height: 200 },
    weight: "",
    comments: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevState:Product) => ({
      ...prevState,
      [name]: name === "count" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.imageUrl && newProduct.weight) {
      onAddProduct(newProduct);
      setNewProduct({
        id: "0",
        name: "",
        imageUrl: "",
        count: 1,
        size: { width: 200, height: 200 },
        weight: "",
        comments: [],
      });
      setAddShowModal(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };
  useEffect(() => {
    if(selectedProduct) {
      setNewProduct(selectedProduct);
    }else{
      setNewProduct({
        id: "0",
        name: "",
        imageUrl: "",
        count: 1,
        size: { width: 200, height: 200 },
        weight: "",
        comments: [],
      });
    }
  },[selectedProduct])
  return (
    <Modal>
      <div className="modal-wrapper">
        <h2>{selectedProduct ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="url"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Count:</label>
            <input
              type="number"
              name="count"
              value={newProduct.count}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Weight:</label>
            <input
              type="text"
              name="weight"
              value={newProduct.weight}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Width:</label>
            <input
              type="number"
              name="width"
              value={newProduct.size.width}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value === null || target.value === undefined) {
                  return;
                }
                setNewProduct((prevState:Product) => ({
                  ...prevState,
                  size: { ...prevState.size, width: Number(target.value) },
                }));
              }}
            />
          </div>
          <div className="form-group">
            <label>Height:</label>
            <input
              type="number"
              name="height"
              value={newProduct.size.height}
              onChange={(e) => {
                if (e.target.value === null || e.target.value === undefined) {
                  return;
                }
                setNewProduct((prevState:Product) => ({
                  ...prevState,
                  size: {
                    ...prevState.size,
                    height: Number(e.target.value),
                  },
                }));
              }}
            />
          </div>
          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-product-button"
              onClick={() => setAddShowModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="add-product-button">
              {selectedProduct ? "Edit" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;
