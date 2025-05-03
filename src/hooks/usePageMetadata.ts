import { useEffect } from 'react';

type MetadataOptions = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
};

function setOrCreateMetaTag(attr: string, value: string, property = false) {
  const selector = property ? `meta[property='${attr}']` : `meta[name='${attr}']`;
  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(property ? 'property' : 'name', attr);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', value);
}

export function usePageMetadata({ title, description, keywords, image }: MetadataOptions) {
  useEffect(() => {
    if (title) {
      const fullTitle = `${title} | DinoGame`;
      document.title = fullTitle;
      setOrCreateMetaTag('og:title', fullTitle, true);
    }

    if (description) {
      setOrCreateMetaTag('description', description);
      setOrCreateMetaTag('og:description', description, true);
    }

    if (keywords) {
      setOrCreateMetaTag('keywords', keywords);
    }

    if (image) {
      setOrCreateMetaTag('og:image', image, true);
    }
  }, [title, description, keywords, image]);
}
