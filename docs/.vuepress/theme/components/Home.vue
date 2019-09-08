<template>
    <div>
        <div class="columns is-vcentered">
            <div class="column">
                <div class="inner">
                    <h1 class="subtitle is-3">{{ data.title }}</h1>
                    <p class="subtitle is-6">{{ data.description }}</p>
                    <div class="badges">
                        <div class="badge">
                            <iframe src="https://ghbtns.com/github-btn.html?user=tomhrtly&repo=flexCarousel.js&type=star&count=true&size=large" frameborder="0" scrolling="0" width="120px" height="30px"></iframe>
                        </div>
                        <a href="https://npmjs.com/package/flexcarouseljs" class="badge" target="_blank">
                            <img src="https://img.shields.io/npm/dm/flexcarouseljs.svg" alt="NPM downloads per month" width="210" height="30">
                        </a>
                    </div>
                    <div class="columns">
                        <div class="column is-7">
                            <a
                                :href="$site.themeConfig.download"
                                class="button is-primary is-large is-fullwidth"
                            >
                                Download v{{ this.$site.themeConfig.currentVersion }}
                            </a>
                        </div>
                        <div class="column">
                            <router-link
                                to="/docs/"
                                class="button is-light is-large is-fullwidth"
                            >
                                Get Started
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="inner">
                    <div class="preview">
                        <Carousel id="example">
                            <div>
                                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">1</div>
                            </div>
                            <div>
                                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">2</div>
                            </div>
                            <div>
                                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">3</div>
                            </div>
                            <div>
                                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">4</div>
                            </div>
                            <div>
                                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">5</div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="columns">
            <div class="column is-4">
                <div class="content">
                    <h3>Install</h3>
                    <p>Feel free to use npm to add flexCarousel.js to your project. The package includes the source and distribution files but no documentation.</p>
                    <pre><code>npm install flexcarouseljs</code></pre>
                </div>
            </div>
            <div class="column is-4">
                <div class="content">
                    <h3>CDN</h3>
                    <p>Instead of hosting the two required files locally, feel free to use the CDN links provided by jsDelivr.</p>
                    <h4>CSS</h4>
                    <pre><code>&#x3C;link rel=&#x22;stylesheet&#x22; href=&#x22;https://cdn.jsdelivr.net/npm/flexcarouseljs@{{ $site.themeConfig.currentVersion }}/dist/flexCarousel.min.css&#x22;&#x3E;</code></pre>
                    <h4>JS</h4>
                    <pre><code>&#x3C;script src=&#x22;https://cdn.jsdelivr.net/npm/flexcarouseljs@{{ $site.themeConfig.currentVersion }}/dist/flexCarousel.min.js&#x22;&#x3E;&#x3C;/script&#x3E;</code></pre>
                </div>
            </div>
            <div class="column is-4">
                <div class="content">
                    <h3>Sandbox</h3>
                    <p>Play around with all of the customisation options available for flexCarousel.js by using CodePen, a playground for developers.</p>
                    <figure class="image">
                        <a href="https://codepen.io/tomhrtly/pen/eXRpOg/">
                            <svg class="codepen-logo" viewBox="0 0 138 26" width="75%"><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0l11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path></svg>
                        </a>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Carousel from './Carousel.vue'

    export default {
        components: {
            Carousel
        },
        computed: {
            data() {
                return this.$page.frontmatter;
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '~bulma/sass/utilities/mixins'

    .badges
        align-items: center
        display: flex
        flex-wrap: wrap
        justify-content: flex-start
        &:not(:last-child)
            margin-bottom: 1rem

    .badge
        display: flex

        iframe
            display: block

        iframe,
        img
            height: 30px

        &:not(:last-child)
            margin-right: .5rem

    .codepen-logo
        display: block
        fill: none
        margin-left: auto
        margin-right: auto
        padding-top: 2rem
        stroke: #0a0a0a
        stroke-width: 2.3
        stroke-linejoin: round
        stroke-linecap: round

    +desktop
        .column
            &:first-child
                .inner
                    padding-right: 2rem
            &:last-child
                .inner
                    padding-left: 2rem

</style>
