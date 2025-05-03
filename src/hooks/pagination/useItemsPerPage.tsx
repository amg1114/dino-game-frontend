import { useState, useEffect } from 'react';

interface ResponsiveItemsOptions {
  smallScreen: number;
  largeScreen: number;
}

export const useResponsiveItems = (options: ResponsiveItemsOptions) => {
  const { smallScreen, largeScreen } = options;
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setItemsPerPage(smallScreen);
      } else {
        setItemsPerPage(largeScreen);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [smallScreen, largeScreen]);

  return itemsPerPage;
};
