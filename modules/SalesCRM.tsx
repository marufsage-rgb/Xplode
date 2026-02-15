
import React, { useState, useRef } from 'react';
import { 
  Users, Mail, Phone, ExternalLink, UserPlus, FileText, Printer, 
  MoreVertical, Search, Plus, Filter, Download, Trash2, CheckCircle2, 
  X, FileSignature, Truck, BookOpen, ChevronRight, TrendingUp
} from 'lucide-react';

const SalesCRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'quotes' | 'invoices' | 'delivery' | 'ledger'>('contacts');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    if (windowPrint && printContent) {
      windowPrint.document.write('<html><head><title>Print Document</title>');
      windowPrint.document.write('<script src="https://cdn.tailwindcss.com"></script>');
      windowPrint.document.write('<style>body { font-family: sans-serif; }</style>');
      windowPrint.document.write('</head><body>');
      windowPrint.document.write(printContent.innerHTML);
      windowPrint.document.write('</body></html>');
      windowPrint.document.close();
      windowPrint.focus();
      setTimeout(() => {
        windowPrint.print();
        windowPrint.close();
      }, 500);
    }
  };

  const tabs = [
    { id: 'contacts', label: 'Customers', icon: Users },
    { id: 'quotes', label: 'Quotations', icon: FileSignature },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'delivery', label: 'Delivery Notes', icon: Truck },
    { id: 'ledger', label: 'Ledger', icon: BookOpen },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'contacts':
        return (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search customers..." className="pl-9 pr-4 py-1.5 bg-gray-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 w-48" />
              </div>
              <button className="text-xs font-black text-indigo-600 uppercase tracking-widest">Manage Groups</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Balance</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Sales</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'John Cooper', company: 'Cooper Logistics', bal: '$1,200', rev: '$24,500', status: 'Active' },
                    { name: 'Sarah Blake', company: 'Nova Labs', bal: '$0', rev: '$12,200', status: 'Active' },
                    { name: 'Robert Fox', company: 'Fox Designs', bal: '-$50', rev: '$8,900', status: 'Inactive' },
                  ].map((contact, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img src={`https://picsum.photos/seed/${contact.name}/32/32`} className="w-8 h-8 rounded-full mr-3" />
                          <div>
                            <p className="text-sm font-black text-gray-900">{contact.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{contact.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm font-black ${contact.bal.startsWith('-') ? 'text-red-500' : 'text-gray-900'}`}>{contact.bal}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-600">{contact.rev}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${contact.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{contact.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'ledger':
        return (
          <div className="space-y-6">
            <div className="bg-indigo-600 p-10 rounded-[2rem] text-white flex justify-between items-center shadow-2xl shadow-indigo-100">
               <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Receivables Ledger</p>
                  <h3 className="text-5xl font-black mt-2">$45,200.00</h3>
               </div>
               <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md border border-white/10">
                  <TrendingUp className="w-10 h-10" />
               </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-50 font-black text-gray-900 uppercase tracking-widest text-sm">Statement of Accounts</div>
               <div className="divide-y divide-gray-50">
                  {[
                    { date: '2023-12-18', ref: 'INV-042', desc: 'Enterprise Cloud Deployment', dr: '$3,500.00', cr: '$0.00', bal: '$12,400.00' },
                    { date: '2023-12-17', ref: 'REC-012', desc: 'Cheque Payment #8812', dr: '$0.00', cr: '$5,000.00', bal: '$8,900.00' },
                    { date: '2023-12-15', ref: 'INV-041', desc: 'Strategic Consulting Fees', dr: '$1,200.00', cr: '$0.00', bal: '$13,900.00' },
                  ].map((row, i) => (
                    <div key={i} className="px-6 py-5 grid grid-cols-6 items-center text-xs font-black hover:bg-gray-50 transition-colors">
                      <span className="text-gray-400 uppercase">{row.date}</span>
                      <span className="text-indigo-600 font-mono">{row.ref}</span>
                      <span className="col-span-2 text-gray-900 font-bold uppercase tracking-tight">{row.desc}</span>
                      <div className="text-right">
                        <span className="text-red-500">{row.dr}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-green-600">{row.cr}</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      default:
        const isQuote = activeTab === 'quotes';
        const isDelivery = activeTab === 'delivery';
        const prefix = isQuote ? 'QT' : isDelivery ? 'DN' : 'INV';
        const data = [
          { no: `${prefix}-001`, cust: 'Cooper Logistics', amt: '$4,250', status: isQuote ? 'Accepted' : isDelivery ? 'Delivered' : 'Paid', date: 'Dec 12' },
          { no: `${prefix}-002`, cust: 'Nova Labs', amt: '$12,400', status: 'Pending', date: 'Dec 14' },
          { no: `${prefix}-003`, cust: 'Fox Designs', amt: '$850', status: 'Draft', date: 'Dec 15' },
        ];
        return (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Document #</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Value</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.map((doc, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-black text-indigo-600 font-mono text-sm">{doc.no}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{doc.cust}</td>
                      <td className="px-6 py-4 text-sm font-black text-gray-900">{doc.amt}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 uppercase tracking-widest">{doc.status}</span>
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button onClick={() => { setSelectedDoc(doc); setShowPrintModal(true); }} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><Printer className="w-4 h-4"/></button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Sales Cycle</h2>
          <p className="text-gray-500 text-sm font-medium">Manage Quotations, Orders, and Revenue Collection</p>
        </div>
        <div className="flex space-x-2 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
           {tabs.map(t => (
             <button
               key={t.id}
               onClick={() => setActiveTab(t.id as any)}
               className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all ${activeTab === t.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:text-gray-900'}`}
             >
               <t.icon className="w-3.5 h-3.5" />
               <span className="hidden lg:inline">{t.label}</span>
             </button>
           ))}
        </div>
      </div>

      {renderContent()}

      {showPrintModal && selectedDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl">
          <div className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-white/20">
            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-indigo-100">X</div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Document Center</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">XPLODE ERP SYSTEM</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={handlePrint} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-2xl shadow-indigo-100 hover:scale-105 transition-all flex items-center space-x-2 uppercase tracking-widest">
                  <Printer className="w-4 h-4" />
                  <span>Execute Print</span>
                </button>
                <button onClick={() => setShowPrintModal(false)} className="p-4 bg-white border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-12 bg-gray-100/50" id="print-area" ref={printRef}>
               <div className="bg-white p-20 shadow-2xl rounded-[4rem] mx-auto w-full max-w-3xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 -mr-40 -mt-40 rounded-full opacity-20"></div>
                  
                  <div className="flex justify-between items-start mb-24 relative z-10">
                     <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">XPLODE Global</h1>
                        <p className="text-[10px] text-gray-400 font-black mt-2 uppercase tracking-[0.4em]">Advanced ERP Solution</p>
                        <p className="text-xs text-gray-500 font-bold leading-relaxed mt-6">
                           Elite Business Park, Suite 900<br />
                           Global Commerce Hub, 94107<br />
                           Reg ID: XP-2024-EDGE
                        </p>
                     </div>
                     <div className="text-right">
                        <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl inline-block mb-6 shadow-xl shadow-indigo-100">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Document Category</p>
                           <p className="text-xl font-black uppercase tracking-tighter">{activeTab}</p>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Serial Number</p>
                           <p className="text-2xl font-black text-indigo-600 font-mono tracking-tighter">{selectedDoc.no}</p>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-16 mb-24 relative z-10">
                    <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 shadow-inner">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Attention Of</p>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">{selectedDoc.cust}</h3>
                      <p className="text-xs text-gray-500 font-bold leading-relaxed mt-4">
                        Strategic Accounts Division<br />
                        Regional Operations Hub<br />
                        Primary Point of Contact
                      </p>
                    </div>
                    <div className="space-y-8 py-4">
                      <div className="flex justify-between border-b-2 border-gray-50 pb-3">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Date</span>
                        <span className="text-sm font-black text-gray-900">DEC 22, 2023</span>
                      </div>
                      <div className="flex justify-between border-b-2 border-gray-50 pb-3">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Execution Status</span>
                        <span className="text-sm font-black text-indigo-600 uppercase tracking-tight">{selectedDoc.status}</span>
                      </div>
                    </div>
                  </div>

                  <table className="w-full mb-20 relative z-10">
                    <thead>
                      <tr className="border-b-8 border-gray-900">
                        <th className="py-8 text-left text-[11px] font-black text-gray-900 uppercase tracking-[0.2em]">Service Description</th>
                        <th className="py-8 text-center text-[11px] font-black text-gray-900 uppercase tracking-[0.2em]">Units</th>
                        <th className="py-8 text-right text-[11px] font-black text-gray-900 uppercase tracking-[0.2em]">Rate</th>
                        <th className="py-8 text-right text-[11px] font-black text-gray-900 uppercase tracking-[0.2em]">Extension</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-50">
                      <tr>
                        <td className="py-10">
                          <p className="text-base font-black text-gray-900 uppercase tracking-tight">Enterprise Solution Tier-1</p>
                          <p className="text-[10px] text-gray-400 font-black mt-2 uppercase tracking-widest">System License: XP-CORE-881</p>
                        </td>
                        <td className="py-10 text-center text-sm font-black text-gray-700">01</td>
                        <td className="py-10 text-right text-sm font-black text-gray-700">$3,500.00</td>
                        <td className="py-10 text-right text-base font-black text-gray-900">{selectedDoc.amt}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end relative z-10">
                    <div className="w-96 bg-gray-900 text-white p-12 rounded-[3.5rem] shadow-3xl">
                      <div className="space-y-6">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-50">
                          <span>Accounting Total</span>
                          <span>{selectedDoc.amt}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-50">
                          <span>Applicable Tax</span>
                          <span>$0.00</span>
                        </div>
                        <div className="pt-8 border-t-2 border-white/10 flex justify-between items-end">
                          <span className="text-sm font-black uppercase tracking-[0.2em]">Grand Net</span>
                          <span className="text-4xl font-black text-indigo-400 tracking-tighter">{selectedDoc.amt}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-32 text-center">
                     <div className="w-16 h-1 bg-gray-100 mx-auto mb-8 rounded-full"></div>
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.6em]">Solution your Business by MarufEdge</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesCRM;
