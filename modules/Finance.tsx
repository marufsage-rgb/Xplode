
import React from 'react';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  FileText, 
  Plus,
  Filter,
  Download
} from 'lucide-react';

const Finance: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Management</h2>
          <p className="text-gray-500 text-sm">Monitor your cash flow, ledgers, and accounts</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm">
            <Plus className="w-4 h-4" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Net Profit</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">$45,200.00</h3>
            <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">+12.4%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Accounts Receivable</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">$18,450.00</h3>
            <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded-lg">15 Overdue</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Accounts Payable</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-2xl font-bold text-gray-900">$12,100.00</h3>
            <span className="text-orange-500 text-xs font-bold bg-orange-50 px-2 py-1 rounded-lg">Due in 7 days</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Transactions</h3>
          <button className="text-indigo-600 text-xs font-bold flex items-center hover:underline">
            <Download className="w-3 h-3 mr-1" /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { date: '2023-12-15', desc: 'Amazon Web Services', cat: 'Cloud Hosting', amt: '-$450.00', status: 'Completed', type: 'exp' },
                { date: '2023-12-14', desc: 'Client Payment - TechFlow', cat: 'Sales', amt: '+$5,200.00', status: 'Completed', type: 'inc' },
                { date: '2023-12-12', desc: 'Office Rental', cat: 'Operations', amt: '-$2,800.00', status: 'Pending', type: 'exp' },
                { date: '2023-12-10', desc: 'Apple Inc Store', cat: 'Equipment', amt: '-$1,249.00', status: 'Completed', type: 'exp' },
                { date: '2023-12-08', desc: 'Stripe Payout', cat: 'Sales', amt: '+$12,400.00', status: 'Completed', type: 'inc' },
              ].map((tx, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${tx.type === 'inc' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {tx.type === 'inc' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{tx.desc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tx.cat}</td>
                  <td className={`px-6 py-4 text-sm font-bold ${tx.type === 'inc' ? 'text-green-600' : 'text-gray-900'}`}>{tx.amt}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                      tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
