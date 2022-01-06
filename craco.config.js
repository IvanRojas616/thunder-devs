// craco.config.js
//it's needed use craco-alias and this config for S3 AWS
const CracoAlias = require('craco-alias');

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          '*': './src',
        },
      },
    },
  ],
};