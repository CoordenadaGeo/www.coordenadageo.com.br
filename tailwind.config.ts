import type { Config } from 'tailwindcss';

// Paleta oficial do Manual de Marca (Coordenada Geo), pagina 21.
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#012034',
          50: '#E6EBEF',
          100: '#BFCCD5',
          200: '#8FA5B3',
          300: '#5E7E92',
          400: '#2E5671',
          500: '#012034',
          600: '#011A2A',
          700: '#011521',
          800: '#000F18',
          900: '#00070C',
        },
        moss: {
          DEFAULT: '#698461',
          50: '#EFF3ED',
          100: '#D4DED1',
          200: '#AFC0AA',
          300: '#89A282',
          400: '#698461',
          500: '#577053',
          600: '#465A43',
          700: '#354334',
          800: '#242D24',
          900: '#141814',
        },
        ocre: {
          DEFAULT: '#D99856',
          50: '#FBF2E7',
          100: '#F4DDBE',
          200: '#EAC08D',
          300: '#E0AA6F',
          400: '#D99856',
          500: '#C07E3A',
          600: '#9A6530',
          700: '#744C25',
          800: '#4F331A',
          900: '#29190D',
        },
        terracota: {
          DEFAULT: '#B03E19',
          light: '#D4633E',
          dark: '#8A2F11',
        },
        sand: {
          DEFAULT: '#E5DBC0',
          light: '#F2EBDA',
          dark: '#C9BA94',
        },
        graphite: '#1D1D1D',
        mist: '#AFAFAF',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [],
};

export default config;
