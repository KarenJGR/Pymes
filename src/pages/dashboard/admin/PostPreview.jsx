export default function PostPreview({ post, onBack, onEdit }) {
  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HERO */}
      {post.image ? (
        <div className="w-full h-[420px] md:h-[520px] overflow-hidden relative">
          <img
            src={post.image}
            alt="hero"
            className="w-full h-full object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />

          {/* Title floating over image */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-gray-200 mt-3 text-lg md:text-xl max-w-2xl mx-auto">
                {post.subtitle}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
          <span>Sin imagen destacada</span>
        </div>
      )}

      {/* BODY */}
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back */}
        <button
          onClick={onBack}
          className="text-blue-600 mb-6 font-medium hover:underline"
        >
          ← Volver
        </button>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6">

          <span className="font-semibold">{post.author || "Autor desconocido"}</span>

          <span>•</span>

          <span>{post.date}</span>

          <span>•</span>

          <span
            className="px-3 py-1 rounded-full text-white text-xs"
            style={{ backgroundColor: post.categoryColor || "#2563eb" }}
          >
            {post.category}
          </span>

          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime} min de lectura</span>
            </>
          )}
        </div>

        {/* TAGS */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.split(",").map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300 cursor-default"
              >
                #{t.trim()}
              </span>
            ))}
          </div>
        )}

        {/* CONTENT */}
        <article className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-img:rounded-xl">
          {post.content.split("\n\n").map((par, i) => (
            <p key={i}>{par}</p>
          ))}
        </article>

        {/* Video */}
        {post.videoUrl && (
          <div className="mt-12">
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                src={post.videoUrl.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* External Source */}
        {post.externalUrl && (
          <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <p className="text-sm text-gray-600">
              Fuente original:{" "}
              <a
                href={post.externalUrl}
                target="_blank"
                className="text-blue-700 font-medium hover:underline"
              >
                {post.externalUrl}
              </a>
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-12 justify-end">
          <button
            className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow"
            onClick={onEdit}
          >
            Editar artículo
          </button>
        </div>
      </div>
    </div>
  );
}
