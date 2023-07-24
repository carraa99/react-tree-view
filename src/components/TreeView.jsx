import React, { useState } from "react";
import "../App.css";
import { PiCaretRightBold, PiCaretDownBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";
import { enabled, disabled } from "../features/dialog/positionSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPositionId } from "../features/position/positionSlice";
export function TreeItem({ title, children, id, onDeletePosition, setPositions }) {
  // const editDialog = useSelector((state) => state.dialog.showEditDialog);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(setSelectedPositionId(id));
    dispatch(enabled());
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const deletePositionAndChildren = async (positionId) => {
    // Fetch the position data to check if it has children (subtrees)
    const response = await axios.get(
      `http://localhost:5000/positions/${positionId}`
    );
    const position = response.data;

    // If the position has subtrees, recursively delete all the children positions
    if (position.subtrees && position.subtrees.length > 0) {
      for (const childId of position.subtrees) {
        await deletePositionAndChildren(childId);
      }
    }
setPositions((prevPositions) =>
  prevPositions.filter((pos) => pos.id !== positionId)
);
    // Finally, delete the current position
    await axios.delete(`http://localhost:5000/positions/${positionId}`);
  };

  const handleDelete = async () => {
    // Use the recursive function to delete the current position and its children
    try {
      await deletePositionAndChildren(id);
      console.log("Position and its children deleted successfully");
      onDeletePosition(id);
      // Notify the parent component that the position is deleted
      children.setPositionChanged((prevPosition) => !prevPosition);
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className=""
    >
      <div
        className="list-item hover:bg-gray-100 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          {children ? (
            isOpen ? (
              <PiCaretDownBold className="mr-1 mt-1" />
            ) : (
              <PiCaretRightBold className="mr-1 mt-1" />
            )
          ) : (
            ""
          )}
        </div>
        <div>{title}</div>
        {isHovered && (
          <div className="flex text-gray-700 ml-[10vw]">
            <MdDelete
              className="delete-icon cursor-pointer mr-5"
              onClick={handleDelete}
              title="Delete"
            />
            <AiTwotoneEdit
              className="edit-icon cursor-pointer"
              onClick={handleClickOpen}
              title="Edit"
            />
          </div>
        )}
      </div>
      {isOpen && <div className="list-item-subtree">{children}</div>}
    </div>
  );
}

export function TreeView({ children }) {
  return <div>{children}</div>;
}
