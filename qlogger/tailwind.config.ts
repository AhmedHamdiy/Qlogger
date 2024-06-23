/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'blue': '#1fb6ff',
          'gray-dark': '#273444',
          'gray-light': '#efefef',
          'gray': '#a4a4a4',
        },
        spacing: {
          '144': '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        },
        fontFamily: {
          'sans': ['ui-sans-serif', 'system-ui'],
          'serif': ['ui-serif', 'Georgia'],
          'mono': ['ui-monospace', 'SFMono-Regular'],
          'display': ['Oswald'],
          'body': ['"Roboto"',],
        },
        screens: {
          'sm': '350px',
          'md': '768px',
          'lg': '1024px',
        },
      }
    },
    plugins: [],
  }