import React, { JSX, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaDownload, FaExchangeAlt } from "react-icons/fa";

interface ApiResponseProps {
  response: any;
  executionTime: string;
}

const exportToFile = (data: any, type: string) => {
  const fileData = JSON.stringify(data, null, 2);
  const blob = new Blob([fileData], {
    type: type === "json" ? "application/json" : "text/plain",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `response.${type}`;
  link.click();
};

export function ApiResponse({
  response,
  executionTime,
}: ApiResponseProps): JSX.Element | null {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRaw, setIsRaw] = useState(false);

  if (!response) return null;

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-xl backdrop-blur-sm text-white relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Response
          </h2>
          <p className="text-gray-400 mt-1">
            Tempo de execução: {executionTime ? `${executionTime} ms` : "N/A"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsRaw(!isRaw)}
            className="bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-lg text-white font-medium
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20
            flex items-center gap-2"
          >
            <FaExchangeAlt />
            {isRaw ? "JSON" : "Raw Data"}
          </button>

          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 rounded-lg text-white
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
          >
            <FaDownload />
          </button>
        </div>
      </div>

      <div className="bg-gray-700/50 rounded-lg border border-gray-600">
        <SyntaxHighlighter
          language={isRaw ? "text" : "json"}
          style={atelierLakesideDark}
          wrapLongLines={true}
          wrapLines={true}
          customStyle={{
            background: 'transparent',
            padding: '1.5rem'
          }}
        >
          {isRaw ? JSON.stringify(response) : JSON.stringify(response, null, 2)}
        </SyntaxHighlighter>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-16 right-4 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
          <button
            onClick={() => exportToFile(response, "json")}
            className="block w-full px-4 py-3 text-left hover:bg-gray-700/30 transition-colors duration-200 rounded-t-xl"
          >
            Exportar JSON
          </button>
          <button
            onClick={() => exportToFile(response, "txt")}
            className="block w-full px-4 py-3 text-left hover:bg-gray-700/30 transition-colors duration-200 rounded-b-xl"
          >
            Exportar TXT
          </button>
        </div>
      )}
    </div>
  );
}
