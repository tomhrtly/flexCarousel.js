# Options

- [Options](#options)
    - [Introduction](#introduction)
    - [Available Options](#available-options)

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

For a full list of all the options available so that you can customise your carousels as needed, view the table below. The table provides each option along with its type, default value and description of what it does.

| Name | Type | Default | Description |
|---|---|---|---|
| `appendArrows` | String | `this.selector` | The selector which the arrows will be appended to if you want to have more flexibility to how your carousel looks. |
| `appendCircles` | String | `null` | The selector which the circles will be appended to if you want to have more flexibility to how your carousel looks. |
| `arrows` | Boolean | `true` | Determines whether a previous and next arrow should be shown on either side of the slides so that the user can change the active slide. |
| `arrowsOverlay` | Boolean | `true` | Determines whether the arrows overlay onto the active slide or have their own wrapping elements. `arrows` must be set to `true` for this option to work. |
| `autoplay` | Boolean | `false` | Determines whether the active slide changes to the next slide on a time delay. |
| `autoplaySpeed` | Integer | `5000` | Determines how long the active slide(s) will stay active for before transitioning to the next slide. `autoplay` must be set to `true` for this option to work. |
| `circles` | Boolean | `true` | Determines whether navigation circles should be shown at the bottom of the carousel for users to quickly select which slide to view. |
| `circlesOverlay` | Boolean | `true` | Determines whether the circles overlay onto the active slide(s) or have their own wrapping elements. `circles` must be set to `true` for this option to work. |
| `height` | String | `null` | Defines whether a fixed height is to be added to the carousel selector element. |
| `infinite` | Boolean | `true` | Determines if the carousel will continuously loop over the slides or have the prev/next buttons disabled when on the first/last slide. |
| `nextButton` | String | `<svg ...` | Defines the HTML code for the element which changes the active slide(s) to the next slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons. |
| `prevButton` | String | `<svg ...` | Defines the HTML code for the element which changes the active slide(s) to the previous slide when clicked on. Out of the box, we use [Font Awesome](https://fontawesome.com) icons. |
| `slidesPerPage` | Integer | `1` | Defines how many slides are visible on a page at any given time. |
| `slidesScrolling` | Integer | `1` | Defines how many slides should be moved when going to the next page of slides. |
| `transition` | String | `slide` | Defines which transition should be used when changing the active slide(s). Current transitions available are: `none` and `slide`. |
| `transitionSpeed` | Integer | `250` | Defines the transition speed when the slide is being changed. `transition` must be set to `slide` for this option to work. |
