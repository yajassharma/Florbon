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
      <div className="h-46 rounded-lg overflow-hidden mb-4 bg-stone-100 relative flex items-center justify-center">
        <img
          src={flower.image}
          alt={flower.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <button
          onClick={() => onAdd(flower)}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-900 shadow-lg hover:bg-emerald-600 hover:text-white transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="px-1 pb-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-serif text-stone-800 text-[11px] leading-tight">{flower.name}</h3>
          <span className="font-medium text-stone-900 text-[10px]">${flower.price.toFixed(2)}</span>
        </div>
        <p className="text-[9px] text-stone-500 capitalize">{flower.color} • {flower.type}</p>
      </div>
    </motion.div>
  );
}
