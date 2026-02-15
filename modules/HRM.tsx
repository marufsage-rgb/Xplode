
import React from 'react';
import { Users, Calendar, Briefcase, Award, TrendingUp } from 'lucide-react';

const HRM: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Human Resources</h2>
          <p className="text-gray-500 text-sm">Manage employees, payroll, and performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            <span>Attendance</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700">
            <Users className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Headcount', val: '156', icon: Users, color: 'blue' },
           { label: 'Open Positions', val: '8', icon: Briefcase, color: 'indigo' },
           { label: 'Upcoming Reviews', val: '12', icon: Award, color: 'purple' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 mr-4`}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                 <p className="text-2xl font-bold text-gray-900">{stat.val}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Employee Directory</h3>
          <div className="flex space-x-2">
            <select className="text-xs font-bold border-none bg-gray-50 rounded-lg px-2 py-1 focus:ring-0">
               <option>All Departments</option>
               <option>Engineering</option>
               <option>Marketing</option>
               <option>Design</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead className="bg-gray-50">
               <tr>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Department</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Joined</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {[
                 { name: 'Marcus Miller', dep: 'Engineering', role: 'Sr. Backend Developer', status: 'Full-time', date: 'Jan 2022' },
                 { name: 'Sofia Rodriguez', dep: 'Design', role: 'UI/UX Designer', status: 'Full-time', date: 'Mar 2022' },
                 { name: 'Liam Wilson', dep: 'Marketing', role: 'Content Strategist', status: 'Remote', date: 'May 2022' },
                 { name: 'Isabella Taylor', dep: 'Operations', role: 'HR Manager', status: 'Full-time', date: 'Aug 2021' },
                 { name: 'Ethan Hunt', dep: 'Engineering', role: 'Security Analyst', status: 'Full-time', date: 'Dec 2022' },
               ].map((emp, i) => (
                 <tr key={i} className="hover:bg-gray-50 transition-colors">
                   <td className="px-6 py-4">
                     <div className="flex items-center">
                        <img src={`https://picsum.photos/seed/${i+50}/32/32`} className="w-8 h-8 rounded-full mr-3 shadow-sm border border-gray-100" />
                        <span className="text-sm font-bold text-gray-900">{emp.name}</span>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-sm text-gray-600 font-medium">{emp.dep}</td>
                   <td className="px-6 py-4 text-sm text-gray-500">{emp.role}</td>
                   <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                        emp.status === 'Full-time' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {emp.status}
                      </span>
                   </td>
                   <td className="px-6 py-4 text-sm text-gray-500">{emp.date}</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HRM;
