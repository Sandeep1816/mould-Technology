// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true, // OK for dev & external images
    domains: [
      "images.unsplash.com",   // ✅ REQUIRED
      "source.unsplash.com",
      "upload.wikimedia.org",
      "placehold.co",
      "randomuser.me",
       "res.cloudinary.com",
    ],
  },
}

export default nextConfig

