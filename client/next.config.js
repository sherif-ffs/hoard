/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: false,
  },
  images: {
    domains: ['localhost'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"]
  //   });

  //   return config;
  // }
}

// const path = require('path')
// const withSass = require('@zeit/next-sass');
// module.exports = withSass({
//   /* bydefault config  option Read For More Optios
//   here https://github.com/vercel/next-plugins/tree/master/packages/next-sass*/
//   cssModules: true
// })
// module.exports = {
//   reactStrictMode: true,
//   /* Add Your Scss File Folder Path Here */
//   sassOptions: {
//     includePaths: [path.join(__dirname, './styles')],
//   },
// }