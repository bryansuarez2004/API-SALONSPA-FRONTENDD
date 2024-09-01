/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      animation: {
        'openSlide': 'slideFadeIn 0.6s ease-out forwards',
        'closeSlide': 'slideFadeOut 0.3s ease-in-out forwards',
      },
      fontFamily:{
        "dongle": "Dongle, sans-serif",
        "rubick": "Rubik, sans-serif"
      },
      keyframes: {
        slideFadeIn: {
          '0%': { transform: 'translateX(110%) scaleX(1)', opacity: '0' },
          '70%': { transform: 'translateX(-20px) scaleX(1.1)', opacity: '1' }, // Sobresale un poco
          '100%': { transform: 'translateX(0) scaleX(1)', opacity: '1' }, 
        },
        slideFadeOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(110%)', opacity: '0' },
        },
      },
      colors: {
      
        bgbackward: 'rgba(255, 255, 255, 0.3)',   // Añade tu color secundario
        bgfordward: 'rgba(255, 255, 255, 0.4)',
        shadow:'#d4d4d8',
        salient:'#0e7490',
        different: '#164e63',
        textColor: '#020617', 

        cancel:'#dc2626',
        // Color personalizado
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

