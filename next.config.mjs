


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },

//   images: {
//     unoptimized: true, // OK for dev & external images
//     domains: [
//       "images.unsplash.com",   // ✅ REQUIRED
//       "source.unsplash.com",
//       "upload.wikimedia.org",
//       "placehold.co",
//       "randomuser.me",
//        "res.cloudinary.com",
//     ],
//   },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },

      // ✅ ADD THIS
      { protocol: "https", hostname: "ui-avatars.com" },

      { protocol: "http", hostname: "localhost", port: "5000" },
    ],
  },
}

export default nextConfig