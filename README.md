Update submodules
```
git submodule foreach git pull origin master
```

To run the page on a PHP server:
```
php -S localhost:8000 kirby/router.php
```

Run Sass
```
sass --watch --style=compressed assets/scss:assets/css
```
