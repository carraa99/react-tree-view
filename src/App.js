import { TreeView, TreeItem } from "./components/TreeView";
import "./App.css";
import Position from "./components/Position";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const data = [
  {
    id: 1,
    name: "Name 1",
    subtrees: [
      {
        id: 11,
        name: "Name 11",
        subtrees: [],
      },
      {
        id: 12,
        name: "Name 12",
        subtrees: [
          {
            id: 121,
            name: "Name 12111",
            subtrees: [],
          },
          {
            id: 122,
            name: "Name 122",
            subtrees: [],
          },
          {
            id: 123,
            name: "Name 123",
            subtrees: [],
          },
        ],
      },
      {
        id: 13,
        name: "Name 13",
        subtrees: [],
      },
      {
        id: 14,
        name: "Name 14",
        subtrees: [],
      },
    ],
  },
  {
    id: 2,
    name: "Name 2",
    subtrees: [
      {
        id: 22,
        name: "Name 22",
        subtrees: [],
      },
    ],
  },
  {
    id: 3,
    name: "Name 3",
    subtrees: [],
  },
];
const organizePositionsIntoTree = (positions) => {
  const trees = [];

  // Map to quickly find positions by their name
  const positionMap = new Map();
  positions.forEach((position) => positionMap.set(position.name, position));

  // Build the trees
  positions.forEach((position) => {
    if (position.parentName === "NONE") {
      // Standalone tree
      trees.push(position);
    } else if (positionMap.has(position.parentName)) {
      // Subtree
      const parent = positionMap.get(position.parentName);
      if (!parent.subtrees) {
        parent.subtrees = [];
      }
      parent.subtrees.push(position);
    }
  });

  return trees;
};

export default function App() {
  const [positions, setPositions] = useState([]);
   const [positionTree, setPositionTree] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/positions")
      .then((response) => {
        const organizedTree = organizePositionsIntoTree(response.data);
        setPositions(organizedTree);
        setPositionTree(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Modify renderSubtrees to use the fetched positions from the server
  const renderSubtrees = (trees) => {
    return trees.map((tree) => {
      if (!tree.subtrees || tree.subtrees.length === 0) {
        return <TreeItem key={tree.id} id={tree.id} title={tree.name} />;
      }

      return (
        <TreeItem key={tree.id} id={tree.id} title={tree.name}>
          {renderSubtrees(tree.subtrees)}
        </TreeItem>
      );
    });
  };
  const addNewPosition = (newPosition) => {
    window.location.reload()
    setPositions((prevPositions) => [...prevPositions, newPosition]);
    setPositionTree((prevTree) => [...prevTree, newPosition]);
};
  return (
    <div className="App">
      <div className="mt-5 mb-16">
        <TreeView>{renderSubtrees(positions)}</TreeView>
      </div>
      <Position addNewPosition={addNewPosition} positions={positionTree} />
    </div>
  );
}