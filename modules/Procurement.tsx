
import React, { useState } from 'react';
import { 
  ShoppingCart, FileText, Truck, CheckCircle, Clock, 
  PackageCheck, Archive, Search, Plus, Filter, 
  Trash2, Printer, X, Box, MoreVertical, Landmark
} from 'lucide-react';

const Procurement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'po' | 'mrn' | 'suppliers'>('po');

  const purchaseOrders = [
    { po: 'PO-2023-00124', sup: 'Global Electronics', date: 'Dec 12, 2023', val: '$12,400.00', status: 'Delivered' },
    { po: 'PO-2023-00125', sup: 'Office Depot Inc', date: 'Dec 14, 2023', val: '$850.50', status: 'Shipped' },
    { po: 'PO-2023-00126', sup: 'Apple Enterprise', date: 'Dec 15, 2023', val: '$24,000.00', status: 'Approved' },
  ];

  const receivedNotes = [
    { id: 'MRN-42', po: 'PO-00124', supplier: 'Global Electronics', qty: '50 units', date: 'Dec 18', status: 'Inspected' },
    { id: 'MRN-43', po: 'PO-00122', supplier: 'Dell Inc', qty: '12 units', date: 'Dec 17', status: 'Pending' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Procurement & Sourcing</h2>
          <p className="text-gray-500 text-sm">Purchase Orders, Material Received Notes (MRN), and Suppliers</p>
        </div>
        <div className="flex space-x-2 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
           {[
             { id: 'po', label: 'Purchase Orders', icon: ShoppingCart },
             { id: 'mrn', label: 'Material Received', icon: PackageCheck },
             { id: 'suppliers', label: 'Suppliers', icon: Truck },
           ].map(t => (
             <button
               key={t.id}
               onClick={() => setActiveTab(t.id as any)}
               className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${activeTab === t.id ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-900'}`}
             >
               <t.icon className="w-3.5 h-3.5" />
               <span className="hidden lg:inline">{t.label}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active POs', count: 18, icon: Clock, color: 'indigo' },
          { label: 'Unbilled Purchases', count: '$12k', icon: Landmark, color: 'blue' },
          { label: 'Goods In-Transit', count: 8, icon: Truck, color: 'orange' },
          { label: 'Sourcing Savings', count: '12%', icon: CheckCircle, color: 'green' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
             <div className={`w-10 h-10 rounded-xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-4`}>
               <item.icon className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{item.count}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {activeTab === 'po' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">PO Number</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Supplier</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Value</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {purchaseOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-black text-indigo-600 font-mono">{order.po}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">{order.sup}</td>
                    <td className="px-6 py-4 text-sm font-black text-gray-900">{order.val}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                       <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><Printer className="w-4 h-4"/></button>
                       {/* // Fix: Moved title attribute to button to satisfy Lucide icon type constraints */}
                       <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Create MRN"><Box className="w-4 h-4"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'mrn' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">MRN #</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Linked PO</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {receivedNotes.map((n, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-black text-indigo-600 font-mono">{n.id}</td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500">{n.po}</td>
                    <td className="px-6 py-4 text-sm font-black text-gray-900">{n.qty}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        n.status === 'Inspected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>{n.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
             <Truck className="w-12 h-12 mx-auto mb-4 text-gray-200" />
             <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Sourcing Directory Active</p>
             <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Onboard New Supplier</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Procurement;
