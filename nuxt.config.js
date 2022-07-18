export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: { lang: 'zh', amp: true },
    title: process.env.npm_package_name || 'gian-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/sass/base.scss'],

  transition: {
    name: 'page',
    mode: 'out-in',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/inject-apiPath.js' },
    { src: '~/plugins/register-axiosInterceptors.js' },
    { src: '~/plugins/register-infiniteLoading.js', ssr: false },
  ],

  loading: {
    color: 'lime',
    height: '1px',
  },

  publicRuntimeConfig: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    apipathMain: '/api',
    apipathViews: '/api/increaseViewsById',
    apipathLiked: '/api/updateLikedById',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    '@nuxtjs/markdownit',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
  },

  proxy: {
    '/api': {
      target: `http://${process.env.NUXT_ENV_API_HOST}:${process.env.NUXT_ENV_API_PORT}`,
      pathRewrite: { '^/api': '/' },
    },
  },

  styleResources: {
    scss: ['./assets/sass/_vars.scss', './assets/sass/_mixins.scss'],
    // sass
  },

  markdownit: {
    preset: 'default',
    breaks: true,
    typographer: true,
    linkify: false,
    html: false,
    xhtmlOut: false,
    highlight(str, lang) {
      const hljs = require('highlight.js')
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {}
        return '' // use external default escaping
      }
    },
    injected: true,
    use: [
      'markdown-it-emoji',
      [
        'markdown-it-anchor',
        {
          level: 1,
        },
      ],
      ['markdown-it-toc-done-right', { linkClass: 'nav-link-title' }],
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: '0.0.0.0',
    port: 3000,
  },
}
