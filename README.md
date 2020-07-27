# [herbert.gd](https://herbert.gd)
An archive website for the graphic design and visual communication department at Bauhaus-University Weimar, Germany.

## Contributions welcome
If you want to contribute to the website design and functionality or fix problems, feel free to get in touch, open an issue or create a pull request. Read more below at branching.

If you want to contribute to the page content, please get in touch with the editors aka. the staff of the graphic design chair at Marienstraße 1, Weimar. Read more at [herbert.gd/info](https://herbert.gd/info).

## Setup
The website runs on PHP and uses Kirby as CMS, framework and templating engine. On top of that, there is a Svelte frontend JS framework to dynamically render and manipulate lists of posts on client side. It fetches json data from a public api that can be accessed by appending `.json` at the end of any page url.
CSS is not bundled by Svelte, but compiled with Sass.
All content is lives on the live server. Get in touch to get a copy of that.

## System requirements for development
- php 7.3
- imagemagick
- sass
- npm

## Development setup
Clone repo including submodules
```
git clone --recursive https://github.com/moritzebeling/herbert.gd
cd hebert.gd
```
Install svelte
```
cd assets/frontend/app
npm install
```

## Updates
Update submodules
```
git submodule foreach git pull origin master
```

## Run website locally
To run a php server on localhost:8000
```
php -S localhost:8000 kirby/router.php
```
Compile sass on save
```
sass --watch --style=compressed assets/scss:assets/css
```
Compile Svelte frontend
```
cd assets/frontend/app
npm run dev
```
Build Svelte frontend before shipping it
```
npm run build
```

## Branching and PRs
`master` branch is only for the currently stable live version. Development happens within `develop`, which is the only branch ever to be pulled to `master`. If you are fixing an issue or working on a new feature, please start from `develop` and call your new branch `yymmdd-issue-name` or `yymmdd-feature-name`. Send pull requests only to `develop`.

## Stack and tools used
- php (v7.4) Server
- [imagemagick](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-install-imagemagick-for-php-on-ubuntu-18-04/)
- [Kirby](https://getkirby.com) (v3) CMS
- [Bettersearch](https://github.com/bvdputte/kirby-bettersearch) Kirby plugin for an enhanced search algorithm
- [Sitemapper](https://gitlab.com/kirbyzone/sitemapper) Kirby plugin to create a sitemap.xml for searchengines
- [Pagetable](https://github.com/sylvainjule/kirby-pagetable) Kirby plugin for table-like display of posts in panel
- [sass](https://sass-lang.com) CSS Preprocessor
- [Svelte](https://svelte.dev) (v3) JS framework
- [Swiper.js](https://swiperjs.com) Image slider gallery
- [Lazysizes](https://github.com/aFarkas/lazysizes) Image lazyloading

## When deploying to a FTP server
When deploying this website to the target host, please exclude the following from upload to prevent yourself from overriding critical files and avoid cluttering:
- `.lock`
- `*.sess`
- `.git`
- `.license`
- `.gitignore`
- `.gitmodules`
- `.editorconfig`
- `node_modules`
- `.DS_Store`
- `media`
- `content`
- `site/accounts`
- `site/sessions`
