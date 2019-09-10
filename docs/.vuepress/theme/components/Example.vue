<template>
    <div>
        <div class="columns">
            <div class="column is-3">
                <aside class="menu">
                    <ul class="menu-list">
                        <li
                            v-for="example in $site.themeConfig.examples"
                        >
                            <router-link
                                :to="`/examples/${example.slug}`"
                                v-text="example.text"
                            ></router-link>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column is-9">
                <h1 class="title is-spaced is-3">{{ $page.frontmatter.title }}</h1>
                <p class="subtitle is-6">{{ $page.frontmatter.description }}</p>
                <hr>
                <Carousel
                    :id="$page.key"
                    :options="options"
                >
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
</template>

<script>
    import Carousel from './Carousel';

    export default {
        data() {
            return {
                options: {}
            }
        },
        components: {
            Carousel
        },
        created() {
            if (this.$page.frontmatter.options) {
                this.options = Object.assign({}, ...this.$page.frontmatter.options);
            }
        }
    }
</script>
