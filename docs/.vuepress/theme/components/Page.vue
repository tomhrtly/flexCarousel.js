<template>
    <div>
        <div class="columns">
            <div class="column is-3">
                <Sidebar
                    :version="version"
                    :links="links"
                >
                    <select
                        v-model="version"
                        @change="redirect"
                        id="versions"
                    >
                        <option
                            v-for="(version, index) in $site.themeConfig.versions"
                            :key="index"
                            v-text="version"
                        ></option>
                    </select>
                </Sidebar>
            </div>
            <div class="column is-9">
                <div class="content">
                    <Content />
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
        data() {
            return {
                version: '',
                links: [],
            }
        },
        components: {
            Sidebar,
        },
        computed: {
            editLink() {
                return `https://github.com/tomhrtly/flexcarousel.js-docs/blob/${this.version}/${this.$page.title.toLowerCase()}.md`;
            }
        },
        methods: {
            redirect() {
                router.push(`/docs/${this.version}/`);
                this.updateLinks();
            },
            updateLinks() {
                this.links = [];

                this.$site.pages.forEach((element) => {
                    if (element.frontmatter.version) {
                        if (element.frontmatter.version[0] === this.version) {
                            this.links.push({
                                text: element.title,
                                slug: element.title.toLowerCase(),
                            });
                        }
                    }
                });
            }
        },
        created() {
            this.version = this.$route.path.substring(
                this.$route.path.indexOf('/docs/') + 6,
                this.$route.path.lastIndexOf('/')
            );

            this.updateLinks();
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
