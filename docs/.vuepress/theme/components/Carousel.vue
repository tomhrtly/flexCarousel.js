<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import FlexCarousel from '../../../../src/flexCarousel';

    export default {
        data() {
            return {
                id: this.$attrs.id,
            }
        },
        created() {
            new FlexCarousel(`#${this.id}`);
        }
    }
</script>
