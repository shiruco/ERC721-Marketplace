const parseArgs = require("minimist")
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  /* eslint-disable no-unused-vars */
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost"
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`
  },
  head: {
    title: "marketplace demo",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }
    ],
    link: []
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  css: [
    { src: "bulma/bulma.sass", lang: "sass" },
    "bulma-badge/dist/css/bulma-badge.min.css",
    "@fortawesome/fontawesome-free-webfonts",
    "@fortawesome/fontawesome-free-webfonts/css/fa-brands.css",
    "@fortawesome/fontawesome-free-webfonts/css/fa-regular.css",
    "@fortawesome/fontawesome-free-webfonts/css/fa-solid.css",
    "~/assets/css/custom_bluma.scss",
    "~/assets/css/main.scss",
    "normalize.css"
  ],
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.devtool = "#source-map"

        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })

        config.module.rules.push({
          resourceQuery: /blockType=i18n/,
          type: "javascript/auto",
          loader: ["@kazupon/vue-i18n-loader", "yaml-loader"]
        })

        // const vueLoader = config.module.rules.find(
        //   rule => rule.loader === "vue-loader"
        // )
        // vueLoader.options.transformToRequire["video"] = ["src", "poster"]
      }
    }
  },
  modules: [
    "@nuxtjs/axios",
    "~/modules/typescript.js",
    [
      "nuxt-i18n",
      {
        parsePages: false,
        seo: true,
        locales: [{ code: "ja", iso: "ja_JP" }, { code: "en", iso: "en-US" }],
        defaultLocale: "ja",
        vueI18n: {
          fallbackLocale: "ja",
          silentTranslationWarn: true
        },
        vueI18nLoader: true,
        detectBrowserLanguage: {
          // If enabled, a cookie is set once a user has been redirected to his
          // preferred language to prevent subsequent redirections
          // Set to false to redirect every time
          useCookie: true,
          // Cookie name
          cookieKey: "i18n_redirected",
          // Set to always redirect to value stored in the cookie, not just once
          alwaysRedirect: false,
          // If no locale for the browsers locale is a match, use this one as a fallback
          fallbackLocale: "ja"
        }
      }
    ]
  ],
  plugins: [{ src: "~plugins/ga.js", ssr: false }],
  axios: {}
}
