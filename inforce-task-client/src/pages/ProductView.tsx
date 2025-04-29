import { useEffect, useState } from "react";
import { GlobalState } from "../types/globalState.type";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { deleteProductComment, editProduct, fetchComments, fetchProducts } from "../features/products/productsThunks";
import { AppDispatch } from "../store";

import { ProductComment } from "../types/comments.types";
import { Product } from "../types/products.types";

import AddProductModal from "../components/Modals/AddProductModal";
import DeleteModal from "../components/Modals/DeleteModal.tsx";
import Comment from "../components/Comment";

import plus from "../assets/img/plus.png"
import edit from "../assets/img/edit.png"
import AddCommentModal from "../components/Modals/AddCommentModal.tsx";
const ProductView = () => {
    const {id} = useParams();
    const { comments, products } = useSelector((state: GlobalState) => state.products);
    const dispatch = useDispatch<AppDispatch>();

    const [productComments, setProductComments] = useState<ProductComment[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [shoAddModal, setShowAddModal] = useState<boolean>(false);

    const handleDeleteComment = () => {
        if (commentToDelete === null) return;
        dispatch(deleteProductComment(commentToDelete))
          .unwrap()
          .then(() => {
            dispatch(fetchComments());
          })
          .catch((error:Error) => {
            console.error("Delete comment failed:", error);
          });
        setShowDeleteModal(false);
      };
      const handleEditProduct = (productData:Product) => {
        if (!productData.name || !productData.imageUrl || !productData.weight)
          return;
        dispatch(editProduct(productData))
          .unwrap()
          .then(() => {
            dispatch(fetchProducts());
            dispatch(fetchComments());
          })
          .catch((error:Error) => {
            console.error("Add product failed:", error);
          });
      };

    useEffect(() => {
        dispatch(fetchComments());
        dispatch(fetchProducts());
    },[dispatch])
    useEffect(() => {
        if(id && products.length > 0) {
            const foundProduct = products.find((product:Product) => product.id == id);
            setSelectedProduct(foundProduct ?? null);
        }
      }, [id, products]);
    useEffect(() => {
        if (selectedProduct && comments) {
           setProductComments(comments.filter((comment) => comment.productId == Number(selectedProduct.id)));
        }
    }, [comments, selectedProduct]);
    return (
       <div className="w-full flex flex-col gap-[30px]">
        {openModal && (
        <AddProductModal
          setAddShowModal={setOpenModal}
          onAddProduct={handleEditProduct}
          selectedProduct={selectedProduct}
        />
      )}
        {showDeleteModal && (
        <DeleteModal
          deleteProduct={handleDeleteComment}
          cancel={() => {setShowDeleteModal(false); setCommentToDelete(null)}}
          label="comment"
        />
      )}
      {shoAddModal && (
        <AddCommentModal
            setShowAddModal={setShowAddModal}
          productId={Number(selectedProduct?.id)}
        />
      )}
            <h1 className="text-3xl text-center">PRODUCT DETAILS</h1>
            <div className="flex w-full gap-[30px] justify-center">
                <div className="w-[calc(50%-15px)] py-[100px] pr-[150px] flex items-center justify-end">
                    <img className="w-[500px] h-[500px] object-cover" src={selectedProduct?.imageUrl} alt={selectedProduct?.name} />
                </div>
                <div className="w-[calc(50%-222px)] flex flex-col gap-[50px]">
                    <div className="flex justify-between gap-[10px] text-wrap">
                        <p className="text-4xl uppercase font-bold tracking-wider break-words whitespace-normal max-w-[calc(100%-40px)] flex-grow">{selectedProduct?.name}</p>
                        <img onClick={() => setOpenModal(true)} src={edit} alt="edit" className="w-[30px] h-[30px] cursor-pointer" />
                    </div>
                    <p className="text-3xl font-semibold">Count: {selectedProduct?.count}</p>
                    <p className="text-3xl font-semibold">Size: {selectedProduct?.size?.width}x{selectedProduct?.size?.height}</p>
                    <p className="text-3xl font-semibold">Weight: {selectedProduct?.weight}</p>
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex justify-between items-center">
                            <h3 className="text-3xl font-semibold">Comments:</h3>
                            <button onClick={() => setShowAddModal(true)} className="w-[24px] h-[24px] rounded-[50%] flex items-center justify-center cursor-pointer bg-[#3DD165] hover:bg-[#2FA74F] hover:scale-[1.05] duration-200 transition-all">
                                <img src={plus} alt="add" className="w-[16px] h-[18px]" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-[16px] bg-[white] rounded-[10px] w-full h-[350px] overflow-auto shadow-xl p-[20px]">
                           {productComments.length > 0 ? productComments.map((comment, index) => <Comment setShowDeleteModal={setShowDeleteModal} setItemToDelete={setCommentToDelete} key={index} comment={comment} />) : <div className="h-full flex items-center justify-center"><h1 className="text-center text-3xl font-bold">No comments</h1></div>}
                        </div> 
                    </div>
                </div>

            </div>
       </div> 
    );
};

export default ProductView;