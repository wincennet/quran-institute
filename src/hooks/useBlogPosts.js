import { useEffect, useMemo, useState } from "react";
import { cmsEnabled, fetchPublishedPosts, toPost } from "../lib/cms";
import { getBlogCategory, sortPosts } from "../lib/blog";

// The posts for one blog category: the ones written in src/lib/blog.js plus the
// published ones from the admin page, newest first. `loading` is true only while
// the database posts are still arriving.
export default function useBlogPosts(categoryId) {
  const [remote, setRemote] = useState([]);
  const [loading, setLoading] = useState(cmsEnabled);

  useEffect(() => {
    let active = true;
    fetchPublishedPosts().then((rows) => {
      if (!active) return;
      setRemote(rows);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const posts = useMemo(() => {
    const category = getBlogCategory(categoryId);
    if (!category) return [];
    const stored = remote.filter((row) => row.category === categoryId).map(toPost);
    return sortPosts([...category.posts, ...stored]);
  }, [categoryId, remote]);

  return { posts, loading };
}
