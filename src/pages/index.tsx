import FeaturedCard from "../components/featuredCard/featured-card";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <section className={styles.homeContainer}>
      <FeaturedCard 
        mode="Continue Ouvindo"
        title="Título do episódio"
        metadata="01 Jan, 2001"
        thumb="/"
      />

      <ul className="allEpisodes">

      </ul>
    </section>
  );
}
