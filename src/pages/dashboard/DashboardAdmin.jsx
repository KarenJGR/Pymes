import { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthProvider";
import { FileText, MessageSquare, Users, Settings, LogOut } from "lucide-react";
import ForosSection from "../foros/ForoSection";
import Publicacione from "./admin/Publicaciones";
import InventarioSection from "../inventarios/InventarioSection";


export default function DashboardAdmin() {
    const { user, logout } = useAuth();

    // POSTS
    const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem("posts")) || []);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPostForm, setShowPostForm] = useState(false);

    // FOROS
    const [forums, setForums] = useState(() => JSON.parse(localStorage.getItem("forums")) || []);
    const [selectedForum, setSelectedForum] = useState(null);
    const [showForumForm, setShowForumForm] = useState(false);

    // INVENTARIO
    const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("inventario")) || []);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showItemForm, setShowItemForm] = useState(false);

    const [activeMenu, setActiveMenu] = useState("publicaciones");

    // Guardar POSTS sin base64
    useEffect(() => {
        const safePosts = posts.map(({ image, ...rest }) => rest);
        localStorage.setItem("posts", JSON.stringify(safePosts));
    }, [posts]);

    // Guardar FOROS sin base64
    useEffect(() => {
        const safeForums = forums.map(({ image, ...rest }) => rest);
        localStorage.setItem("forums", JSON.stringify(safeForums));
    }, [forums]);

    // Guardar INVENTARIO
    useEffect(() => {
        localStorage.setItem("inventario", JSON.stringify(items));
    }, [items]);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* SIDEBAR */}
            <div className="w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-8 flex flex-col shadow-xl">
                <div className="flex items-center gap-4 mb-10 select-none">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">P</div>
                    <h2 className="text-2xl font-bold tracking-wide">Karos Admin</h2>
                </div>

                <p className="text-gray-300 mb-8 text-sm">
                    Bienvenido, <span className="font-semibold">{user?.name}</span>
                </p>

                <nav className="flex flex-col gap-2">

                    <button
                        onClick={() => setActiveMenu("publicaciones")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${activeMenu === "publicaciones" ? "bg-blue-600 text-white shadow-lg" : "hover:bg-white/10"
                            }`}
                    >
                        <FileText size={20} /> Publicaciones
                    </button>

                    <button
                        onClick={() => setActiveMenu("foros")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${activeMenu === "foros" ? "bg-blue-600 text-white shadow-lg" : "hover:bg-white/10"
                            }`}
                    >
                        <MessageSquare size={20} /> Foros
                    </button>

                    {/* ⭐ NUEVO MÓDULO DE INVENTARIO */}
                    <button
                        onClick={() => setActiveMenu("inventario")}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${activeMenu === "inventario" ? "bg-blue-600 text-white shadow-lg" : "hover:bg-white/10"
                            }`}
                    >
                        📦 Inventario
                    </button>


                </nav>

                <div className="mt-auto pt-6">
                    <button
                        onClick={logout}
                        className="flex items-center justify-center gap-3 w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white transition shadow-lg"
                    >
                        <LogOut size={20} /> Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-10">

                {activeMenu === "publicaciones" && (
                    <Publicacione
                        posts={posts} setPosts={setPosts}
                        selectedPost={selectedPost} setSelectedPost={setSelectedPost}
                        showPostForm={showPostForm} setShowPostForm={setShowPostForm}
                    />
                )}

                {activeMenu === "foros" && (
                    <ForosSection
                        forums={forums} setForums={setForums}
                        selectedForum={selectedForum} setSelectedForum={setSelectedForum}
                        showForumForm={showForumForm} setShowForumForm={setShowForumForm}
                    />
                )}

                {/* ⭐ RENDER DEL INVENTARIO */}
                {activeMenu === "inventario" && (
                    <InventarioSection
                        items={items} setItems={setItems}
                        selectedItem={selectedItem} setSelectedItem={setSelectedItem}
                        showItemForm={showItemForm} setShowItemForm={setShowItemForm}
                    />
                )}
            </div>
        </div>
    );
}
