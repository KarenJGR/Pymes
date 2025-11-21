import { useState, useEffect } from "react";

export default function ForumPreview({ forum, onBack, onEdit }) {
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem(`forum-${forum.id}-responses`);
    return saved ? JSON.parse(saved) : [];
  });

  const [newResponse, setNewResponse] = useState("");

  useEffect(() => {
    localStorage.setItem(`forum-${forum.id}-responses`, JSON.stringify(responses));
  }, [responses, forum.id]);

  const handleAddResponse = () => {
    if (!newResponse.trim()) return;

    const response = {
      id: Date.now(),
      text: newResponse,
      author: "Usuario", // Aquí podrías usar el nombre del usuario logueado
      date: new Date().toLocaleString(),
    };
    setResponses([...responses, response]);
    setNewResponse("");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-10">
      <button
        onClick={onBack}
        className="text-blue-600 mb-6 font-medium hover:underline"
      >
        ← Volver
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Imagen destacada */}
        {forum.image && (
          <div className="w-full h-64 md:h-96 relative">
            <img
              src={forum.image}
              alt="Imagen del foro"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        )}

        {/* Contenido principal */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{forum.title}</h1>
          <p className="text-gray-700 mb-4">{forum.description}</p>

          <div className="flex flex-wrap gap-3 text-gray-600 text-sm mb-6">
            <span className="font-semibold">{forum.author || "Autor desconocido"}</span>
            {forum.tags &&
              forum.tags.split(",").map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-xs"
                >
                  #{t.trim()}
                </span>
              ))}
          </div>

          {/* Respuestas */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Respuestas</h2>
            {responses.length === 0 ? (
              <p className="text-gray-500 mb-4">No hay respuestas aún.</p>
            ) : (
              <ul className="space-y-4 mb-6">
                {responses.map((r) => (
                  <li key={r.id} className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{r.author}</span>
                      <span className="text-gray-500 text-xs">{r.date}</span>
                    </div>
                    <p className="text-gray-700">{r.text}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* Formulario de nueva respuesta */}
            <div className="flex flex-col gap-2">
              <textarea
                className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Escribe tu respuesta..."
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
              />
              <button
                onClick={handleAddResponse}
                className="self-end px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
              >
                Responder
              </button>
            </div>
          </div>

          {/* Botón de edición del foro */}
          <div className="flex justify-end mt-8">
            <button
              onClick={onEdit}
              className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow"
            >
              Editar Foro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
