<template>
    <div>
        <div class="columns is-vcentered">
            <div class="column is-6">
                <div class="inner">
                    <h1 class="title is-spaced is-3">{{ data.page.title }}</h1>
                    <p class="subtitle is-6">{{ data.page.description }}</p>
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
            <div class="column is-6">
                <div class="inner">
                    <div class="preview">
                        <div class="example">
                            <Carousel
                                id="example"
                                :options="data.options"
                            >
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
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <Content/>
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
                return {
                    page: this.$page.frontmatter,
                    options: {
                        autoplay: true,
                        height: '200px'
                    }
                }
            }
        }
    }
</script>

<style lang="sass">
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
