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
  
          // dark: {
          //   primary: '#49C1BF',
          //   bg: '#212429',
          // },
          transparent: 'transparent',
          current: 'currentColor',
        },
      },
    },
  }
  