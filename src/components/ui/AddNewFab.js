import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        className="btn btn-primary fab"
        onClick={() => dispatch(uiOpenModal())}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};
