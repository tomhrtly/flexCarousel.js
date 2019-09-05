<template>
    <div>
        <Navbar></Navbar>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <Home
                            v-if="$page.frontmatter.home"
                        />
                    </div>
                </div>
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

<style lang="scss">
    @import '../styles/global';

    .section {
        padding: 3rem 1.5rem;
    }
</style>
