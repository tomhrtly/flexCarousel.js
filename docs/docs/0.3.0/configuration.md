# Configuration

- [Configuration](#configuration)
    - [How to Use](#how-to-use)
        - [Document Setup](#document-setup)
        - [Quick-start Template](#quick-start-template)
        - [HTML Structure](#html-structure)
    - [Options](#options)
    - [Styling](#styling)
        - [Sass](#sass)
        - [File Structure](#file-structure)

## Configuration

### How to Use
Before you start using flexCarousel.js, make sure your web page is set up to the latest development standards. This means using the correct document declaration and including the responsive meta tag.

#### Document Setup
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

#### Quick-start Template
After setting up your web page correctly, this is what your full HTML structure should look like to initialize flexCarousel.js. Note the order of the JavaScript files loaded, jQuery is loaded before the flexCarousel.js file because the latter is a dependency of the former as explained above.

Only once you included jQuery and flexCarousel.js into your document can you successfully initialize the plugin. On a production server, we recommend adding this in a separate JavaScript file.

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
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/flexcarouseljs@latest/dist/flexCarousel.min.js"></script>
    <script>
       new FlexCarousel('.my-class')
    </script>
  </body>
</html>
```
