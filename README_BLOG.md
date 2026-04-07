# Blog (Firebase + SSG) — Instrucciones rápidas

Pasos para que el blog funcione en build (SSG) usando Firebase Admin:

1. Crea un proyecto en Firebase y una cuenta de servicio (Service Account).
2. En Firestore crea la colección `posts`. Cada documento debe incluir los campos:
   - `title` (string)
   - `slug` (string, único)
   - `publishedAt` (timestamp)
   - `excerpt` (string)
   - `content` (string, Markdown)
   - `tags` (array)
   - `author` (string)
   - `published` (boolean)

3. Añade las siguientes variables de entorno en tu proveedor (Vercel/Netlify/GH Actions):
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (asegúrate de escapar saltos de línea o usar las herramientas del proveedor)

4. Opcional: usar Firestore rules para proteger escrituras y permitir solo usuarios autenticados.

5. Local: copia `.env.example` a `.env.local` y completa los valores para pruebas locales.

6. Deploy: antes del build en tu hosting asegúrate de que las variables estén configuradas. Next.js generará las páginas de blog durante el build.

Notas:
- Actualmente el proyecto incluye un renderer Markdown mínimo en `lib/markdown.ts`. Si prefieres usar `remark`/`rehype` o MDX, instala y reemplaza la implementación allí.
- No subas credenciales a Git.

