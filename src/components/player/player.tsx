import styles from "./styles.module.scss";

export default function Player(props) {
  return (
    <div className={styles.playerContainer}>
      <span>Selecione algo para tocar</span>

      <div className={styles.seekBarContainer}>
        <span>00:00:00</span>
        <div className={styles.seekBar} />
        <span>00:00:00</span>
      </div> 

      <section>
        <menu className={styles.playMenu}>
          <button type="button">
            <img src="/prev.svg" alt="Anterior" />
          </button>

          <button type="button">
            <img src="/play.svg" alt="Tocar" />
          </button>

          <button type="button">
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
