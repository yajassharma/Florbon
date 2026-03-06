import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      login(phone);
      navigate('/');
    }
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-stone-50 to-white overflow-hidden">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center p-4">
            <img 
              src="https://ik.imagekit.io/b6vbf9pul/Group_345-removebg-preview%202.png"
              alt="Florbon Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <h1 className="text-3xl font-serif text-center text-stone-800 mb-2">Florbon</h1>
        <p className="text-center text-stone-500 mb-8">Custom bouquets, delivered express.</p>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-black transition-colors"
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Enter OTP</label>
              <p className="text-xs text-stone-500 mb-3">Sent to {phone}</p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1234"
                maxLength={4}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-all text-center tracking-widest text-xl"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-black transition-colors"
            >
              Verify & Login
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-stone-500 py-2 text-sm hover:text-stone-800"
            >
              Back
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
