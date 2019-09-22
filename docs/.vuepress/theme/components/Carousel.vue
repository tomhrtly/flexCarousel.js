<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['options'],
        mounted() {
            const carousel = new flexCarousel(`#${this.$attrs.id}`, this.options);
        }
    }
</script>
