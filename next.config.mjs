/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: "export", // Genera archivos HTML estáticos
  images: {
    unoptimized: true, // Necesario porque GitHub Pages no soporta imágenes optimizadas dinámicamente
  },
  distDir: "out", // Define el directorio de salida
  basePath: "/my-nextjs-app", // Usa el nombre del repositorio
  assetPrefix: "/my-nextjs-app", // Usa el nombre del repositorio
};

export default nextConfig;
