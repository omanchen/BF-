import React from 'react';

interface LuckyPlateProps {
  index: number;
  revealed: boolean;
  result: number | null;
  onClick: () => void;
  disabled: boolean;
}

export const LuckyPlate: React.FC<LuckyPlateProps> = ({ index, revealed, result, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gold-500 shadow-[0_0_15px_rgba(255,215,0,0.5)]
        transform transition-all duration-500 flex items-center justify-center overflow-hidden
        ${disabled ? 'cursor-default' : 'cursor-pointer hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.8)]'}
        ${revealed ? 'bg-white rotate-y-180' : 'bg-gradient-to-br from-red-600 to-red-900'}
      `}
      style={{ perspective: '1000px' }}
    >
      {revealed ? (
        <div className="text-4xl md:text-5xl font-black text-red-600 animate-bounce">
          {result}
        </div>
      ) : (
        <div className="text-gold-300 text-center">
          <span className="text-xs md:text-sm font-bold block">幸運盤</span>
          <span className="text-xl md:text-2xl font-black">#{index + 1}</span>
        </div>
      )}
      
      {/* Decorative shine */}
      {!revealed && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      )}
    </button>
  );
};
