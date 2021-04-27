import { usePlayer } from "../../utils/player-context.tsx";
import { convertTime } from "../../utils/utils.js";
import { useRef, useEffect, useState } from "react";
import Slider from "../slider/slider.tsx";
import styles from "./styles.module.scss";

type Episode = {
  id: string,
  title: string,
  duration: number,
  url: string,
};

type PlayerProps = {
  episode: Episode
};

export default function Player() {
  const { 
    isPlaying,
    playlist,
    currentIndex,
    togglePlay,
    playNext,
    playPrev,
    hasNext,
    hasPrev,
    isMuted,
    mute,
    rate,
    changeRate,
  } = usePlayer();

  const [progress, setProgress] = useState(0);

  const episode = playlist[currentIndex];
  const audioRef = useRef();

  function handleProgress() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(val: number) {
    const time = Math.floor(val * episode.duration);
    audioRef.current.currentTime = time;
    setProgress(time);
  }

  function handleEnd() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayer();
    }
  }

  function handleRateChange() {
    let newRate = rate;

    switch(rate) {
      case 1:
        newRate = 1.5;
        break;
      case 1.5:
        newRate = 2;
        break;
      case 2:
        newRate = 0.5;
        break;

      default:
        newRate = 1;
    }

    changeRate(newRate);
    audioRef.current.playbackRate = newRate;
  } 

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying]);

  return (
    <div className={styles.playerContainer}>
      {episode &&
        <audio
          autoPlay
          src={episode.url}
          ref={audioRef}
          muted={isMuted}
          onPlay={() => togglePlay(true)}
          onPause={() => togglePlay(false)}
          onEnded={handleEnd}
          onLoadedMetadata={handleProgress}
        />
      }

      <span>{episode?.title || "Escolha algo para ouvir"}</span>

      <div className={styles.seekBarContainer}>
        <div className={styles.progressContainer}>
          <span>{convertTime(progress)}</span>
        </div>
        <Slider 
          disabled={!episode}
          val={(progress/episode?.duration)} 
          onChange={handleSeek} 
        />
        <span>{convertTime(episode?.duration || 0)}</span>
      </div>

      <section>
        <menu className={styles.playMenu}>
          <button 
            type="button"
            onClick={playPrev}
            disabled={!episode || !hasPrev}
          >
            <img src="/prev.svg" alt="Anterior" />
          </button>

          <button 
            type="button"
            onClick={() => togglePlay(!isPlaying)}
            disabled={!episode}
          >
            { isPlaying 
              ? <img src="/pause.svg" alt="Pausar" />
              : <img src="/play.svg" alt="Tocar" />
            }
          </button>

          <button 
            type="button"
            onClick={playNext}
            disabled={!episode || !hasNext}
          >
            <img src="/next.svg" alt="Próximo" />
          </button>
        </menu>

        <menu className={styles.settingsMenu}>
          <button 
            className={styles.rateBtn}
            type="button" 
            onClick={handleRateChange}
          >
            {rate + "x"}
          </button>

          <div className={styles.volumeContainer}>
            <button 
              className={styles.volumeBtn}
              type="button"
              onClick={mute}
            >
              { isMuted
                ? <img src="/mute.svg" alt="muted" />
                : <img src="/volume.svg" alt="volume" />
              }
            </button>
            <Slider 
              disabled={!episode}
              val={audioRef.current?.volume} 
              onChange={(vol) => audioRef.current.volume = vol} 
            />
          </div>
        </menu>
      </section>
    </div>
  );
}
