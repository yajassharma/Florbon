interface FlowerSVGProps {
  type: string;
  color: string;
  size?: number;
}

export function FlowerSVG({ type, color, size = 40 }: FlowerSVGProps) {
  const getColorHex = (c: string) => {
    const map: Record<string, string> = {
      red: '#ef4444',
      white: '#f8fafc',
      pink: '#f472b6',
      yellow: '#facc15',
      peach: '#fb923c',
      black: '#1c1917',
      purple: '#a855f7',
      blue: '#3b82f6',
      orange: '#f97316',
      coral: '#fb7185',
      green: '#4ade80',
      silver: '#94a3b8'
    };
    return map[c.toLowerCase()] || '#f472b6';
  };

  const hex = getColorHex(color);
  const darkHex = hex === '#f8fafc' ? '#e2e8f0' : hex; // Slightly darker for details if white

  switch (type) {
    case 'rose':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill={hex} />
          <path d="M50 10C60 30 80 40 90 50C80 60 60 70 50 90C40 70 20 60 10 50C20 40 40 30 50 10Z" fill="rgba(0,0,0,0.1)" />
          <circle cx="50" cy="50" r="20" fill="rgba(0,0,0,0.15)" />
          <path d="M40 40 Q 50 30 60 40 Q 70 50 60 60 Q 50 70 40 60 Q 30 50 40 40 Z" fill={darkHex} />
        </svg>
      );
    case 'tulip':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80 C 20 30, 40 10, 50 10 C 60 10, 80 30, 80 80 Z" fill={hex} />
          <path d="M35 80 C 35 40, 45 20, 50 20 C 55 20, 65 40, 65 80 Z" fill="rgba(0,0,0,0.1)" />
        </svg>
      );
    case 'orchid':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill={hex} opacity="0.8" />
          <circle cx="50" cy="50" r="25" fill={hex} />
          <circle cx="50" cy="50" r="10" fill="#facc15" />
          <path d="M50 50 L 20 20 M 50 50 L 80 20 M 50 50 L 20 80 M 50 50 L 80 80" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
        </svg>
      );
    case 'lily':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L 60 40 L 90 50 L 60 60 L 50 90 L 40 60 L 10 50 L 40 40 Z" fill={hex} />
          <circle cx="50" cy="50" r="8" fill="#facc15" />
        </svg>
      );
    case 'peony':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill={hex} />
          <circle cx="50" cy="50" r="35" fill="rgba(255,255,255,0.2)" />
          <circle cx="50" cy="50" r="25" fill="rgba(0,0,0,0.1)" />
          <circle cx="50" cy="50" r="15" fill={darkHex} />
        </svg>
      );
    case 'sunflower':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill={hex} />
          <path d="M50 5 L 55 35 L 85 50 L 55 65 L 50 95 L 45 65 L 15 50 L 45 35 Z" fill="#eab308" />
          <circle cx="50" cy="50" r="20" fill="#422006" />
        </svg>
      );
    case 'daisy':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill={hex} />
          <circle cx="50" cy="50" r="15" fill="#facc15" />
        </svg>
      );
    case 'hydrangea':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill={hex} />
          <circle cx="30" cy="30" r="15" fill="rgba(255,255,255,0.2)" />
          <circle cx="70" cy="30" r="15" fill="rgba(255,255,255,0.2)" />
          <circle cx="30" cy="70" r="15" fill="rgba(255,255,255,0.2)" />
          <circle cx="70" cy="70" r="15" fill="rgba(255,255,255,0.2)" />
          <circle cx="50" cy="50" r="15" fill="rgba(255,255,255,0.3)" />
        </svg>
      );
    case 'green':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90 L 50 10 M 50 70 Q 20 60 30 30 M 50 50 Q 80 40 70 20" stroke={hex} strokeWidth="6" strokeLinecap="round" />
          <circle cx="30" cy="30" r="10" fill={hex} />
          <circle cx="70" cy="20" r="10" fill={hex} />
          <circle cx="50" cy="10" r="10" fill={hex} />
        </svg>
      );
    case 'filler':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="8" fill={hex} />
          <circle cx="70" cy="40" r="6" fill={hex} />
          <circle cx="40" cy="70" r="7" fill={hex} />
          <circle cx="60" cy="20" r="5" fill={hex} />
          <circle cx="20" cy="60" r="6" fill={hex} />
          <circle cx="80" cy="70" r="8" fill={hex} />
          <path d="M50 100 L 50 50 L 30 30 M 50 50 L 70 40 M 50 70 L 40 70 M 50 80 L 80 70 M 50 60 L 20 60" stroke="#86efac" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill={hex} />
          <circle cx="50" cy="50" r="20" fill="rgba(0,0,0,0.2)" />
        </svg>
      );
  }
}
