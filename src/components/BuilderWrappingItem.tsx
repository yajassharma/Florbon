import { useInView } from 'react-intersection-observer';
import { Wrapping } from '../data/mockData';

interface BuilderWrappingItemProps {
  key?: string;
  wrapping: Wrapping;
  isSelected: boolean;
  onSelect: (wrapping: Wrapping) => void;
  sizeMultiplier: number;
}

export function BuilderWrappingItem({ wrapping, isSelected, onSelect, sizeMultiplier }: BuilderWrappingItemProps) {
  const { ref } = useInView({ triggerOnce: true, rootMargin: '100px 0px' });

  return (
    <div 
      ref={ref}
      onClick={() => onSelect(wrapping)}
      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected ? 'border-stone-900 bg-white' : 'border-stone-100 hover:border-stone-200'
      }`}
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 flex items-center justify-center">
        <img src={wrapping.image} alt={wrapping.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-stone-800 text-sm">{wrapping.name}</h4>
        <p className="text-xs text-stone-500">{wrapping.type === 'premium' ? 'Premium' : 'Standard'} • {wrapping.color}</p>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-stone-700">
          +₹{(wrapping.price * sizeMultiplier).toFixed(0)}
        </div>
        <div className="text-[10px] text-stone-400 line-through">
          ₹{(wrapping.mrp * sizeMultiplier).toFixed(0)}
        </div>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        isSelected ? 'border-stone-900' : 'border-stone-300'
      }`}>
        {isSelected && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full" />}
      </div>
    </div>
  );
}
