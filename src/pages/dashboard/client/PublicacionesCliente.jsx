import { useState } from "react";
import { X, Menu } from "lucide-react";

export default function PublicacionesCliente({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  console.log(posts);
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No hay publicaciones disponibles aún.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ---------------------- NAVBAR ---------------------- */}
      <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-xl font-bold tracking-tight text-indigo-600">
            Publicaciones
          </h1>

          {/* Menú escritorio */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <button className="hover:text-indigo-600">Inicio</button>
            <button className="hover:text-indigo-600">Publicaciones</button>
            <button className="hover:text-indigo-600">Productos</button>
            <button className="hover:text-indigo-600">Fotos</button>
          </div>

          {/* Menu móvil */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu />
          </button>
        </div>

        {/* Menu desplegable móvil */}
        {showMenu && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2 px-6">
            <button className="block py-2 w-full text-left hover:text-indigo-600">
              Inicio
            </button>
            <button className="block py-2 w-full text-left hover:text-indigo-600">
              Publicaciones
            </button>
            <button className="block py-2 w-full text-left hover:text-indigo-600">
              Productos
            </button>
            <button className="block py-2 w-full text-left hover:text-indigo-600">
              Fotos
            </button>
          </div>
        )}
      </nav>

      {/* ------------------- LISTA DE PUBLICACIONES ------------------- */}
      {!selectedPost && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Últimas publicaciones
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg 
                           hover:-translate-y-1 transition cursor-pointer"
              >
                {/* Imagen */}
                <img
                  src={post.image || "https://www.beedigital.es/wp-content/uploads/2025/09/shutterstock_2284130739.jpg"}
                  className="w-full h-40 object-cover"
                  alt={post.title}
                />

                {/* Tarjeta */}
                <div className="p-5">
                  
                  {post.category && (
                    <span
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{
                        backgroundColor: post.categoryColor || "#4F46E5",
                      }}
                    >
                      {post.category}
                    </span>
                  )}

                  <h3 className="text-lg font-semibold mt-3 text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>

                  {post.subtitle && (
                    <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                      {post.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                    <span>{post.author || "Autor"}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------- VISTA COMPLETA ------------------- */}
      {selectedPost && (
        <div className="bg-white shadow-xl rounded-xl max-w-5xl mx-auto mt-10 mb-16 overflow-hidden">

          {/* Hero */}
          <div className="relative h-72 md:h-96">
            <img
              src={selectedPost.image || "https://www.beedigital.es/wp-content/uploads/2025/09/shutterstock_2284130739.jpg"}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 bg-white p-2 rounded-full shadow 
                         hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-6">
              <h1 className="text-4xl font-semibold text-white drop-shadow">
                {selectedPost.title}
              </h1>

              {selectedPost.subtitle && (
                <p className="text-gray-200 mt-2">{selectedPost.subtitle}</p>
              )}
            </div>
          </div>

          {/* Contenido */}
          <div className="px-8 py-10 max-w-4xl mx-auto">

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mb-6">
              <span>{selectedPost.author}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>

              {selectedPost.category && (
                <>
                  <span>•</span>
                  <span
                    className="px-3 py-1 rounded-full text-xs text-white"
                    style={{
                      backgroundColor: selectedPost.categoryColor || "#4F46E5",
                    }}
                  >
                    {selectedPost.category}
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {selectedPost.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedPost.tags.split(",").map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Texto */}
            <div className="prose prose-neutral max-w-none">
              {selectedPost.content
                .split("\n\n")
                .map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Video */}
            {selectedPost.videoUrl && (
              <div className="mt-10">
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
                  <iframe
                    src={selectedPost.videoUrl.replace("watch?v=", "embed/")}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Fuente */}
            {selectedPost.externalUrl && (
              <div className="mt-6 bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
                <p className="text-sm text-gray-700">
                  Fuente original:{" "}
                  <a
                    href={selectedPost.externalUrl}
                    target="_blank"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    {selectedPost.externalUrl}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
