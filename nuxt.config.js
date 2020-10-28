export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: { lang: 'zh', amp: true },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,shrink-to-fit=no'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'ie=edge'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Global CSS
   */
  css: ['@/static/css/normalize.css', '@/assets/sass/base.scss'],

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/inject-apiPath.js' },
    { src: '~/plugins/register-axiosInterceptors.js' },
    { src: '~/plugins/register-infiniteLoading.js', mode: 'client' }
  ],

  loading: {
    color: 'lime',
    height: '1px'
  },

  publicRuntimeConfig: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    apipathMain: '/api',
    apipathViews: '/api/increaseViewsById',
    apipathLiked: '/api/updateLikedById'
  },

  privateRuntimeConfig: {},

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  // serverMiddleware: ['~/middleware/server-log.js'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    '@nuxtjs/markdownit'
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: `http://${process.env.NUXT_ENV_API_HOST}:${process.env.NUXT_ENV_API_PORT}`,
      pathRewrite: { '^/api': '' }
    }
  },

  styleResources: {
    scss: ['./assets/sass/_vars.scss', './assets/sass/_mixins.scss']
    // sass
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    highlight(str, lang) {
      const hljs = require('highlight.js');
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
        return ''; // use external default escaping
      }
    },
    injected: true
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, { isDev, isClient }) {
      // // @see https://github.com/nuxt/nuxt.js/pull/3480#issuecomment-404150387
      // config.output.globalObject = 'this'

      if (isClient) {
        // web workers are only available client-side
        config.module.rules.push({
          test: /\.worker\.js$/, // this will pick up all .js files that ends with ".worker.js"
          loader: 'worker-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
