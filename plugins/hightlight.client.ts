import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import highlightJS from '@highlightjs/vue-plugin'
import 'highlight.js/styles/night-owl.min.css'

export default defineNuxtPlugin((nuxtApp) => {
  hljs.registerLanguage('css', css)
  nuxtApp.vueApp.use(highlightJS)
})
