import React from 'react';

export const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Precision Engineering Grid */}
      <div className="absolute inset-0 bg-brutal-grid opacity-60 dark:opacity-40" />
      
      {/* Architectural Corner Crop Marks */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-black/30 dark:border-white/20" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-black/30 dark:border-white/20" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-black/30 dark:border-white/20" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-black/30 dark:border-white/20" />

      {/* Subtle Coordinate Watermarks */}
      <div className="absolute top-20 right-6 font-mono text-[9px] uppercase tracking-widest text-slate-400/40 dark:text-slate-600/50 select-none hidden md:block">
        SYS.LOC: 15.2678°N 74.7562°E // SCALE: 1.0 // GRID: 32PX
      </div>
    </div>
  );
};
