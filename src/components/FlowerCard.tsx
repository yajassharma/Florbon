import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Flower } from '../data/mockData';

interface FlowerCardProps {
  key?: string;
  flower: Flower;
  index: number;
  onAdd: (flower: Flower) => void;
}

export function FlowerCard({ flower, index, onAdd }: FlowerCardProps) {
  const { ref } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      className="group bg-white rounded-xl p-3 shadow-sm border border-stone-100 flex flex-col hover:shadow-md transition-shadow"
    >
      <div className="h-56 rounded-xl overflow-hidden mb-3 bg-stone-100 relative flex items-center justify-center">
        <img
          src={flower.image}
          alt={flower.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <button
          onClick={() => onAdd(flower)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-stone-900 shadow-lg hover:bg-stone-900 hover:text-white transition-all active:scale-90"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      <div className="px-1 pb-1">
        <div className="flex flex-col mb-1">
          <h3 className="font-serif text-stone-800 text-[13.5px] mb-[2px] leading-tight min-h-[2rem]">{flower.name}</h3>
          <div className="flex items-baseline gap-2 bg-stone-100 self-start px-2 py-0.5 rounded-lg">
            <span className="font-bold text-stone-900 text-[14px]">₹{flower.price}</span>
            <span className="text-stone-400 text-[10px] line-through">₹{flower.mrp}</span>
          </div>
        </div>
        <p className="text-[9px] text-stone-400 font-thin tracking-wider">{flower.color} • {flower.type}</p>
      </div>
    </motion.div>
  );
}
