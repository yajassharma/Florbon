import { useState } from 'react';
import { FLOWERS, FlowerType } from '../data/mockData';
import { useStore } from '../store/useStore';
import { Plus, Search, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FlowerCard } from '../components/FlowerCard';
import { CategoryCard } from '../components/CategoryCard';

const CATEGORIES: { id: FlowerType; label: string; image: string }[] = [
  { id: 'rose', label: 'Roses', image: 'https://ik.imagekit.io/b6vbf9pul/Crimson%20Rose.png?updatedAt=1772750210117' },
  { id: 'tulip', label: 'Tulips', image: 'https://ik.imagekit.io/b6vbf9pul/Classic%20Red%20Tulip.png?updatedAt=1772750421797' },
  { id: 'orchid', label: 'Orchids', image: 'https://ik.imagekit.io/b6vbf9pul/Mystic%20Blue%20Orchid.png?updatedAt=1772750494559' },
  { id: 'lily', label: 'Lilies', image: 'https://ik.imagekit.io/b6vbf9pul/Oriental%20Pink%20Lily.png?updatedAt=1772750603029' },
  { id: 'sunflower', label: 'Sunflowers', image: 'https://ik.imagekit.io/b6vbf9pul/Giant%20Yellow%20Sunflower.png?updatedAt=1772750869054' },
  { id: 'daisy', label: 'Daisies', image: 'https://ik.imagekit.io/b6vbf9pul/Pink%20Gerbera%20Daisy.png?updatedAt=1772750868987' },
  { id: 'hydrangea', label: 'Hydrangeas', image: 'https://ik.imagekit.io/b6vbf9pul/Lavender%20Hydrangea.png?updatedAt=1772751019082' },
  { id: 'green', label: 'Foliage', image: 'https://ik.imagekit.io/b6vbf9pul/Silver%20Dollar%20Eucalyptus.png?updatedAt=1772751106925' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<FlowerType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const addFlower = useStore((state) => state.addFlower);
  const navigate = useNavigate();

  const filteredFlowers = FLOWERS.filter((flower) => {
    const matchesCategory = !selectedCategory || flower.type === selectedCategory;
    const matchesSearch = flower.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedCategories = CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-stone-50 min-h-full pb-24">
      {/* Hero Section */}
      <div className="relative h-72 w-full overflow-hidden rounded-b-[2.5rem] shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop" 
          alt="Beautiful floral arrangement" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-serif leading-tight mb-2">Design Your<br/><i className="font-light">Perfect Bouquet</i></h1>
          </motion.div>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-10">
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-white rounded-2xl shadow-lg shadow-stone-200/50 p-2 flex items-center mb-4"
        >
          <div className="pl-3 pr-2 text-stone-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search for peonies, roses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 bg-transparent text-stone-800 placeholder:text-stone-400 focus:outline-none text-sm"
          />
        </motion.div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-3 rounded-2xl overflow-hidden shadow-sm border border-stone-100"
        >
          <img 
            src="https://ik.imagekit.io/b6vbf9pul/Frame%20193.png" 
            alt="Promotion Banner" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="p-2 -ml-2 text-stone-500 hover:text-stone-900 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h2 className="text-xl font-serif text-stone-800">
              {selectedCategory 
                ? CATEGORIES.find(c => c.id === selectedCategory)?.label 
                : searchQuery ? 'Search Results' : 'Browse Collections'}
            </h2>
          </div>
          {!selectedCategory && !searchQuery && (
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
              {CATEGORIES.length} Categories
            </span>
          )}
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          {!selectedCategory && !searchQuery ? (
            <motion.div 
              key="categories"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-4 gap-2"
            >
              {displayedCategories.map((cat, i) => (
                <CategoryCard 
                  key={cat.id} 
                  label={cat.label} 
                  image={cat.image} 
                  onClick={() => setSelectedCategory(cat.id)}
                  index={i}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="flowers"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="grid grid-cols-3 gap-3"
            >
              {filteredFlowers.map((flower, i) => (
                <FlowerCard key={flower.id} flower={flower} index={i} onAdd={addFlower} />
              ))}
              {filteredFlowers.length === 0 && (
                <div className="col-span-2 py-12 text-center text-stone-400">
                  <p>No flowers found matching your criteria.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
