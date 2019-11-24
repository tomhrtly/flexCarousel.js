<template>
    <div>
        <div class="columns">
            <div class="column is-3">
                <Sidebar/>
            </div>
            <div class="column is-9">
                <div class="content">
                    <Content/>
                    <div class="meta">
                        <p>
                            Think you could improve the documentation on this page?
                            <a
                                :href="editLink"
                                target="_blank"
                            >Edit it on GitHub!</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from './Sidebar.vue';

    export default {
        components: {
            Sidebar,
        },
        computed: {
            editLink() {
                return `https://github.com/tomhrtly/flexcarousel.js-docs/blob/${this.$site.themeConfig.docsVersion}/${this.$page.title.toLowerCase()}.md`;
            }
        },
        created() {
            this.$site.themeConfig.docsVersion = this.$route.path.substring(
                this.$route.path.indexOf('/docs/') + 6,
                this.$route.path.lastIndexOf('/')
            );

            this.$site.pages.forEach((element) => {
                if (element.frontmatter.version) {
                    if (element.frontmatter.version[0] === this.$site.themeConfig.docsVersion) {
                        this.$site.themeConfig.links.push({
                            text: element.title,
                            slug: element.title.toLowerCase(),
                        });
                    }
                }
            });
        }
    }
</script>

<style lang="sass">
    .meta
        color: #b5b5b5
        padding-top: 6rem
        text-align: center

    .extra-class
        margin-bottom: 2rem
</style>
