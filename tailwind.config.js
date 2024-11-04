/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            orange: "#DC9304",
            yellow: "#F5ED5B",
            red: "#883721",
            coffee: "#7E4422",
         },
      },
   },
   plugins: [],
};
