/**
 * Firestore devuelve Timestamp ({ seconds, nanoseconds } o .toDate()).
 * `new Date(timestamp)` sin convertir produce Invalid Date.
 */
export function parsePostDate(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.toDate === "function") {
      try {
        const d = (o.toDate as () => Date)();
        return Number.isNaN(d.getTime()) ? null : d;
      } catch {
        /* continuar */
      }
    }
    const sec =
      typeof o.seconds === "number"
        ? o.seconds
        : typeof o._seconds === "number"
          ? o._seconds
          : undefined;
    if (typeof sec === "number") {
      const d = new Date(sec * 1000);
      return Number.isNaN(d.getTime()) ? null : d;
    }
  }
  return null;
}

export function formatPostPublishedAt(
  value: unknown,
  locale = "es-AR"
): string | null {
  const d = parsePostDate(value);
  if (!d) return null;
  return d.toLocaleDateString(locale);
}
