import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanLine } from 'lucide-react';

const QRCodePage = () => {
  const location = useLocation();
  const qrCode = location.state?.qrCode;

  if (!qrCode) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="max-w-md w-full glass-panel p-10 rounded-3xl text-center relative overflow-hidden"
    >
      <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-pink-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
      
      <div className="flex justify-center mb-4 text-indigo-400">
        <ScanLine size={48} strokeWidth={1.5} className="animate-pulse" />
      </div>

      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-3">
        Scan to Proceed
      </h2>
      <p className="text-slate-300 font-light mb-10 leading-relaxed text-sm">
        Point your mobile camera at the unique QR code below to unlock the official feedback link securely.
      </p>
      
      <div className="flex justify-center mb-8 relative z-10">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/20 shadow-[0_0_40px_rgba(79,70,229,0.3)] backdrop-blur-lg">
           <img src={qrCode} alt="Feedback QR Code" className="w-56 h-56 rounded-xl relative z-10 shadow-xl" />
        </div>
      </div>
      
      <p className="text-xs font-medium text-indigo-300/80 uppercase tracking-widest mt-8">
        One-Time Action Payload
      </p>
    </motion.div>
  );
};

export default QRCodePage;
