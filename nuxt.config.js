const URL = 'https://fotog-api.herokuapp.com';

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
      '@/assets/styles/forum-lists.css',
      '@/assets/styles/global.css',
      '@/assets/styles/forms.css',
      '@/assets/styles/editor.css',
      '@/assets/styles/admin.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
      {src: '~/plugins/Vuelidate'},
      {src: '~/plugins/Tippy'},
      {src: '~/plugins/VueTag', ssr: false, mode: 'client'},
      {src: '~/plugins/Cropper'},
      {src: '~/plugins/VueColor', ssr: false, mode: 'client'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/auth'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    baseURL: URL
  },

  // Router
  router: {
    linkActiveClass: 'nuxt-link-active',
  },

  // Loading
  loading: {
    color: '#36609b',
    height: '3px'
  },

  proxy: {
    "/api": URL
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: [
      'vuelidate', '@johmun/vue-tags-input'
    ],
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            propertyName: "token"
          },
          logout: true
        }
      }
    }
  }
}
