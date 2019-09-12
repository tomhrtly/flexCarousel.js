<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import FlexCarousel from "../../../../src/flexCarousel";
    export default {
        props: ['options'],
        mounted() {
            new FlexCarousel(`#${this.$attrs.id}`, this.options);
        }
    }
</script>
