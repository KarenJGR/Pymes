import { useState } from "react";
import { Image as ImgIcon, Tag, User } from "lucide-react";

export default function ForumForm({ forum, onSave, onCancel }) {
  const [form, setForm] = useState(
    forum || {
      title: "",
      description: "",
      author: "",
      tags: "",
      image: "",
      imageFile: null,
    }
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm({ ...form, imageFile: file });

      // Preview
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
        reader.readAsDataURL(file);
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
      <h2 className="text-3xl font-bold mb-6">
        {forum ? "Editar Foro" : "Crear Foro"}
      </h2>

      <div className="space-y-6">

        {/* Título */}
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

        {/* Descripción */}
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

        {/* Imagen destacada */}
        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <ImgIcon size={18} /> Imagen destacada (opcional)
          </label>

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-full h-48 object-cover rounded-2xl shadow mb-3"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border rounded-2xl bg-gray-50"
          />
        </div>

        {/* Autor y Tags */}
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

      {/* Botones */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          onClick={() => onSave(form)}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
        >
          Guardar Foro
        </button>
      </div>
    </div>
  );
}
