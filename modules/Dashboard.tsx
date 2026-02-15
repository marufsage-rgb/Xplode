
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Users, Package, DollarSign, Clock, ArrowUpRight, Sparkles, RefreshCw
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getBusinessInsights } from '../services/aiService';

const data = [
  { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 }, { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 }, { name: 'May', revenue: 1890 }, { name: 'Jun', revenue: 2390 }, { name: 'Jul', revenue: 3490 },
];

const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<string>("");
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  const fetchInsights = async () => {
    setIsLoadingInsights(true);
    const mockContext = { revenue: 128430, inventory: 1840, staff: 156 };
    const text = await getBusinessInsights(mockContext);
    setInsights(text || "No insights available.");
    setIsLoadingInsights(false);
  };

  useEffect(() => { fetchInsights(); }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* AI Insights Bar */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="flex items-center space-x-6">
          <div className="bg-white/10 p-4 rounded-[1.5rem] backdrop-blur-xl border border-white/20 shadow-lg">
            <Sparkles className="w-8 h-8 text-indigo-100" />
          </div>
          <div>
            <h4 className="font-black text-xl tracking-tight uppercase">XPLODE AI Engine</h4>
            <p className="text-indigo-100 text-sm font-medium mt-1 opacity-90">{isLoadingInsights ? "Processing global business metrics..." : insights}</p>
          </div>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={isLoadingInsights}
          className="px-8 py-3 bg-white text-indigo-600 font-black rounded-2xl hover:scale-105 transition-all flex items-center space-x-2 disabled:opacity-50 shadow-xl shadow-black/10 uppercase text-xs tracking-widest"
        >
          <RefreshCw className={`w-4 h-4 ${isLoadingInsights ? 'animate-spin' : ''}`} />
          <span>Sync Analytics</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', val: '$128,430', trend: '+12.5%', icon: DollarSign, color: 'indigo' },
          { label: 'Stock Assets', val: '1,840', trend: '-2.4%', icon: Package, color: 'blue' },
          { label: 'Active Pipeline', val: '42', trend: '+4 new', icon: TrendingUp, color: 'green' },
          { label: 'Human Capital', val: '156', trend: '+12', icon: Users, color: 'purple' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
            <div className={`w-12 h-12 rounded-2xl bg-${card.color}-50 text-${card.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <card.icon className="w-6 h-6" />
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{card.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{card.val}</h3>
            <div className={`flex items-center mt-3 text-xs font-black ${card.trend.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
              {card.trend.includes('+') ? <TrendingUp className="w-3 h-3 mr-1"/> : <TrendingDown className="w-3 h-3 mr-1"/>}
              {card.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Growth Projection</h3>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Quarterly</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontWeight: 900, color: '#4f46e5' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-tight">Top Performance</h3>
          <div className="space-y-6">
            {[
              { name: 'Alex Johnson', company: 'Nova Labs', val: '$45,200', score: 98 },
              { name: 'Maria Garcia', company: 'TechFlow', val: '$28,900', score: 92 },
              { name: 'James Wilson', company: 'CloudScale', val: '$19,450', score: 85 },
            ].map((person, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-100">{person.name[0]}</div>
                  <div>
                    <p className="font-black text-gray-900 text-sm">{person.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{person.company}</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="font-black text-indigo-600 text-sm">{person.val}</p>
                   <p className="text-[9px] font-black text-green-500">{person.score}% Rate</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-gray-50 text-gray-400 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 hover:text-gray-900 transition-all">
            View Sales Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
