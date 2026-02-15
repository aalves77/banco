
import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  PieChart, 
  MessageSquare, 
  Bell, 
  Search, 
  ScanLine
} from 'lucide-react';
import { Transaction, TransactionType, UserAccount, Card } from './types';
import Dashboard from './views/Dashboard';
import TransactionsView from './views/TransactionsView';
import CardsView from './views/CardsView';
import AIAssistant from './views/AIAssistant';
import SettingsView from './views/SettingsView';
import PixOverlay from './components/PixOverlay';

const App: React.FC = () => {
  const [showPix, setShowPix] = useState(false);
  const [user, setUser] = useState<UserAccount>({
    name: "Alexandre Silva",
    balance: 12450.60,
    savings: 45000.00,
    accountNumber: "1234567-8",
    agency: "0001"
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Restaurante Fogo de Chão', amount: 350.00, date: '2023-10-25', category: 'Alimentação', type: TransactionType.EXPENSE },
    { id: '2', title: 'Salário Tech Corp', amount: 8500.00, date: '2023-10-05', category: 'Renda', type: TransactionType.INCOME },
    { id: '3', title: 'Netflix', amount: 55.90, date: '2023-10-10', category: 'Entretenimento', type: TransactionType.EXPENSE },
    { id: '4', title: 'Posto Shell', amount: 210.00, date: '2023-10-12', category: 'Transporte', type: TransactionType.EXPENSE },
    { id: '5', title: 'Venda de Investimento', amount: 1200.00, date: '2023-10-15', category: 'Investimentos', type: TransactionType.INCOME },
  ]);

  const [cards] = useState<Card[]>([
    { id: 'c1', lastFour: '4589', brand: 'Visa', type: 'Credit', limit: 15000, used: 4200 },
    { id: 'c2', lastFour: '1234', brand: 'Mastercard', type: 'Credit', limit: 5000, used: 0 },
  ]);

  const handlePixTransfer = (amount: number, receiver: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title: `Pix enviado para ${receiver}`,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      category: 'Transferência',
      type: TransactionType.EXPENSE
    };

    setTransactions([newTransaction, ...transactions]);
    setUser(prev => ({ ...prev, balance: prev.balance - amount }));
    setShowPix(false);
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative pb-20">
        {/* Header */}
        <header className="px-6 pt-6 pb-2 sticky top-0 bg-white/80 backdrop-blur-md z-10 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Bom dia,</p>
              <h2 className="text-sm font-bold text-gray-900">{user.name}</h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto hide-scrollbar px-6">
          <Routes>
            <Route path="/" element={<Dashboard user={user} transactions={transactions} cards={cards} />} />
            <Route path="/transactions" element={<TransactionsView transactions={transactions} />} />
            <Route path="/cards" element={<CardsView cards={cards} />} />
            <Route path="/ai" element={<AIAssistant transactions={transactions} userName={user.name} />} />
            <Route path="/settings" element={<SettingsView user={user} />} />
          </Routes>
        </main>

        {/* Floating Action Button - PIX */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20">
          <button 
            onClick={() => setShowPix(true)}
            className="bg-red-600 text-white p-4 rounded-2xl shadow-lg shadow-red-200 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
          >
            <ScanLine size={24} />
            <span className="font-bold text-sm">PIX</span>
          </button>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-10">
          <NavItem to="/" icon={<Home size={22} />} label="Início" />
          <NavItem to="/transactions" icon={<PieChart size={22} />} label="Extrato" />
          <div className="w-12"></div> {/* Spacer for FAB */}
          <NavItem to="/ai" icon={<MessageSquare size={22} />} label="S-IA" />
          <NavItem to="/cards" icon={<CreditCard size={22} />} label="Cartões" />
        </nav>

        {/* PIX Modal Overlay */}
        {showPix && (
          <PixOverlay 
            balance={user.balance} 
            onClose={() => setShowPix(false)} 
            onConfirm={handlePixTransfer} 
          />
        )}
      </div>
    </HashRouter>
  );
}

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex flex-col items-center space-y-1 transition-all ${isActive ? 'text-red-600' : 'text-gray-400 hover:text-gray-600'}`
    }
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </NavLink>
);

export default App;
