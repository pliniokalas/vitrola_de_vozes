import Link from "next/link";
import styles from "./styles.module.scss";

export default function FeaturedCard(props) {
  const { mode, thumb, metadata, title, id } = props;

  return (
    <>
      <article className={mode !== "ep" ? styles.featuredContainer : styles.regularContainer}>
        { mode !== "ep" && <h2>{mode}</h2> }

        <label htmlFor="playBtn">
          <input 
            name="playBtn"
            type="image" 
            src={thumb} 
            alt="thumbnail" 
            onClick={() => console.log("play the episode")}
          />
        </label>

        <p>{metadata}</p>

        <Link href={`/episodes/${id}`}>
          <a>{title}</a>
        </Link>
      </article>
    </>
  );
}
