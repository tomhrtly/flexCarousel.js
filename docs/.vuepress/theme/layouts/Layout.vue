<template>
    <div>
        <Navbar></Navbar>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <Content class="content"></Content>
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

<style lang="scss">
    @import '../styles/global';

    .section {
        padding: 3rem 1.5rem;
    }
</style>
