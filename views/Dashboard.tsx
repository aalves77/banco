
import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, TrendingDown, ArrowRight, Wallet, CreditCard, Send, Smartphone, Landmark } from 'lucide-react';
import { UserAccount, Transaction, Card } from '../types';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

interface DashboardProps {
  user: UserAccount;
  transactions: Transaction[];
  cards: Card[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, cards }) => {
  const [showBalance, setShowBalance] = useState(true);

  const chartData = [
    { value: 10000 }, { value: 11200 }, { value: 10800 }, { value: 12500 }, { value: 12100 }, { value: 12450 }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Balance Card */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-20"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Saldo Total</p>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold">
                {showBalance ? `R$ ${user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••'}
              </h1>
              <button onClick={() => setShowBalance(!showBalance)} className="text-slate-400 hover:text-white transition-colors">
                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          <div className="bg-white/10 px-2 py-1 rounded-lg text-[10px] font-semibold border border-white/10">
            PREMIUM
          </div>
        </div>

        <div className="h-16 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={false} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return null; // Keep it clean
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400 border-t border-white/10 pt-4">
          <div className="flex items-center space-x-1">
            <TrendingUp size={14} className="text-green-400" />
            <span>+ 12.5% este mês</span>
          </div>
          <button className="flex items-center space-x-1 hover:text-white transition-colors">
            <span>Investimentos</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Actions Scrollable */}
      <section>
        <h3 className="text-sm font-bold mb-4 text-gray-800">Ações Rápidas</h3>
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-2">
          <ActionBtn icon={<Send size={22} className="text-blue-500" />} label="Pagar" />
          <ActionBtn icon={<Wallet size={22} className="text-orange-500" />} label="Transferir" />
          <ActionBtn icon={<Smartphone size={22} className="text-purple-500" />} label="Recarga" />
          <ActionBtn icon={<Landmark size={22} className="text-green-500" />} label="Empréstimo" />
        </div>
      </section>

      {/* Cards Preview */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-sm font-bold text-gray-800">Meus Cartões</h3>
          <button className="text-red-600 text-xs font-bold">Ver todos</button>
        </div>
        <div className="space-y-4">
          {cards.slice(0, 1).map(card => (
            <div key={card.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-md flex items-center justify-center text-white text-[8px] font-bold">
                  SANTANDER
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Elite Platinum •••• {card.lastFour}</p>
                  <p className="text-[10px] text-gray-500">Próximo fechamento: 12 Nov</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-900">R$ {card.used.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] text-gray-400">Fatura atual</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-sm font-bold text-gray-800">Transações Recentes</h3>
          <button className="text-red-600 text-xs font-bold">Filtrar</button>
        </div>
        <div className="space-y-4">
          {transactions.slice(0, 3).map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                  {tx.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{tx.title}</p>
                  <p className="text-[10px] text-gray-500">{tx.category} • {tx.date}</p>
                </div>
              </div>
              <p className={`text-xs font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                {tx.type === 'income' ? '+' : '-'} R$ {tx.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const ActionBtn: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="flex flex-col items-center space-y-2 min-w-[72px]">
    <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md active:scale-95 transition-all">
      {icon}
    </div>
    <span className="text-[10px] font-medium text-gray-600">{label}</span>
  </button>
);

export default Dashboard;
