# Grunt Boilerplate

> This boilerplate is for testing, live coding, linting, deploying, ...

## Contents

- [Basic usage](#basic-usage)
- [Features](#features)
- [Tasks](#tasks)

## Basic usage

> you must have installed Node v4+ and NPM v3+

Make sure you have instlled Grunt globally

```sh
npm i -g grunt-cli
```

Install the dependencies

```sh
npm i
```

### Build

**Dev**

Build the developing code. The builded files are stored in `dev`

```sh
grunt build:dev
```

**Production**

Build the production ready code. The builded files are stored in `dist`

```sh
grunt build:prod
```

or

```sh
grunt
```

### Live Developing

For developing with live reloading in a browser use:

```sh
grunt serve:dev
```

## Features

### Browser stylesheet

> Generates a own stylesheet for browsers

In the directory `src/assets/scss` you must add a new folder with the prefix `browser.`. This new prefixed folder will generate its own file, the file is called as the folder without the prefix.

Example:

```js
└─── src/
    └─── assets/
        └─── scss/
            ├─── main.scss
            └─── browser.ie8/
                └─── main.scss
```

Will generate a file called: `ie8.css`. This folder is also fully ignored from the `global.css`

Output for development:
```js
└─── dev/
    └─── assets/
        ├─── global.css
        └─── ie8.css
```

### Production ready code

Your code gets automatically optimized when triggering `grunt build:prod`

## Tasks

> Those tasks are all necessary tasks

- [manage](#manage)
- [lint](#lint)

### manage

> Manage is to manage `JS` or `SASS` files. This could also be for managing pictures or something else

> Default: `all combined`

#### manage:js

This will manage the `JS` files and put the development ready code into the directory `dev`

```sh
grunt manage:js
```

#### manage:sass

This will manage the `SASS` files and put the development ready code into the directory `dev`

```sh
grunt manage:sass
```

### lint

> lints: `HTML`, `CSS`, and `JS` based on the config files based in the `config` directory. Or optionally run single lints by triggering `lint:` followed by `js`, `css`, or `html`

> Default: `lint:dev`

#### lint:dev

Will lint all files with following order: `JS`, `CSS`, `HTML`

#### lint:reports

Saves the linting reports into `dev/reports`


# Contribution

I am happy with every PR request, any tweaks or suggestions.