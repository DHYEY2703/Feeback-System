import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Database, Search, UserCircle, FileText, FileSpreadsheet, Eye, Trash2, Mail, Phone, CalendarCheck, MessageSquare } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin');
          return;
        }

        const { data } = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user data permanently?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(u => u._id !== id));
        if (selectedUser && selectedUser._id === id) setSelectedUser(null);
      } catch (err) {
        alert('Operation failed. Check connection.');
      }
    }
  };

  const downloadAllCSV = () => {
    const csvHeader = 'Username,Email,Phone,Rating,Feedback\n';
    const csvContent = users.map(u => {
      const fb = u.feedback || {};
      return `"${u.username}","${u.email}","${u.phone}","${fb.rating || 'N/A'}","${fb.likedMost || 'N/A'}"`;
    }).join('\n');
    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "All_Feedback.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllPDF = () => {
    const doc = new jsPDF();
    doc.text("Master Feedback Report", 14, 15);
    
    const tableColumn = ["Identity", "Email", "Phone", "Rating"];
    const tableRows = users.map(user => [
        user.username,
        user.email,
        user.phone,
        user.feedback?.rating || 'No Rating'
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("Feedback_Report.pdf");
  };

  const downloadUserCSV = (user) => {
    const csvHeader = 'Question,Answer\n';
    const rows = [
      `"Username","${user.username}"`,
      `"Email","${user.email}"`,
      `"Phone","${user.phone}"`,
      `"Date Received","${new Date(user.createdAt).toLocaleString()}"`
    ];

    if (user.feedback) {
      Object.entries(user.feedback).forEach(([key, val]) => {
        rows.push(`"${key.charAt(0).toUpperCase() + key.slice(1)}","${val}"`);
      });
    }

    const blob = new Blob([csvHeader + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${user.username}_Answers.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadUserPDF = (user) => {
    const doc = new jsPDF();
    doc.text(`Detailed Answers: ${user.username}`, 14, 15);
    
    const tableColumn = ["Question", "Answer"];
    const tableRows = [
      ["Name", user.username],
      ["Email", user.email],
      ["Phone", user.phone]
    ];

    if (user.feedback) {
      Object.entries(user.feedback).forEach(([key, val]) => {
        tableRows.push([key.charAt(0).toUpperCase() + key.slice(1), val]);
      });
    }

    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save(`${user.username}_Feedback.pdf`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto premium-card p-6 sm:p-10 min-h-[85vh] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
       
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-gray-100 gap-6">
         <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-blue-50 flex justify-center items-center">
             <Database className="text-blue-600" />
           </div>
           <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Operations</h1>
              <p className="text-gray-500 text-sm font-medium mt-0.5">Control Panel & Submissions</p>
           </div>
         </div>
         <button 
           onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin'); }}
           className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2"
         >
           <LogOut size={16} /> Logout
         </button>
       </div>

       <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="relative w-full md:w-1/2 lg:w-1/3">
           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
           <input 
             type="text" 
             placeholder="Search active users..." 
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2.5 premium-input shadow-sm"
           />
         </div>
         <div className="flex items-center gap-3 w-full md:w-auto">
            <button onClick={downloadAllCSV} className="flex-1 md:flex-none items-center justify-center flex gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm">
              <FileSpreadsheet size={16} className="text-green-600" /> Export CSV
            </button>
            <button onClick={downloadAllPDF} className="flex-1 md:flex-none items-center justify-center flex gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm">
              <FileText size={16} className="text-red-500" /> Export PDF
            </button>
         </div>
       </div>

       <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
         <table className="min-w-full text-left border-collapse">
           <thead className="bg-gray-50/50">
             <tr>
               <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-widest border-b border-gray-100">User Identity</th>
               <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-widest border-b border-gray-100 hidden sm:table-cell">Contact</th>
               <th className="py-4 px-6 font-bold text-xs text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">Status & Controls</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
             {users
               .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
               .map((user) => (
               <tr 
                 key={user._id} 
                 className="hover:bg-gray-50/50 transition-colors"
               >
                 <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <UserCircle size={20} />
                      </div>
                      <span className="font-semibold text-gray-900">{user.username}</span>
                    </div>
                 </td>
                 <td className="py-4 px-6 text-sm text-gray-600 hidden sm:table-cell">{user.email}</td>
                 <td className="py-4 px-6 text-right">
                   <div className="flex items-center justify-end gap-3">
                     <span className={`inline-flex items-center px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md ${user.has_submitted ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                       {user.has_submitted ? 'Form Submitted' : 'Pending'}
                     </span>
                     <button 
                       onClick={() => setSelectedUser(user)}
                       className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all"
                     >
                       <Eye size={14} /> View
                     </button>
                     <button 
                       onClick={() => handleDelete(user._id)} 
                       className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-all focus:outline-none"
                     >
                        <Trash2 size={16} />
                     </button>
                   </div>
                 </td>
               </tr>
             ))}
             {users.length === 0 && (
               <tr><td colSpan="3" className="text-center py-10 text-gray-500 font-medium">No system records match your query.</td></tr>
             )}
           </tbody>
         </table>
       </div>

       <AnimatePresence>
         {selectedUser && (
           <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: -10 }}
               className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
             >
               <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6 shrink-0">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-blue-50 flex justify-center items-center">
                      <MessageSquare className="text-blue-600 w-6 h-6" />
                   </div>
                   <div>
                     <h2 className="text-2xl font-bold text-gray-900">{selectedUser.username}'s Feedback</h2>
                     <p className="text-gray-500 text-sm font-medium mt-0.5">Submitted Answers</p>
                   </div>
                 </div>
                 <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-700 transition-all">
                   <X size={24} />
                 </button>
               </div>
               
               <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 pb-4">
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <Mail className="text-gray-400 w-5 h-5" />
                       <div className="overflow-hidden">
                          <p className="text-xs text-gray-500 font-bold uppercase">Email Address</p>
                          <p className="font-semibold text-gray-900 truncate">{selectedUser.email}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <Phone className="text-gray-400 w-5 h-5" />
                       <div className="overflow-hidden">
                          <p className="text-xs text-gray-500 font-bold uppercase">Phone Number</p>
                          <p className="font-semibold text-gray-900 truncate">{selectedUser.phone}</p>
                       </div>
                    </div>
                 </div>

                 <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CalendarCheck className="w-5 h-5 text-green-500" /> Form Answers
                    </h3>
                    
                    {selectedUser.feedback ? (
                      <div className="space-y-4">
                        {Object.entries(selectedUser.feedback).map(([question, answer]) => (
                          <div key={question} className="bg-white border border-gray-200 shadow-sm p-4 rounded-xl">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                              {question}
                            </p>
                            <p className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">
                              {String(answer)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 border-dashed text-center">
                         <p className="text-gray-500 font-semibold">User has not completed the feedback form yet.</p>
                      </div>
                    )}
                 </div>

               </div>
               
               <div className="mt-4 pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3 shrink-0">
                 <button 
                   onClick={() => downloadUserCSV(selectedUser)}
                   className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold py-3.5 rounded-xl text-sm flex justify-center items-center gap-2 shadow-sm transition-all"
                 >
                   <FileSpreadsheet size={18} className="text-green-600" /> Download Individual CSV
                 </button>
                 <button 
                   onClick={() => downloadUserPDF(selectedUser)}
                   className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold py-3.5 rounded-xl text-sm flex justify-center items-center gap-2 shadow-sm transition-all"
                 >
                   <FileText size={18} className="text-red-500" /> Download Individual PDF
                 </button>
               </div>
             </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
