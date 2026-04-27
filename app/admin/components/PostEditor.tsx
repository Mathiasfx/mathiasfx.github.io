"use client";

import { useState, useRef, useCallback } from "react";
import { User } from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  FieldValue,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebaseClient";
import {
  RiArrowLeftLine,
  RiImageAddLine,
  RiCloseLine,
  RiSave3Line,
  RiEditLine,
  RiLoader4Line,
  RiCheckLine,
} from "react-icons/ri";
import MarkdownEditor from "./MarkdownEditor";

type Post = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  published?: boolean;
  publishedAt?: { seconds: number } | string | null;
  author?: string;
};

type Props = {
  post: Post | null;
  onClose: (refreshed: boolean) => void;
  user: User;
};

const COLLECTION = process.env.NEXT_PUBLIC_FIREBASE_POSTS_COLLECTION || "post";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostEditor({ post, onClose, user }: Props) {
  const isNew = !post?.id;
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [tagsRaw, setTagsRaw] = useState((post?.tags ?? []).join(", "));
  const [author, setAuthor] = useState(post?.author ?? user.displayName ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from title only when creating new post
  function handleTitleChange(val: string) {
    setTitle(val);
    if (isNew) setSlug(slugify(val));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "El título es obligatorio";
    if (!slug.trim()) e.slug = "El slug es obligatorio";
    if (!content.trim()) e.content = "El contenido no puede estar vacío";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // Upload image to Firebase Storage
  const handleImageUpload = useCallback(
    async (file: File) => {
      const path = `blog-images/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, file);

      return new Promise<string>((resolve, reject) => {
        task.on(
          "state_changed",
          (snap) => {
            const pct = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            setUploadProgress(pct);
          },
          (err) => {
            setUploadProgress(null);
            reject(err);
          },
          async () => {
            const url = await getDownloadURL(task.snapshot.ref);
            setUploadProgress(null);
            resolve(url);
          }
        );
      });
    },
    []
  );

  function validateImageFile(file: File): string | null {
    if (!file.type.startsWith("image/")) return "Solo se permiten imágenes.";
    if (file.size > 5 * 1024 * 1024)
      return "La imagen no puede superar los 5MB.";
    return null;
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const err = validateImageFile(file);
    if (err) {
      alert(err);
      return;
    }
    try {
      const url = await handleImageUpload(file);
      setCoverImage(url);
    } catch {
      alert("Error al subir la imagen. Revisá las reglas de Firebase Storage.");
    }
  }

  async function handleContentImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const err = validateImageFile(file);
    if (err) {
      alert(err);
      return;
    }
    try {
      const url = await handleImageUpload(file);
      const base = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      const alt = base || "Imagen";
      setContent((prev) => {
        const suffix = prev.trim() ? `\n\n![${alt}](${url})\n\n` : `![${alt}](${url})\n\n`;
        return `${prev.trimEnd()}${suffix}`;
      });
    } catch {
      alert("Error al subir la imagen para el contenido.");
    }
  }

  async function handleRemoveCover() {
    if (!coverImage) return;
    // Only delete from storage if it's a Firebase Storage URL
    if (coverImage.includes("firebasestorage.googleapis.com")) {
      try {
        const r = ref(storage, coverImage);
        await deleteObject(r);
      } catch {
        // Ignore if already deleted or permission error
      }
    }
    setCoverImage("");
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);

    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const data: {
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      category: string;
      tags: string[];
      author: string;
      coverImage: string;
      published: boolean;
      publishedAt: FieldValue | null;
    } = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category: category.trim(),
      tags,
      author: author.trim(),
      coverImage: coverImage.trim(),
      published,
      publishedAt: published ? serverTimestamp() : null,
    };

    try {
      if (isNew) {
        await addDoc(collection(db, COLLECTION), data);
      } else {
        // Preserve existing publishedAt if already published
        const updateData: WithFieldValue<DocumentData> = { ...data };
        if (!published) updateData.publishedAt = null;
        else if (post?.published) {
          // Already was published — keep original timestamp
          delete updateData.publishedAt;
        }
        await updateDoc(doc(db, COLLECTION, post!.id!), updateData);
      }
      onClose(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al guardar";
      setErrors({ global: msg });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            id="editor-back-btn"
            onClick={() => onClose(false)}
            className="p-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
          >
            <RiArrowLeftLine className="w-4 h-4" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="font-[family-name:var(--font-montserrat)] text-white font-bold text-sm truncate">
              {isNew ? "Nuevo Post" : `Editar: ${post?.title || "Sin título"}`}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Publish toggle */}
            <button
              id="editor-publish-toggle"
              type="button"
              onClick={() => setPublished((v) => !v)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-[family-name:var(--font-roboto)] font-medium border transition-all duration-200 ${
                published
                  ? "border-teal-500/50 bg-teal-600/20 text-teal-400 hover:bg-teal-600/30"
                  : "border-slate-700/60 bg-slate-800/60 text-slate-400 hover:border-slate-600"
              }`}
            >
              {published ? (
                <>
                  <RiCheckLine className="w-3.5 h-3.5" /> Publicado
                </>
              ) : (
                "Borrador"
              )}
            </button>

            <button
              id="editor-save-btn"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-[family-name:var(--font-roboto)] font-medium transition-all disabled:opacity-50"
            >
              {saving ? (
                <RiLoader4Line className="w-4 h-4 animate-spin" />
              ) : (
                <RiSave3Line className="w-4 h-4" />
              )}
              {saving ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 space-y-5">
        {/* Global error */}
        {errors.global && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-[family-name:var(--font-roboto)]">
            {errors.global}
          </div>
        )}

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-[family-name:var(--font-roboto)] text-slate-400 uppercase tracking-wide">
            Título *
          </label>
          <input
            id="editor-title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Mi post increíble"
            className={`w-full bg-slate-800/60 border ${
              errors.title ? "border-red-500/60" : "border-slate-700/60"
            } rounded-xl px-4 py-2.5 text-white font-[family-name:var(--font-montserrat)] text-lg font-semibold placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors`}
          />
          {errors.title && (
            <p className="text-xs text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Slug + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-[family-name:var(--font-roboto)] text-slate-400 uppercase tracking-wide">
              Slug *
            </label>
            <input
              id="editor-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="mi-post-increible"
              className={`w-full bg-slate-800/60 border ${
                errors.slug ? "border-red-500/60" : "border-slate-700/60"
              } rounded-xl px-4 py-2.5 text-teal-400 font-[family-name:var(--font-roboto)] text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors`}
            />
            {errors.slug && (
              <p className="text-xs text-red-400">{errors.slug}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-[family-name:var(--font-roboto)] text-slate-400 uppercase tracking-wide">
              Categoría
            </label>
            <input
              id="editor-category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Tutorial"
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white font-[family-name:var(--font-roboto)] text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Author + Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-[family-name:var(--font-roboto)] text-slate-400 uppercase tracking-wide">
              Autor
            </label>
            <input
              id="editor-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Mathias Pereira"
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white font-[family-name:var(--font-roboto)] text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-[family-name:var(--font-roboto)] text-slate-400 uppercase tracking-wide">
              Tags (separados por coma)
            </label>
            <input
              id="editor-tags"
              type="text"
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="react, nextjs, typescript"
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white font-[family-name:var(--font-roboto)] text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-1.5">
          <label className="text-xs font-[family-name:var(--font-roboto)] text-slate-400 uppercase tracking-wide">
            Excerpt / Resumen
          </label>
          <textarea
            id="editor-excerpt"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Breve descripción del post para la lista del blog…"
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white font-[family-name:var(--font-roboto)] text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/60 transition-colors resize-none"
          />
        </div>

        {/* Cover Image */}
        <div className="space-y-1.5">
          <label className="text-xs font-[family-name:var(--font-roboto)] text-slate-400 uppercase tracking-wide">
            Imagen de portada
          </label>

          {coverImage ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-700/60 bg-slate-800/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt="Cover preview"
                className="w-full h-48 object-cover"
              />
              <button
                id="editor-remove-cover"
                onClick={handleRemoveCover}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-all"
              >
                <RiCloseLine className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="editor-upload-cover"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadProgress !== null}
              className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-700/60 hover:border-teal-500/40 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200 py-8 cursor-pointer disabled:opacity-50"
            >
              {uploadProgress !== null ? (
                <>
                  <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                  <p className="text-teal-400 text-sm font-[family-name:var(--font-roboto)]">
                    Subiendo… {uploadProgress}%
                  </p>
                </>
              ) : (
                <>
                  <RiImageAddLine className="w-8 h-8 text-slate-600" />
                  <p className="text-slate-500 text-sm font-[family-name:var(--font-roboto)]">
                    Clic para subir imagen
                  </p>
                  <p className="text-slate-700 text-xs font-[family-name:var(--font-roboto)]">
                    PNG, JPG, WebP — máx. 5MB
                  </p>
                </>
              )}
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="editor-file-input"
          />
        </div>

        {/* Content editor (Markdown con barra de herramientas y vista previa) */}
        <div className="space-y-1.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="text-xs font-[family-name:var(--font-roboto)] text-slate-400 uppercase tracking-wide">
              Contenido (Markdown) *
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="editor-insert-content-image"
                type="button"
                onClick={() => contentImageInputRef.current?.click()}
                disabled={uploadProgress !== null}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-xs font-[family-name:var(--font-roboto)] text-slate-300 transition-colors hover:border-teal-500/40 hover:text-teal-300 disabled:opacity-50"
              >
                <RiImageAddLine className="h-3.5 w-3.5" />
                Imagen en el texto
              </button>
              <span className="text-[11px] text-slate-600 font-[family-name:var(--font-roboto)]">
                Sube y se inserta como <code className="text-slate-500">![alt](url)</code>
              </span>
            </div>
          </div>

          <input
            ref={contentImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleContentImageSelect}
            className="hidden"
            id="editor-content-image-input"
            aria-hidden
          />

          <MarkdownEditor
            value={content}
            onChange={setContent}
            hasError={!!errors.content}
          />
          {errors.content && (
            <p className="text-xs text-red-400">{errors.content}</p>
          )}
        </div>

        {/* Publish toggle (mobile) + save */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 pb-8">
          <button
            id="editor-publish-toggle-mobile"
            type="button"
            onClick={() => setPublished((v) => !v)}
            className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-sm font-[family-name:var(--font-roboto)] font-medium border transition-all duration-200 ${
              published
                ? "border-teal-500/50 bg-teal-600/20 text-teal-400 hover:bg-teal-600/30"
                : "border-slate-700/60 bg-slate-800/60 text-slate-400 hover:border-slate-600"
            }`}
          >
            {published ? (
              <>
                <RiCheckLine className="w-4 h-4" /> Publicado
              </>
            ) : (
              <>
                <RiEditLine className="w-4 h-4" /> Borrador — clic para publicar
              </>
            )}
          </button>

          <button
            id="editor-save-bottom-btn"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-[family-name:var(--font-roboto)] font-medium transition-all disabled:opacity-50"
          >
            {saving ? (
              <RiLoader4Line className="w-4 h-4 animate-spin" />
            ) : (
              <RiSave3Line className="w-4 h-4" />
            )}
            {saving ? "Guardando…" : "Guardar post"}
          </button>
        </div>
      </div>
    </div>
  );
}
