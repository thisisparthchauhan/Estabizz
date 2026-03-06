"use client";
import React, { useEffect, useRef, useState } from "react";

export default function LiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Scale for high DPI displays
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        let scrollY = window.scrollY;
        let lastScrollY = scrollY;
        let scrollSpeed = 0;
        let shockwaveRadius = 0;
        let shockwaveOpacity = 0;
        let mouse = { x: width / 2, y: height / 2 };

        const themes = [
            { r: 240, g: 249, b: 255 }, // #f0f9ff
            { r: 239, g: 246, b: 255 }, // #eff6ff
            { r: 240, g: 253, b: 244 }, // #f0fdf4
            { r: 248, g: 250, b: 255 }, // #f8faff
        ];

        // Objects
        const particles = Array.from({ length: 85 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2.5 + 0.5,
            type: ['dot', 'ring', 'cross', 'diamond', 'square'][Math.floor(Math.random() * 5)],
            speedY: -(Math.random() * 0.4 + 0.1),
            speedX: (Math.random() - 0.5) * 0.2,
            phase: Math.random() * Math.PI * 2,
            color: Math.random() > 0.5 ? '0,150,220' : '16,185,129'
        }));

        const nodes = Array.from({ length: 16 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 4 + 3,
            pulse: Math.random() * Math.PI * 2
        }));

        const packets = Array.from({ length: 12 }, () => ({
            progress: Math.random(),
            from: Math.floor(Math.random() * nodes.length),
            to: Math.floor(Math.random() * nodes.length),
            speed: Math.random() * 0.005 + 0.002
        }));

        const dataStreams = Array.from({ length: 10 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            speed: Math.random() * 2 + 1,
            length: Math.random() * 100 + 50
        }));

        const symbolsData = ['$', '₹', '%', '↑', '◆', '▲'];
        const symbols = Array.from({ length: 15 }, () => ({
            char: symbolsData[Math.floor(Math.random() * symbolsData.length)],
            x: Math.random() * width,
            y: Math.random() * height,
            phase: Math.random() * Math.PI * 2,
            speedY: -(Math.random() * 0.1)
        }));

        const blobs = [
            { x: width * 0.8, y: height * 0.2, r: 400, color: 'rgba(0,150,220,0.07)' },
            { x: width * 0.2, y: height * 0.8, r: 500, color: 'rgba(16,185,129,0.06)' },
            { x: width / 2, y: height / 2, r: 350, color: 'rgba(0,150,220,0.05)', followMouse: true },
            { x: width / 2, y: height / 2, r: 600, color: 'rgba(0,150,220,0.04)', pulse: true }
        ];

        let time = 0;

        const drawParticle = (p: any, cx: number, cy: number, alpha: number) => {
            ctx.strokeStyle = `rgba(${p.color},${alpha})`;
      ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      switch (p.type) {
        case 'dot':
          ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'ring':
          ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'cross':
          ctx.moveTo(cx - p.size, cy); ctx.lineTo(cx + p.size, cy);
          ctx.moveTo(cx, cy - p.size); ctx.lineTo(cx, cy + p.size);
          ctx.stroke();
          break;
        case 'square':
          ctx.rect(cx - p.size, cy - p.size, p.size * 2, p.size * 2);
          ctx.stroke();
          break;
        case 'diamond':
          ctx.moveTo(cx, cy - p.size); ctx.lineTo(cx + p.size, cy);
          ctx.lineTo(cx, cy + p.size); ctx.lineTo(cx - p.size, cy);
          ctx.closePath(); ctx.stroke();
          break;
      }
    };

    const render = () => {
      time += 0.016; // Approx 60fps step
      ctx.clearRect(0, 0, width, height);

      // 1. Interpolate Theme Background
      const scrollMax = document.documentElement.scrollHeight - height || 1;
      let scrollFrac = scrollY / scrollMax;
      if (scrollFrac < 0) scrollFrac = 0;
      if (scrollFrac > 1) scrollFrac = 1;
      
      let themeIndex = Math.floor(scrollFrac * 4);
      if (themeIndex > 3) themeIndex = 3;
      const nextThemeIndex = Math.min(themeIndex + 1, 3);
      const frac = (scrollFrac * 4) - themeIndex;

      const c1 = themes[themeIndex];
      const c2 = themes[nextThemeIndex];
      
      const r = Math.round(c1.r + (c2.r - c1.r) * frac);
      const g = Math.round(c1.g + (c2.g - c1.g) * frac);
      const b = Math.round(c1.b + (c2.b - c1.b) * frac);
      
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, 0, width, height);

      // 2. Morphing Grid
      ctx.strokeStyle = "rgba(0,150,220,0.04)";
      ctx.lineWidth = 1;
      const cols = 16;
      const rows = 10;
      const cellW = width / cols;
      const cellH = height / rows;
      const skew = scrollFrac * 20;

      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for(let py = 0; py <= height; py += 40) {
           const offset = Math.sin(time + i) * 6;
           const px = i * cellW + offset + (py / height) * skew;
           if (py === 0) ctx.moveTo(px, py);
           else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        for(let px = 0; px <= width; px += 40) {
           const offset = Math.sin(time + j + 10) * 6;
           const py = j * cellH + offset;
           if (px === 0) ctx.moveTo(px, py);
           else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // 3. Gradient Blobs
      blobs.forEach(blob => {
        let bx = blob.x, by = blob.y;
        if (blob.followMouse) {
          bx += (mouse.x - bx) * 0.05;
          by += (mouse.y - by) * 0.05;
          blob.x = bx; blob.y = by; // save state
        }
        let radius = blob.r;
        if (blob.pulse) {
           radius += Math.sin(time * 0.5) * 50;
        }
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'rgba(0,150,220,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Node Network
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        
        // Drift toward cursor slightly
        n1.x += (mouse.x - n1.x) * 0.0005;
        n1.y += (mouse.y - n1.y) * 0.0005;

        n1.x += n1.vx; n1.y += n1.vy;
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        n1.pulse += 0.05;

        // Connections
        for (let j = i + 1; j < nodes.length; j++) {
           const n2 = nodes[j];
           const dx = n2.x - n1.x;
           const dy = n2.y - n1.y;
           const dist = Math.sqrt(dx*dx + dy*dy);
           if (dist < 180) {
             ctx.beginPath();
             ctx.moveTo(n1.x, n1.y);
             ctx.lineTo(n2.x, n2.y);
             ctx.strokeStyle = "rgba(0,150,220,0.12)";
             ctx.stroke();
           }
        }

        // Draw Core
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,150,220,0.2)";
        ctx.fill();

        // Draw Pulse Ring
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.size + Math.sin(n1.pulse) * 4 + 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,150,220,0.1)";
        ctx.stroke();
      }

      // Packets
      packets.forEach(pkt => {
         pkt.progress += pkt.speed;
         if (pkt.progress >= 1) {
           pkt.progress = 0;
           pkt.from = pkt.to;
           pkt.to = Math.floor(Math.random() * nodes.length);
         }
         const nFrom = nodes[pkt.from];
         const nTo = nodes[pkt.to];
         if(!nFrom || !nTo) return;
         const dist = Math.hypot(nTo.x - nFrom.x, nTo.y - nFrom.y);
         if (dist < 200) {
           const px = nFrom.x + (nTo.x - nFrom.x) * pkt.progress;
           const py = nFrom.y + (nTo.y - nFrom.y) * pkt.progress;
           ctx.beginPath();
           ctx.arc(px, py, 2, 0, Math.PI*2);
           ctx.fillStyle = "rgba(0,150,220,0.4)";
           ctx.fill();
         }
      });

      // 5. Data Streams
      dataStreams.forEach(stream => {
         stream.y += stream.speed + Math.abs(scrollSpeed) * 0.1;
         if (stream.y > height + stream.length) {
            stream.y = -stream.length;
            stream.x = Math.random() * width;
         }
         const grad = ctx.createLinearGradient(0, stream.y - stream.length, 0, stream.y);
         grad.addColorStop(0, "rgba(0,150,220,0)");
         grad.addColorStop(0.8, "rgba(0,150,220,0.12)");
         grad.addColorStop(1, "rgba(0,150,220,0)");
         
         ctx.beginPath();
         ctx.moveTo(stream.x, stream.y - stream.length);
         ctx.lineTo(stream.x, stream.y);
         ctx.strokeStyle = grad;
         ctx.lineWidth = 2;
         ctx.stroke();

         ctx.beginPath();
         ctx.arc(stream.x, stream.y, 2, 0, Math.PI*2);
         ctx.fillStyle = "rgba(0,150,220,0.5)";
         ctx.fill();
      });

      // 6. Particles
      particles.forEach(p => {
         p.y += p.speedY - (scrollSpeed * 0.05);
         p.x += p.speedX;
         p.phase += 0.02;

         // Wrap
         if (p.y < -10) p.y = height + 10;
         if (p.y > height + 10) p.y = -10;
         if (p.x < -10) p.x = width + 10;
         if (p.x > width + 10) p.x = -10;

         // Mouse repulsion
         const dx = mouse.x - p.x;
         const dy = mouse.y - p.y;
         const dist = Math.sqrt(dx*dx + dy*dy);
         if (dist < 100) {
            p.x -= dx * 0.02;
            p.y -= dy * 0.02;
         }

         const alpha = (Math.sin(p.phase) * 0.5 + 0.5) * 0.5 + 0.1; // 0.1 - 0.6
         drawParticle(p, p.x, p.y, alpha);
      });

      // 7. Finance Symbols
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      symbols.forEach(s => {
         s.y += s.speedY;
         s.phase += 0.01;
         if (s.y < -20) s.y = height + 20;
         const alpha = (Math.sin(s.phase) * 0.5 + 0.5) * 0.1; 
         ctx.fillStyle = `rgba(0,150,220,${alpha})`;
         ctx.fillText(s.char, s.x, s.y);
      });

      // 8. Scan Line
      const scanPhase = (time % 8) / 8; // 0 to 1 over 8s
      const scanY = scanPhase * height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 80, 0, scanY);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(1, "rgba(0,150,220,0.03)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 80, width, 80);

      // 9. Shockwave Ripple
      if (shockwaveOpacity > 0) {
         shockwaveRadius += 15;
         shockwaveOpacity -= 0.02;
         ctx.beginPath();
         ctx.arc(width/2, height/2, shockwaveRadius, 0, Math.PI*2);
         ctx.lineWidth = 40;
         const swGrad = ctx.createRadialGradient(width/2, height/2, Math.max(0, shockwaveRadius - 40), width/2, height/2, shockwaveRadius);
         swGrad.addColorStop(0, `rgba(0,150,220,0)`);
         swGrad.addColorStop(1, `rgba(0,150,220,${Math.max(0, shockwaveOpacity) * 0.1})`);
         ctx.strokeStyle = swGrad;
         ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event Handlers
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    let debounceTimer: any;
    const handledDebouncedResize = () => {
       clearTimeout(debounceTimer);
       debounceTimer = setTimeout(handleResize, 100);
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      scrollSpeed = scrollY - lastScrollY;
      lastScrollY = scrollY;
      
      if (Math.abs(scrollSpeed) > 50 && shockwaveOpacity <= 0) {
         shockwaveRadius = 0;
         shockwaveOpacity = 1;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handledDebouncedResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handledDebouncedResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none" 
      style={{ display: 'block' }}
    />
  );
}
