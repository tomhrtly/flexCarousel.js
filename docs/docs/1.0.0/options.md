# Options

- [Options](#options)
    - [Introduction](#introduction)
    - [Available Options](#available-options)
        - [appendArrows](#appendarrows)
        - [arrows](#arrows)
        - [arrowsOverlay](#arrowsoverlay)
        - [autoplay](#autoplay)
        - [autoplaySpeed](#autoplaySpeed)
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

The HTML element which the arrows will be appended to if you want to have more flexibility to how your carousel looks.

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

### `prevButton`

Type: String

Default: `<svg ...`

Defines the HTML code for the element which changes the active slide(s) to the previous slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons.

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

### `slidesScrolling`

Type: Integer

Default: `1`

Defines how many slides should be moved when going to the next page of slides.

### `transition`

Type: String

Default: `slide`

Defines which transition should be used when changing the active slide(s). Current transitions available are: `none` and `slide`.

### `transitionSpeed`

Type: Integer

Default: `250`

Defines the transition speed when the slide is being changed. `transition` must be set to `slide` for this option to work.
