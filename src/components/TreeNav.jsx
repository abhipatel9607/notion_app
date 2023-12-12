/* eslint-disable react/prop-types */
/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

const TreeNav = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const navigateToPage = (pageId) => {
    navigate("page/" + pageId);
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
        <span onClick={() => navigateToPage(node.pagesId)}>
          {node.pageTitle}
        </span>
      </div>
      {isExpanded && node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((childNode) => (
            <li key={childNode.pagesId} className="pl-3">
              <TreeNav node={childNode} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const CollapsibleTree = ({ data }) => {
  return (
    <div className="mt-4 pl-2">
      <ul>
        {data.map((node) => (
          <li key={node.pagesId}>
            <TreeNav node={node} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TreeNav;
