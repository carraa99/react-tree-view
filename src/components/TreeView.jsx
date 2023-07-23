import React, { useState } from "react";
import "../App.css";
import { PiCaretRightBold, PiCaretDownBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";

export function TreeItem({ title, children, id, onDeletePosition }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDelete = () => {
    // Make a DELETE request to the JSON server to delete the position by its ID
    axios
      .delete(`http://localhost:5000/positions/${id}`)
      .then((response) => {
        console.log("Position deleted successfully:", response.data);
        onDeletePosition(id); // Notify the parent component that the position is deleted
      })
      .catch((error) => console.error("Error deleting position:", error));
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
            />
            <AiTwotoneEdit className="edit-icon cursor-pointer" />
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
