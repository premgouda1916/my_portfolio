import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [glowPosition, setGlowPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile touch devices
    const checkMobile = () => {
      const mobile = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      if (!mobile) setIsHidden(false);
    };

    checkMobile();

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add slight delay for the glow ring
      setTimeout(() => {
        setGlowPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or parent is interactive
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('interactive-cursor') ||
        target.closest('.interactive-cursor');
        
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile]);

  if (isMobile || isHidden) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-9999 ${isHovered ? 'cursor-hover' : ''}`}>
      {/* Center dot */}
      <div 
        className="custom-cursor" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      {/* Outer glow */}
      <div 
        className="custom-cursor-glow" 
        style={{ left: `${glowPosition.x}px`, top: `${glowPosition.y}px` }} 
      />
    </div>
  );
};
