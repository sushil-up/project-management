import React, { useRef } from "react";
import Draggable from "react-draggable";
const DraggableWrapper = ({ children, ...props }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable {...props} nodeRef={nodeRef}>
      <div ref={nodeRef}>
        {children}
        </div>
    </Draggable>
  );
};

export default DraggableWrapper;
