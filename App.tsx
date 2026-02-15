
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Package, 
  Users, 
  ShoppingCart, 
  Files, 
  Search, 
  Bell, 
  Settings as SettingsIcon, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Lock,
  Building2,
  Landmark,
  Zap
} from 'lucide-react';
import { ModuleType } from './types';
import Dashboard from './modules/Dashboard';
import Finance from './modules/Finance';
import Banking from './modules/Banking';
import Inventory from './modules/Inventory';
import SalesCRM from './modules/SalesCRM';
import HRM from './modules/HRM';
import Procurement from './modules/Procurement';
import FileManager from './modules/FileManager/FileManager';
import Settings from './modules/Settings';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginData, setLoginData] = useState({ user: '', pass: '' });
  const [currentCompany, setCurrentCompany] = useState({ id: '1', name: 'XPLODE Global' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.user && loginData.pass) setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-indigo-200">X</div>
            </div>
            <h2 className="text-3xl font-black text-gray-900 text-center mb-2 tracking-tighter">XPLODE ERP</h2>
            <p className="text-gray-500 text-center mb-8 font-medium">Business Solution by MarufEdge</p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Username</label>
                <input 
                  type="text" 
                  required
                  value={loginData.user}
                  onChange={e => setLoginData({...loginData, user: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold" 
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={loginData.pass}
                  onChange={e => setLoginData({...loginData, pass: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold" 
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center space-x-2 uppercase text-xs tracking-[0.2em]"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize Access</span>
              </button>
            </form>
          </div>
          <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Advanced Business Management</p>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: ModuleType.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { id: ModuleType.FINANCE, icon: Wallet, label: 'Financials' },
    { id: ModuleType.BANKING, icon: Landmark, label: 'Banking' },
    { id: ModuleType.INVENTORY, icon: Package, label: 'Inventory' },
    { id: ModuleType.SALES, icon: Users, label: 'Sales & CRM' },
    { id: ModuleType.HRM, icon: Users, label: 'HRM' },
    { id: ModuleType.PROCUREMENT, icon: ShoppingCart, label: 'Procurement' },
    { id: ModuleType.FILE_MANAGER, icon: Files, label: 'File Manager' },
    { id: ModuleType.SETTINGS, icon: SettingsIcon, label: 'Settings' },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD: return <Dashboard />;
      case ModuleType.FINANCE: return <Finance />;
      case ModuleType.BANKING: return <Banking />;
      case ModuleType.INVENTORY: return <Inventory />;
      case ModuleType.SALES: return <SalesCRM />;
      case ModuleType.HRM: return <HRM />;
      case ModuleType.PROCUREMENT: return <Procurement />;
      case ModuleType.FILE_MANAGER: return <FileManager />;
      case ModuleType.SETTINGS: return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0 overflow-hidden">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl shrink-0">X</div>
          {isSidebarOpen && <span className="ml-3 font-black text-lg text-gray-900 tracking-tighter truncate">XPLODE ERP</span>}
        </div>
        
        {/* Company Switcher */}
        {isSidebarOpen && (
          <div className="px-4 py-4">
            <button className="w-full flex items-center px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors group">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <div className="ml-3 text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Company</p>
                <p className="text-sm font-black text-gray-800 truncate">{currentCompany.name}</p>
              </div>
            </button>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                activeModule === item.id 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${activeModule === item.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              {isSidebarOpen && <span className="ml-3 font-bold text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
           <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
             <LogOut className="w-5 h-5 shrink-0" />
             {isSidebarOpen && <span className="ml-3 text-sm font-black">Disconnect</span>}
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-gray-500"><Menu /></button>
            <h1 className="text-lg font-black text-gray-900 ml-2 md:ml-0 uppercase tracking-tight">
              {navItems.find(i => i.id === activeModule)?.label}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <p className="text-[10px] font-black text-gray-400 uppercase text-right tracking-widest">System Cloud</p>
              <div className="flex items-center justify-end space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-black text-gray-700">Online</span>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative"><Bell className="w-5 h-5" /></button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-black text-gray-900">Maruf Edge</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Super Admin</p>
              </div>
              <img src="https://picsum.photos/seed/maruf/32/32" className="w-8 h-8 rounded-xl border border-gray-200" alt="Avatar" />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {renderModule()}
        </div>
      </main>
    </div>
  );
};

export default App;
