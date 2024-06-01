// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/general.css',
    '~/assets/css/components/Header.css',
    '~/assets/css/components/Chip.css',
    '~/assets/css/components/InputBase.css',
    '~/assets/css/components/TextField.css',
    '~/assets/css/components/Toolbar.css',
    '~/assets/css/components/IconToolbar.css',
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'de' },
      link: [
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/fonts/opensans.woff2', type: 'font/woff2' },
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/fonts/roboto_con_bold.woff2', type: 'font/woff2' },
        { rel: 'preload', crossorigin: 'anonymous', as: 'font', href: '/fonts/roboto_con_reg.woff2', type: 'font/woff2' },
      ]
    }
  }
})
