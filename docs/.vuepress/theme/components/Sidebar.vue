<template>
    <aside class="menu">
        <ul class="menu-list">
            <li
                v-for="link in links"
            >
                <router-link
                    :to="`/docs/${data.selected}/${link.slug}`"
                    v-text="link.text"
                ></router-link>
            </li>
        </ul>
        <hr>
        <div class="columns is-vcentered is-centered">
            <div class="column is-narrow">
                <label class="label" for="versions">Version:</label>
            </div>
            <div class="column is-narrow">
                <div class="field">
                    <div class="control">
                        <div class="select">
                            <select
                                v-model="data.selected"
                                @change="redirect"
                                id="versions"
                            >
                                <option
                                    v-for="(version, index) in $site.themeConfig.versions"
                                    :key="index"
                                    v-text="version"
                                ></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        computed: {
            data() {
                return {
                    page: this.$page.frontmatter,
                    selected: this.$route.path.substring(
                        this.$route.path.indexOf('/docs/') + 6,
                        this.$route.path.lastIndexOf('/')
                    ),
                }
            },
            links() {
                return this.$site.themeConfig.links.sort((a, b) => a.text.localeCompare(b.text))
            }
        },
        methods: {
            redirect() {
                router.push(`/docs/${this.data.selected}/`);
            }
        }
    }
</script>
