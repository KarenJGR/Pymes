import PostForm from "./PostForm";
import PostPreview from "./PostPreview";
import { PlusCircle } from "lucide-react";

export default function Publicacione({
  posts,
  setPosts,
  selectedPost,
  setSelectedPost,
  showPostForm,
  setShowPostForm
}) {
  const handleSavePost = (post) => {
    if (post.id) {
      setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    } else {
      post.id = Date.now();
      setPosts([...posts, post]);
    }
    setShowPostForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Publicaciones</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 shadow hover:bg-blue-700 transition"
          onClick={() => {
            setSelectedPost(null);
            setShowPostForm(true);
          }}
        >
          <PlusCircle size={20} /> Crear Artículo
        </button>
      </div>

      {!showPostForm && !selectedPost ? (
        posts.length === 0 ? (
          <p className="text-gray-500">No hay publicaciones aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow rounded-xl p-4 cursor-pointer hover:shadow-xl transition border border-gray-100"
                onClick={() => setSelectedPost(post)}
              >
                {post.image && (
                  <img
                    src={post.image}
                    className="h-44 w-full object-cover rounded-lg"
                  />
                )}
                <h3 className="text-xl font-semibold mt-3">{post.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{post.subtitle}</p>
              </div>
            ))}
          </div>
        )
      ) : showPostForm ? (
        <PostForm
          post={selectedPost}
          onSave={handleSavePost}
          onCancel={() => setShowPostForm(false)}
        />
      ) : (
        <PostPreview
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
          onEdit={() => setShowPostForm(true)}
        />
      )}
    </div>
  );
}
