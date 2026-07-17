import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((window.scrollY / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    window.addEventListener('scroll', updateScrollDepth);
    return () => window.removeEventListener('scroll', updateScrollDepth);
  }, []);

  return completion;
};
