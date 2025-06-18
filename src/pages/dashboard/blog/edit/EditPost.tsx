import axios from 'axios';
import { Post } from '@models/post.interface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostForm } from '../components/post-form/PostForm';

export function EditPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`${import.meta.env.VITE_API_URL}/api/noticias/noticia/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return <PostForm mode="edit" initialData={post} />;
}
