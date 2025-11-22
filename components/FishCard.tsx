import React from 'react';
import { Goldfish, DiscountType } from '../types';

interface FishCardProps {
  fish: Goldfish;
  discount: DiscountType;
}

export const FishCard: React.FC<FishCardProps> = ({ fish, discount }) => {
  const discountedPrice = discount ? Math.round(fish.originalPrice * (discount / 10)) : fish.originalPrice;

  return (
    <div className="bg-gray-900/80 border border-gold-500/30 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm hover:border-gold-500 transition-colors group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={fish.image} 
          alt={fish.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
            {fish.tags.map(tag => (
                <span key={tag} className="bg-gold-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {tag}
                </span>
            ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1">{fish.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{fish.description}</p>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">原價</span>
            <span className={`text-lg font-medium ${discount ? 'line-through text-gray-500' : 'text-gold-400'}`}>
              HK${fish.originalPrice}
            </span>
          </div>
          
          {discount && (
            <div className="flex flex-col items-end animate-pulse">
              <span className="text-xs text-gold-300 font-bold">折後價 ({discount}折)</span>
              <span className="text-2xl font-black text-gold-500">
                HK${discountedPrice}
              </span>
            </div>
          )}
        </div>
        
        <button className="w-full mt-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-bold py-2 rounded hover:from-white hover:to-gray-200 transition-all">
          立即購買
        </button>
      </div>
    </div>
  );
};
