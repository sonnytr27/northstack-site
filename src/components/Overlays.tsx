"use client";

import { useEffect, useRef } from "react";

export default function Overlays() {
  const scratchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scratchRef.current;
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const scratch = document.createElement("div");
      scratch.classList.add("scratch");

      const width = Math.random() * 200 + 50;
      const height = Math.random() * 1 + 0.5;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const rotation = Math.random() * 360;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 5;

      scratch.style.width = `${width}px`;
      scratch.style.height = `${height}px`;
      scratch.style.top = `${top}%`;
      scratch.style.left = `${left}%`;
      scratch.style.transform = `rotate(${rotation}deg)`;
      scratch.style.animationDelay = `${delay}s`;
      scratch.style.animationDuration = `${duration}s`;

      container.appendChild(scratch);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <>
      {/* Overlays */}
      <div className="noise-layer" />
      <div className="scanline" />
      <div className="scratch-layer" ref={scratchRef} />
    </>
  );
}
