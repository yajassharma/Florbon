import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ArrowLeft, RefreshCw, CheckCircle2, Loader2, SplitSquareHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

export default function AIPreview() {
  const { bouquet, bouquetStyle, wrapping, sizeCategory, setAiPreviewApproved } = useStore();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIllustration, setShowIllustration] = useState(false);

  const size = sizeCategory();

  const generatePreview = async () => {
    setIsLoading(true);
    setError(null);
    setShowIllustration(false);
    
    try {
      const flowerDetails = bouquet.map(item => `${item.quantity} ${item.flower.color} ${item.flower.name}`).join(', ');
      const wrappingDetail = wrapping ? `wrapped in ${wrapping.color} ${wrapping.name}` : 'unwrapped';
      
      let stylePrompt = "";
      if (bouquetStyle === 'round') {
        stylePrompt = "compact round bouquet, dome-shaped floral arrangement, symmetrical, evenly aligned flower heads, 360-degree bouquet";
      } else {
        stylePrompt = "front-facing layered bouquet, flat floral arrangement, Korean-style wrapping, flowers arranged at different heights, visible premium wrapping at the back, presentation style bouquet";
      }

      let sizePrompt = "";
      if (size === 'small') {
        sizePrompt = "a small hand-held bouquet";
      } else if (size === 'medium') {
        sizePrompt = "a medium-sized bouquet comfortably held in one hand";
      } else if (size === 'large') {
        sizePrompt = "a large, full bouquet held with both hands";
      } else {
        sizePrompt = "an oversized luxury bouquet covering the torso while being held";
      }

      const prompt = `A highly realistic, professional studio photography of ${sizePrompt} containing ${flowerDetails}. Style: ${stylePrompt}. Wrapping: ${wrappingDetail}. 
      A person holding the bouquet for size comparison. The bouquet remains the primary focus. The person acts only as a scale reference. Face should not dominate the frame, waist-up framing only. Neutral clothing, soft or blurred background, hands positioned naturally holding bouquet from bottom. 
      Soft natural lighting, elegant composition, premium floral design, 8k resolution, highly detailed.`;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing.");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: prompt }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4"
          }
        }
      });
      
      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64EncodeString}`);
          foundImage = true;
          break;
        }
      }
      
      if (!foundImage) {
        throw new Error("No image generated.");
      }
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate preview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bouquet.length === 0) {
      navigate('/builder');
      return;
    }
    generatePreview();
  }, []);

  const renderIllustrativeBouquet = () => {
    const allFlowers = bouquet.flatMap(item => 
      Array.from({ length: item.quantity }).map((_, i) => ({
        ...item.flower,
        renderId: `${item.flower.id}-${i}`
      }))
    );

    const totalItems = allFlowers.length;

    const getScale = () => {
      switch (size) {
        case 'small': return 'scale-100';
        case 'medium': return 'scale-110';
        case 'large': return 'scale-125';
        case 'grand': return 'scale-150';
        default: return 'scale-100';
      }
    };

    const scaleClass = getScale();

    if (bouquetStyle === 'round') {
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-stone-100 rounded-3xl overflow-hidden">
          <div className={`relative w-48 h-48 flex flex-wrap items-center justify-center gap-1 transition-transform duration-500 ${scaleClass}`}>
            <AnimatePresence>
              {allFlowers.map((flower, index) => {
                let radius = 0;
                let angle = index * 137.5;
                
                const spreadFactor = Math.max(1, totalItems / 20);

                if (flower.role === 'focal') radius = Math.min(index * 4 * spreadFactor, 30 * spreadFactor);
                else if (flower.role === 'secondary') radius = (40 + (index % 5) * 4) * spreadFactor;
                else if (flower.role === 'filler') radius = (60 + (index % 3) * 4) * spreadFactor;
                else radius = 80 * spreadFactor;

                return (
                  <motion.div
                    key={flower.renderId}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center text-4xl drop-shadow-md"
                    style={{
                      zIndex: 100 - radius,
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
                  transform: `translateX(-50%) scale(${Math.max(1, totalItems / 30)})`
                }}
              />
            )}
          </div>
        </div>
      );
    } else {
      const roleOrder = { 'foliage': 0, 'filler': 1, 'secondary': 2, 'focal': 3 };
      const sortedFlowers = [...allFlowers].sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

      return (
        <div className="relative w-full h-full flex items-center justify-center bg-stone-100 rounded-3xl overflow-hidden">
          <div className={`relative w-48 h-64 flex flex-col items-center justify-end pb-12 transition-transform duration-500 ${scaleClass}`}>
            
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
                const spreadX = Math.max(20, totalItems); 
                let xOffset = (index % 3 - 1) * spreadX + (Math.random() * 10 - 5); 
                let zIndex = roleOrder[flower.role] * 10 + index;
                let scale = 1;

                const heightFactor = Math.max(1, totalItems / 25);

                if (flower.role === 'foliage') { yOffset = (-120 * heightFactor) + (index % 2) * 10; scale = 1.2; }
                else if (flower.role === 'filler') { yOffset = (-90 * heightFactor) + (index % 3) * 10; scale = 0.9; }
                else if (flower.role === 'secondary') { yOffset = (-60 * heightFactor) + (index % 2) * 15; scale = 1.1; }
                else { yOffset = (-30 * heightFactor) + (index % 3) * 10; scale = 1.3; }

                return (
                  <motion.div
                    key={flower.renderId}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: yOffset, x: xOffset, opacity: 1, scale }}
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
    <div className="h-full bg-stone-950 text-white flex flex-col overflow-hidden">
      <header className="px-6 py-4 flex items-center justify-between z-10">
        <button 
          onClick={() => navigate('/builder')}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-lg">AI Preview</h1>
        <button 
          onClick={() => setShowIllustration(!showIllustration)}
          disabled={isLoading || !imageUrl}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${showIllustration ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}
          title="Compare with illustration"
        >
          <SplitSquareHorizontal className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
            <p className="text-stone-400 text-sm animate-pulse">Crafting your realistic preview...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center max-w-sm">
            <p className="text-rose-400 mb-4">{error}</p>
            <button 
              onClick={generatePreview}
              className="bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-rose-600"
            >
              Try Again
            </button>
          </div>
        ) : imageUrl ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative"
          >
            {showIllustration ? renderIllustrativeBouquet() : (
              <img 
                src={imageUrl} 
                alt="AI Generated Bouquet" 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {showIllustration ? 'Illustration' : 'Realistic Preview'}
                </span>
              </div>
              <p className="text-sm text-stone-300 line-clamp-2">
                {bouquetStyle === 'round' ? 'Round' : 'Flat Layered'} bouquet with {bouquet.length} flower types
                {wrapping ? `, wrapped in ${wrapping.name}` : ''}
              </p>
            </div>
          </motion.div>
        ) : null}
      </main>

      <footer className="p-6 bg-stone-900 border-t border-stone-800 flex gap-4">
        <button 
          onClick={generatePreview}
          disabled={isLoading}
          className="flex-1 bg-stone-800 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Regenerate
        </button>
        <button 
          onClick={() => {
            setAiPreviewApproved(true);
            navigate('/checkout');
          }}
          disabled={isLoading || !imageUrl}
          className="flex-1 bg-emerald-500 text-white py-4 rounded-xl font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
        >
          Approve & Checkout
        </button>
      </footer>
    </div>
  );
}
