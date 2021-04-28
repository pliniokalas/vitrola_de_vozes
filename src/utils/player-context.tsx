import { createContext, useContext, useState } from "react";

// ==================================================

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
  rate: number;
  togglePlay: (val: boolean) => void;
  makePlaylist: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrev: () => void;
  clearPlayer: () => void;
  mute: () => void;
  changeRate: (val: number) => void;
};

type PlayerContextProps = {
  children: React.ReactNode 
}

// ==================================================

const PlayerContext = createContext({} as PlayerContextData);

// ==================================================

export function PlayerContextProvider({ children }: PlayerContextProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1);

  const hasNext = currentIndex + 1 <= playlist.length - 1;
  const hasPrev = currentIndex - 1 >= 0;

  function togglePlay(val: boolean) {
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

  function changeRate(val: number) {
    setRate(val);
  }

  const value = {
    isPlaying,
    hasNext,
    hasPrev,
    playlist,
    currentIndex,
    isMuted,
    rate,
    togglePlay,
    playPrev,
    playNext,
    makePlaylist,
    clearPlayer,
    mute,
    changeRate,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

// ==================================================

export function usePlayer() {
  return useContext(PlayerContext);
}
