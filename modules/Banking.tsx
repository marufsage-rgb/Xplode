
import React, { useState } from 'react';
import { Landmark, Wallet, Plus, ArrowRightLeft, TrendingUp, TrendingDown, DollarSign, MoreHorizontal } from 'lucide-react';
import { BankAccount } from '../types';

const INITIAL_ACCOUNTS: BankAccount[] = [
  { id: '1', name: 'Chase Operating', number: '.... 4242', bankName: 'JPMorgan Chase', balance: 45200.50, currency: 'USD', type: 'Bank' },
  { id: '2', name: 'Main Office Cash', number: 'Cash Drawer 1', bankName: 'Physical Vault', balance: 1250.00, currency: 'USD', type: 'Cash' },
  { id: '3', name: 'Stripe Payouts', number: '.... 8812', bankName: 'Stripe Inc.', balance: 8430.75, currency: 'USD', type: 'Bank' },
];

const Banking: React.FC = () => {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Banking & Cash</h2>
          <p className="text-gray-500 text-sm">Manage your financial accounts and track liquidity</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
            <ArrowRightLeft className="w-4 h-4" />
            <span>Transfer Funds</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-md transition-all">
            <Plus className="w-4 h-4" />
            <span>Add Account</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 -mr-8 -mt-8 rounded-full opacity-50 transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${acc.type === 'Bank' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                {acc.type === 'Bank' ? <Landmark className="w-6 h-6" /> : <Wallet className="w-6 h-6" />}
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{acc.bankName}</p>
              <h3 className="text-lg font-black text-gray-900 mt-1">{acc.name}</h3>
              <p className="text-xs text-gray-500 font-mono mt-0.5">{acc.number}</p>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Balance</p>
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-black text-gray-900">{acc.currency} {acc.balance.toLocaleString()}</h2>
                <div className="flex items-center text-green-500 text-xs font-bold">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+4.2%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Placeholder for "Add Account" visual */}
        <button className="border-2 border-dashed border-gray-200 p-6 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all space-y-3 group">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm">Link New Bank Account</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-10">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Recent Activity</h3>
          <button className="text-xs font-black text-indigo-600 uppercase tracking-widest">Full Statement</button>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { date: 'Today, 10:45 AM', type: 'Deposit', desc: 'TechFlow Subscription Payout', amt: 12500.00, acc: 'Chase Operating', status: 'Cleared' },
            { date: 'Yesterday', type: 'Withdrawal', desc: 'Office Supplies - Amazon', amt: -450.25, acc: 'Chase Operating', status: 'Cleared' },
            { date: 'Dec 18, 2023', type: 'Transfer', desc: 'Transfer to Petty Cash', amt: -500.00, acc: 'Chase Operating', status: 'Cleared' },
            { date: 'Dec 18, 2023', type: 'Deposit', desc: 'Cash Received - Petty Cash', amt: 500.00, acc: 'Main Office Cash', status: 'Cleared' },
          ].map((tx, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className={`p-2.5 rounded-xl ${tx.amt > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {tx.amt > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{tx.desc}</p>
                  <p className="text-xs text-gray-400 font-medium">{tx.date} • {tx.acc}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${tx.amt > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.amt > 0 ? '+' : ''}{tx.amt.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banking;
