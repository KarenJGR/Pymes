import { useState, useEffect } from "react";
import { Image as ImgIcon, Tag, User } from "lucide-react";

export default function ForumForm({ forum, onSave, onCancel }) {
  const [form, setForm] = useState(
    forum || {
      title: "",
      description: "",
      author: "",
      tags: "",
      image: "", // aquí va el base64 completo
    }
  );

  // Cargar imagen existente para preview
  useEffect(() => {
    if (forum?.image) {
      setForm((f) => ({ ...f, image: forum.image }));
    }
  }, [forum]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // === IMAGEN ===
    if (files) {
      const file = files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        // reader.result = "data:image/png;base64,AAAFBfj42Pj4..."
        setForm((prev) => ({
          ...prev,
          image: reader.result, // base64 completa
        }));
      };

      reader.readAsDataURL(file); // convierte a base64 con prefijo
      return;
    }

    // === CAMPOS NORMAL ===
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h2 className="text-3xl font-bold mb-6">
        {forum ? "Editar Foro" : "Crear Foro"}
      </h2>

      <div className="space-y-6">

        {/* TÍTULO */}
        <div>
          <label className="block text-sm font-semibold mb-2">Título</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título del foro"
            className="w-full p-4 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block text-sm font-semibold mb-2">Descripción</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción del foro"
            className="w-full p-4 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* IMAGEN */}
        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <ImgIcon size={18} /> Imagen destacada (opcional)
          </label>

          {/* PREVIEW DE IMAGEN BASE64 */}
          {form.image ? (
            <img
              src={form.image}
              alt="preview"
              className="w-full h-48 object-cover rounded-2xl shadow mb-3"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 mb-3">
              Sin imagen
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border rounded-2xl bg-gray-50"
          />
        </div>

        {/* AUTOR + TAGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <User size={16} /> Autor
            </label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Nombre del autor"
              className="w-full p-4 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Tag size={16} /> Tags
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="ej: debate, tecnología"
              className="w-full p-4 border rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition"
        >
          Cancelar
        </button>

        <button
          onClick={() => onSave(form)} // aquí se envía el base64 listo
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
        >
          Guardar Foro
        </button>
      </div>
    </div>
  );
}
