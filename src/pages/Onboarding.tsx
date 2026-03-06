import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flower2, ChevronRight, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

const ONBOARDING_SLIDES = [
  {
    title: "Artisan Bouquets",
    description: "Hand-picked flowers from local growers, arranged by master florists.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "AI-Powered Design",
    description: "Use our advanced builder to visualize your perfect arrangement in real-time.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Express Delivery",
    description: "Freshness guaranteed with our temperature-controlled 2-hour delivery.",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800",
  }
];

export default function Onboarding() {
  const [view, setView] = useState<'splash' | 'carousel' | 'auth'>('splash');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phone, setPhone] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const setHasSkipped = useStore((state) => state.setHasSkipped);

  useEffect(() => {
    if (view === 'splash') {
      const timer = setTimeout(() => setView('carousel'), 2500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleNextSlide = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setView('auth');
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      login(phone);
      navigate('/');
    }
  };

  const handleSkip = () => {
    setHasSkipped(true);
    navigate('/');
  };

  if (view === 'splash') {
    return (
      <div className="h-[100dvh] w-full bg-white flex flex-col items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/5 blur-[120px] rounded-full" />
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-rose-500/10 blur-3xl rounded-full scale-150" />
          <img 
            src="https://ik.imagekit.io/b6vbf9pul/Group_345-removebg-preview%202.png"
            alt="Florbon Logo"
            referrerPolicy="no-referrer"
            className="w-32 h-32 object-contain relative z-10"
          />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          className="mt-6 text-5xl font-serif text-stone-900 tracking-tight"
        >
          Florbon
        </motion.h1>
      </div>
    );
  }

  if (view === 'carousel') {
    return (
      <div className="h-[100dvh] w-full bg-white flex flex-col overflow-hidden relative">
        <button 
          onClick={handleSkip}
          className="absolute top-12 right-6 z-20 text-white/80 text-sm font-medium px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10"
        >
          Skip
        </button>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                src={ONBOARDING_SLIDES[currentSlide].image}
                alt={ONBOARDING_SLIDES[currentSlide].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <div className="absolute bottom-36 left-0 right-0 px-8 text-white">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h2 className="text-4xl sm:text-5xl font-serif mb-4 leading-tight">
                    {ONBOARDING_SLIDES[currentSlide].title}
                  </h2>
                  <p className="text-lg text-stone-300 leading-relaxed max-w-sm">
                    {ONBOARDING_SLIDES[currentSlide].description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-8 pb-12 bg-stone-950">
          <div className="flex items-center justify-between max-w-sm mx-auto w-full">
            <div className="flex gap-2.5">
                  {ONBOARDING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === currentSlide ? 'w-10 bg-white' : 'w-2 bg-stone-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextSlide}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-stone-950 shadow-xl shadow-white/10 active:scale-90 transition-all"
            >
              <ChevronRight className="w-8 h-8 stroke-[2.5px]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full bg-white flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-stone-900/5 blur-[100px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 max-w-sm mx-auto w-full z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-28 h-28 bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/50 flex items-center justify-center mx-auto mb-8 rotate-12 border border-stone-100 p-6">
            <img 
              src="https://ik.imagekit.io/b6vbf9pul/Group_345-removebg-preview%202.png"
              alt="Florbon Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain -rotate-12"
            />
          </div>
          <h2 className="text-4xl font-serif text-stone-900 mb-3">Florbon</h2>
          <p className="text-stone-500 text-lg">Artisan flowers, AI-designed arrangements.</p>
        </motion.div>

        {!authMode ? (
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAuthMode('signup')}
              className="w-full bg-stone-900 text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-stone-900/20 flex items-center justify-center gap-2 text-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAuthMode('login')}
              className="w-full bg-white text-stone-900 border border-stone-200 py-5 rounded-[2rem] font-bold text-lg shadow-sm"
            >
              Log In
            </motion.button>
            <button
              onClick={handleSkip}
              className="w-full text-stone-400 py-4 text-sm font-semibold hover:text-stone-600 transition-colors tracking-wide uppercase"
            >
              Browse as Guest
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleAuthSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-stone-800 uppercase tracking-widest ml-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-6 py-5 rounded-[2rem] border-2 border-stone-100 focus:border-stone-900 outline-none transition-all text-xl font-medium bg-white shadow-inner"
                  autoFocus
                />
                <p className="text-xs text-stone-400 ml-1">
                  {authMode === 'signup' ? 'We\'ll send a verification code to this number.' : 'Welcome back! Please enter your number.'}
                </p>
              </div>
              <button
                type="submit"
                disabled={phone.length < 10}
                className="w-full bg-stone-900 text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-stone-900/20 disabled:opacity-50 disabled:shadow-none transition-all text-lg"
              >
                {authMode === 'signup' ? 'Create Account' : 'Login'}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode(null)}
                className="w-full text-stone-400 text-sm font-bold uppercase tracking-widest py-2"
              >
                Cancel
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
