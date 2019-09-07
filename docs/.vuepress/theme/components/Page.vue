<template>
    <div>
        <div class="columns">
            <div class="column is-3">
                <aside class="menu">
                    <ul class="menu-list">
                        <li
                            v-for="link in $site.themeConfig.links"
                        >
                            <router-link
                                :to="link.url"
                                v-text="link.text"
                            ></router-link>
                        </li>
                    </ul>
                </aside>
            </div>
            <div class="column">
                <div class="columns">
                    <div class="column">
                        <div class="field has-addons">
                            <p class="control is-expanded has-icons-left">
                                <input class="input" type="text" placeholder="Name">
                                <span class="icon is-small is-left">
                                    <svg style="width: 50%;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="column is-narrow">
                        <div class="field">
                            <div class="control">
                                <div class="select">
                                    <select
                                        v-model="data.selected"
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
                <h2 class="title">{{ data.page.title }}</h2>
                <h3 class="subtitle is-5">{{ data.page.description }}</h3>
                <div class="content">
                    <Content/>
                </div>
            </div>
        </div>

    </div>
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
    }
</script>
