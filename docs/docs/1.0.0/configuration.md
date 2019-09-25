# Configuration

- [Configuration](#configuration)
    - [How to Use](#how-to-use)
        - [Document Setup](#document-setup)
        - [Quick-start Template](#quick-start-template)
    - [Styling](#styling)
        - [Sass](#sass)
            - [Initial Variables](#initial-variables)
            - [Derived Variables](#derived-variables)
        - [Custom Themes](#custom-themes)
        - [File Structure](#file-structure)

## How to Use
Before you start using flexCarousel.js, make sure your web page is set up to the latest development standards. This means using the correct document declaration and including the responsive meta tag.

### Document Setup
```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
  </body>
</html>
```

### Quick-start Template
After setting up your web page correctly, this is what your full HTML structure should look like to initialize flexCarousel.js.

Use a semantic unordered list with a list item for each carousel slide wrapped in a HTML tag with a unique identifier to initialize the carousel.

Having trouble getting your carousel to work correctly? Check out this [CodePen example](https://codepen.io/tomhrtly/pen/eXRpOg/).

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flexcarouseljs@latest/dist/flexCarousel.min.css">
    </head>
    <body>
        <div class="my-class">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/flexcarouseljs@latest/dist/flexCarousel.min.js"></script>
        <script>
           const carousel = new flexCarousel('.my-class');
        </script>
  </body>
</html>
```

## Styling
It's very easy to take advantage of the flexCarousel.js Sass file so that you can style your carousel components easily to integrate with your current projects. Your file structure will depend on your project and if you are using a package manager such as [npm](https://www.npmjs.com/) (recommended).

### Sass
Below you can find two tables of all the Sass variables available for you to change the value of as the variables include the `!default` suffix. Each variable also has a prefix, `fc-` to avoid conflicts with other frameworks and variables.

#### Initial Variables
| Name | Type | Default |
|---|---|---|
| `$fc-black` | Color | `#1b1b1b` |
| `$fc-space` | Size | `16px` |

#### Derived Variables
| Name | Type | Default |
|---|---|---|
| `$fc-prev-next-height` | Computed | `$space * 1.5` |
| `$fc-prev-next-min-width` | Computed | `$space * 8` |

### Custom Themes

Out of the box, flexCarousel.js has a very basic user interface. This is so developers can easily add their own custom UI without having to fight over CSS specificity and trying to override existing styles.

For example, the carousel shown below is created by creating a "theme" stylesheet and adding styles to work with the basic UI provided. 

### File Structure

We do not recommend that you edit the flexCarousel.js source files within `node_modules`, this is because when you update the package through npm, your changes will be removed and there may be problems sharing your repository with flexCarousel.js as a dependency.

To change any of the available Sass variables stated above, you should import the source file into your Sass setup and override the default variables. Your file structure should look something like this if using a package manager.

```
my-project/
├── sass
│   └── custom.sass
└── node_modules/
    └── flexcarouseljs
        └── src
            └── flexCarousel.sass
```

Next, you need to override the default variables *before* importing the Sass file and lastly compile your custom Sass file.

```sass
$fc-black: blue

import '~/flexcarouseljs/src/flexCarousel'
```
