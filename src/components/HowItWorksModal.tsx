import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Layout, Sparkles, ShoppingBag, Truck } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const steps = [
    {
      icon: <Layout className="w-6 h-6 text-rose-500" />,
      title: "Choose Flowers & Styling",
      description: "Browse our curated collection and pick your favorite stems. Select your preferred wrapping and styling to match the occasion."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "AI Arrangement Generator",
      description: "Once you've made your selection, our AI generator will create a realistic preview of your bouquet so you know exactly how it will look."
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-emerald-500" />,
      title: "Review & Checkout",
      description: "Satisfied with the design? Proceed to checkout. We ensure the final product matches your digital creation perfectly."
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-500" />,
      title: "Doorstep Delivery",
      description: "The exact bouquet referenced in the AI image, built with your chosen flowers, will be delivered fresh to your doorsteps."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-[2.5rem] p-8 z-[101] shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400" />
            
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2">How it Works</h2>
              <p className="text-stone-500 text-sm">Follow these simple steps to create your custom bouquet.</p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center border border-stone-100">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 text-sm mb-1 flex items-center gap-2">
                      <span className="text-[10px] bg-stone-100 text-stone-500 w-5 h-5 rounded-full flex items-center justify-center font-mono">
                        {index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full mt-10 py-4 bg-stone-900 text-white rounded-2xl font-medium shadow-lg shadow-stone-200 transition-all"
            >
              Got it, thanks!
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
