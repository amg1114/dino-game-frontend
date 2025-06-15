import { useEffect, useRef, useState } from 'react';
import { VideoGame } from '../../../../models/video-game.interface';

export function useAssetsSlider(videoGame: VideoGame) {
  const { titulo, assets } = videoGame;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeOut = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [assets]);

  useEffect(() => {
    resetTimeout();
    if (assets.length) {
      timeOut.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % assets.length);
      }, 5000);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, assets.length]);

  const resetTimeout = () => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
      timeOut.current = null;
    }
  };

  const handleSelectAsset = (index: number) => {
    resetTimeout();
    setCurrentIndex(index);
  };

  if (!assets || assets.length === 0 || !assets[currentIndex]) return null;

  return {
    currentIndex,
    handleSelectAsset,
    assets,
    titulo,
  };
}
