/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Pour un déploiement statique
    // ou bien sans cette ligne pour un déploiement SSR
    images: {
      unoptimized: true, // Pour les déploiements statiques
    },
  }
  
  module.exports = nextConfig