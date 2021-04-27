import { createContext, useContext, useState } from "react";

const PlayerContext = createContext({} as PlayerContextData);

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  members: string;
  url: string;
};

type PlayerContextData = {
  playlist: Episode[],
  currentIndex: number;
  isPlaying: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  makePlaylist: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrev: () => void;
  clearPlayer: () => void;
  mute: () => void;
};

type PlayerContextProps = {
  children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const hasNext = currentIndex + 1 <= playlist.length - 1;
  const hasPrev = currentIndex - 1 >= 0;

  function togglePlay(val) {
    setIsPlaying(val);
  }

  function playPrev() {
    if (hasPrev)
      setCurrentIndex(currentIndex - 1);
  }

  function playNext() {
    if (hasNext)
      setCurrentIndex(currentIndex + 1);
  }

  function makePlaylist(list: Episode[], index: number) {
    setPlaylist(list);
    setCurrentIndex(index);
    setIsPlaying(true);
  }

  function clearPlayer() {
    setPlaylist([])
    setCurrentIndex(0)
    setIsPlaying(false)
  }

  function mute() {
    setIsMuted((prev) => !prev);
  }

  const value = {
    isPlaying,
    hasNext,
    hasPrev,
    playlist,
    currentIndex,
    isMuted,
    togglePlay,
    playPrev,
    playNext,
    makePlaylist,
    clearPlayer,
    mute,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
