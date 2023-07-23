import React, { useState } from "react";
import "../App.css";
import { PiCaretRightBold, PiCaretDownBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";

export function TreeItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
              <MdDelete className="delete-icon" />
              <AiTwotoneEdit className="edit-icon" />
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
