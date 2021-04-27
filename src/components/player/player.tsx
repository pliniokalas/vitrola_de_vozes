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
    audioRef.current.currentTime = val;
    setProgress(val);
  }

  function handleEnd() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayer();
    }
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
      {episode 
        ?
        <> {/* populated player */}
          <audio
            autoPlay
            src={episode.url}
            ref={audioRef}
            onPlay={() => togglePlay(true)}
            onPause={() => togglePlay(false)}
            onEnded={handleEnd}
            onLoadedMetadata={handleProgress}
          />
          <span>{episode.title}</span>

          <div className={styles.seekBarContainer}>
            <div className={styles.progressContainer}>
              <span>{convertTime(progress)}</span>
            </div>
            <Slider val={progress} max={episode.duration} onChange={handleSeek} />
            <span>{convertTime(episode.duration)}</span>
          </div>
        </>
        :
        <> {/* empty player */}
          <span>Escolha algo para ouvir</span>

          <div className={styles.seekBarContainer}>
            <span>00:00:00</span>
            <div className={styles.seekBar} />
            <span>00:00:00</span>
          </div>
        </>
      }

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
          <button type="button">
            <img src="/volume.svg" alt="volume" />
          </button>

          <button type="button">
            1x
          </button>
        </menu>
      </section>
    </div>
  );
}
