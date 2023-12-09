/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const TreeNav = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className="cursor-pointer text-gray-600 p-1 text-sm"
        onClick={handleToggle}
      >
        {isExpanded ? (
          <KeyboardArrowDownIcon sx={{ color: "grey" }} />
        ) : (
          <KeyboardArrowRightIcon sx={{ color: "grey" }} />
        )}
        {node.pageTitle}
      </div>
      {isExpanded && node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((childNode) => (
            <li className="pl-3" key={childNode.id}>
              <TreeNav node={childNode} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const CollapsibleTree = ({ data }) => {
  console.log(data);
  return (
    <div className="mt-4 pl-2">
      <ul>
        {data.map((node) => (
          <li key={node.id}>
            <TreeNav node={node} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TreeNav;
