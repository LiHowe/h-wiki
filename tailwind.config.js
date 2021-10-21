module.exports = {
  mode: 'jit',
  purge: [
    './.vuepress/**/*.{js,ts,jsx,tsx,vue}',
    './nuxt.config.{js}',
    './content/**/*.md'
  ],
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        green: '0 4px 6px -1px rgb(19 139 99 / 27%), 0 2px 4px -1px rgb(8 66 45 / 38%)'
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
