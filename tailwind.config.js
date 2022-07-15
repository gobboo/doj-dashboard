/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        default: {
          "primary": "#570DF8",
          "secondary": "#F000B8",
          "accent": "#37CDBE",
          "neutral": "#E5E6E6",
          "base-100": "#FFFFFF",
          "info": "#2563eb",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#ef4444"
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"]
      },
      colors: {
        "title": "#230B46"
      }
    }
  },
  plugins: [require('daisyui')],
};
