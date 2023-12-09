import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(showModal({ isShowModal: false, modaChildren: null }))}
      className="z-10 absolute inset-0 backdrop-brightness-50 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default memo(Modal);
