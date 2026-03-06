import { ChevronRight } from 'lucide-react';

interface BuilderCategoryItemProps {
  key?: string;
  label: string;
  image: string;
  onClick: () => void;
}

export function BuilderCategoryItem({ label, image, onClick }: BuilderCategoryItemProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full border border-stone-200 rounded-xl p-2 flex items-center gap-3 hover:bg-stone-100 transition-colors group"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
        <img src={image} alt={label} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-stone-800">{label}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-colors mr-1" />
    </button>
  );
}
