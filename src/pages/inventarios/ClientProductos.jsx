import { useState, useMemo } from "react";
import { Search } from "lucide-react";

export default function ClientProductos({ items = [] }) {
    const [search, setSearch] = useState("");
    const [filterCategoria, setFilterCategoria] = useState("");

    const categoriasBase = ["Tecnología", "Accesorios", "Ropa", "Hogar", "Oficina"];

    // Imagen por defecto estilo ecommerce profesional
    const defaultImg =
        "https://placehold.co/600x600/e5e7eb/6b7280?text=Sin+Foto&font=roboto";

    const getValidImage = (img) => {
        if (!img) return defaultImg;
        if (img.startsWith("blob:http")) return defaultImg;
        return img;
    };

    // FILTROS
    const filteredItems = useMemo(() => {
        return items.filter(
            (item) =>
                item.nombre.toLowerCase().includes(search.toLowerCase()) &&
                (filterCategoria === "" || item.categoria === filterCategoria)
        );
    }, [items, search, filterCategoria]);

    return (
        <div className="space-y-10 p-4 md:p-6">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Productos disponibles</h1>
                <p className="text-gray-500 mt-1">Explora los artículos disponibles para compra</p>
            </div>

            {/* BUSCADOR Y FILTRO */}
            <div className="bg-white p-5 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4">
                
                {/* SEARCH */}
                <div className="relative w-full md:w-2/3">
                    <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        className="w-full pl-11 p-3 rounded-xl border border-gray-300
                        focus:ring-2 focus:ring-indigo-400 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* SELECT */}
                <select
                    className="w-full md:w-1/3 p-3 rounded-xl border border-gray-300 bg-white outline-none 
                    focus:ring-2 focus:ring-indigo-400"
                    value={filterCategoria}
                    onChange={(e) => setFilterCategoria(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {categoriasBase.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* NO RESULTS */}
                {filteredItems.length === 0 && (
                    <p className="text-gray-500 col-span-full text-center italic">
                        No hay productos que coincidan con la búsqueda.
                    </p>
                )}

                {/* PRODUCT CARDS */}
                {filteredItems.map((item) => {
                    const imgSrc = getValidImage(item.imagen);

                    return (
                        <div
                            key={item.id}
                            className="
                                bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden
                                flex flex-col
                                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                            "
                        >
                            {/* IMAGEN — con aspecto fijo para simetría */}
                            <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                                <img
                                    src={imgSrc}
                                    onError={(e) => (e.target.src = defaultImg)}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* INFO */}
                            <div className="p-5 flex flex-col justify-between flex-grow">

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                        {item.nombre}
                                    </h3>

                                    {/* CATEGORY */}
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block
                                        ${
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
                                        }`}
                                    >
                                        {item.categoria}
                                    </span>

                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {item.descripcion}
                                    </p>

                                    {/* PRICE */}
                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                        ${Number(item.precio).toLocaleString("es-CO")}
                                    </p>

                                    <p className="text-gray-400 text-xs">
                                        Stock disponible: {item.cantidad}
                                    </p>
                                </div>

                                {/* CTA */}
                                <button
                                    className="w-full mt-4 py-2 px-4 rounded-xl font-semibold
                                    bg-indigo-600 text-white hover:bg-indigo-700 transition
                                    shadow-md hover:shadow-lg"
                                >
                                    Ver producto
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
