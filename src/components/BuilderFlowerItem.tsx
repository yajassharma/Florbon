import { Plus } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Flower } from '../data/mockData';

interface BuilderFlowerItemProps {
  key?: string;
  flower: Flower;
  onAdd: (flower: Flower) => void;
  disabled: boolean;
}

export function BuilderFlowerItem({ flower, onAdd, disabled }: BuilderFlowerItemProps) {
  const { ref } = useInView({ triggerOnce: true, rootMargin: '100px 0px' });

  return (
    <div ref={ref} className="border border-stone-200 rounded-xl p-2 flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 flex items-center justify-center">
        <img src={flower.image} alt={flower.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-stone-800 truncate">{flower.name}</p>
        <div className="flex items-center gap-2 bg-stone-100 px-1.5 py-0.5 rounded-md border border-stone-200">
          <span className="text-[11px] font-bold text-stone-900">₹{flower.price}</span>
          <span className="text-[9px] text-stone-400 line-through">₹{flower.mrp}</span>
        </div>
      </div>
      <button 
        onClick={() => onAdd(flower)}
        disabled={disabled}
        className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}
