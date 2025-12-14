import { Apple, Carrot, Leaf, Cherry, Citrus, Grape } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [
  { Icon: Apple, color: 'text-orange-300/20' },
  { Icon: Carrot, color: 'text-orange-400/20' },
  { Icon: Leaf, color: 'text-green-400/20' },
  { Icon: Cherry, color: 'text-red-300/20' },
  { Icon: Citrus, color: 'text-yellow-300/20' },
  { Icon: Grape, color: 'text-purple-300/20' },
];

export function ProduceIconsBackground({ className }: { className?: string }) {
  const gridIcons = [];
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 12; col++) {
      const iconIndex = (row + col) % icons.length;
      const { Icon, color } = icons[iconIndex];
      gridIcons.push(
        <div
          key={`${row}-${col}`}
          className={cn('flex items-center justify-center', color)}
          style={{
            transform: `rotate(${(row * col * 15) % 360}deg)`,
          }}
        >
          <Icon className="w-8 h-8" />
        </div>
      );
    }
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <div 
        className="absolute inset-0 grid gap-12"
        style={{ 
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(8, 1fr)',
          padding: '2rem',
        }}
      >
        {gridIcons}
      </div>
    </div>
  );
}
