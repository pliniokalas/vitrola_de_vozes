import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";

export default function Slider({ val, max, onChange }) {
  const pos = (val / max) * 100;
  const knobRef = useRef();
  const areaRef = useRef();

  function handleClick(e) {
    const width = areaRef.current.getBoundingClientRect().width;
    const time = Math.floor((e.offsetX / width) * max);
    onChange(time);
  }

  // click the bar
  useEffect(() => {
    areaRef.current.onclick = (e) => handleClick(e);
    return () => areaRef.current.onclick = null; 
  }, []);

  return (
    <div ref={areaRef} className={styles.sliderContainer}>
      <div style={{ width: pos + "%" }} className={styles.rail} />
      <div className={styles.track} />
      <div ref={knobRef} style={{ left: pos + "%" }} className={styles.handle} />
    </div>
  );
}
