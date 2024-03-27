import React, { useState, useEffect } from 'react';

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  // Initial color is #E5E5E5 (RGB: 229, 229, 229)
  const [color, setColor] = useState('rgb(229, 229, 229)');

  useEffect(() => {
    let startTimestamp = null;
    // Dynamic duration: every number counts for 0.1 second
    const duration = target * 40; // Convert target to milliseconds for the counting duration
    const colorTransitionStartTimestamp = duration; // Start color transition back to #E5E5E5 after counting
    const endColorTransitionDuration = 500; // 0.5 seconds for the color transition back

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsedTime = timestamp - startTimestamp;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeInOutProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

      // Update count based on progress
      setCount(Math.floor(easeInOutProgress * target));

      // Transition from #E5E5E5 to #00DBFF during counting
      if (elapsedTime <= duration) {
        const colorIntensity = easeInOutProgress;
        const r = Math.floor(229 + (0 - 229) * colorIntensity);
        const g = Math.floor(229 + (219 - 229) * colorIntensity);
        const b = Math.floor(229 + (255 - 229) * colorIntensity);
        setColor(`rgb(${r}, ${g}, ${b})`);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else if (elapsedTime <= colorTransitionStartTimestamp + endColorTransitionDuration) {
        // After counting, start transitioning color back to #E5E5E5 smoothly
        const colorElapsedTime = elapsedTime - duration;
        const colorProgress = Math.min(colorElapsedTime / endColorTransitionDuration, 1);
        const r = Math.floor(0 + (229 - 0) * colorProgress);
        const g = Math.floor(219 + (229 - 219) * colorProgress);
        const b = Math.floor(255 + (229 - 255) * colorProgress);
        setColor(`rgb(${r}, ${g}, ${b})`);
        window.requestAnimationFrame(step);
      } else {
        setColor('rgb(229, 229, 229)'); // Ensure it ends exactly at #E5E5E5
      }
    };

    window.requestAnimationFrame(step);
  }, [target]); // Re-run animation if target changes

  return <p style={{ color }}>{count}</p>;
};

export default Counter;
