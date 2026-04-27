import admin from "firebase-admin";
import { ServiceAccount, firestore } from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").replace(/^"|"$/g, "")
  : undefined;

if (!admin.apps.length) {
  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      } as ServiceAccount),
    });
  } else {
    try {
      admin.initializeApp();
    } catch (e) {
      console.error("Firebase admin init error", e);
    }
  }
}

const db = admin.firestore();

/** Nombre de la colección en Firestore (en consola suele verse como `post` o `posts`). */
const POSTS_COLLECTION =
  process.env.FIREBASE_POSTS_COLLECTION?.trim() || "posts";

export type SerializedBlogPost = {
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  /** Etiqueta opcional desde Firestore (p. ej. tutorial, notas). */
  category?: string;
  /** URL de imagen de portada (p. ej. Firebase Storage). */
  coverImage?: string;
};

function toMillis(value: unknown): number {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as firestore.Timestamp).toDate === "function"
  ) {
    return (value as firestore.Timestamp).toDate().getTime();
  }
  if (value instanceof Date) return value.getTime();
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  }
  return 0;
}

function serializeDoc(
  doc: firestore.QueryDocumentSnapshot
): SerializedBlogPost {
  const data = doc.data();
  const raw = data.publishedAt;
  let publishedAt: string | undefined;
  if (
    raw &&
    typeof raw === "object" &&
    "toDate" in raw &&
    typeof (raw as firestore.Timestamp).toDate === "function"
  ) {
    publishedAt = (raw as firestore.Timestamp).toDate().toISOString();
  } else if (raw instanceof Date) {
    publishedAt = raw.toISOString();
  } else if (typeof raw === "string") {
    publishedAt = raw;
  }
  const rawCategory = data.category;
  const category =
    typeof rawCategory === "string" && rawCategory.trim()
      ? rawCategory.trim()
      : undefined;

  const rawCover = data.coverImage;
  const coverImage =
    typeof rawCover === "string" && rawCover.trim()
      ? rawCover.trim()
      : undefined;

  return {
    id: doc.id,
    title: data.title as string | undefined,
    slug: data.slug as string | undefined,
    excerpt: data.excerpt as string | undefined,
    publishedAt,
    category,
    coverImage,
  };
}

/** Sin orderBy en Firestore para no exigir índice compuesto; ordenamos en memoria. */
export async function getAllPosts(): Promise<SerializedBlogPost[]> {
  const snapshot = await db
    .collection(POSTS_COLLECTION)
    .where("published", "==", true)
    .get();
  const sorted = [...snapshot.docs].sort(
    (a, b) => toMillis(b.data().publishedAt) - toMillis(a.data().publishedAt)
  );
  return sorted.map(serializeDoc);
}

export async function getLatestPosts(
  limit: number
): Promise<SerializedBlogPost[]> {
  const all = await getAllPosts();
  return all.slice(0, Math.max(0, limit));
}

/** Alinea el segmento de URL con el string guardado en Firestore (p. ej. %20 → espacio). */
export function normalizeSlugFromUrl(slug: string): string {
  const t = slug.trim().replace(/\+/g, " ");
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}

export async function getPostBySlug(slug: string) {
  const variants = [
    normalizeSlugFromUrl(slug),
    slug.trim(),
  ].filter((v, i, arr) => v && arr.indexOf(v) === i);

  for (const value of variants) {
    if (!value) continue;
    const snapshot = await db
      .collection(POSTS_COLLECTION)
      .where("slug", "==", value)
      .limit(1)
      .get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { id: doc.id, ...doc.data() } as any;
    }
  }

  // Respaldo: mismos espacios/caracteres raros que impiden el match exacto en la query
  const all = await db
    .collection(POSTS_COLLECTION)
    .where("published", "==", true)
    .get();
  const target = normalizeSlugFromUrl(slug);
  const found = all.docs.find((d) => {
    const s = String(d.data().slug ?? "").trim();
    return s === target || s === slug.trim();
  });
  if (!found) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { id: found.id, ...found.data() } as any;
}

export async function getAllSlugs() {
  try {
    const snapshot = await db
      .collection(POSTS_COLLECTION)
      .where("published", "==", true)
      .get();
    return snapshot.docs.map((d) => d.data().slug as string);
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}
