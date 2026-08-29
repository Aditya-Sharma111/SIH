module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./farmer deshboard/**/*.{js,ts,jsx,tsx}",
    "./farmer profile/**/*.{js,ts,jsx,tsx}",
    "./Crop Monitoring page/**/*.{js,ts,jsx,tsx}",
    "./Crop Details/**/*.{js,ts,jsx,tsx}",
    "./Full crop guide/**/*.{js,ts,jsx,tsx}",
    "./Alternative crop/**/*.{js,ts,jsx,tsx}",
    "./marketpage/**/*.{js,ts,jsx,tsx}",
    "./Equipment page Dashboard/**/*.{js,ts,jsx,tsx}",
    "./insurance/**/*.{js,ts,jsx,tsx}",
    "./notification page/**/*.{js,ts,jsx,tsx}",
    "./Government equipment schemes/**/*.{js,ts,jsx,tsx}",
    "./Financial Support/**/*.{js,ts,jsx,tsx}",
    "./Bank Portal/**/*.{js,ts,jsx,tsx}",
    "./Agriculture officer dashboard/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#F2F2EF",
        "glass-panel": "rgba(255,255,255,0.6)",
        "glass-border": "rgba(255,255,255,0.7)",
        "focus-dark": "#1A1A1A",
        "accent-lime": "#CFE362",
        "text-primary": "#1A1A1A",
        "text-secondary": "#8C8C88",
        "risk-red": "#E4574B",
        "risk-yellow": "#F0B942",
        "risk-green": "#6FBF73"
      },
      borderRadius: {
        "lg": "28px",
        "md": "16px"
      },
      boxShadow: {
        "soft": "0 8px 24px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};
