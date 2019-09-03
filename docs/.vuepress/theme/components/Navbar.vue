<template>
    <nav class="navbar is-spaced">
        <div class="navbar-brand">
            <a href="https://bulma.io" class="navbar-item">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>
            <a
                role="button"
                class="navbar-burger burger"
                ref="burger"
                @click="toggleBurger()"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div
            class="navbar-menu"
            ref="menu"
        >
            <div class="navbar-end">
                <a class="navbar-item">Home</a>
                <a class="navbar-item">Documentation</a>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">More</a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item">About</a>
                        <a class="navbar-item">Jobs</a>
                        <a class="navbar-item">Contact</a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">Report an issue</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        methods: {
            toggleBurger() {
                this.$refs.burger.classList.toggle('is-active');
                this.$refs.menu.classList.toggle('is-active');
            }
        }
    }
</script>
