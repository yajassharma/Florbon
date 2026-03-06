import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
}

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.random() * 12 + 8, // 8px to 20px
      duration: Math.random() * 12 + 8, // 8s to 20s
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.12 + 0.03, // very light: 0.03 to 0.15
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ 
            y: -20, 
            x: `${petal.x}%`, 
            rotate: petal.rotation,
            opacity: 0 
          }}
          animate={{ 
            y: ['0vh', '100vh'],
            x: [`${petal.x}%`, `${petal.x + (Math.random() * 30 - 15)}%`], // more drift
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, petal.opacity, petal.opacity, 0] 
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear"
          }}
          className="absolute"
          style={{
            width: petal.size,
            height: petal.size * 0.8,
            background: 'linear-gradient(135deg, #fff1f2 0%, #fecdd3 100%)',
            borderRadius: '100% 0% 100% 100%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}
