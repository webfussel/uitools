// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
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
    '~/assets/css/components/Header.css',
    '~/assets/css/components/Button.css',
    '~/assets/css/components/Chip.css',
    '~/assets/css/components/Input/InputBase.css',
    '~/assets/css/components/Input/TextField.css',
    '~/assets/css/components/Toolbar.css',
    '~/assets/css/components/IconButton.css',
    '~/assets/css/components/Tip.css',
    '~/assets/css/components/TabCard.css',
    '~/assets/css/components/Palette/CssCode.css',
    '~/assets/css/components/Palette/ColorStrip.css',
    '~/assets/css/components/Palette/ColorPalette.css',
    '~/assets/css/components/Palette/Contrast.css',
    '~/assets/css/pages/colors.css',
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
  }
})
