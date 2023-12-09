/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const TreeNav = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={handleToggle}>
        {isExpanded ? "🔽" : "▶️"} {node.pageTitle}
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
