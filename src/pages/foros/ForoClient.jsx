import { useState } from "react";
import { MessageCircle, ArrowLeft } from "lucide-react";

export default function ForoClient({ forums }) {
  const [selectedForum, setSelectedForum] = useState(null);

  if (selectedForum) {
    return (
      <ForumPreviewClient
        forum={selectedForum}
        onBack={() => setSelectedForum(null)}
      />
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <MessageCircle className="text-blue-600" /> Foros
      </h1>

      {forums.length === 0 ? (
        <p className="text-gray-500 text-center">No hay foros disponibles aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forums.map((forum) => (
            <div
              key={forum.id}
              onClick={() => setSelectedForum(forum)}
              className="cursor-pointer bg-white rounded-2xl border border-gray-100 shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Imagen */}
              {forum.image ? (
                <img
                  src={forum.image  }
                  alt={forum.title}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  Sin imagen
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {forum.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {forum.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  {forum.tags &&
                    forum.tags.split(",").map((t, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 px-2 py-1 rounded-full text-gray-700"
                      >
                        #{t.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* -------------------- FORUM PREVIEW CLIENT ------------------------ */
/* ------------------------------------------------------------------ */

function ForumPreviewClient({ forum, onBack }) {
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem(`forum-${forum.id}-responses`);
    return saved ? JSON.parse(saved) : [];
  });

  const [newResponse, setNewResponse] = useState("");

  const handleAddResponse = () => {
    if (!newResponse.trim()) return;

    const response = {
      id: Date.now(),
      text: newResponse,
      author: "Usuario",
      date: new Date().toLocaleString(),
    };

    const updated = [...responses, response];
    setResponses(updated);
    setNewResponse("");

    localStorage.setItem(`forum-${forum.id}-responses`, JSON.stringify(updated));
  };

  return (
    <div className="w-full min-h-screen px-2 md:px-10 py-6 bg-gray-50">
      <button
        onClick={onBack}
        className="text-blue-600 mb-6 flex items-center gap-1 hover:underline"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto">
        {/* Imagen */}
        {forum.image && (
          <div className="h-56 md:h-80">
            <img
              src={forum.image}
              alt="Imagen del foro"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Contenido */}
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{forum.title}</h1>
          <p className="text-gray-700 mb-4">{forum.description}</p>

          <div className="flex flex-wrap gap-2 text-xs mb-6">
            {forum.tags &&
              forum.tags.split(",").map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-200 rounded-full text-gray-700"
                >
                  #{t.trim()}
                </span>
              ))}
          </div>

          {/* Respuestas */}
          <h2 className="text-xl font-semibold mb-3">Respuestas</h2>

          {responses.length === 0 ? (
            <p className="text-gray-500">No hay respuestas aún.</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {responses.map((r) => (
                <li key={r.id} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">{r.author}</span>
                    <span className="text-gray-500 text-xs">{r.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{r.text}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Nueva respuesta */}
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 text-sm"
              rows={3}
              placeholder="Escribe tu respuesta..."
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
            />
            <button
              onClick={handleAddResponse}
              className="self-end px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-sm"
            >
              Responder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
