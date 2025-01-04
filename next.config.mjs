/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Genera archivos HTML estáticos
  images: {
    unoptimized: true, // Necesario porque GitHub Pages no soporta imágenes optimizadas dinámicamente
  },
  distDir: "out", // Define el directorio de salida
};

export default nextConfig;
