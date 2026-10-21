import { useEffect, useState } from 'react';

import { type BlogPost, getAllPosts, getPostsMetadata } from '../lib/post';

export interface UsePostsOptions {
  showContent?: boolean;
}

export interface UsePostsReturn {
  posts: Omit<BlogPost, 'content'>[];
  loading: boolean;
  error: string | null;
}

export const usePosts = ({
  showContent = false,
}: UsePostsOptions = {}): UsePostsReturn => {
  const [posts, setPosts] = useState<Omit<BlogPost, 'content'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (showContent) {
          const fetchedPosts = await getAllPosts();
          setPosts(fetchedPosts);
        } else {
          // Only need metadata — cheaper than loading full content
          const metadata = await getPostsMetadata();
          const postsWithEmptyContent = metadata.map((meta) => ({
            slug: meta.slug,
            metadata: {
              title: meta.title,
              publishedAt: meta.publishedAt,
              summary: meta.summary,
              image: meta.image,
            },
            content: '',
          }));
          setPosts(postsWithEmptyContent);
        }
      } catch (err) {
        setError('Failed to load blog posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [showContent]);

  return { posts, loading, error };
};

export default usePosts;
