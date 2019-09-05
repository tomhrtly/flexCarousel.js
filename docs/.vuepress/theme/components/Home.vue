<template>
    <div>
        <div class="columns">
            <div class="column is-5">
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
                <div class="columns is-variable is-2">
                    <div class="column is-7">
                        <a
                            :href="$site.themeConfig.download"
                            class="button is-primary is-large is-fullwidth"
                        >
                            Download {{ this.$site.themeConfig.currentVersion }}
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
            <div class="column">
                <div class="preview">
                    <div class="carousel-example">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
    export default {
        computed: {
            data() {
                return this.$page.frontmatter;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .badges {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }

    .badge {
        display: flex;

        iframe {
            display: block;
        }

        iframe,
        img {
            height: 30px;
        }

        &:not(:last-child) {
            margin-right: .5rem;
        }
    }
</style>
