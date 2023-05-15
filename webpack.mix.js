let mix = require('laravel-mix');

mix
    .js('assets/js/index.js', 'dist')
    .setPublicPath('assets/dist');