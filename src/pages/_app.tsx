import { PlayerContextProvider } from "@/utils/player-context";

import Header from "@/components/header/header";
import Player from "@/components/player/player";

import "../styles/globals.scss";
import styles from "../styles/app.module.scss";

// ==================================================

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <main className={styles.appContainer}>
        <Header />
        <Component {...pageProps} />
        <Player />
      </main>
    </PlayerContextProvider>
  );
}

export default MyApp
