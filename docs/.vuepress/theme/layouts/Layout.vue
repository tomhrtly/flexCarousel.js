<template>
    <div>
        <Navbar></Navbar>
        <section class="section">
            <div class="container">
                <Home
                    v-if="$page.frontmatter.home"
                />
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar';
    import Home from '../components/Home';

    export default {
        components: {
            Navbar,
            Home
        }
    }
</script>

<style lang="sass">
    @import '../styles/global'
</style>
