// https://nuxt.com/docs/api/configuration/nuxt-config

const base = process.env.NUXT_APP_BASE_URL || ''

export default defineNuxtConfig({
  ssr: false,

  nitro: {
    prerender: {
      routes: [
        '/',
      ]
    }
  },

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/general.css',
  ],

  routeRules: {
    '/': { prerender: true },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      link: [
        { rel: 'icon', href: process.env.NUXT_APP_BASE_URL + '/favicon.ico' },
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: base + '/fonts/opensans.woff2', type: 'font/woff2' },
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: base + '/fonts/roboto_con_bold.woff2', type: 'font/woff2' },
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: base + '/fonts/roboto_con_reg.woff2', type: 'font/woff2' },
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