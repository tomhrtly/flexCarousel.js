# Configuration

- [Configuration](#configuration)
    - [How to Use](#how-to-use)
        - [Document Setup](#document-setup)
        - [Quick-start Template](#quick-start-template)
    - [Options](#options)
    - [Styling](#styling)
        - [Sass](#sass)
            - [Initial Variables](#initial-variables)
            - [Derived Variables](#derived-variables)
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
           new flexCarousel('.my-class');
        </script>
  </body>
</html>
```

## Options
It's very easy to customise your carousel by changing the options given to you. All you have to do is invoke the flexCarousel function and pass an object with the options you wish to change from the default value.

```html
<script>
    new flexCarousel('.my-class', {
        option: value,
    });
</script>
```

For a full list of all the options available so that you can customise your carousels as needed, view the table below. The table provides each option along with its type, default value and description of what it does.

| Name | Type | Default | Description |
|---|---|---|---|
| `appendArrows` | String | `this.selector` |  |
| `appendCircles` | String | `null` |  |
| `arrows` | Boolean | `true` | Determines whether a previous and next arrow should be shown on either side of the slides so that the user can change the active slide. |
| `arrowsOverlay` | Boolean | `true` | Determines whether the arrows overlay onto the active slide or have their own wrapping elements. `arrows` must be set to `true` for this option to work. |
| `autoplay` | Boolean | `false` | Determines whether the active slide changes to the next slide on a time delay. |
| `autoplaySpeed` | Integer | `5000` | Determines how long the active slide(s) will stay active for before transitioning to the next slide. `autoplay` must be set to `true` for this option to work. |
| `circles` | Boolean | `true` | Determines whether navigation circles should be shown at the bottom of the carousel for users to quickly select which slide to view. |
| `circlesOverlay` | Boolean | `true` | Determines whether the circles overlay onto the active slide(s) or have their own wrapping elements. `circles` must be set to `true` for this option to work. |
| `height` | String | `null` | Defines whether a fixed height is to be added to the carousel selector element. |
| `infinite` | Boolean | `true` | |
| `nextButton` | String | `<svg ...` | Defines the HTML code for the element which changes the active slide(s) to the next slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons. |
| `prevButton` | String | `<svg ...` | Defines the HTML code for the element which changes the active slide(s) to the previous slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons. |
| `slidesPerPage` | Integer | `1` | Defines how many slides are visible on a page at any given time. |
| `slidesScrolling` | Integer | `1` | |
| `transition` | String | `slide` | Defines which transition should be used when changing the active slide(s). Current transitions available are: `none` and `slide`. |
| `transitionSpeed` | Integer | `250` | Defines the transition speed when the slide is being changed. `transition` must be set to `slide` for this option to work. |

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

### File Structure
We do not recommend that you edit the flexCarousel.js source files within `node_modules`, this is because when you update the package through npm, your changes will be removed and there may be problems sharing your repository with flexCarousel.js as a dependency.

To change any of the available Sass variables stated above, you should import the source file into your Sass setup and override the default variables. Your file structure should look something like this if using a package manager.

```text
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
