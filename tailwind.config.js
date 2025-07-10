/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // ルート階層のすべてのHTMLファイル
    "./js/**/*.js"  // jsフォルダ内のすべてのJavaScriptファイル
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}