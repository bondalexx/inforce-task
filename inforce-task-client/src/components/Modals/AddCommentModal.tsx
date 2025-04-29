import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

import Modal from "./Modal";
import { addComment, fetchComments } from "../../features/products/productsThunks";
import "../../assets/css/productAddModal.css";
const AddCommentModal:React.FC<{productId: number, setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>}> = ({productId, setShowAddModal}) => {
    const [value, setValue] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(value.length>0){
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const formatted = `${hours}:${minutes} ${day}.${month}.${year}`;

            dispatch(addComment({
                id: Date.now().toString(),
                description: value,
                productId,
                date: formatted
            })).unwrap()
                      .then(() => {
                        dispatch(fetchComments());
                      });
            setShowAddModal(false);
        }
    }
    return (
       <Modal>
           <form onSubmit={handleSubmit} className="flex modal-child bg-[white] p-4 modal-wrapper">
                <input onChange={(e) => setValue(e.target.value)} value={value} className="w-full border border-gray-300 rounded-md p-2 outline-none" type="text" placeholder="Add comment" />
                <div className="modal-buttons">

                <button type="button" className="cancel-product-button" onClick={() => setShowAddModal(false)} >Cancel</button>
                <button type="submit" className="add-product-button">Add</button>
                </div>
            </form>
       </Modal>
    )
};

export default AddCommentModal;