import { ProductComment } from "../types/comments.types";

import deleteicon from "../assets/img/delete.png";
const Comment:React.FC<{comment:ProductComment, setItemToDelete: (value: string | null) => void, setShowDeleteModal: (value: boolean) => void}> = ({comment, setItemToDelete, setShowDeleteModal}) => {
    return (
        <div className="w-full flex gap-[10px] items-center">
        <div className="bg-gray-50 border w-[calc(100%-50px)] border-gray-200 rounded-xl p-4 shadow-sm ">
            <p className="text-gray-800 text-base mb-2">{comment.description}</p>
            <div className="text-sm text-gray-500 text-right">{comment.date}</div>
        </div>
        <button
        style={{ width: "40px", height: "40px" }}
        className="delete  cursor-pointer hover:bg-[#B03131] duration-200 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setItemToDelete(comment.id);
          setShowDeleteModal(true);
        }}
      >
        <img src={deleteicon} className="w-[30px] h-[30px]" alt="delete" />
      </button>
        </div>
    )
};

export default Comment;