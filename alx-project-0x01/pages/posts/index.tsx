import PostCard from "@/components/common/PostCard";
import Header from "@/components/layout/Header";
import { PostData, PostProps } from "@/interfaces";
import PostModal from "@/components/common/PostModal";
import { useState } from "react";

interface PostsPageProps {
  posts: PostProps[];
}




const Posts: React.FC<PostsPageProps> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allPosts, setAllPosts] = useState<PostProps[]>(posts); // Local state for posts

  const handleAddPost = (newPost: PostData) => {
    const newId = allPosts.length + 1;
    const postWithId: PostProps = { ...newPost, id: newId, userId: 1 }; // Assuming userId
    setAllPosts([postWithId, ...allPosts]); // Add to top
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Post Content</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add Post
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {allPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <PostModal onClose={() => setModalOpen(false)} onSubmit={handleAddPost} />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: PostProps[] = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Posts;
