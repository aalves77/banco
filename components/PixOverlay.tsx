
import React, { useState } from 'react';
import { X, QrCode, Copy, Key, User, ArrowRight, CheckCircle2, Loader2, Landmark } from 'lucide-react';

interface PixOverlayProps {
  balance: number;
  onClose: () => void;
  onConfirm: (amount: number, receiver: string) => void;
}

const PixOverlay: React.FC<PixOverlayProps> = ({ balance, onClose, onConfirm }) => {
  const [step, setStep] = useState<'menu' | 'transfer' | 'success'>('menu');
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setTimeout(() => {
        onConfirm(Number(amount), receiver || 'Contato Desconhecido');
      }, 2000);
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
        <div className="text-green-500 mb-6">
          <CheckCircle2 size={80} strokeWidth={1.5} className="animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">PIX enviado com sucesso!</h2>
        <p className="text-gray-500 text-sm mb-8 text-center">O comprovante já está disponível em seu extrato.</p>
        <div className="w-full bg-gray-50 rounded-3xl p-6 border border-gray-100">
          <div className="flex justify-between mb-4">
            <span className="text-xs text-gray-500 font-medium">Valor</span>
            <span className="text-sm font-bold text-gray-900">R$ {Number(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500 font-medium">Para</span>
            <span className="text-sm font-bold text-gray-900">{receiver}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in duration-300">
      <div 
        className="w-full max-w-md bg-white rounded-t-[40px] flex flex-col max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
          <h2 className="text-lg font-bold text-gray-900">Área PIX</h2>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
          {step === 'menu' ? (
            <div className="space-y-8">
              <div className="bg-red-50 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider mb-1">Saldo Disponível</p>
                  <p className="text-lg font-bold text-red-900">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <Landmark className="text-red-200" size={32} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MenuOption 
                  icon={<QrCode size={24} />} 
                  label="Ler QR Code" 
                  onClick={() => {}} 
                />
                <MenuOption 
                  icon={<Copy size={24} />} 
                  label="Pix Copia e Cola" 
                  onClick={() => {}} 
                />
                <MenuOption 
                  icon={<Key size={24} />} 
                  label="Transferir por Chave" 
                  onClick={() => setStep('transfer')} 
                  highlight
                />
                <MenuOption 
                  icon={<User size={24} />} 
                  label="Minhas Chaves" 
                  onClick={() => {}} 
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-4">Contatos Recentes</h3>
                <div className="space-y-3">
                  <RecentContact name="Beatriz Santos" key_val="bsantos@email.com" onSelect={(n) => { setReceiver(n); setStep('transfer'); }} />
                  <RecentContact name="Carlos Oliveira" key_val="049.***.***-21" onSelect={(n) => { setReceiver(n); setStep('transfer'); }} />
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                    Destinatário (Chave Pix)
                  </label>
                  <input 
                    type="text" 
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="E-mail, CPF, Celular ou Aleatória"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                    Valor da Transferência
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">R$</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0,00"
                      required
                      step="0.01"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm font-bold focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-2xl flex items-start space-x-3">
                <div className="text-orange-600 mt-0.5"><CheckCircle2 size={16} /></div>
                <p className="text-[10px] text-orange-800 leading-relaxed font-medium">
                  Confira os dados antes de confirmar. O Pix é instantâneo e não pode ser cancelado após o envio.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isLoading || !amount || Number(amount) <= 0}
                className="w-full bg-red-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-200 hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <>
                    <span>Confirmar Envio</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep('menu')}
                className="w-full text-center text-xs font-bold text-gray-500 py-2"
              >
                Voltar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const MenuOption: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void, highlight?: boolean }> = ({ icon, label, onClick, highlight }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-3 p-6 rounded-3xl transition-all active:scale-95 ${
      highlight 
        ? 'bg-red-50 border-2 border-red-100 text-red-600' 
        : 'bg-gray-50 border border-transparent text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="text-[10px] font-bold text-center leading-tight">{label}</span>
  </button>
);

const RecentContact: React.FC<{ name: string, key_val: string, onSelect: (name: string) => void }> = ({ name, key_val, onSelect }) => (
  <button 
    onClick={() => onSelect(name)}
    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
  >
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400">
        <User size={20} />
      </div>
      <div className="text-left">
        <p className="text-xs font-bold text-gray-800">{name}</p>
        <p className="text-[10px] text-gray-400">{key_val}</p>
      </div>
    </div>
    <ArrowRight size={16} className="text-gray-300" />
  </button>
);

export default PixOverlay;
