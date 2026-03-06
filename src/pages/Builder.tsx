import { useState } from 'react';
import { useStore, BouquetStyle, MAX_FLOWERS } from '../store/useStore';
import { FLOWERS, WRAPPINGS, FlowerType } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, Wand2, Circle, Layers, AlertCircle, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BuilderFlowerItem } from '../components/BuilderFlowerItem';
import { BuilderSelectedFlowerItem } from '../components/BuilderSelectedFlowerItem';
import { BuilderWrappingItem } from '../components/BuilderWrappingItem';
import { BuilderCategoryItem } from '../components/BuilderCategoryItem';
import { FlowerSVG } from '../components/FlowerSVG';

const CATEGORIES: { id: FlowerType; label: string; image: string }[] = [
  { id: 'rose', label: 'Roses', image: 'https://ik.imagekit.io/b6vbf9pul/Crimson%20Rose.png?updatedAt=1772750210117' },
  { id: 'tulip', label: 'Tulips', image: 'https://ik.imagekit.io/b6vbf9pul/Classic%20Red%20Tulip.png?updatedAt=1772750421797' },
  { id: 'orchid', label: 'Orchids', image: 'https://ik.imagekit.io/b6vbf9pul/Mystic%20Blue%20Orchid.png?updatedAt=1772750494559' },
  { id: 'lily', label: 'Lilies', image: 'https://ik.imagekit.io/b6vbf9pul/Oriental%20Pink%20Lily.png?updatedAt=1772750603029' },
  { id: 'sunflower', label: 'Sunflowers', image: 'https://ik.imagekit.io/b6vbf9pul/Giant%20Yellow%20Sunflower.png?updatedAt=1772750869054' },
  { id: 'daisy', label: 'Daisies', image: 'https://ik.imagekit.io/b6vbf9pul/Pink%20Gerbera%20Daisy.png?updatedAt=1772750868987' },
  { id: 'hydrangea', label: 'Hydrangeas', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80' },
  { id: 'green', label: 'Foliage', image: 'https://ik.imagekit.io/b6vbf9pul/Silver%20Dollar%20Eucalyptus.png?updatedAt=1772751106925' },
];

export default function Builder() {
  const { bouquet, addFlower, updateQuantity, bouquetStyle, setBouquetStyle, wrapping, setWrapping, totalPrice, clearBouquet, totalStemCount, sizeCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'flowers' | 'wrapping'>('flowers');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [showStyleWarning, setShowStyleWarning] = useState<BouquetStyle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FlowerType | null>(null);
  const navigate = useNavigate();

  const totalItems = totalStemCount();
  const size = sizeCategory();

  const handleStyleChange = (newStyle: BouquetStyle) => {
    if (bouquet.length > 0 && bouquetStyle !== newStyle) {
      setShowStyleWarning(newStyle);
    } else {
      setBouquetStyle(newStyle);
    }
  };

  const confirmStyleChange = () => {
    if (showStyleWarning) {
      clearBouquet();
      setBouquetStyle(showStyleWarning);
      setShowStyleWarning(null);
    }
  };

  // Determine visual scale based on size category
  const getScale = () => {
    switch (size) {
      case 'small': return 'scale-100';
      case 'medium': return 'scale-110';
      case 'large': return 'scale-125';
      case 'grand': return 'scale-150';
      default: return 'scale-100';
    }
  };

  // Generate a simple illustrative preview based on bouquet items
  const renderIllustrativeBouquet = () => {
    if (bouquet.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-stone-400">
          <div className="w-24 h-24 border-2 border-dashed border-stone-300 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-stone-300" />
          </div>
          <p className="text-sm">Add flowers to start building</p>
        </div>
      );
    }

    // Flatten bouquet into individual flowers for rendering
    const allFlowers = bouquet.flatMap(item => 
      Array.from({ length: item.quantity }).map((_, i) => ({
        ...item.flower,
        renderId: `${item.flower.id}-${i}`
      }))
    );

    const scaleClass = getScale();

    if (bouquetStyle === 'round') {
      // Round Bouquet Logic: radial distribution
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className={`relative w-48 h-48 flex flex-wrap items-center justify-center gap-1 transition-transform duration-500 ${scaleClass}`}>
            <AnimatePresence>
              {allFlowers.map((flower, index) => {
                // Determine placement based on role and total count
                let radius = 0;
                let angle = index * 137.5; // Golden angle approximation
                
                // Adjust radius spread based on total flowers to make it denser or wider
                const spreadFactor = Math.max(1, totalItems / 20);

                if (flower.role === 'focal') {
                  radius = Math.min(index * 4 * spreadFactor, 30 * spreadFactor);
                } else if (flower.role === 'secondary') {
                  radius = (40 + (index % 5) * 4) * spreadFactor;
                } else if (flower.role === 'filler') {
                  radius = (60 + (index % 3) * 4) * spreadFactor;
                } else { // foliage
                  radius = 80 * spreadFactor;
                }

                return (
                  <motion.div
                    key={flower.renderId}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center justify-center text-4xl drop-shadow-md"
                    style={{
                      zIndex: 100 - radius, // Center items on top
                      position: 'absolute',
                      top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * radius}px)`,
                      left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * radius}px)`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`
                    }}
                  >
                    {flower.type === 'rose' ? (flower.color.toLowerCase() === 'white' ? '💮' : '🌹') :
                     flower.type === 'sunflower' ? '🌻' :
                     flower.type === 'daisy' ? '🌼' :
                     flower.type === 'lily' ? '🌺' :
                     flower.type === 'exotic' ? '🪷' :
                     flower.type === 'filler' ? '🌸' :
                     flower.type === 'green' ? '🌿' : '🌸'}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Wrapping representation */}
            {wrapping && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-24 rounded-b-3xl opacity-80"
                style={{
                  backgroundColor: wrapping.color.toLowerCase() === 'brown' ? '#d97706' :
                                   wrapping.color.toLowerCase() === 'pink' ? '#fbcfe8' :
                                   wrapping.color.toLowerCase() === 'clear' ? '#e2e8f0' : '#cbd5e1',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                  zIndex: 0,
                  transform: `translateX(-50%) scale(${Math.max(1, totalItems / 30)})` // Scale wrapping base
                }}
              />
            )}
          </div>
        </div>
      );
    } else {
      // Flat Layered Bouquet Logic: horizontal layers
      // Sort flowers by role to render back to front
      const roleOrder = { 'foliage': 0, 'filler': 1, 'secondary': 2, 'focal': 3 };
      const sortedFlowers = [...allFlowers].sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className={`relative w-48 h-64 flex flex-col items-center justify-end pb-12 transition-transform duration-500 ${scaleClass}`}>
            
            {/* Wrapping Back */}
            {wrapping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-0 w-56 h-72 rounded-t-full opacity-40"
                style={{
                  backgroundColor: wrapping.color.toLowerCase() === 'brown' ? '#d97706' :
                                   wrapping.color.toLowerCase() === 'pink' ? '#fbcfe8' :
                                   wrapping.color.toLowerCase() === 'clear' ? '#e2e8f0' : '#cbd5e1',
                  zIndex: 0,
                  transform: `scale(${Math.max(1, totalItems / 40)})`,
                  transformOrigin: 'bottom center'
                }}
              />
            )}

            <AnimatePresence>
              {sortedFlowers.map((flower, index) => {
                let yOffset = 0;
                // Spread horizontally based on total items
                const spreadX = Math.max(20, totalItems); 
                let xOffset = (index % 3 - 1) * spreadX + (Math.random() * 10 - 5); 
                let zIndex = roleOrder[flower.role] * 10 + index;
                let scale = 1;

                // Height increases with total items
                const heightFactor = Math.max(1, totalItems / 25);

                if (flower.role === 'foliage') {
                  yOffset = (-120 * heightFactor) + (index % 2) * 10;
                  scale = 1.2;
                } else if (flower.role === 'filler') {
                  yOffset = (-90 * heightFactor) + (index % 3) * 10;
                  scale = 0.9;
                } else if (flower.role === 'secondary') {
                  yOffset = (-60 * heightFactor) + (index % 2) * 15;
                  scale = 1.1;
                } else { // focal
                  yOffset = (-30 * heightFactor) + (index % 3) * 10;
                  scale = 1.3;
                }

                return (
                  <motion.div
                    key={flower.renderId}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: yOffset, x: xOffset, opacity: 1, scale }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex items-center justify-center text-4xl drop-shadow-md absolute bottom-12"
                    style={{ zIndex }}
                  >
                    {flower.type === 'rose' ? (flower.color.toLowerCase() === 'white' ? '💮' : '🌹') :
                     flower.type === 'sunflower' ? '🌻' :
                     flower.type === 'daisy' ? '🌼' :
                     flower.type === 'lily' ? '🌺' :
                     flower.type === 'exotic' ? '🪷' :
                     flower.type === 'filler' ? '🌸' :
                     flower.type === 'green' ? '🌿' : '🌸'}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Wrapping Front */}
            {wrapping && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 w-40 h-24 rounded-b-3xl opacity-90"
                style={{
                  backgroundColor: wrapping.color.toLowerCase() === 'brown' ? '#b45309' :
                                   wrapping.color.toLowerCase() === 'pink' ? '#f472b6' :
                                   wrapping.color.toLowerCase() === 'clear' ? '#cbd5e1' : '#94a3b8',
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                  zIndex: 100,
                  transform: `scale(${Math.max(1, totalItems / 30)})`,
                  transformOrigin: 'bottom center'
                }}
              />
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col bg-stone-50 relative overflow-hidden">
      {/* Top Header */}
      <header className="absolute top-0 w-full z-10 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-stone-50/80 to-transparent backdrop-blur-sm">
        <h1 className="font-serif text-xl text-stone-800">Studio</h1>
        <div className="flex items-center gap-3">
          <div className="bg-white/80 px-3 py-1.5 rounded-full text-sm font-medium text-stone-800 shadow-sm border border-stone-200">
            ${totalPrice().toFixed(2)}
          </div>
          <button 
            onClick={() => navigate('/ai-preview')}
            disabled={bouquet.length === 0}
            className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </header>

      {/* Style Warning Modal */}
      <AnimatePresence>
        {showStyleWarning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-xl font-serif text-stone-800 mb-2">Change Style?</h3>
              <p className="text-stone-500 text-sm mb-6">
                Changing the bouquet style will clear your current flower selection. Are you sure you want to proceed?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowStyleWarning(null)}
                  className="flex-1 py-3 rounded-xl font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmStyleChange}
                  className="flex-1 py-3 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Preview Area */}
      <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-100 via-stone-50 to-stone-100 pt-16 pb-48">
        {renderIllustrativeBouquet()}
        
        {/* Style Selection Toggle */}
        <div className="absolute right-4 top-20 bg-white rounded-xl shadow-sm border border-stone-200 p-1 flex flex-col gap-1">
          <button 
            onClick={() => handleStyleChange('round')}
            className={`p-2 rounded-lg transition-colors flex flex-col items-center gap-1 ${bouquetStyle === 'round' ? 'bg-emerald-50 text-emerald-600' : 'text-stone-400 hover:bg-stone-50'}`}
            title="Round Bouquet"
          >
            <Circle className="w-5 h-5" />
            <span className="text-[8px] font-medium uppercase">Round</span>
          </button>
          <button 
            onClick={() => handleStyleChange('flat_layered')}
            className={`p-2 rounded-lg transition-colors flex flex-col items-center gap-1 ${bouquetStyle === 'flat_layered' ? 'bg-emerald-50 text-emerald-600' : 'text-stone-400 hover:bg-stone-50'}`}
            title="Flat Layered Bouquet"
          >
            <Layers className="w-5 h-5" />
            <span className="text-[8px] font-medium uppercase">Layered</span>
          </button>
        </div>
      </div>

      {/* Bottom Panel */}
      <motion.div 
        className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-stone-200 z-20 flex flex-col"
        animate={{ height: isPanelOpen ? '50%' : '80px' }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      >
        {/* Panel Handle */}
        <div 
          className="w-full flex justify-center py-3 cursor-pointer"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* Tabs */}
        <div className="flex px-6 border-b border-stone-100 items-center justify-between">
          <div className="flex flex-1">
            <button
              onClick={() => setActiveTab('flowers')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'flowers' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
            >
              Flowers ({totalItems})
            </button>
            <button
              onClick={() => setActiveTab('wrapping')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'wrapping' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
            >
              Wrapping
            </button>
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'flowers' ? (
            <div className="space-y-6">
              {/* Max Flowers Warning */}
              {totalItems >= MAX_FLOWERS && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    For structural stability and premium presentation, the maximum number of flowers for a single bouquet is {MAX_FLOWERS}.
                  </p>
                </div>
              )}

              {/* Selected Flowers */}
              {bouquet.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">In Bouquet</h3>
                  {bouquet.map((item) => (
                    <BuilderSelectedFlowerItem 
                      key={item.flower.id} 
                      flower={item.flower} 
                      quantity={item.quantity} 
                      onUpdateQuantity={updateQuantity} 
                      maxReached={totalItems >= MAX_FLOWERS} 
                    />
                  ))}
                </div>
              )}

              {/* Add More Flowers */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    {selectedCategory ? `${CATEGORIES.find(c => c.id === selectedCategory)?.label} Varieties` : 'Available Categories'}
                  </h3>
                  {selectedCategory && (
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1 hover:text-emerald-700"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      Back to Categories
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {!selectedCategory ? (
                    <motion.div 
                      key="builder-categories"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 gap-3"
                    >
                      {CATEGORIES.map(cat => (
                        <BuilderCategoryItem 
                          key={cat.id} 
                          label={cat.label} 
                          image={cat.image} 
                          onClick={() => setSelectedCategory(cat.id)} 
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="builder-flowers"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {FLOWERS
                        .filter(f => f.type === selectedCategory && !bouquet.find(b => b.flower.id === f.id))
                        .map(flower => (
                          <BuilderFlowerItem 
                            key={flower.id} 
                            flower={flower} 
                            onAdd={addFlower} 
                            disabled={totalItems >= MAX_FLOWERS} 
                          />
                        ))
                      }
                      {FLOWERS.filter(f => f.type === selectedCategory && !bouquet.find(b => b.flower.id === f.id)).length === 0 && (
                        <div className="col-span-2 py-8 text-center text-stone-400 text-xs">
                          All varieties from this category are already in your bouquet.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {WRAPPINGS.map((wrap) => (
                <BuilderWrappingItem 
                  key={wrap.id} 
                  wrapping={wrap} 
                  isSelected={wrapping?.id === wrap.id} 
                  onSelect={setWrapping} 
                  sizeMultiplier={size === 'small' ? 1 : size === 'medium' ? 1.2 : size === 'large' ? 1.5 : 2} 
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
