<template>
    <div>
        <Navbar></Navbar>
        <section class="section">
            <div class="container">
                <Home
                    v-if="$page.frontmatter.home"
                />
                <Example
                    v-else-if="$page.frontmatter.example"
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
    import Example from '../components/Example';

    export default {
        components: {
            Navbar,
            Home,
            Page,
            Example
        },
    }
</script>

<style lang="sass">
    @import '../styles/global'
</style>
