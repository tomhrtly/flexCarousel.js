<template>
    <aside class="menu">
        <ul class="menu-list">
            <li
                v-for="link in $site.themeConfig.links"
            >
                <router-link
                    :to="`/docs/${$site.themeConfig.currentVersion}/${link.slug}`"
                    v-text="link.text"
                ></router-link>
            </li>
        </ul>
        <hr>
        <div class="columns is-vcentered is-centered">
            <div class="column is-narrow">
                <p>Version:</p>
            </div>
            <div class="column is-narrow">
                <div class="field">
                    <div class="control">
                        <div class="select">
                            <select
                                v-model="data.selected"
                                @change="redirect"
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
                    selected: this.$site.themeConfig.currentVersion
                }
            },
        },
        methods: {
            redirect() {
                window.location.replace(`/docs/${this.data.selected}/`);
            }
        }
    }
</script>
