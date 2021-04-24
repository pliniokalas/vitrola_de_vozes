import Header from "../components/header/header";
import Player from "../components/player/player";

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <main>
      <Header />
      <Component />
      <Player />
    </main>
  );
}

export default MyApp
