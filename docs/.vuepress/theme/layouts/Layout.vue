<template>
    <div>
        <Navbar></Navbar>
        <section class="section">
            <div class="container">
                <Home
                    v-if="$page.frontmatter.home"
                />
                <Page
                    v-else=""
                />
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar';
    import Home from '../components/Home';
    import Page from '../components/Page';

    export default {
        components: {
            Navbar,
            Home,
            Page
        }
    }
</script>

<style lang="sass">
    @import '../styles/global'
</style>
