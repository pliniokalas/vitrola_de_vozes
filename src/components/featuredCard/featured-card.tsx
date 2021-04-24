import Link from "next/link";
import styles from "./styles.module.scss";

export default function FeaturedCard(props) {
  const { mode, thumb, metadata, title } = props;
  return (
    <>
      <div className={styles.cardContainer}>
        <h2>{mode}</h2>

        <input 
          type="image" 
          src={thumb} 
          alt="thumbnail" 
          onClick={() => console.log("play the episode")}
        />
        <p>{metadata}</p>

        <Link href={`/${title}`}>
          <a>{title}</a>
        </Link>
      </div>
    </>
  );
}
