import Modal from "./Modal.tsx";
import deleteIcon from "../../assets/img/delete.png";
import "../../assets/css/deleteModal.css";

const DeleteModal:React.FC<{ deleteProduct: () => void, cancel: () => void, label: string }> = ({ deleteProduct, cancel, label }) => {
  return (
    <Modal>
      <div className="flex modal-child bg-[white] p-4 cont-parent-delete">
        <div className="flex cont-delete">
          <img src={deleteIcon} width={30} height={30} alt="delete" />
        </div>
        <h2>Are you sure you want to delete this {label}?</h2>
        <div className="flex w-full justify-between">
          <button onClick={cancel} className="cancel-button ">
            Cancel
          </button>
          <button onClick={deleteProduct} className="delete-button ">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
