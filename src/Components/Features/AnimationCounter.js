import React, { useState, useEffect } from "react";

const Counter = ({ target, isHovered  }) => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("rgb(229, 229, 229)");
 

 
 

  // const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
 let fast___set = 40 
    if ( target > 200){fast___set = 0.1 }
 

    let startTimestamp = null;
    const duration = target * fast___set;
    const colorTransitionStartTimestamp = duration;
    const endColorTransitionDuration = 500;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsedTime = timestamp - startTimestamp;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeInOutProgress =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      setCount(Math.floor(easeInOutProgress * target));

      if (elapsedTime <= duration) {
        const colorIntensity = easeInOutProgress;
        const r = Math.floor(229 + (0 - 229) * colorIntensity);
        const g = Math.floor(229 + (219 - 229) * colorIntensity);
        const b = Math.floor(229 + (255 - 229) * colorIntensity);
        setColor(`rgb(${r}, ${g}, ${b})`);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else if (
        elapsedTime <=
        colorTransitionStartTimestamp + endColorTransitionDuration
      ) {
        const colorElapsedTime = elapsedTime - duration;
        const colorProgress = Math.min(
          colorElapsedTime / endColorTransitionDuration,
          1
        );
        const r = Math.floor(0 + (229 - 0) * colorProgress);
        const g = Math.floor(219 + (229 - 219) * colorProgress);
        const b = Math.floor(255 + (229 - 255) * colorProgress);
        setColor(`rgb(${r}, ${g}, ${b})`);
        window.requestAnimationFrame(step);
      } else {
        setColor("rgb(229, 229, 229)");
      }
    };

    window.requestAnimationFrame(step);
  }, [target]);

  // const handleHover = () => {
  //   setIsHovered(true);
  // };

  // const handleLeave = () => {
  //   setIsHovered(false);
  // };

  return (
    <div
      // onMouseEnter={handleHover}
      // onMouseLeave={handleLeave}
      style={{ transition: "color 0.15s ease-in-out" }}
    >
      <p
        style={{
          color: isHovered ? "#00DBFF" : color,
          transition: "color 0.15s ease-in-out",
        }}
      >
        {count}
      </p>
    </div>
  );
};

 


export { Counter };
