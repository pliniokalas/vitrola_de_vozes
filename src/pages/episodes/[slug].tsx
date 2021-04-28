import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";

import { formatDate, convertTime } from "@/utils/utils";
import { usePlayer } from "@/utils/player-context";

import styles from "./styles.module.scss";

// ==================================================

type Episode = {
    id: string, 
    title: string, 
    thumbnail: string, 
    members: string, 
    publishedAt: string, 
    duration: number, 
    url: string, 
    description: string 
}

type EpisodeProps = {
  episode: Episode,
}

// ==================================================

export default function Episode({ episode }: EpisodeProps) {
  const { isPlaying, togglePlay, makePlaylist } = usePlayer(); 

  function handlePlay() {
    if (isPlaying) {
      togglePlay(false);
    } else {
      makePlaylist([episode], 0);
    }
  }

  return (
    <section className={styles.episodeContainer}>
      <div>
        <Image
          className={styles.thumbnail}
          src={episode.thumbnail}
          alt="thumbnail"
          width={360}
          height={360}
          objectFit="cover"
        />
        <p>{episode.members}</p>
        <span>{episode.publishedAt}</span>
        <span>{convertTime(episode.duration)}</span>
        <button 
          className={styles.playBtn} 
          type="button"
          onClick={handlePlay}
        >
          { isPlaying 
            ? <img src="/pause.svg" alt="tocando" />
            : <img src="/play.svg" alt="tocar" /> 
          }
        </button>
      </div>

      <article className={styles.description}>
        <h2 className={styles.header}>
          <Link href={"/"}>
            <button type="button">
              <img src="/back.svg" alt="voltar" />
            </button>
          </Link>
          {episode.title}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: episode.description }} />
      </article>
    </section>
  );
}

// ==================================================

// TODO add latest episode path
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

// ==================================================

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const resp = await fetch(`http://localhost:3333/episodes/${slug}`);
  const data = await resp.json();

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: formatDate(data.published_at),
    duration: Number(data.file.duration),
    url: data.file.url,
    description: data.description,
  };

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24
  }
}
