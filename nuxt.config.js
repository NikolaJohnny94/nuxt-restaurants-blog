import axios from "axios";

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
      {
        hid: "og:image",
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      },
      {
        hid: "description",
        name: "description",
        content:
          "Restaurants blog 🍴🍝🍰☕ made with Nuxt.js 2 and BootstrapVue ⛰️, fetching data from the Strapi.io API 🚀",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["@/assets/css/main.css"],

  plugins: [],

  components: true,

  loading: {
    color: "#106e17",
    height: "2px",
  },

  buildModules: [
    [
      "@nuxtjs/fontawesome",
      {
        component: "FontAwesome",
        icons: {
          solid: ["faExclamationTriangle"],
          brands: ["faGithub", "faCodepen", "faLinkedinIn", "faTwitter"],
        },
      },
    ],
  ],

  modules: ["bootstrap-vue/nuxt", "@nuxtjs/sitemap", "@nuxt/http"],

  sitemap: {
    hostname: process.env.NETLIFY_URL,
    sitemaps: [
      ,
      {
        path: "/sitemap.xml",
        routes: [
          {
            url: "/",
            priority: 1.0,
          },
        ],
      },
      {
        path: "/sitemap-restaurants.xml",
        routes: async () => {
          const responseRestaurants = await axios.get(
            `${process.env.BASE_URL}/restaurants`
          );
          const restaurants = responseRestaurants.data;
          let restaurantsURLS = [];
          restaurants.forEach((restaurant) => {
            restaurantsURLS.push({
              url: `/restaurant/${restaurant._id}`,
              priority: 0.9,
            });
          });
          return restaurantsURLS;
        },
        exclude: ["/"],
      },
      {
        path: "/sitemap-categories.xml",
        routes: async () => {
          const responseCategory = await axios.get(
            `${process.env.BASE_URL}/categories`
          );
          const categories = responseCategory.data;
          let categoriesURLS = [];
          categories.forEach((category) => {
            categoriesURLS.push({
              url: `/category/${category._id}`,
              priority: 0.75,
            });
          });
          return categoriesURLS;
        },
        exclude: ["/"],
      },
      {
        path: "/sitemap-persons-profiles.xml",
        routes: async () => {
          const responsePerson = await axios.get(
            `${process.env.BASE_URL}/persons`
          );
          const persons = responsePerson.data;
          let personsURLS = [];
          persons.forEach((person) => {
            personsURLS.push({
              url: `/person/${person._id}`,
              priority: 0.64,
            });
          });
          return personsURLS;
        },
        exclude: ["/"],
      },
    ],
  },

  privateRuntimeConfig: {
    http: {
      baseURL: process.env.BASE_URL,
    },
  },

  generate: {
    fallback: true,
  },

  build: {},
};
