"use client";

import { useState, useEffect } from "react";

interface JsonExplorerProps {
  data: any;
  searchQuery: string;
}

const JsonExplorer: React.FC<JsonExplorerProps> = ({ data, searchQuery }) => {
  const [expandedNodes, setExpandedNodes] = useState<{
    [key: string]: boolean;
  }>({});
  const [nothingFound, setNothingFound] = useState(false);

  const searchLowerCase = searchQuery.toLowerCase();

  const toggleExpand = (key: string) => {
    setExpandedNodes((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const shouldDisplayNode = (key: string, value: any): boolean => {
    return (
      key.toLowerCase().includes(searchLowerCase) ||
      (typeof value === "string" &&
        value.toLowerCase().includes(searchLowerCase))
    );
  };

  const hasVisibleChild = (val: any, currentPath: string): boolean => {
    if (typeof val !== "object" || val === null) return false;

    return Object.entries(val).some(([childKey, childValue]) => {
      const childPath = `${currentPath}.${childKey}`;
      return (
        shouldDisplayNode(childKey, childValue) ||
        hasVisibleChild(childValue, childPath)
      );
    });
  };

  const renderNode = (
    key: string,
    value: any,
    path: string
  ): JSX.Element | null => {
    const isExpandable = typeof value === "object" && value !== null;
    const isExpanded = expandedNodes[path] || false;

    const displayNode =
      shouldDisplayNode(key, value) || hasVisibleChild(value, path);
    if (!displayNode) return null;

    return (
      <div key={path} className="ml-2">
        <div
          onClick={() => isExpandable && toggleExpand(path)}
          className={`${
            isExpandable ? "cursor-pointer hover:text-blue-600" : "cursor-auto"
          } text-sm text-gray-800`}
        >
          {isExpandable ? (isExpanded ? "▼" : "▶") : "•"} {key}:{" "}
          {isExpandable ? (
            ""
          ) : (
            <span className="text-blue-600">{String(value)}</span>
          )}
        </div>

        {isExpandable && isExpanded && (
          <div className="ml-4 border-l border-gray-300 pl-2">
            {Object.entries(value).map(([childKey, childValue]) =>
              renderNode(childKey, childValue, `${path}.${childKey}`)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderedNodes = renderNode("root", data, "root");

  useEffect(() => {
    setNothingFound(!renderedNodes);
  }, [searchQuery, renderedNodes]);

  return (
    <div className="json-explorer p-4 bg-white rounded-lg shadow-md">
      {nothingFound ? (
        <p className="text-red-500">Nothing found</p>
      ) : (
        renderedNodes
      )}
    </div>
  );
};

export default JsonExplorer;
