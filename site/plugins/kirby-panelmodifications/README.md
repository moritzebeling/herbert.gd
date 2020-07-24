# Kirby Panel CSS Modifications

Adds CSS to Kirby panel to improve editor experience:
- Dialog boxes are wider
- All disabled (or non-translatable) fields are consistently grey
- Image backgrounds are almost white, but not fully white
- Same margins between fields and sections
- Button for changing the page title is visible
- Page status bullets are invisible if the page status can’t be changed
- Page status bullets for unlisted pages are grey instead of violet blueish
- Some helpers for `sylvainjule/kirby-pagetable` plugin
- Preformatted text is actually written in mono

Issues and PRs welcome.

## Installation

Clone as plugin into your Kirby installation
```
git clone https://github.com/moritzebeling/kirby-panelmodifications.git site/plugins/kirby-panelmodifications
```
As submodule
```
git submodule add https://github.com/moritzebeling/kirby-panelmodifications.git site/plugins/kirby-panelmodifications
```
Update submodules
```
git submodule foreach git pull origin master
```

## Compile
To compile SCSS, run:
```
sass --watch --style=compressed --no-source-map index.scss index.css
```
Or, when this inside your Kirby installation:
```
sass --watch --style=compressed --no-source-map site/plugins/kirby-panelmodifications/index.scss site/plugins/kirby-panelmodifications/index.css
```
