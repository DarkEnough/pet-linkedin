import React, { useMemo } from "react";

const EMOJIS = ["🐶", "🐱", "🐰", "🐦", "🐢", "🐸", "🦊", "🐻", "🐼", "🦁", "🐮", "🐷", "🐵", "🐔", "🐧", "🐨", "🦄", "🐙", "🐠", "🦉"];
const NUM_EMOJIS = 48;
const COLS = 8;
const ROWS = 6;

function getRandomOffset(max: number) {
  return Math.random() * max - max / 2;
}

export const FloatingEmojisBackground: React.FC = () => {
  const emojis = useMemo(() => {
    return Array.from({ length: NUM_EMOJIS }).map((_, i) => {
      const emoji = EMOJIS[i % EMOJIS.length];
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const left = (col * (100 / (COLS - 1))) + getRandomOffset(8); // 0-100% + jitter
      const top = (row * (100 / (ROWS - 1))) + getRandomOffset(8); // 0-100% + jitter
      const duration = 10 + Math.random() * 8;
      const size = 28 + Math.random() * 20;
      return {
        emoji,
        left,
        top,
        duration,
        size,
        opacity: 0.18 + Math.random() * 0.18,
        key: i,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {emojis.map(({ emoji, left, top, duration, size, opacity, key }) => (
        <span
          key={key}
          className="absolute animate-float"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            fontSize: `${size}px`,
            animationDuration: `${duration}s`,
            opacity,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}; 