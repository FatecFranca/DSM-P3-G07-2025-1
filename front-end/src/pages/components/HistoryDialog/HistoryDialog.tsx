import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface HistoryDialogProps {
    historyData: any[];
    onClose: () => void;
    showHistoryDialog: boolean;
    setShowHistoryDialog: (show: boolean) => void;
}

export function HistoryDialog({ historyData, onClose, showHistoryDialog, setShowHistoryDialog }: HistoryDialogProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const itemsPerPage = 5;

    const filteredData = historyData.filter((history) => {
        const matchesSearchQuery = history.status.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStartDate = startDate ? new Date(history.timestamp) >= new Date(startDate) : true;
        const matchesEndDate = endDate ? new Date(history.timestamp) <= new Date(endDate) : true;

        if (statusFilter === 'all') {
            return matchesSearchQuery && matchesStartDate && matchesEndDate;
        } else {
            return matchesSearchQuery && matchesStartDate && matchesEndDate && history.status === statusFilter;
        }
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getMethodColor = (method: string) => {
        switch (method.toUpperCase()) {
            case 'GET':
                return 'bg-blue-500';
            case 'POST':
                return 'bg-purple-500';
            case 'PUT':
                return 'bg-yellow-500';
            case 'DELETE':
                return 'bg-red-500';
            case 'PATCH':
                return 'bg-orange-500';
            default:
                return 'bg-gray-600';
        }
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(event.target.value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        Histórico de Execuções
                    </h2>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200" onClick={() => setShowHistoryDialog(false)}>
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="mb-6 flex gap-4">
                    <input
                        type="date"
                        className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <input
                        type="date"
                        className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                    <select 
                        className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                        onChange={handleStatusChange}
                    >
                        <option value="all">Todos</option>
                        <option value="success">Sucesso</option>
                        <option value="failure">Falha</option>
                    </select>
                </div>

                <div className="bg-gray-800/50 rounded-xl shadow-xl backdrop-blur-sm mb-6">
                    {paginatedData.map((history, index) => {
                        const methodColor = getMethodColor(history.method);
                        return (
                            <div key={index} className="border-b border-gray-700 p-4 hover:bg-gray-700/30 transition-colors duration-200">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${methodColor}`}>
                                            {history.method}
                                        </div>
                                        <span className="text-gray-400">{history.url}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${history.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {history.status === 'success' ? 'Sucesso' : 'Falha'}
                                    </span>
                                </div>
                                <div className="mt-2 text-sm text-gray-400">
                                    <span className="mr-4">Data: {history.timestamp}</span>
                                    <span>Tempo de Resposta: {history.responseTime}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="text-gray-400">Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
}
