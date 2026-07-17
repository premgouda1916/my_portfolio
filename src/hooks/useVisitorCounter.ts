import { useState, useEffect } from 'react';

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(1337);

  useEffect(() => {
    // Generate a premium-looking static baseline
    const baseCount = 8420;
    const stored = localStorage.getItem('portfolio_visitor_count');
    
    if (stored) {
      const parsed = parseInt(stored, 10);
      const newCount = parsed + (Math.random() > 0.7 ? 1 : 0); // increment occasionally
      setVisitorCount(newCount);
      localStorage.setItem('portfolio_visitor_count', newCount.toString());
    } else {
      const initial = baseCount + Math.floor(Math.random() * 200);
      setVisitorCount(initial);
      localStorage.setItem('portfolio_visitor_count', initial.toString());
    }
  }, []);

  return visitorCount;
};
