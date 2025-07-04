import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './ui/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    // Все стили в global.css, так как это версия v4
  },
  plugins: [
    require('tailwindcss-multi'),
  ],
}

export default config
