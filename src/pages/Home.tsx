import { useState, useEffect } from 'react';
import { FLOWERS, FlowerType } from '../data/mockData';
import { useStore } from '../store/useStore';
import { Plus, Search, ArrowRight, Sparkles, ChevronLeft, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FlowerCard } from '../components/FlowerCard';
import { CategoryCard } from '../components/CategoryCard';
import { HowItWorksModal } from '../components/HowItWorksModal';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop',
    heading: "Create a Bouquet That's Truly Yours...",
    subheading: "Pick Flowers. Style It. Send It."
  },
  {
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1000&auto=format&fit=crop',
    heading: "Elegance in Every Petal...",
    subheading: "Discover our premium collection of seasonal blooms."
  },
  {
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000&auto=format&fit=crop',
    heading: "Crafted for Your Moments...",
    subheading: "Personalized arrangements that speak from the heart."
  }
];

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
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const addFlower = useStore((state) => state.addFlower);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredFlowers = FLOWERS.filter((flower) => {
    const matchesCategory = !selectedCategory || flower.type === selectedCategory;
    const matchesSearch = flower.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedCategories = CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-full pb-24">
      {/* Hero Section */}
      <div 
        className="relative h-72 w-full overflow-hidden rounded-b-[2.5rem] shadow-sm bg-stone-100 isolate"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt={`Hero ${currentSlide}`} 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl font-serif font-bold leading-tight mb-2">
                  {HERO_SLIDES[currentSlide].heading.split('...')[0]}
                  {HERO_SLIDES[currentSlide].heading.includes('...') && '...'}
                  <br/>
                  <i className="font-light text-xl">{HERO_SLIDES[currentSlide].subheading}</i>
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* How it works link */}
        <button 
          onClick={() => setIsHowItWorksOpen(true)}
          className="absolute top-6 right-6 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center gap-1.5 text-black text-[10px] font-medium tracking-wide hover:bg-white/30 transition-all active:scale-95 z-20"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          How it works
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === i ? 'bg-white w-4' : 'bg-white/40'
              }`}
            />
          ))}
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
            placeholder="Search flowers to add to your bouquet"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 bg-transparent text-stone-600 placeholder:text-stone-400 focus:outline-none text-xs"
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
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="p-2 -ml-2 text-stone-500 hover:text-stone-900 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h2 className="text-lg font-serif text-stone-800">
              {selectedCategory 
                ? CATEGORIES.find(c => c.id === selectedCategory)?.label 
                : searchQuery ? 'Search Results' : 'Start With Your Flowers'}
            </h2>
          </div>
          {!selectedCategory && !searchQuery && (
            <span className="text-[10px] font-thin text-stone-400 tracking-wider">
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
              className="grid grid-cols-3 gap-2"
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
      <HowItWorksModal 
        isOpen={isHowItWorksOpen} 
        onClose={() => setIsHowItWorksOpen(false)} 
      />
    </div>
  );
}
