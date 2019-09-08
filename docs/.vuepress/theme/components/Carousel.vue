<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        mounted() {
            new FlexCarousel(`#${this.$attrs.id}`);
        }
    }
</script>
