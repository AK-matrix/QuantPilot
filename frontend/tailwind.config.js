/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#131316", // Main dark
                surface: "#222226",    // Lighter surface for cards (increased contrast)
                primary: "#d97757",    // Terracotta
                secondary: "#f0ece6",  // Much brighter text (Cream/White)
                muted: "#9da1a6",      // Lighter muted text
            },
            fontFamily: {
                serif: ['Newsreader', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
