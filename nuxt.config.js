export default {
  target: "static",

  head: {
    title: "Nuxt.js Restaurants Blog 🍴🍝🍰☕ | Nuxt.js ⛰️ & Strapi.io 🚀",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Restaurants blog 🍴🍝🍰☕ made with Nuxt.js 2 and BootstrapVue ⛰️, fetching data from the Strapi.io API 🚀" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["@/assets/css/main.css"],

  plugins: [],

  components: true,

  loading: {
    color: '#106e17',
    height: '2px'
  },

  buildModules: [
    ['@nuxtjs/fontawesome', {
      component: 'FontAwesome',
      icons: {
        brands: [
          'faGithub', 'faCodepen', 'faLinkedinIn', 'faTwitter'
        ]
      }
    }]
  ],

  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios"],

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  build: {},
}
