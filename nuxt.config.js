export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Analytics | Unbound Finance',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'title',
        name: 'title',
        content: 'Analytics | Unbound Finance',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Analytics | The DeFi Treasury For Liquidity Pool Tokens',
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'Analytics | Unbound Finance',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: 'Analytics | Unbound Finance',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        property: 'og:site_name',
        content: 'Analytics | Unbound Finance',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: 'Analytics | The DeFi Treasury For Liquidity Pool Tokens',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://kit.fontawesome.com/8c55e9bfce.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css', '@/assets/css/loading-dots.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/ga.js',
    '@/plugins/numberFormatter.js',
    '@/plugins/web3provider.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    'nuxt-windicss',
    '@nuxtjs/color-mode',
  ],

  //Module Configurations
  colorMode: {
    classSuffix: '',
  },

  apollo: {
    clientConfigs: {
      mainnet: {
        httpEndpoint:
          'https://thegraph.com/legacy-explorer/subgraph/unbound-finance/unbound',
      },
      rinkeby: {
        httpEndpoint: 'https://thegraph.com/legacy-explorer/subgraph/unbound-finance/unbound'
      }
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/apollo'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
