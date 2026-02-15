
import React, { useState } from 'react';
import { 
  Building2, Percent, Coins, ShieldCheck, Bell, Globe, Mail, Save, 
  Smartphone, CreditCard, UserPlus, Plus, FileText, Settings2, 
  Workflow, Hash
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'documents' | 'workflow' | 'users'>('company');

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'documents', label: 'Documents & Tax', icon: FileText },
    { id: 'workflow', label: 'Workflows', icon: Workflow },
    { id: 'users', label: 'Permissions', icon: ShieldCheck },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>
          <p className="text-gray-500 text-sm">ERP Core Settings, Document Lifecycle, and Roles</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-black shadow-lg hover:bg-indigo-700 transition-all">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-white text-indigo-700 shadow-sm border border-gray-100 font-black' 
                  : 'text-gray-500 hover:bg-gray-100 font-bold'
              }`}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-12 overflow-hidden">
          {activeTab === 'company' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Currency</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none">
                       <option>USD - US Dollar</option>
                       <option>EUR - Euro</option>
                       <option>GBP - British Pound</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tax System</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none">
                       <option>Standard VAT</option>
                       <option>Sales Tax (US)</option>
                       <option>GST (India)</option>
                    </select>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-12 animate-in fade-in duration-300">
               <section>
                  <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center"><Hash className="w-5 h-5 mr-2 text-indigo-600"/> Auto-Numbering & Prefixes</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {[
                       { label: 'Invoices', val: 'INV-' },
                       { label: 'Quotations', val: 'QT-' },
                       { label: 'Delivery Notes', val: 'DN-' },
                       { label: 'Purchase Orders', val: 'PO-' },
                       { label: 'Receipt Notes', val: 'MRN-' },
                       { id: 'stk-in', label: 'Stock In', val: 'STK-IN-' },
                     ].map((doc, i) => (
                       <div key={i} className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{doc.label}</label>
                          <input type="text" defaultValue={doc.val} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
                       </div>
                     ))}
                  </div>
               </section>
               <section className="pt-8 border-t border-gray-50">
                  <h3 className="text-lg font-black text-gray-900 mb-6">Default Terms & Conditions</h3>
                  <textarea rows={6} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none resize-none" defaultValue="All payments are due within 30 days of the invoice date. Late payments may incur interest charges." />
               </section>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-center space-x-6">
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-indigo-600"><Workflow className="w-8 h-8"/></div>
                  <div>
                     <h4 className="font-black text-indigo-900">Document Lifecycle Management</h4>
                     <p className="text-xs text-indigo-700 font-medium">Configure how quotes convert to invoices and stock is adjusted automatically.</p>
                  </div>
               </div>
               <div className="space-y-4">
                  {[
                    { label: 'Auto-adjust stock on Delivery Note dispatch', active: true },
                    { label: 'Require approval for POs over $5,000', active: true },
                    { label: 'Send automated payment reminders', active: false },
                    { label: 'Archive files linked to closed invoices', active: true },
                  ].map((wf, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                       <span className="text-sm font-bold text-gray-700">{wf.label}</span>
                       <button className={`w-12 h-6 rounded-full relative transition-all ${wf.active ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${wf.active ? 'right-1' : 'left-1'}`} />
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
