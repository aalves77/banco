
import React from 'react';
import { Card } from '../types';
import { Plus, Settings, ShieldCheck, Snowflake, CreditCard as CardIcon } from 'lucide-react';

interface CardsViewProps {
  cards: Card[];
}

const CardsView: React.FC<CardsViewProps> = ({ cards }) => {
  return (
    <div className="py-4 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Meus Cartões</h2>
        <button className="bg-red-50 p-2 rounded-xl text-red-600 hover:bg-red-100 transition-colors">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-6 overflow-x-auto hide-scrollbar pb-4 -mx-1 px-1">
        {cards.map((card, idx) => (
          <div 
            key={card.id} 
            className={`w-full aspect-[1.586/1] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between ${
              idx === 0 ? 'bg-gradient-to-br from-slate-800 to-slate-950' : 'bg-gradient-to-br from-red-600 to-red-800'
            }`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            
            <div className="flex justify-between items-start">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
                Santander Elite
              </div>
              <div className="text-xl italic font-serif font-bold italic tracking-tighter">
                {card.brand}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex space-x-2 text-xl font-mono tracking-widest">
                <span>••••</span>
                <span>••••</span>
                <span>••••</span>
                <span>{card.lastFour}</span>
              </div>
              <p className="text-[10px] font-medium opacity-60 uppercase tracking-widest">Alexandre Silva</p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[8px] uppercase opacity-60 mb-1">Limite Disponível</p>
                <p className="text-sm font-bold">R$ {(card.limit - card.used).toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-10 h-7 bg-white/20 rounded-md backdrop-blur-md"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CardAction icon={<CardIcon size={20} />} label="Cartão Virtual" />
        <CardAction icon={<ShieldCheck size={20} />} label="Segurança" />
        <CardAction icon={<Snowflake size={20} />} label="Bloqueio Temp." />
        <CardAction icon={<Settings size={20} />} label="Ajustar Limite" />
      </div>

      <section className="bg-white border border-gray-100 rounded-3xl p-6">
        <h3 className="text-sm font-bold mb-4">Gastos por Categoria</h3>
        <div className="space-y-4">
          <SpendingCategory label="Restaurantes" percentage={45} color="bg-red-500" amount="R$ 1.890" />
          <SpendingCategory label="Serviços" percentage={30} color="bg-blue-500" amount="R$ 1.260" />
          <SpendingCategory label="Transporte" percentage={25} color="bg-orange-500" amount="R$ 1.050" />
        </div>
      </section>
    </div>
  );
}

const CardAction: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
    <div className="text-gray-600">{icon}</div>
    <span className="text-xs font-bold text-gray-800">{label}</span>
  </button>
);

const SpendingCategory: React.FC<{ label: string, percentage: number, color: string, amount: string }> = ({ label, percentage, color, amount }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-bold">
      <span className="text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="text-gray-900">{amount}</span>
    </div>
    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default CardsView;
