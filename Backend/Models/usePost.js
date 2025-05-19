import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const usePosts = (userId, page = 1, limit = 10) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Чтобы сбрасывать посты при смене userId
  useEffect(() => {
    setPosts([]);
  }, [userId]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_Production_ROOT}post/getAllPosts`,
        {
          currentUserId: userId,
          page,
          limit,
        }
      );

      // Удаление дубликатов по _id
      setPosts((prevPosts) => {
        const allPosts = [...prevPosts, ...data.post];
        const uniquePosts = Array.from(
          new Map(allPosts.map((p) => [p._id, p])).values()
        );
        return uniquePosts;
      });
    } catch (error) {
      toast.error("Ошибка при получении постов");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, page]);

  return { posts, isLoading, fetchPosts };
};
