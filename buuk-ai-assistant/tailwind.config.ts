import type { Config } from 'tailwindcss';

/** @type {Config} */
const config: Config = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Ensure all relevant file types are included
    './index.html',  // Include the index.html file as well
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;