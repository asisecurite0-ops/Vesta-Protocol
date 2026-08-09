/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore les erreurs de type strictes lors du build Vercel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;