"use client";

import { useState, useEffect, useCallback } from "react";
import { User, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import PostEditor from "./PostEditor";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLogoutBoxLine,
  RiArticleLine,
  RiCheckLine,
} from "react-icons/ri";

type Post = {
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  category?: string;
  published?: boolean;
  publishedAt?: { seconds: number } | string | null;
  content?: string;
  tags?: string[];
  coverImage?: string;
  author?: string;
};

const COLLECTION = process.env.NEXT_PUBLIC_FIREBASE_POSTS_COLLECTION || "post";

export default function AdminDashboard({ user }: { user: User }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null | "new">(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, COLLECTION), orderBy("publishedAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Post[];
      setPosts(data);
    } catch {
      /* si no hay índice, traemos sin orden */
      const snap = await getDocs(collection(db, COLLECTION));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Post[];
      setPosts(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function flash(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  }

  async function handleTogglePublish(post: Post) {
    setTogglingId(post.id);
    try {
      await updateDoc(doc(db, COLLECTION, post.id), {
        published: !post.published,
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
      flash(post.published ? "Post despublicado" : "Post publicado ✓");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este post? Esta acción no se puede deshacer.")) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      setPosts((prev) => prev.filter((p) => p.id !== id));
      flash("Post eliminado");
    } finally {
      setDeletingId(null);
    }
  }

  function handleEditorClose(refreshed: boolean) {
    setEditingPost(null);
    if (refreshed) {
      fetchPosts();
      flash("Post guardado correctamente ✓");
    }
  }

  if (editingPost !== null) {
    return (
      <PostEditor
        post={editingPost === "new" ? null : editingPost}
        onClose={handleEditorClose}
        user={user}
      />
    );
  }

  const published = posts.filter((p) => p.published);
  const drafts = posts.filter((p) => !p.published);

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <header className="border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <RiArticleLine className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-montserrat)] text-white font-bold text-sm leading-none">
                Admin Panel
              </h1>
              <p className="font-[family-name:var(--font-roboto)] text-slate-500 text-xs mt-0.5 leading-none">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/70 bg-slate-800/60 text-slate-300 hover:text-white hover:border-slate-600 transition-all text-xs font-[family-name:var(--font-roboto)]"
            >
              <RiEyeLine className="w-3.5 h-3.5" /> Ver blog
            </a>
            <button
              id="admin-new-post-btn"
              onClick={() => setEditingPost("new")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-[family-name:var(--font-roboto)] font-medium transition-all duration-200"
            >
              <RiAddLine className="w-4 h-4" /> Nuevo Post
            </button>
            <button
              id="admin-logout-btn"
              onClick={() => signOut(auth)}
              title="Cerrar sesión"
              className="p-1.5 rounded-lg border border-slate-700/70 bg-slate-800/60 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-all duration-200"
            >
              <RiLogoutBoxLine className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Success toast */}
      {successMsg && (
        <div className="fixed top-16 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600/90 border border-teal-500/50 text-white text-sm font-[family-name:var(--font-roboto)] shadow-lg animate-fade-in">
          <RiCheckLine className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Total posts", value: posts.length, color: "text-white" },
            { label: "Publicados", value: published.length, color: "text-teal-400" },
            { label: "Borradores", value: drafts.length, color: "text-slate-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-4"
            >
              <p className="font-[family-name:var(--font-roboto)] text-xs text-slate-500 uppercase tracking-wide mb-1">
                {s.label}
              </p>
              <p className={`font-[family-name:var(--font-montserrat)] text-3xl font-bold ${s.color}`}>
                {loading ? "—" : s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Posts list */}
        <div>
          <h2 className="font-[family-name:var(--font-montserrat)] text-white font-semibold text-base mb-4 flex items-center gap-2">
            <RiArticleLine className="w-4 h-4 text-teal-400" /> Posts
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700/60 p-12 text-center">
              <RiArticleLine className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 font-[family-name:var(--font-roboto)] text-sm">
                No hay posts todavía.
              </p>
              <button
                onClick={() => setEditingPost("new")}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-[family-name:var(--font-roboto)] transition-all"
              >
                <RiAddLine className="w-4 h-4" /> Crear el primero
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-800/50 hover:border-slate-600/70 hover:bg-slate-800/80 transition-all duration-200 px-4 py-3.5"
                >
                  {/* Status dot */}
                  <div
                    className={`shrink-0 w-2 h-2 rounded-full ${
                      post.published ? "bg-teal-400" : "bg-slate-600"
                    }`}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-[family-name:var(--font-montserrat)] text-white font-semibold text-sm truncate">
                      {post.title || "(Sin título)"}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {post.slug && (
                        <span className="font-[family-name:var(--font-roboto)] text-xs text-slate-500 truncate max-w-[180px]">
                          /{post.slug}
                        </span>
                      )}
                      {post.category && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 font-[family-name:var(--font-roboto)] uppercase tracking-wide">
                          {post.category}
                        </span>
                      )}
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-[family-name:var(--font-roboto)] uppercase tracking-wide ${
                          post.published
                            ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                            : "bg-slate-700/50 text-slate-500 border border-slate-600/40"
                        }`}
                      >
                        {post.published ? "Publicado" : "Borrador"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      id={`admin-edit-${post.id}`}
                      onClick={() => setEditingPost(post)}
                      title="Editar"
                      className="p-2 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 transition-all duration-150"
                    >
                      <RiEditLine className="w-4 h-4" />
                    </button>
                    <button
                      id={`admin-toggle-${post.id}`}
                      onClick={() => handleTogglePublish(post)}
                      disabled={togglingId === post.id}
                      title={post.published ? "Despublicar" : "Publicar"}
                      className="p-2 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 transition-all duration-150 disabled:opacity-40"
                    >
                      {post.published ? (
                        <RiEyeOffLine className="w-4 h-4" />
                      ) : (
                        <RiEyeLine className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      id={`admin-delete-${post.id}`}
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                      title="Eliminar"
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 disabled:opacity-40"
                    >
                      <RiDeleteBinLine className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
