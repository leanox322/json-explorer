"use client";

import React, { useState } from "react";

interface FileUploader {
  onFileLoad: (data: any) => void;
}

const MAX_FILE_SIZE_MB = 1;

const FileUploader: React.FC<FileUploader> = ({ onFileLoad }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        alert(`File size limit is ${MAX_FILE_SIZE_MB}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          onFileLoad(json);
          setFileName(file.name);
        } catch (error) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload JSON file
      </label>
      <div className="relative">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <button
          type="button"
          className="inline-block w-full py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Choose File
        </button>
      </div>
      {fileName && (
        <span className="font-medium text-gray-800">{fileName}</span>
      )}
    </div>
  );
};

export default FileUploader;
