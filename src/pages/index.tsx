import { GetStaticProps } from "next";
import { usePlayer } from "../utils/player-context.tsx";
import { formatDate, convertTime } from "../utils/utils";
import FeaturedCard from "../components/featuredCard/featured-card";
import styles from "../styles/home.module.scss";

type Episode = {
  id: string, 
  title: string, 
  thumbnail: string, 
  members: string, 
  publishedAt: string,
  duration: number, 
  url: string 
};

type HomeProps = {
  allEpisodes: Episode[];
}

export default function Home({ allEpisodes }: HomeProps) {
  const { makePlaylist } = usePlayer();

  return (
    <section className={styles.homeContainer}>
      <FeaturedCard 
        mode="Continue Ouvindo"
        id="1234"
        title="Título do episódio"
        metadata="01 Jan, 2001"
        thumb="/"
        play={() => {}}
      />

    <div className="allEpisodes">
      <menu>
        <span>Episódios</span>

        <button type="button">
          <img src="filter.svg" alt="Filtrar" />
        </button>

        <button type="button">
          <img src="sort.svg" alt="Ordenar" />
        </button>
      </menu>

      <ul className="allEpisodes">
        { allEpisodes.map((episode, index) => (
          <li key={episode.id}>
            <FeaturedCard
              mode="ep"
              id={episode.id}
              title={episode.title}
              metadata={episode.publishedAt + " - " + convertTime(episode.duration)}
              thumb={episode.thumbnail}
              play={() => makePlaylist(allEpisodes, index)}
            />
          </li>))
        }
      </ul>
    </div>
  </section>
);
}

export const getStaticProps: GetStaticProps = async () => {
  const base = "http://localhost:3333/episodes?";
  const params = "_limit=9" + "&_sort=published_at" + "&_order=desc";
  const url = base + params;

  const resp = await fetch(url);
  const data = await resp.json();

  const allEpisodes = data.map((episode) => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publishedAt: formatDate(episode.published_at),
    duration: Number(episode.file.duration),
    url: episode.file.url,
  }));

  return ({
    props: {
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  });
}

