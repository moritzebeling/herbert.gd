# [herbert.gd](https://herbert.gd)
An archive website for the graphic design and visual communication department at Bauhaus-University Weimar, Germany. Made with Kirby CMS.

## Contributions welcome

If you want to contribute to the website design and functionality or fix problems, feel free to get in touch, open an issue or create a pull request. Read more below at branching.

If you want to contribute to the page content, please get in touch with the editors aka. the staff of the graphic design chair at Marienstraße 1, Weimar. Read more at [herbert.gd/info](https://herbert.gd/info).

## System requirements for development

- php 8.1
- imagemagick
- sass
- npm

## Development setup

Clone repo including submodules
```
git clone git@github.com:moritzebeling/herbert.gd.git
cd hebert.gd
```

Install dependencies
```
composer install
npm install
```

## Updates

```
composer update
npm update
```

## Run website locally

To run a php server on localhost:8000
```
composer start
```

Compile sass on save
```
sass --watch --style=compressed assets/scss:assets/css
```

Compile js
```
npm run dev
```

Build for production
```
npm run build
```

## Branching and PRs
`master` branch is only for the currently stable live version. Development happens within `develop`, which is the only branch ever to be pulled to `master`. If you are fixing an issue or working on a new feature, please start from `develop` and call your new branch `yymmdd-issue-name` or `yymmdd-feature-name`. Send pull requests only to `develop`.

## Stack and tools used
- php
- [imagemagick](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-install-imagemagick-for-php-on-ubuntu-18-04/)
- [Kirby](https://getkirby.com) (v3) CMS
- [Bettersearch](https://github.com/bvdputte/kirby-bettersearch) Kirby plugin for an enhanced search algorithm
- [sass](https://sass-lang.com) CSS Preprocessor
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
