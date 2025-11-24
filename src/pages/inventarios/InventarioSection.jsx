import { useState, useEffect } from "react";
import { Plus, Pencil, Trash, Search, Upload } from "lucide-react";

export default function InventarioSection({
    items, setItems,
    selectedItem, setSelectedItem,
    showItemForm, setShowItemForm
}) {

    // ------- FORM STATE -------
    const [form, setForm] = useState({
        codigo: "",
        nombre: "",
        categoria: "",
        cantidad: 0,
        precio: 0,
        proveedor: "",
        descripcion: "",
        imagen: null // Base64
    });

    const [search, setSearch] = useState("");
    const [filterCategoria, setFilterCategoria] = useState("");

    const categoriasBase = ["Tecnología", "Accesorios", "Ropa", "Hogar", "Oficina"];

    // ---- CARGAR ITEMS AL INICIAR ----
    useEffect(() => {
        const saved = localStorage.getItem("inventario");
        if (saved) setItems(JSON.parse(saved));
    }, []);

    // ---- GUARDAR AUTOMÁTICO ----
    useEffect(() => {
        localStorage.setItem("inventario", JSON.stringify(items));
    }, [items]);

    const resetForm = () => {
        setForm({
            codigo: "",
            nombre: "",
            categoria: "",
            cantidad: 0,
            precio: 0,
            proveedor: "",
            descripcion: "",
            imagen: null
        });
        setSelectedItem(null);
        setShowItemForm(false);
    };

    // ---- GUARDAR ----
    const handleSubmit = () => {
        const newData = selectedItem
            ? items.map(i =>
                i.id === selectedItem.id
                    ? { ...selectedItem, ...form, editado: Date.now() }
                    : i
            )
            : [...items, { id: Date.now(), ...form, editado: Date.now() }];

        setItems(newData);
        resetForm();
    };

    // ---- CARGAR DATOS PARA EDITAR ----
    const handleEdit = (item) => {
        setSelectedItem(item);
        setForm({ ...item });
        setShowItemForm(true);
    };

    // ---- BORRAR ----
    const handleDelete = (id) => {
        if (confirm("¿Eliminar este producto?")) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    // ---- SUBIR Y PREVISUALIZAR IMAGEN (BASE64) ----
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm({ ...form, imagen: reader.result }); // GUARDA BASE64
        };
        reader.readAsDataURL(file);
    };

    // ---- FILTRO ----
    const filteredItems = items.filter(item =>
        item.nombre.toLowerCase().includes(search.toLowerCase()) &&
        (filterCategoria === "" || item.categoria === filterCategoria)
    );

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Inventario</h1>
                    <p className="text-gray-500 mt-1">Administra tus productos con facilidad</p>
                </div>

                <button
                    onClick={() => setShowItemForm(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow transition"
                >
                    <Plus size={18} /> Nuevo Producto
                </button>
            </div>

            {/* BUSCADOR */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 border border-gray-200">

                <div className="relative w-full md:w-2/3">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        className="w-full pl-12 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="w-full md:w-1/3 p-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
                    value={filterCategoria}
                    onChange={(e) => setFilterCategoria(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {categoriasBase.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

            </div>

            {/* FORMULARIO */}
            {showItemForm && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-5">
                        <h2 className="text-xl font-semibold text-white tracking-wide">
                            {selectedItem ? "Editar Producto" : "Registro de Producto"}
                        </h2>
                        <p className="text-gray-300 text-sm mt-1">
                            Complete los datos para gestionar su inventario
                        </p>
                    </div>

                    <div className="p-6 space-y-8">

                        {/* IMAGEN */}
                        <div className="flex flex-col gap-3">
                            <label className="text-gray-700 font-medium">Imagen del producto</label>

                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer">
                                    <div className="w-32 h-32 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-100 shadow-sm">
                                        {form.imagen ? (
                                            <img
                                                src={form.imagen}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <Upload size={30} className="text-gray-400" />
                                        )}
                                    </div>
                                    <input type="file" className="hidden" onChange={handleImageUpload} />
                                </label>

                                <p className="text-sm text-gray-500">
                                    Arrastra una imagen o haz clic<br />
                                    <span className="text-gray-400">PNG, JPG, WEBP</span>
                                </p>
                            </div>
                        </div>

                        {/* FORM GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {[
                                { key: "codigo", label: "Código", placeholder: "Ej: PRD-001" },
                                { key: "nombre", label: "Nombre del producto", placeholder: "Ej: Teclado mecánico" }
                            ].map(f => (
                                <div key={f.key} className="flex flex-col">
                                    <label className="text-gray-700 font-medium mb-1">{f.label}</label>
                                    <input
                                        type="text"
                                        placeholder={f.placeholder}
                                        className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                        value={form[f.key]}
                                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                                </div>
                            ))}

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium mb-1">Categoría</label>
                                <select
                                    className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                    value={form.categoria}
                                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categoriasBase.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {[
                                { key: "cantidad", label: "Cantidad", type: "number" },
                                { key: "precio", label: "Precio", type: "number" },
                                { key: "proveedor", label: "Proveedor", type: "text" }
                            ].map(f => (
                                <div key={f.key} className="flex flex-col">
                                    <label className="text-gray-700 font-medium mb-1">{f.label}</label>
                                    <input
                                        type={f.type}
                                        className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                                        value={form[f.key]}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                [f.key]: f.type === "number"
                                                    ? Number(e.target.value)
                                                    : e.target.value
                                            })
                                        }
                                    />
                                </div>
                            ))}

                        </div>

                        <div>
                            <label className="text-gray-700 font-medium">Descripción</label>
                            <textarea
                                className="border p-3 rounded-lg mt-2 w-full focus:ring-2 focus:ring-indigo-400 outline-none"
                                rows="3"
                                placeholder="Breve descripción..."
                                value={form.descripcion}
                                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4 justify-end pt-4">

                            <button
                                onClick={resetForm}
                                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white shadow-md active:scale-95"
                            >
                                Guardar Producto
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* TABLA */}
            <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">

                <table className="min-w-full text-left">

                    <thead>
                        <tr className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100">
                            {[
                                "Imagen", "Código", "Producto", "Categoría",
                                "Cantidad", "Precio", "Última edición", "Acciones"
                            ].map(header => (
                                <th key={header} className="py-4 px-4 font-semibold uppercase text-xs tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan="8" className="py-8 text-center text-gray-500 italic">
                                    No hay productos para mostrar.
                                </td>
                            </tr>
                        )}

                        {filteredItems.map(item => (
                            <tr key={item.id}>

                                <td className="py-3 px-4">
                                    {item.imagen ? (
                                        <img
                                            src={item.imagen}
                                            className="w-14 h-14 rounded-xl object-cover border shadow-sm"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">Sin imagen</span>
                                    )}
                                </td>

                                <td className="py-3 px-4">{item.codigo}</td>
                                <td className="py-3 px-4 font-semibold text-gray-800">{item.nombre}</td>

                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                                        item.categoria === "Tecnología"
                                            ? "bg-blue-100 text-blue-700"
                                            : item.categoria === "Accesorios"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : item.categoria === "Ropa"
                                                    ? "bg-pink-100 text-pink-700"
                                                    : item.categoria === "Hogar"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : item.categoria === "Oficina"
                                                            ? "bg-purple-100 text-purple-700"
                                                            : "bg-gray-100 text-gray-700"
                                    }`}>
                                        {item.categoria}
                                    </span>
                                </td>

                                <td className="py-3 px-4">{item.cantidad}</td>

                                <td className="py-3 px-4 font-semibold text-gray-800">
                                    ${Number(item.precio).toLocaleString("es-CO")}
                                </td>

                                <td className="py-3 px-4 text-gray-600">
                                    {item.editado
                                        ? new Date(item.editado).toLocaleString("es-CO", {
                                            year: "numeric", month: "short", day: "numeric",
                                            hour: "numeric", minute: "numeric"
                                        })
                                        : "—"}
                                </td>

                                <td className="py-3 px-4 flex items-center gap-3">

                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-md active:scale-95"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white shadow-md active:scale-95"
                                    >
                                        <Trash size={18} />
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}
