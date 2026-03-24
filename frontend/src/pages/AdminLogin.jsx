import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-sm w-full premium-card p-10 text-center"
    >
      <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
        <Lock className="text-gray-600 w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-gray-900 tracking-tight">System Admin</h2>
      <p className="text-sm text-gray-500 mb-8">Sign in to access control panel.</p>
      
      <form onSubmit={handleLogin} className="space-y-5 text-left">
        {error && <p className="text-red-500 bg-red-50 py-2 px-3 rounded-lg text-xs font-semibold text-center border border-red-100">{error}</p>}
        
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">Username</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 premium-input" 
              placeholder="admin"
              required 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 premium-input" 
              placeholder="••••••••"
              required 
            />
          </div>
        </div>
        
        <button 
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl shadow-md transition-all mt-6 disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </motion.div>
  );
};

export default AdminLogin;
