# herbert.gd
An archive website for the visual communication department at Bauhaus-University Weimar, Germany.

## Contributions welcome
If you want to contribute to this project, feel free to get in touch, open an issue or create a pull request.

## System requirements for development
- PHP 7.4
- Sass

## Development setup
Clone repo
```
git clone --recursive https://github.com/moritzebeling/herbert.gd
cd hebert.gd
```
Install svelte
```
cd site/plugins/frontend/app
npm install
```

## Updates
Update submodules
```
git submodule foreach git pull origin master
```

## Run
To run the page on a PHP server:
```
php -S localhost:8000 kirby/router.php
```
Compile sass on save
```
sass --watch --style=compressed assets/scss:assets/css
```
Frontend
```
cd site/plugins/frontend/app
npm run dev
# or
npm run build
```
