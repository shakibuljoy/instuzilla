// /** @type {import('next').NextConfig} */
// const nextConfig = {};
// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'placehold.co',
//           port: '',
//           pathname: '/account123/**',
//           search: '',
//         },
//       ],
//     },
//   }
// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'instustatic.s3.amazonaws.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
