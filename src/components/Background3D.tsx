import React, { useEffect, useRef } from 'react';

export const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 3D Particles
    const particleCount = 100;
    const particles: Array<{
      x3d: number;
      y3d: number;
      z3d: number;
      size: number;
      color: string;
    }> = [];

    // Initialize particles in a 3D sphere
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 200 + Math.random() * 150;

      particles.push({
        x3d: radius * Math.sin(phi) * Math.cos(theta),
        y3d: radius * Math.sin(phi) * Math.sin(theta),
        z3d: radius * Math.cos(phi),
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#3B82F6' : '#06B6D4',
      });
    }

    // Rotation angles
    let angleX = 0.001;
    let angleY = 0.0015;

    const focalLength = 400;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw subtle glow highlight at mouse position
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        width > 768 ? 400 : 200
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.07)');
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Dynamic rotation based on mouse offset from center
      const mouseOffsetX = (mouse.x - width / 2) / (width / 2);
      const mouseOffsetY = (mouse.y - height / 2) / (height / 2);
      
      const currentAngleX = angleX + mouseOffsetY * 0.002;
      const currentAngleY = angleY + mouseOffsetX * 0.002;

      // Cosine and Sine values for 3D rotation
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      // Sort particles by Z-depth for correct rendering order (depth sorting)
      particles.sort((a, b) => b.z3d - a.z3d);

      particles.forEach((p) => {
        // Rotate X
        let y1 = p.y3d * cosX - p.z3d * sinX;
        let z1 = p.z3d * cosX + p.y3d * sinX;

        // Rotate Y
        let x2 = p.x3d * cosY - z1 * sinY;
        let z2 = z1 * cosY + p.x3d * sinY;

        // Update particle coordinates
        p.x3d = x2;
        p.y3d = y1;
        p.z3d = z2;

        // Project to 2D screen
        const scale = focalLength / (focalLength + z2);
        const screenX = width / 2 + x2 * scale;
        const screenY = height / 2 + y1 * scale;

        // Only draw if on screen
        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          const alpha = Math.max(0.1, Math.min(1, scale * 0.8));
          ctx.beginPath();
          ctx.arc(screenX, screenY, p.size * scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          
          // Add subtle outer glow to closer particles
          if (z2 < 50) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(screenX, screenY, p.size * scale * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};
