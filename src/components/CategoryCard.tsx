import { motion } from 'framer-motion';
import { FlowerType } from '../data/mockData';

interface CategoryCardProps {
  key?: string;
  label: string;
  image: string;
  onClick: () => void;
  index: number;
}

export function CategoryCard({ label, image, onClick, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.03 }}
      onClick={onClick}
      className="group bg-gradient-to-br from-[#fff7f2] via-[#fffaf6] to-[#fdf3ec] rounded-xl p-2 shadow-xl border border-stone-100 flex flex-col hover:shadow-md transition-all cursor-pointer overflow-hidden"
    >
      <div className="h-46 rounded-lg overflow-hidden mb-2 bg-stone-100 relative">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
      </div>
      <div className="px-1 pb-1 text-center">
        <h3 className="font-serif text-stone-800 text-[12px] leading-tight">{label}</h3>
      </div>
    </motion.div>
  );
}
