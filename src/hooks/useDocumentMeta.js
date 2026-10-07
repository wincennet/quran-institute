import { useEffect } from "react";

const DEFAULT_TITLE = document.title;

function getDescriptionTag() {
  return document.querySelector('meta[name="description"]');
}

// The site is a single index.html, so per-page titles and descriptions have to
// be set from React. Restores the homepage values when the page unmounts.
export default function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const tag = getDescriptionTag();
    const previousDescription = tag?.getAttribute("content");

    document.title = title;
    if (tag && description) tag.setAttribute("content", description);

    return () => {
      document.title = DEFAULT_TITLE;
      if (tag && previousDescription) tag.setAttribute("content", previousDescription);
    };
  }, [title, description]);
}
