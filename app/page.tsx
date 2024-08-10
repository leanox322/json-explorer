"use client";

import { useState } from "react";
import { FileUploader, JsonExplorer, SearchBar } from "./(components)";

const Home = () => {
  const [jsonData, setJsonData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSON Explorer</h1>
      <FileUploader onFileLoad={setJsonData} />
      {jsonData && (
        <>
          <SearchBar onSearch={setSearchQuery} />
          <JsonExplorer data={jsonData} searchQuery={searchQuery} />
        </>
      )}
    </div>
  );
};

export default Home;
