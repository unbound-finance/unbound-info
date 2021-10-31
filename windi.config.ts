import { defineConfig } from 'windicss/helpers'

export default defineConfig({
   safelist: 'bg-cyan-500 bg-yellow-400',
    theme: {
      // darkSelector: '.dark-mode', // class for dark mode
      extend: {
        fontFamily:{
          poppins: ['Poppins', 'ui-sans-serif', 'system-ui']
        },
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
  })
  