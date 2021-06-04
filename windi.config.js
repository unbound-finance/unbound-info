/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
 module.exports = {
    theme: {
      darkSelector: '.dark-mode', // class for dark mode
      extend: {
        colors: {
          accent: '#059991',
          light: {
            primary: '#059991',
          },
  
          dark: {
            primary: '#49C1BF',
            bg: '#212429',
          },
          transparent: 'transparent',
          current: 'currentColor',
        },
      },
    },
    variants: {
      backgroundColor: [
        'dark',
        'dark-hover',
        'dark-group-hover',
        'dark-even',
        'dark-odd',
        'hover',
        'responsive',
      ],
      borderColor: [
        'dark',
        'dark-focus',
        'dark-focus-within',
        'hover',
        'responsive',
      ],
      textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive'],
    },
    plugins: [require('tailwindcss-dark-mode')()],
    purge: {
      // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
      enabled: process.env.NODE_ENV === 'production',
      content: [
        'components/**/*.vue',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'plugins/**/*.js',
        'nuxt.config.js',
      ],
    },
  }
  