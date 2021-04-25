import Header from "../components/header/header";
import Player from "../components/player/player";

import "../styles/globals.scss";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <main className={styles.appContainer}>
      <Header />
      <Component {...pageProps} />
      <Player />
    </main>
  );
}

export default MyApp
