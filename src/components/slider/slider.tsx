import { useRef, useEffect } from "react";
import styles from "./styles.module.scss";

// ==================================================

type SliderProps = {
  val: number,
  onChange: (pos: number) => void,
  disabled: boolean,
}

// ==================================================

export default function Slider({ val, onChange, disabled = false }: SliderProps) {
  // const pos = (val / max) * 100;
  const areaRef = useRef();

  function handleClick(e: MouseEvent) {
    const width = areaRef.current.getBoundingClientRect().width;
    const pos = e.offsetX / width;
    onChange(pos);
  }

  // click the bar
  useEffect(() => {
    if (disabled) {
      return;
    }

    areaRef.current.onclick = (e: MouseEvent) => handleClick(e);
    return () => areaRef.current.onclick = null; 
  }, [disabled]);

  return (
    <div ref={areaRef} className={[styles.sliderContainer, (disabled && styles.off)].join(" ")}>
      <div style={{ width: (val * 100)+ "%" }} className={styles.rail} />
      <div className={styles.track} />
      <div style={{ left: (val * 100)+ "%" }} className={styles.handle} />
    </div>
  );
}
