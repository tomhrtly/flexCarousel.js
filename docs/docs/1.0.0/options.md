# Options

- [Options](#options)
    - [Introduction](#introduction)
    - [Available Options](#available-options)
        - [appendArrows](#appendarrows)
        - [arrows](#arrows)
        - [arrowsOverlay](#arrowsoverlay)
        - [autoplay](#autoplay)
        - [autoplaySpeed](#autoplayspeed)
        - [circles](#circles)
        - [circlesOverlay](#circlesoverlay)
        - [height](#height)
        - [infinite](#infinite)
        - [initialPage](#initialpage)
        - [nextButton](#nextbutton)
        - [prevButton](#prevbutton)
        - [responsive](#responsive)
        - [slidesPerPage](#slidesperpage)
        - [transition](#transition)
        - [transitionSpeed](#transitionspeed)

## Introduction

It's very easy to customise your carousel by changing the options given to you. All you have to do is invoke the flexCarousel function and pass an object with the options you wish to change from the default value.

```html
<script>
    new flexCarousel('.my-class', {
        option: value,
    });
</script>
```

## Available Options

For a full list of all the options available so that you can customise your carousels as needed, view the list below. The list provides each option along with its type, default value and description of what it does.

### `appendArrows`

Type: String

Default: `this.selector`

The HTML element which the arrows will be appended to if you want to have more flexibility to how your carousel looks. When using this option, you will most likely want to add your own styles for the previous and next buttons.

<div class="preview">
    <div class="example">
        <div class="arrows-js"></div>
        <div class="append-arrows-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.append-arrows-js', {
                appendArrows: '.arrows-js',
            });
        </script>
    </div>
    <div class="code">

```html
<div class="arrows-js"></div>
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    appendArrows: '.arrows-js',
});
``` 

</div>
</div>

### `arrows`

Type: Boolean

Default: `true`

Determines whether a previous and next arrow should be shown on either side of the slides so that the user can change the active page.

<div class="preview">
    <div class="example">
        <div class="arrows-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.arrows-js', {
                arrows: false,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    arrows: false,
});
``` 

</div>
</div>

### `arrowsOverlay`

Type: Boolean

Default: `true`

Determines whether the arrows overlay onto the active slide or have their own wrapping elements. `arrows` must be set to `true` for this option to work.

<div class="preview">
    <div class="example">
        <div class="arrows-overlay-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.arrows-overlay-js', {
                arrowsOverlay: false,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    arrowsOverlay: false,
});
``` 

</div>
</div>

### `autoplay`

Type: Boolean

Default: `false`

Determines whether the active slide changes to the next slide on a time delay. The carousel will pause when the user hovers their mouse over the selector for improved accessibility.

<div class="preview">
    <div class="example">
        <div class="autoplay-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.autoplay-js', {
                autoplay: true,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    autoplay: true,
});
``` 

</div>
</div>

### `autoplaySpeed`

Type: Integer

Default: `5000`

Determines how long the active slide(s) will stay active for before transitioning to the next slide. `autoplay` must be set to `true` for this option to work.

<div class="preview">
    <div class="example">
        <div class="autoplay-speed-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.autoplay-speed-js', {
                autoplay: true,
                autoplaySpeed: 2000,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    autoplay: true,
    autoplaySpeed: 2000,
});
``` 

</div>
</div>

### `circles`

Type: Boolean

Default: `true`

Determines whether navigation circles should be shown at the bottom of the carousel for users to quickly select which slide to view.

<div class="preview">
    <div class="example">
        <div class="circles-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.circles-js', {
                circles: false,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    circles: false,
});
``` 

</div>
</div>

### `circlesOverlay`

Type: Boolean

Default: `true`

Determines whether the circles overlay onto the active slide(s) or have their own wrapping elements. `circles` must be set to `true` for this option to work.

<div class="preview">
    <div class="example">
        <div class="circles-overlay-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.circles-overlay-js', {
                circlesOverlay: false,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    circlesOverlay: false,
});
``` 

</div>
</div>

### `height`

Type: String

Default: `null`

Defines whether a fixed height is to be added to the carousel selector element.

<div class="preview">
    <div class="example">
        <div class="height-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.height-js', {
                height: '400px',
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    height: '400px',
});
``` 

</div>
</div>

### `infinite`

Type: Boolean

Default: `true`

Determines if the carousel will continuously loop over the slides or have the prev/next buttons disabled when on the first/last slide.

<div class="preview">
    <div class="example">
        <div class="infinite-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.infinite-js', {
                infinite: false,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    infinite: false,
});
``` 

</div>
</div>

### `initialPage`

Type: Integer

Default: `0`

Defines which page index the carousel will start on.

<div class="preview">
    <div class="example">
        <div class="initial-page-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.initial-page-js', {
                initialPage: 2,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    initialPage: 2,
});
``` 

</div>
</div>

### `nextButton`

Type: String

Default: `<svg ...`

Defines the HTML code for the element which changes the active slide(s) to the next slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons.

<div class="preview">
    <div class="example">
        <div class="next-button-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.next-button-js', {
                nextButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-right" class="svg-inline--fa fa-arrow-circle-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path></svg>',
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    nextButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-right" class="svg-inline--fa fa-arrow-circle-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path></svg>',
});
``` 

</div>
</div>

### `prevButton`

Type: String

Default: `<svg ...`

Defines the HTML code for the element which changes the active slide(s) to the previous slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons.

<div class="preview">
    <div class="example">
        <div class="prev-button-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.prev-button-js', {
                prevButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-left" class="svg-inline--fa fa-arrow-circle-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path></svg>',
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    prevButton: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-left" class="svg-inline--fa fa-arrow-circle-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path></svg>';
});
``` 

</div>
</div>

### `responsive`

Type: Array

Default: `null`

A collection of objects which defines options for specific breakpoints. Each object must contain a `breakpoint` and `options` key. The former key must be an integer which defines the breakpoint for the `options` object to apply to.

This works from a mobile-first approach and each breakpoint will use the previous breakpoint's options. Notice how in the example below, even though we did not change the `arrows` option for the 992px breakpoint, it did not revert back to it's default value.

<div class="preview">
    <div class="example">
        <div class="responsive-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.responsive-js', {
                arrows: false,
                responsive: [
                    {
                        breakpoint: 992,
                        options: {
                            autoplay: true,
                        },
                    },
                ],
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    arrows: false,
    responsive: [
        {
            breakpoint: 992,
            options: {
                autoplay: true,
            },
        },
    ],
});
``` 

</div>
</div>

### `slidesPerPage`

Type: Integer

Default: `1`

Defines how many slides are visible on a page at any given time.

<div class="preview">
    <div class="example">
        <div class="slides-per-page-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.slides-per-page-js', {
                slidesPerPage: 3,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    slidesPerPage: 3,
});
``` 

</div>
</div>

### `slidesScrolling`

Type: Integer

Default: `1`

Defines how many slides should be moved when going to the next page of slides. You don't want to have this option value higher than `slidesPerPage` as this may lead to poor accessibility and user experience.

<div class="preview">
    <div class="example">
        <div class="slides-scrolling-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.slides-scrolling-js', {
                slidesPerPage: 3,
                slidesScrolling: 3,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    slidesPerPage: 3,
    slidesScrolling: 3,
});
``` 

</div>
</div>

### `transition`

Type: String

Default: `slide`

Defines which transition should be used when changing the active slide(s). Current transitions available are: `none` and `slide`.

<div class="preview">
    <div class="example">
        <div class="transition-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.transition-js', {
                transition: 'none',
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    transition: 'none',
});
``` 

</div>
</div>

### `transitionSpeed`

Type: Integer

Default: `250`

Defines the transition speed when the slide is being changed. `transition` must be set to `slide` for this option to work.

<div class="preview">
    <div class="example">
        <div class="transition-speed-js">
            <ul>
                <li>
                    <div>1</div>
                </li>
                <li>
                    <div>2</div>
                </li>
                <li>
                    <div>3</div>
                </li>
                <li>
                    <div>4</div>
                </li>
                <li>
                    <div>5</div>
                </li>
            </ul>
        </div>
        <script>
            new flexCarousel('.transition-speed-js', {
                transitionSpeed: 1000,
            });
        </script>
    </div>
    <div class="code">

```html
<div class="my-class">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>2</div>
        </li>
        <li>
            <div>3</div>
        </li>
        <li>
            <div>4</div>
        </li>
        <li>
            <div>5</div>
        </li>
    </ul>
</div>
```

```javascript
new flexCarousel('.my-class', {
    transitionSpeed: 1000,
});
``` 

</div>
</div>
