<template>
    <div>
        <Navbar></Navbar>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <h1 class="title is-spaced is-3">404 - Page Not Found</h1>
                        <p class="subtitle is-6">Looks like this page was either moved, deleted or never existed.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar';

    export default {
        components: {
            Navbar
        }
    }
</script>

<style lang="sass">
    @import '../styles/global'
</style>
