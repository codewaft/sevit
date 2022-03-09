const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts("resources/js/app.ts", "public/js")
    .react()
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")])
    .copy("resources/images", "public/images");

if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}
