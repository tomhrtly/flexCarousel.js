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

### `autoplay`

Type: Boolean

Default: `true`

Determines whether the active slide changes to the next slide on a time delay.

### `autoplaySpeed`

Type: Integer

Default: `5000`

Determines how long the active slide(s) will stay active for before transitioning to the next slide. `autoplay` must be set to `true` for this option to work.

### `circles`

Type: Boolean

Default: `true`

Determines whether navigation circles should be shown at the bottom of the carousel for users to quickly select which slide to view.

### `circlesOverlay`

Type: Boolean

Default: `true`

Determines whether the circles overlay onto the active slide(s) or have their own wrapping elements. `circles` must be set to `true` for this option to work.

### `height`

Type: String

Default: `null`

Defines whether a fixed height is to be added to the carousel selector element.

### `infinite`

Type: Boolean

Default: `true`

Determines if the carousel will continuously loop over the slides or have the prev/next buttons disabled when on the first/last slide.

### `initialPage`

Type: Integer

Default: `0`

Defines which page index the carousel will start on.

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

A collection of objects which defines options for specific breakpoints.

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
