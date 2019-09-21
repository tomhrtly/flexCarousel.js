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
                                :href="`https://github.com/tomhrtly/flexcarousel.js/blob/master/docs/docs/${$site.themeConfig.currentVersion}/${$page.title.toLowerCase()}.md`"
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
            Sidebar
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
