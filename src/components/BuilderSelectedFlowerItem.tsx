import { Minus, Plus, Trash2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Flower } from '../data/mockData';

interface BuilderSelectedFlowerItemProps {
  key?: string;
  flower: Flower;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  maxReached: boolean;
}

export function BuilderSelectedFlowerItem({ flower, quantity, onUpdateQuantity, maxReached }: BuilderSelectedFlowerItemProps) {
  const { ref } = useInView({ triggerOnce: true, rootMargin: '100px 0px' });

  return (
    <div ref={ref} className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 flex items-center justify-center">
          <img src={flower.image} alt={flower.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
        <div>
          <p className="text-sm font-medium text-stone-800">{flower.name}</p>
          <div className="flex items-center gap-2 bg-stone-100 px-1.5 py-0.5 rounded-md border border-stone-200 self-start mt-1">
            <span className="text-xs font-bold text-stone-900">₹{flower.price} / stem</span>
            <span className="text-[10px] text-stone-400 line-through">₹{flower.mrp}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-lg p-1">
        <button 
          onClick={() => onUpdateQuantity(flower.id, quantity - 1)}
          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:bg-stone-100 rounded"
        >
          {quantity === 1 ? <Trash2 className="w-3 h-3 text-rose-500" /> : <Minus className="w-3 h-3" />}
        </button>
        <span className="text-sm font-medium w-4 text-center">{quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(flower.id, quantity + 1)}
          disabled={maxReached}
          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:bg-stone-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
