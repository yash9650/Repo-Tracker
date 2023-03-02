import React from "react";

const FloatingAddButton: React.FC<{
  onclick: () => void;
}> = (props) => {
  return (
    <div className="floating-add-btn">
      <button onClick={props.onclick} className="add-btn btn btn-primary">
        +
      </button>
    </div>
  );
};

export default FloatingAddButton;
