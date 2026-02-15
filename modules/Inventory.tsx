
import React, { useState } from 'react';
import { 
  Package, Search, Plus, Filter, AlertTriangle, ArrowDownCircle, ArrowUpCircle, 
  BarChart3, RefreshCw, Layers, ClipboardList, TrendingUp, Info, Eye, ChevronRight,
  Printer, FileSpreadsheet, Mail, FileOutput
} from 'lucide-react';

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'movements' | 'reports'>('products');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const rawProductList = [
    "0384 BH Angle 40x5mm M/F", "20398 BH Tube 100x20 Heavey", "303015 BH TUBE 30X30 MILL FINSIH", "6531-001 MH-6531-001 CLADDING SHEET",
    "6531-002 MH-6531-002 CLADDING SHEET", "6531-003 MH-6531-003 CLADDING SHEET", "6531-008 MH-6531-008 CLADDING SHEET",
    "6531-011 MH-6531-011 CLADDING SHEET", "8218 MH-8218 CLADDING SHEET", "83776 Sandwich Shutter White", "8MM SPACER",
    "AB81453S Cornish Top Silver", "AC-10MCORN 10MM CORNER SPACER", "AC-12Spcr 12mm Spacer", "AC-SPCR 10MM SPACER"
  ];

  const productData = rawProductList.map((name, index) => ({
    id: index + 1,
    name,
    sku: `XP-${name.substring(0, 4).replace(/[^a-zA-Z0-9]/g, '')}-${index + 100}`,
    warehouse: 'Main',
    stock: 2,
    price: '$' + (Math.floor(Math.random() * 100) + 10),
    status: 'Low Stock'
  }));

  const handlePrintCatalog = () => {
    const printWindow = window.open('', '', 'width=900,height=900');
    if (!printWindow) return;
    
    let rows = productData.map(item => `
      <tr class="border-b text-xs">
        <td class="py-2 px-4 font-black uppercase">${item.name}</td>
        <td class="py-2 px-4 font-mono text-indigo-600">${item.sku}</td>
        <td class="py-2 px-4 text-center font-black">${item.stock}</td>
        <td class="py-2 px-4 text-right font-black">${item.price}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Inventory Master Catalog - XPLODE</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="p-10 font-sans">
          <div class="flex justify-between items-center mb-10 pb-6 border-b-8 border-gray-900">
            <div>
              <h1 class="text-4xl font-black text-gray-900 uppercase">XPLODE Global</h1>
              <p class="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mt-1">Master Inventory Audit</p>
            </div>
            <div class="text-right">
              <p class="text-[10px] font-black text-gray-400 uppercase">Date Generated</p>
              <p class="text-xs font-black">${new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-100 uppercase text-[10px] font-black">
                <th class="py-3 px-4">Product Description</th>
                <th class="py-3 px-4">SKU Registry</th>
                <th class="py-3 px-4 text-center">Stock</th>
                <th class="py-3 px-4 text-right">Valuation</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="mt-20 pt-10 border-t flex justify-between items-center">
             <div class="text-[10px] font-black text-gray-400 uppercase">System Ref: XP-STOCK-${Date.now()}</div>
             <div class="w-32 h-1 bg-gray-100 rounded-full"></div>
             <div class="text-[10px] font-black text-gray-400 uppercase">Authorized Signature</div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleExcelExport = () => {
    const csvRows = ["ID,Name,SKU,Stock,Price,Warehouse"];
    productData.forEach(p => csvRows.push(`${p.id},"${p.name}",${p.sku},${p.stock},"${p.price}",${p.warehouse}`));
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `XPLODE_Inventory_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("XPLODE Inventory Status Report");
    const body = encodeURIComponent(`Master Inventory Status for ${new Date().toLocaleDateString()}:\n\nTotal Unique SKUs: ${productData.length}\nStock Integrity: Certified\n\nPlease find the detailed report attached in the system ERP.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Inventory Document Center</h2>
          <p className="text-gray-500 text-sm font-medium">Tracking {productData.length} Master Items</p>
        </div>
        <div className="flex space-x-2">
           <button onClick={handlePrintCatalog} className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
             <Printer className="w-3.5 h-3.5" /> <span>PDF Printer</span>
           </button>
           <button onClick={handleExcelExport} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
             <FileSpreadsheet className="w-3.5 h-3.5" /> <span>Export Excel</span>
           </button>
           <button onClick={handleShareEmail} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
             <Mail className="w-3.5 h-3.5" /> <span>Email Report</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col max-h-[70vh]">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search product..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                  <Filter className="w-3 h-3" /> <span>Filter List</span>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10 shadow-sm">
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product / SKU</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">In-Stock</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Valuation</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {productData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors group cursor-pointer" onClick={() => setSelectedProduct(item)}>
                      <td className="px-6 py-4">
                        <p className="text-xs font-black text-gray-900 uppercase truncate max-w-xs">{item.name}</p>
                        <p className="text-[9px] font-mono text-indigo-500 font-bold">{item.sku}</p>
                      </td>
                      <td className="px-6 py-4 text-center font-black text-xs">{item.stock} PCS</td>
                      <td className="px-6 py-4 text-right text-xs font-black text-gray-900">{item.price}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 text-gray-300 group-hover:text-indigo-600 transition-colors"><Eye className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-0">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Live Stock Card</h3>
            {selectedProduct ? (
              <div className="space-y-6">
                 <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner border border-gray-100">
                    <Package className="w-8 h-8 text-indigo-600" />
                 </div>
                 <div className="text-center">
                    <h4 className="font-black text-gray-900 text-sm leading-tight uppercase tracking-tight">{selectedProduct.name}</h4>
                    <p className="text-[10px] font-mono text-indigo-500 font-bold mt-2 bg-indigo-50 inline-block px-2 py-1 rounded-md">{selectedProduct.sku}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                       <p className="text-[9px] font-black text-gray-400 uppercase">Available</p>
                       <p className="text-xl font-black text-gray-900">{selectedProduct.stock}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                       <p className="text-[9px] font-black text-gray-400 uppercase">Valuation</p>
                       <p className="text-sm font-black text-gray-900">{selectedProduct.price}</p>
                    </div>
                 </div>
                 <button onClick={() => {
                   setSelectedProduct(null);
                   alert('Inventory Record Locked for Printing');
                 }} className="w-full py-3 bg-gray-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg transition-all flex items-center justify-center space-x-2">
                   <Printer className="w-3 h-3" />
                   <span>Print Item Card</span>
                 </button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-300">
                 <Info className="w-12 h-12 mx-auto mb-4 opacity-10" />
                 <p className="text-[10px] font-black uppercase tracking-[0.2em]">Select SKU</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
