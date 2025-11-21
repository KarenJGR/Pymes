import ForumForm from "../foros/ForumForm";
import ForumPreview from "../foros/ForumPreview";
import { PlusCircle } from "lucide-react";

export default function ForosSection({
  forums,
  setForums,
  selectedForum,
  setSelectedForum,
  showForumForm,
  setShowForumForm
}) {
  const handleSaveForum = (forum) => {
    if (forum.id) {
      setForums(forums.map((f) => (f.id === forum.id ? forum : f)));
    } else {
      forum.id = Date.now();
      setForums([...forums, forum]);
    }
    setShowForumForm(false);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Foros</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 shadow hover:bg-blue-700 transition"
          onClick={() => {
            setSelectedForum(null);
            setShowForumForm(true);
          }}
        >
          <PlusCircle size={20} /> Crear Foro
        </button>
      </div>

      {/* LISTADO DE FOROS */}
      {!showForumForm && !selectedForum ? (
        forums.length === 0 ? (
          <p className="text-gray-500">No hay foros aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forums.map((forum) => (
              <div
                key={forum.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer border border-gray-100 overflow-hidden"
                onClick={() => setSelectedForum(forum)}
              >
                {/* Imagen destacada */}
                {forum.image ? (
                  <img
                    src={forum.image}
                    alt={forum.title}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="h-44 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                    Sin imagen
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{forum.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3">{forum.description}</p>

                  {/* Autor y tags */}
                  <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-600">
                    <span className="font-semibold">{forum.author || "Autor desconocido"}</span>
                    {forum.tags && forum.tags.split(",").map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-200 rounded-full"
                      >
                        #{t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : showForumForm ? (
        <ForumForm
          forum={selectedForum}
          onSave={handleSaveForum}
          onCancel={() => setShowForumForm(false)}
        />
      ) : (
        <ForumPreview
          forum={selectedForum}
          onBack={() => setSelectedForum(null)}
          onEdit={() => setShowForumForm(true)}
        />
      )}
    </div>
  );
}
