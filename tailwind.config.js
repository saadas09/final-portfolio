/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(141, 213, 230, 0.35), 0 18px 38px -16px rgba(122, 189, 211, 0.4)",
        "glow-lg": "0 0 28px rgba(141, 213, 230, 0.45), 0 0 64px rgba(122, 189, 211, 0.25)",
      },
      colors: {
        ink: {
          950: "#050816",
        },
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(1200px circle at 15% 10%, rgba(141, 213, 230, 0.18), transparent 55%), radial-gradient(900px circle at 85% 20%, rgba(110, 158, 255, 0.16), transparent 60%), linear-gradient(180deg, #0b0f18 0%, #0b1324 45%, #0a0f1c 100%)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out infinite 0.5s",
        "float-slow": "float 9s ease-in-out infinite 1s",
        shimmer: "shimmer 10s linear infinite",
        pulseSoft: "pulseSoft 5.5s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "glow-expand": "glow-expand 2s ease-out infinite",
        "shimmer-text": "shimmer-text 3s infinite",
        typewriter: "typewriter 2.2s steps(25, end) forwards",
        "typewriter-blink": "typewriter-blink 0.75s step-end infinite",
        "nav-expand": "nav-expand 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "underline-slide": "underline-slide 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-24px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: "0.6",
            filter: "drop-shadow(0 0 12px rgba(34, 211, 238, 0.3))"
          },
          "50%": { 
            opacity: "1",
            filter: "drop-shadow(0 0 24px rgba(34, 211, 238, 0.6))"
          },
        },
        "glow-expand": {
          "0%": { 
            boxShadow: "0 0 0 0 rgba(56, 189, 248, 0.4)"
          },
          "50%": { 
            boxShadow: "0 0 0 12px rgba(56, 189, 248, 0)"
          },
          "100%": { 
            boxShadow: "0 0 0 0 rgba(56, 189, 248, 0)"
          },
        },
        "shimmer-text": {
          "0%": { backgroundPosition: "-1000% 0" },
          "100%": { backgroundPosition: "1000% 0" },
        },
        "typewriter": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "typewriter-blink": {
          "0%, 49%": { borderColor: "transparent" },
          "50%, 100%": { borderColor: "#38bdf8" },
        },
        "nav-expand": {
          "0%": { opacity: "0", scale: "0.95" },
          "100%": { opacity: "1", scale: "1" },
        },
        "underline-slide": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },
    },
  },
  plugins: [],
}

