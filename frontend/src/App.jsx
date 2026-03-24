import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
      <ToastContainer 
        position="bottom-right" 
        theme="light"
        toastStyle={{ borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
      />
    </Router>
  );
}

export default App;
