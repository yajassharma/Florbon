import { motion } from 'framer-motion';
import { Flower2, ChevronRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyBouquets() {
  const navigate = useNavigate();

  // Mock data for saved bouquets
  const savedBouquets = [
    { id: 1, name: 'Spring Romance', items: 12, price: 45.00, date: '2 days ago' },
    { id: 2, name: 'Birthday Surprise', items: 8, price: 32.50, date: '1 week ago' },
  ];

  return (
    <div className="bg-stone-50 min-h-full pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-serif text-stone-800 mb-2">My Bouquets</h1>
        <p className="text-stone-500 text-sm">Your collection of handcrafted floral designs.</p>
      </div>

      <div className="px-6 space-y-4">
        {savedBouquets.length > 0 ? (
          savedBouquets.map((bouquet, i) => (
            <motion.div
              key={bouquet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Flower2 size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-stone-800 font-medium">{bouquet.name}</h3>
                  <p className="text-xs text-stone-500">{bouquet.items} flowers • {bouquet.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-stone-900">${bouquet.price.toFixed(2)}</span>
                <button className="p-2 text-stone-400 hover:text-emerald-600 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300">
              <Heart size={32} />
            </div>
            <h3 className="text-stone-800 font-medium mb-1">No bouquets yet</h3>
            <p className="text-stone-500 text-sm mb-6">Start designing your first masterpiece!</p>
            <button
              onClick={() => navigate('/builder')}
              className="bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Start Building
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
