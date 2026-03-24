import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';

const Home = () => {
  const handleRedirect = () => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSdNMqh3AlRLvAjhdPCQREoAdBDSPTegS4dMrJHvBUKgwyAjEQ/viewform?usp=preview';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-lg w-full premium-card p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
           <MessageSquarePlus size={28} strokeWidth={2} />
        </div>
      </motion.div>

      <h1 className="text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">
        Share Your Experience
      </h1>
      
      <p className="text-gray-500 mb-10 text-[15px] leading-relaxed">
        Your insights are incredibly valuable. Please take two minutes to provide us with your direct feedback so we can continue to improve.
      </p>
      
      <button 
        onClick={handleRedirect}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-[1px]"
      >
        Submit Feedback
      </button>
    </motion.div>
  );
};

export default Home;
