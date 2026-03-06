import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusCircle, ShoppingBag, User, Flower2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const bouquet = useStore((state) => state.bouquet);
  const totalItems = bouquet.reduce((sum, item) => sum + item.quantity, 0);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const leftItems = [
    { icon: Home, label: 'Explore', path: '/' },
    { icon: Flower2, label: 'Party', path: '/my-bouquets' },
  ];
  
  const rightItems = [
    { icon: ShoppingBag, label: 'Wallet', path: '/checkout', badge: totalItems },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isAuthPage = location.pathname === '/onboarding' || location.pathname === '/login';

  const NavButton = (props: any) => {
    const { item } = props;
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return (
      <button
        onClick={() => navigate(item.path)}
        className={cn(
          "flex flex-col items-center relative transition-all duration-500 py-2 group",
          isActive ? "text-emerald-600" : "text-stone-400 hover:text-stone-600"
        )}
      >
        <div className="relative">
          {isActive && (
            <motion.div
              layoutId="activeGlow"
              className="absolute inset-0 bg-emerald-500/10 blur-md rounded-full scale-150"
            />
          )}
          <div className={cn(
            "relative z-10 transition-all duration-500",
            isActive ? "scale-110" : ""
          )}>
            <Icon size={26} strokeWidth={isActive ? 2.5 : 2} />
          </div>
          {item.badge ? (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg z-20"
            >
              {item.badge}
            </motion.span>
          ) : null}
        </div>
        {isActive && (
          <motion.div 
            layoutId="activeIndicator"
            className="absolute -bottom-0.5 w-1 h-1 bg-emerald-500 rounded-full"
          />
        )}
      </button>
    );
  };

  return (
    <div className="h-[100dvh] w-full bg-stone-100 flex justify-center overflow-hidden">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-stone-50 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
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
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-5xl font-serif text-stone-900 tracking-tight"
            >
              Florbon
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full sm:max-w-md bg-white h-full shadow-2xl relative flex flex-col overflow-hidden">
        {/* Background Blobs for Glassmorphism */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-20%] w-[80%] h-[40%] bg-emerald-400/10 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-20%] w-[80%] h-[40%] bg-rose-400/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[50%] right-[-10%] w-[60%] h-[30%] bg-blue-400/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <main className="flex-1 overflow-y-auto pb-32 hide-scrollbar relative z-10">
          <Outlet />
        </main>

        {!isAuthPage && (
          <div className="absolute bottom-6 left-0 right-0 px-4 pointer-events-none z-50">
            <div className="flex flex-col items-center">
              {/* Central Floating Logo Button */}
              <div className="relative -mb-8 z-20 pointer-events-auto">
                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-125 animate-pulse" />
                
                <button
                  onClick={() => navigate('/builder')}
                  className={cn(
                    "w-18 h-18 rounded-full flex items-center justify-center transition-all duration-700 shadow-xl border border-white/50 backdrop-blur-xl relative overflow-hidden group p-3",
                    location.pathname === '/builder' 
                      ? "bg-emerald-600 scale-110" 
                      : "bg-white/30 hover:bg-white"
                  )}
                >
                  <img 
                    src="https://ik.imagekit.io/b6vbf9pul/Group%20347-3.png"
                    alt="Logo"
                    referrerPolicy="no-referrer"
                    className={cn(
                      "w-full h-full object-contain transition-all duration-1000 group-hover:rotate-[360deg]",
                      location.pathname === '/builder' ? "animate-pulse" : ""
                    )} 
                  />
                </button>
              </div>

              {/* Main Light Glass Footer */}
              <nav className="w-full bg-white/20 backdrop-blur-2xl border border-white/40 px-6 py-2.5 flex justify-between items-center rounded-[2.5rem] shadow-lg pointer-events-auto relative">
                <div className="flex flex-1 justify-around items-center relative z-10">
                  {leftItems.map(item => <NavButton key={item.path} item={item} />)}
                  <div className="w-16" /> {/* Spacer for central button */}
                  {rightItems.map(item => <NavButton key={item.path} item={item} />)}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
