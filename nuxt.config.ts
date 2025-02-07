// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    "nuxt-lucide-icons"

  ],
  lucide: {
    namePrefix: 'Icon'
  },
  // devServer: {
  //   https: {
  //     key: "./localhost-key.pem",
  //     cert: "./localhost.pem",
  //   },
  //   host: "localhost",
  //   port: 3000, // ou le port que tu utilises
  // },

});