import { cn } from '@/lib/utils';
import avocadoImg from '@/assets/products/avocado.jpg';
import mangoesImg from '@/assets/products/mangoes.jpg';
import passionFruitImg from '@/assets/products/passion-fruit.jpg';
import pineappleImg from '@/assets/products/pineapple.jpg';

const floatingFruits = [
  { src: avocadoImg, alt: 'Avocado', size: 80, left: '5%', delay: 0 },
  { src: mangoesImg, alt: 'Mango', size: 90, left: '20%', delay: 1 },
  { src: passionFruitImg, alt: 'Passion Fruit', size: 70, left: '40%', delay: 2 },
  { src: pineappleImg, alt: 'Pineapple', size: 100, left: '60%', delay: 0.5 },
  { src: avocadoImg, alt: 'Avocado', size: 75, left: '80%', delay: 1.5 },
  { src: mangoesImg, alt: 'Mango', size: 85, left: '90%', delay: 2.5 },
];

export function FloatingFruits({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {floatingFruits.map((fruit, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            left: fruit.left,
            bottom: '-20px',
            width: fruit.size,
            height: fruit.size,
            animationDelay: `${fruit.delay}s`,
            animationDuration: '6s',
          }}
        >
          <img
            src={fruit.src}
            alt={fruit.alt}
            className="w-full h-full object-cover rounded-full shadow-lg opacity-80"
          />
        </div>
      ))}
    </div>
  );
}
