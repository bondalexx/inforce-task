import "../../assets/css/modal.css";

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;