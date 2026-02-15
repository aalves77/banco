
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';

interface TransactionsViewProps {
  transactions: Transaction[];
}

const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(tx => 
    tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Extrato</h2>

      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar lançamentos..."
            className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-12 pr-4 text-xs focus:ring-2 focus:ring-red-500/20"
          />
        </div>
        <button className="p-3 bg-gray-100 rounded-2xl text-gray-600">
          <Filter size={18} />
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto hide-scrollbar">
        <Tab active>Tudo</Tab>
        <Tab>Entradas</Tab>
        <Tab>Saídas</Tab>
        <Tab>Futuros</Tab>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center space-x-2">
            <Calendar size={12} />
            <span>Outubro 2023</span>
          </h3>
          <div className="space-y-4">
            {filteredTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === TransactionType.INCOME ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {tx.type === TransactionType.INCOME ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{tx.title}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{tx.category} • {tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.type === TransactionType.INCOME ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.type === TransactionType.INCOME ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-gray-400">Pago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Tab: React.FC<{ children: React.ReactNode, active?: boolean }> = ({ children, active }) => (
  <button className={`px-5 py-2 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
    active ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
  }`}>
    {children}
  </button>
);

export default TransactionsView;
