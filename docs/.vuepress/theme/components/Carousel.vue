<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['options'],
        mounted() {
            new FlexCarousel(`#${this.$attrs.id}`, this.options);
        }
    }
</script>
