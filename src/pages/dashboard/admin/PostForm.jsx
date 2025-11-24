import { useState } from "react";
import { Image as ImgIcon, Video, Tag, User } from "lucide-react";

export default function UltraModernPostForm({ post, onSave, onCancel }) {
  const [form, setForm] = useState(
    post || {
      title: "",
      subtitle: "",
      content: "",
      category: "Noticia",
      author: "",
      tags: "",
      image: "",
      videoUrl: "",
    }
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
      return;
    }

    setForm({ ...form, [name]: value });
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 border border-gray-300 shadow-2xl rounded-3xl p-12 max-w-4xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          {post ? "Editar Publicación" : "Crear Publicación"}
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          Completa la información para una publicación profesional.
        </p>
      </div>

      {/* --- LÍNEA 1 → SOLO 1 CAMPO (TÍTULO) --- */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2">Título</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ej: Importante actualización institucional"
          className="w-full p-4 border rounded-2xl bg-slate-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* --- LÍNEA 2 → 2 CAMPOS (SUBTÍTULO + CATEGORÍA) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold mb-2">Subtítulo</label>
          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Breve descripción..."
            className="w-full p-4 border rounded-2xl bg-slate-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Categoría</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-4 border rounded-2xl bg-slate-100 focus:ring-2 focus:ring-blue-500"
          >
            <option>Noticia</option>
            <option>Evento</option>
            <option>Actualización</option>
            <option>Blog</option>
            <option>Video</option>
          </select>
        </div>
      </div>

      {/* --- LÍNEA 3 → 2 CAMPOS (AUTOR + TAGS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
            <User size={16} /> Autor
          </label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Nombre del autor"
            className="w-full p-4 border rounded-2xl bg-slate-100 focus:ring-2 focus:ring-blue-500"
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
            placeholder="Ej: educación, deportes"
            className="w-full p-4 border rounded-2xl bg-slate-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* --- LÍNEA 4 → SOLO 1 CAMPO (VIDEO URL) --- */}
      <div className="mb-10">
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <Video size={18} /> URL de Video
        </label>
        <input
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
          placeholder="https://youtube.com/..."
          className="w-full p-4 border rounded-2xl bg-slate-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Imagen destacada */}
      <div className="mb-10">
        <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
          <ImgIcon size={18} /> Imagen destacada
        </label>

        {form.image && (
          <img
            src={"https://img.freepik.com/foto-gratis/trabajadores-oficina-que-utilizan-graficos-financieros_23-2150408658.jpg?semt=ais_hybrid&w=740&q=80"}
            className="w-full h-52 object-cover rounded-2xl shadow mb-4"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-4 border rounded-2xl bg-slate-100"
        />
      </div>

      {/* Contenido */}
      <div className="mb-10">
        <label className="block text-sm font-semibold mb-2">Contenido</label>
        <textarea
          name="content"
          rows={8}
          value={form.content}
          onChange={handleChange}
          placeholder="Escribe todo el contenido aquí..."
          className="w-full p-5 border rounded-3xl bg-slate-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-200 rounded-2xl hover:bg-gray-300 transition font-semibold"
        >
          Cancelar
        </button>

        <button
          onClick={() => onSave(form)}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition font-semibold"
        >
          Guardar Publicación
        </button>
      </div>
    </div>
  );
}
