import React, { JSX, useState } from "react";
import { FaUser } from 'react-icons/fa';

export function Topbar(): JSX.Element {
  return (
    <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <span className="text-sm font-bold">RF</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Restify
          </h1>
        </div>

        <div className="flex items-center gap-4">

          <a href="/collections" className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
            Coleções
          </a>

          <a href="/times" className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
            Times
          </a>
        </div>
      </div>

      <button className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200" onClick={() => window.location.href = '/perfil'}>
        <FaUser size={20} className="text-gray-400 hover:text-pink-400 transition-colors duration-200" />
      </button>
    </div>
  );
}
