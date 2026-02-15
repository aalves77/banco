
import React from 'react';
import { UserAccount } from '../types';
import { User, Bell, Shield, Smartphone, HelpCircle, LogOut, ChevronRight, Moon } from 'lucide-react';

interface SettingsViewProps {
  user: UserAccount;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  return (
    <div className="py-4 space-y-8">
      <div className="flex flex-col items-center space-y-4 pt-4">
        <div className="w-24 h-24 rounded-3xl bg-red-100 flex items-center justify-center text-red-600 relative">
          <User size={48} />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-xs text-gray-500 font-medium">Ag: {user.agency} • Cc: {user.accountNumber}</p>
        </div>
        <button className="bg-red-50 text-red-600 px-6 py-2 rounded-full text-[10px] font-bold hover:bg-red-100 transition-colors">
          Editar Perfil
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Conta</h3>
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <SettingsItem icon={<Bell className="text-blue-500" />} label="Notificações" />
            <SettingsItem icon={<Shield className="text-green-500" />} label="Segurança e Privacidade" />
            <SettingsItem icon={<Moon className="text-purple-500" />} label="Modo Escuro" toggle />
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">App</h3>
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <SettingsItem icon={<Smartphone className="text-orange-500" />} label="Configurações do App" />
            <SettingsItem icon={<HelpCircle className="text-gray-500" />} label="Central de Ajuda" />
            <SettingsItem icon={<LogOut className="text-red-500" />} label="Sair da Conta" noArrow />
          </div>
        </section>
      </div>

      <p className="text-center text-[10px] text-gray-400 pb-8">Versão 4.2.1-Premium (2023)</p>
    </div>
  );
}

const SettingsItem: React.FC<{ icon: React.ReactNode, label: string, noArrow?: boolean, toggle?: boolean }> = ({ icon, label, noArrow, toggle }) => (
  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
        {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      </div>
      <span className="text-xs font-bold text-gray-800">{label}</span>
    </div>
    {toggle ? (
      <div className="w-10 h-5 bg-gray-200 rounded-full relative">
        <div className="absolute left-1 top-1 bottom-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
      </div>
    ) : !noArrow && (
      <ChevronRight size={18} className="text-gray-300" />
    )}
  </button>
);

export default SettingsView;
