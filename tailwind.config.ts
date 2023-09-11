import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "230px auto",
      },
      gridTemplateRows: {
        header: "64px auto",
      },
    },
  },
  // corePlugins: {
  //   // Remove Tailwind CSS's preflight style so it can use the MUI's preflight instead (CssBaseline).
  //   preflight: false,
  // },
  plugins: [],
}
export default config
