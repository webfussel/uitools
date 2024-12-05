// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  nitro: {
    prerender: {
      routes: [
        '/',
        '/colors',
        '/sizing',
        '/spacing',
      ]
    }
  },

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/general.css',
    '~/assets/css/Tip.css',
  ],

  routeRules: {
    '/': { prerender: true },
    '/colors': { prerender: true },
    '/sizing': { prerender: true },
    '/spacing': { prerender: true },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      link: [
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/fonts/opensans.woff2', type: 'font/woff2' },
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/fonts/roboto_con_bold.woff2', type: 'font/woff2' },
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/fonts/roboto_con_reg.woff2', type: 'font/woff2' },
      ]
    }
  },

  compatibilityDate: '2024-10-15',
  modules: ['nuxt-shiki', '@nuxt/icon'],
  shiki: {
    defaultTheme: 'catppuccin-frappe',
    bundledLangs: ['css']
  }
})